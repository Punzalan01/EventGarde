import { Route } from 'react-router-dom'
import { AuthLayout } from '@/app/layouts/AuthLayout'
import { LoginView } from '@/features/auth/views/LoginView'
import { OTPVerificationView } from '@/features/auth/views/OTPVerificationView'
import { RegisterView } from '@/features/auth/views/RegisterView'

export function AuthRoutes() {
  return (
    <Route element={<AuthLayout />}>
      <Route path="login" element={<LoginView />} />
      <Route path="register" element={<RegisterView />} />
      <Route path="otp" element={<OTPVerificationView />} />
    </Route>
  )
}
