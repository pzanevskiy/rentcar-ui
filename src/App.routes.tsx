import { useKeycloak } from "@react-keycloak/web"
import { Spinner } from "react-bootstrap"
import { BrowserRouter, Route, Routes, } from 'react-router-dom'
import { Hello, HelloComponent } from "./components/HelloUser"
import { Login } from './components/login/Login'
import { PrivateRoute } from "./utils/PrivateRoute"

export const AppRoutes = () => {
  const { initialized } = useKeycloak()

  if (!initialized) {
    return <Spinner animation={'grow'} size='sm' />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute element={<HelloComponent />} roles={['rentcar_admin']} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/hello" element={<PrivateRoute element={<Hello />} />} />
      </Routes>
    </BrowserRouter>
  )
}