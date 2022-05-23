import { Button } from "@mui/material"
import { useKeycloak } from "@react-keycloak/web"

export const Logout = () => {
  const { keycloak, initialized } = useKeycloak()

  const logout = () => {
    if (initialized)
      keycloak?.logout()
  }

  return (
    <div>
      <Button variant="text" onClick={logout}
        sx={{
          mx: 2,
          color: 'white',
          "&:hover": {
            background: 'white',
            color: '#4caf50',
            transition: 'all .3s',
          }
        }}>
        Logout
      </Button>
    </div>
  )
}