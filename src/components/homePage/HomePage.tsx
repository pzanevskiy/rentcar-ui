import { useKeycloak } from "@react-keycloak/web"
import { isAdmin } from "../../services"

export const HomePage = () => {

  return (
    <div>
      {isAdmin() ? <></> : <></>}
    </div>
  )
}