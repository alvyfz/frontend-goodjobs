import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Brand from "../brand/BrandWhiteNavbar";

export default function NavBar() {
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        fixed="top"
        style={{
          fontWeight: "500",
          fontSize: "14px",
        }}
      >
        <Container>
          <Navbar.Brand as={Link} to="/" style={{ marginRight: "7%" }}>
            <Brand />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" style={{ marginRight: "10%" }}>
                HOME
              </Nav.Link>
              <Nav.Link as={Link} to="/complex" style={{ marginRight: "10%" }}>
                COMPLEX
              </Nav.Link>
              <Nav.Link as={Link} to="/building" style={{ marginRight: "10%" }}>
                BUILDING
              </Nav.Link>
              {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
            <Nav>
              <Nav.Link as={Link} to="/login">
                LOGIN/SIGNUP
              </Nav.Link>
              {/* <Nav.Link eventKey={2} href="#memes">
                Dank memes
              </Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
