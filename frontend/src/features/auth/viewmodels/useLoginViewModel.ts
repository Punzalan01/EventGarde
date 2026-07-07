import { FormEvent, useState } from 'react'
import type { LoginFormState } from '@/features/auth/models/auth.model'

const initialLoginForm: LoginFormState = {
  email: '',
  password: '',
  rememberMe: true,
}

export function useLoginViewModel() {
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

  const submitLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setStatus('')
    setTimeout(() => {
      setIsLoading(false)
      setStatus('Login is ready to connect to the EventGarde API.')
    }, 1500)
  }

  const loginWithGoogle = () => {
    setIsGoogleLoading(true)
    setStatus('')
    setTimeout(() => {
      setIsGoogleLoading(false)
      setStatus('Google Sign In is ready to connect.')
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
    submitLogin,
    loginWithGoogle,
  }
}
