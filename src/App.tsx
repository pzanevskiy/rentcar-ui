import './App.css'
import { AppRoutes } from './App.routes';
import { AuthProvider } from './components/authProvider/AuthProvider'
import {Login} from './components/login/Login'
export const App = () => {
   
  return (
    <AuthProvider>
      <div>
        <header>
          <p>Hello, world!</p>
        </header>
       <Login/>
      </div>
    </AuthProvider>
    // <ReactKeycloakProvider authClient={keycloak}>
    //   <div className="App">
    //      <header className="App-header">
    //        <p>Hello, world!</p>
    //       </header>
    //   </div>
    // </ReactKeycloakProvider>
  )
}