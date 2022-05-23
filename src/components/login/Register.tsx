import { Button } from "@mui/material"
import { useKeycloak } from "@react-keycloak/web"

export const Register = () => {
  const { keycloak } = useKeycloak()

  const register = () => {
    keycloak.register()
  }
  return (
    <>
      <Button variant="text" onClick={register}
        sx={{
          mr: 2,
          color: 'white',
          "&:hover": {
            background: 'white',
            color: '#4caf50',
            transition: 'all .3s',
          }
        }}>
        Register
      </Button>
    </>
  )
}