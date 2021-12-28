import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Brand from "../brand/BrandWhiteNavbar";
import { parseCookies, destroyCookie } from "nookies";
import { BsChatSquareText } from "react-icons/bs";
import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";
export default function NavBar({ home, complex, building, chat, myaccount }) {
  const jwt = parseCookies("auth").auth;
  const jwtDefault =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwicm9sZV9pZCI6MCwiZXhwIjoxNjQwNTIzODE1fQ.RTtmDJ2fXyxY4N9GXWJnH-beaFIuHsgUSF3hJHHRXqU";
  const user = jwt_decode(jwt || jwtDefault);
  const handleLogout = () => {
    destroyCookie(null, "auth");
    Swal.fire("Sign out success!", "", "success");
    window.location.reload();
  };

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
              <Nav.Link
                as={Link}
                to="/"
                active={home}
                style={{ marginRight: "10%" }}
              >
                HOME
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/complex"
                active={complex}
                style={{ marginRight: "10%" }}
              >
                COMPLEX
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/buildings"
                active={building}
                style={{ marginRight: "10%" }}
              >
                BUILDING
              </Nav.Link>
            </Nav>
            <Nav>
              {jwt ? (
                <>
                  <Nav.Link
                    as={Link}
                    to="/chat"
                    active={chat}
                    style={{ marginRight: "23px" }}
                  >
                    <BsChatSquareText /> CHAT
                  </Nav.Link>
                  <NavDropdown
                    active={myaccount}
                    title={user.Name.toUpperCase()}
                    id="collasible-nav-dropdown"
                  >
                    <NavDropdown.Item
                      as={Link}
                      to="/myaccount"
                      style={{ fontSize: "14px" }}
                    >
                      MY ACCOUNT
                    </NavDropdown.Item>{" "}
                    <NavDropdown.Item
                      onClick={handleLogout}
                      style={{ fontSize: "14px" }}
                    >
                      LOGOUT
                    </NavDropdown.Item>
                    {/* <NavDropdown.Item href="#action/3.2">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      Something
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Separated link
                    </NavDropdown.Item> */}
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">
                    LOGIN/SIGNUP
                  </Nav.Link>
                </>
              )}
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
