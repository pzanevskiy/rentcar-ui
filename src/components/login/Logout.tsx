import { useKeycloak } from "@react-keycloak/web"
import { Button } from "react-bootstrap"

export const Logout = () => {
  const { keycloak, initialized } = useKeycloak()

  const logout = () => {
    if (initialized)
      keycloak?.logout()
  }

  return (
    <div>
      <Button onClick={logout} variant="danger">Logout</Button>
    </div>
  )
}