import { ReactNode } from 'react'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import keycloak from '../../services/keycloak'
import { Spinner } from 'react-bootstrap'

const loadingComponent = <Spinner animation={'grow'} variant={'dark'} />

const initialOptions = {
  onload: 'check-sso',
  pkceMode: 'S256',
  enableLogging: true,
  checkLoginIframe: false
}

export interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  return (
    <ReactKeycloakProvider authClient={keycloak} initOptions={initialOptions} LoadingComponent={loadingComponent}>
      {children}
    </ReactKeycloakProvider>
  )
}