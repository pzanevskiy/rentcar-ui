import { useKeycloak } from "@react-keycloak/web"
import { Button } from 'react-bootstrap'
import { Navigate } from "react-router-dom"

export const Login = () => {
  const { keycloak } = useKeycloak()

  const login = () => {
    keycloak?.login()
  }  

  const logout = () => {
    keycloak?.logout()
  }
  return (
    <div>
      {!keycloak?.authenticated ? (
        <Button onClick={login} variant="primary">Login</Button>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  )
}