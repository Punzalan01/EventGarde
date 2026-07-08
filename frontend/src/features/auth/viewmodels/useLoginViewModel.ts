import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { LoginFormState } from '@/features/auth/models/auth.model'
import * as authService from '@/features/auth/services/auth.service'
import { useAuth } from '@/shared/hooks/useAuth'

const initialLoginForm: LoginFormState = {
  email: '',
  password: '',
  rememberMe: true,
}

export function useLoginViewModel() {
  const navigate = useNavigate()
  const { setAuthMetadata } = useAuth()
  const [form, setForm] = useState<LoginFormState>(initialLoginForm)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [status, setStatus] = useState('')

  const updateField = <Field extends keyof LoginFormState>(
    field: Field,
    value: LoginFormState[Field],
  ) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }))
  }

  const togglePasswordVisibility = () => {
    setShowPassword((currentValue) => !currentValue)
  }

  const submitLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setStatus('')
    try {
      const result = await authService.login(form)
      setAuthMetadata(result)
      navigate('/workspace')
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Unable to log in.')
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithGoogle = () => {
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
    submitLogin,
    loginWithGoogle,
  }
}
