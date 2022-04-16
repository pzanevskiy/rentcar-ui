import { useKeycloak } from "@react-keycloak/web"
import { KeycloakTokenParsed } from "keycloak-js"
import { useState } from "react"
import { useParams } from "react-router-dom"
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
      {keycloak.authenticated && <div>Hello, {getUserName()}</div>}
    </>
  )
}

export const Hello = (props: any) => {
  const { id } = useParams<{ id: string }>()
  const [data, setData] = useState<string>('')

  getHello().then((response: any) => {
    setData(response)
  })
  return (
    <>
      <p>Hello from route --- {id}</p>
      <p>Hello from api --- {data}</p>
    </>
  )
}