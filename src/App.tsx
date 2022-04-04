import './App.css'
import { AppRoutes } from './App.routes';
import { AuthProvider } from './components/authProvider/AuthProvider'
import { Logout } from './components/login/Logout'

export const App = () => {

  return (
    <AuthProvider>
      <AppRoutes />
      <Logout/>
    </AuthProvider>
  )
}