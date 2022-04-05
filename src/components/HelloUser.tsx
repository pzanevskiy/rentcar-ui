import { useKeycloak } from "@react-keycloak/web"
import { KeycloakTokenParsed } from "keycloak-js"
import { useState } from "react"
import axiosProvider from "../api/axiosProvider"
import { getHello } from "../api/requests"

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
  const [data, setData] = useState<string>('')

  getHello().then((response: any) => {
    setData(response)
  })
  return (
    <>
      <p>Hello from route</p>
      <p>Hello from api --- {data}</p>
    </>
  )
}