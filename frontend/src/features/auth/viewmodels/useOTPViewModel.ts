import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as authService from '@/features/auth/services/auth.service'
import { useAuth } from '@/shared/hooks/useAuth'

export function useOTPViewModel() {
  const navigate = useNavigate()
  const { setAuthMetadata } = useAuth()
  const [email, setEmail] = useState('')
  const [token, setToken] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [status, setStatus] = useState('')

  const sendOtp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSending(true)
    setStatus('')
    try {
      const result = await authService.sendEmailOtp(email)
      setStatus(result.message ?? 'OTP sent.')
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Unable to send OTP.')
    } finally {
      setIsSending(false)
    }
  }

  const verifyOtp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsVerifying(true)
    setStatus('')
    try {
      const result = await authService.verifyEmailOtp(email, token)
      setAuthMetadata(result)
      const workspaceId = result.default_workspace?.id
      if (workspaceId) {
        navigate(`/personal/${workspaceId}`)
      } else {
        navigate('/login?error=no_workspace')
      }
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Unable to verify OTP.')
    } finally {
      setIsVerifying(false)
    }
  }

  return {
    email,
    token,
    isSending,
    isVerifying,
    status,
    setEmail,
    setToken,
    sendOtp,
    verifyOtp,
  }
}
