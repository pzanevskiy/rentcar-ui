import { useKeycloak } from "@react-keycloak/web"
import { ReactNode } from "react"
import { Navigate } from "react-router-dom"

export const PrivateRoute = (props: { element: ReactNode, roles?: string[] }) => {
  const { keycloak } = useKeycloak()
  
  const isAuthorized = (roles?: string[]): boolean => {
    if (roles) {
      return roles.some(r => keycloak.hasResourceRole(r))
    }
    return false
  }

  return !keycloak?.authenticated ?
    <Navigate to="/login" /> : !isAuthorized(props.roles) && props.roles ?
      <p>no access</p> : <>{props.element}</>
}