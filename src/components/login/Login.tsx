import { Button } from "@mui/material"
import { useKeycloak } from "@react-keycloak/web"

export const Login = () => {
  const { keycloak } = useKeycloak()

  const login = () => {
    keycloak?.login()
  }

  return (
    <div>
      <Button onClick={login} variant="text"
        sx={{
          mr: 2,
          color: 'white',
          "&:hover": {
            background: 'white',
            color: '#4caf50',
            transition: 'all .3s',
          }
        }}>
        Login
      </Button>
    </div>
  )
}