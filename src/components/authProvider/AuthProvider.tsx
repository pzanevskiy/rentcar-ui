import React, { ReactNode } from 'react'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import keycloak from '../../services/keycloak'

const loadingComponent = <p>Loading...</p>

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