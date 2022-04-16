import './App.css'
import { AppRoutes } from './App.routes'
import { AuthProvider } from './components/authProvider/AuthProvider'
import { Header } from './components/header/Header'

export const App = () => {

  return (
    <AuthProvider>
      <Header/>
      <AppRoutes />
    </AuthProvider>
  )
}