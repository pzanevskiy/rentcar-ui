import { SnackbarProvider } from 'notistack'
import './App.css'
import { AppRoutes } from './App.routes'
import { AuthProvider } from './components/authProvider/AuthProvider'
import { Header } from './components/header/Header'

export const App = () => {

  return (
    <SnackbarProvider maxSnack={3}>
      <AuthProvider>
        <Header />
        <AppRoutes />
      </AuthProvider>
    </SnackbarProvider>
  )
}