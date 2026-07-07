import { useState } from 'react'
import type { RegisterFormState } from '@/features/auth/models/auth.model'

const initialRegisterForm: RegisterFormState = {
  fullName: '',
  organization: '', // keeping in model for backwards compatibility if needed, but unused in UI
  email: '',
  password: '',
  role: 'Attendee', // default role
  acceptedTerms: false,
}

export function useRegisterViewModel() {
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

  const submitRegistration = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus('')
    setTimeout(() => {
      setIsLoading(false)
      setStatus('Sign up is ready to connect to the EventGarde API.')
    }, 1500)
  }

  const registerWithGoogle = () => {
    setIsGoogleLoading(true)
    setStatus('')
    setTimeout(() => {
      setIsGoogleLoading(false)
      setStatus('Google Sign Up is ready to connect.')
    }, 1500)
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
