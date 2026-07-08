import { Routes, Route } from 'react-router-dom'
import { PersonalLayout } from '@/app/layouts/PersonalLayout'
import { PersonalDashboardView } from '@/features/personal-workspace/views/PersonalDashboardView'

export function PersonalRoutes() {
  return (
    <Routes>
      <Route path="/personal" element={<PersonalLayout />}>
        <Route index element={<PersonalDashboardView />} />
      </Route>
    </Routes>
  )
}
