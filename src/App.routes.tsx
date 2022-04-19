import { useKeycloak } from "@react-keycloak/web"
import { Spinner } from "react-bootstrap"
import { BrowserRouter, Route, Routes, } from 'react-router-dom'
import { Hello, HelloComponent } from "./components/HelloUser"
import { Login } from './components/login/Login'
import { PrivateRoute } from "./utils/PrivateRoute"
import { ChooseLocation } from './components/location/Location'
import { Cars } from "./components/rentCars/Cars"
import { AdminCars } from "./components/rentCars/AdminCars"
import { Brands } from "./components/brands/Brands"
import { AdminEnhancements } from "./components/enhancements/AdminEnhancements"

export const AppRoutes = () => {
  const { initialized, keycloak } = useKeycloak()

  if (!initialized) {
    return <Spinner animation={'grow'} size='sm' />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HelloComponent />} />
        <Route path="/hello/:id" element={<PrivateRoute element={<Hello />} />} />
        <Route path="/location"
          element={<PrivateRoute roles={['rentcar_user']} element={<ChooseLocation />} />} />
        <Route path="/cars/:id"
          element={< PrivateRoute roles={['rentcar_user']} element={<Cars />} />} />
        <Route path="/cars"
          element={< PrivateRoute roles={['rentcar_admin']} element={<AdminCars />} />} />
        <Route path="/brands"
          element={< PrivateRoute roles={['rentcar_admin']} element={<Brands />} />} />
        <Route path="/enhancements"
          element={< PrivateRoute roles={['rentcar_admin']} element={<AdminEnhancements />} />} />
      </Routes>
    </BrowserRouter>
  )
}