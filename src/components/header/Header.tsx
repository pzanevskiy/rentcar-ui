import { Avatar } from "@mui/material"
import { useKeycloak } from "@react-keycloak/web"
import { KeycloakTokenParsed } from "keycloak-js"
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap"
import { HelloComponent } from "../HelloUser"
import { LoginLogout } from "../login/LoginLogout"
import { Register } from "../login/Register"
import { ProfilePicture } from "../profilePicture/ProfilePicture"

export const Header = () => {
  const { keycloak } = useKeycloak()

  const getAvatar = (): string => {
    const tokenParsed: KeycloakTokenParsed = keycloak.idTokenParsed!
    const { picture: pic } = tokenParsed
    return pic
  }
  return (
    <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" className="placeholder-xs">
      <Navbar.Brand className="ms-2">Rent car inc.</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/location">Rent</Nav.Link>
          <Nav.Link href="/orders">Orders</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Text>
        <Container>
          <Row>
            <Col className="col-auto text-white my-2">
              <HelloComponent />
            </Col>
            {keycloak.authenticated &&
              <Col className="col-auto text-white my-2">
                <ProfilePicture />
              </Col>
            }
            <Col>
              <LoginLogout />
            </Col>
            {!keycloak?.authenticated ? (
              <Col>
                <Register />
              </Col>) :
              (<></>)
            }
          </Row>
        </Container>
      </Navbar.Text>
    </Navbar>
  )
}