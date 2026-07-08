import { Route } from 'react-router-dom'
import { CreateEventView } from '@/features/events/views/CreateEventView'
import { UserDashboardView } from '@/features/user-workspace/views/UserDashboardView'

export function UserRoutes() {
  return (
    <>
      <Route path="workspace" element={<UserDashboardView />} />
      <Route path="events/create" element={<CreateEventView />} />
    </>
  )
}
