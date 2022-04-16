import { isAuthenticated } from "../../services"
import { Login } from "./Login"
import { Logout } from "./Logout"

export const LoginLogout = () => {
  return (
    <div>
      {!isAuthenticated() ? <Login /> : <Logout />}
    </div>
  )
}