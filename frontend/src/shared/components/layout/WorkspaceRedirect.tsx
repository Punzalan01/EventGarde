import { Navigate } from 'react-router-dom';
import { useAuth } from '@/shared/hooks/useAuth';

export function WorkspaceRedirect({ basePath }: { basePath: string }) {
  const { defaultWorkspace } = useAuth();
  
  if (!defaultWorkspace?.id) {
    return <Navigate to="/login?error=no_workspace" replace />;
  }

  return <Navigate to={`${basePath}/${defaultWorkspace.id}`} replace />;
}
