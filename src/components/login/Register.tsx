import { useKeycloak } from "@react-keycloak/web"
import { Button } from "react-bootstrap"

export const Register = () => {
  const { keycloak } = useKeycloak()

  const register = () => {
    keycloak.register()
  }
  return (
    <>
      <Button variant="warning" onClick={register}>Register</Button>
    </>
  )
}