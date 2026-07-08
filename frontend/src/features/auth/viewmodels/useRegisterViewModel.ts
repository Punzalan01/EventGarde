import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { RegisterFormState } from '@/features/auth/models/auth.model'
import * as authService from '@/features/auth/services/auth.service'
import { useAuth } from '@/shared/hooks/useAuth'

const initialRegisterForm: RegisterFormState = {
  fullName: '',
  organization: '', // keeping in model for backwards compatibility if needed, but unused in UI
  email: '',
  password: '',
  role: 'Attendee', // default role
  acceptedTerms: false,
}

export function useRegisterViewModel() {
  const navigate = useNavigate()
  const { setAuthMetadata } = useAuth()
  const [form, setForm] = useState<RegisterFormState>(initialRegisterForm)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [status, setStatus] = useState('')

  const updateField = <Field extends keyof RegisterFormState>(
    field: Field,
    value: RegisterFormState[Field],
  ) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }))
  }

  const togglePasswordVisibility = () => {
    setShowPassword((currentValue) => !currentValue)
  }

  const submitRegistration = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus('')
    try {
      const result = await authService.register(form)
      if (result.status === 'confirmation_required') {
        setStatus(result.message ?? 'Please check your email to confirm your account.')
        return
      }

      setAuthMetadata(result)
      navigate('/workspace')
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Unable to create account.')
    } finally {
      setIsLoading(false)
    }
  }

  const registerWithGoogle = () => {
    setIsGoogleLoading(true)
    setStatus('')
    authService.redirectToGoogle()
  }

  return {
    form,
    showPassword,
    isLoading,
    isGoogleLoading,
    status,
    updateField,
    togglePasswordVisibility,
    submitRegistration,
    registerWithGoogle,
  }
}
