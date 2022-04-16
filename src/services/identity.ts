import keycloak from "./keycloak"

export const isAdmin = () => {
  return keycloak?.hasResourceRole('rentcar_admin')
}

export const isAuthenticated = () => {
  return keycloak?.authenticated;
}
