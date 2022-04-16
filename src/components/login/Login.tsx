import { useKeycloak } from "@react-keycloak/web"
import { Button } from 'react-bootstrap'

export const Login = () => {
  const { keycloak } = useKeycloak()

  const login = () => {
    keycloak?.login()
  }

  return (
    <div>
      <Button onClick={login} variant="primary">Login</Button>
    </div>
  )
}