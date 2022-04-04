import { useKeycloak } from "@react-keycloak/web"
import { KeycloakTokenParsed } from "keycloak-js"

export const HelloComponent = () => {
  const { keycloak } = useKeycloak()
  const getUserName = () => {
    const tokenParsed: KeycloakTokenParsed = keycloak.idTokenParsed!
    const { name: username } = tokenParsed
    return username
  }

  return (
    <>
      {keycloak.authenticated && <p>Hello, {getUserName()}</p>}
    </>
  )
}

export const Hello = () => {
  return (
    <>
      <p>Hello from route</p>
    </>
  )
}