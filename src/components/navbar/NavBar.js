import jwt_decode from 'jwt-decode';
import { destroyCookie, parseCookies } from 'nookies';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BsChatSquareText } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import Brand from '../brand/BrandWhiteNavbar';
export default function NavBar({
    home,
    complex,
    building,
    chat,
    myaccount,
}) {
    const Navigate = useNavigate();
    const jwt = parseCookies('auth').auth;
    const jwtDefault =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwicm9sZV9pZCI6MCwiZXhwIjoxNjQwNTIzODE1fQ.RTtmDJ2fXyxY4N9GXWJnH-beaFIuHsgUSF3hJHHRXqU';
    const user = jwt_decode(jwt || jwtDefault);

    const handleLogout = () => {
        destroyCookie(null, 'auth');
        Swal.fire({
            icon: 'success',
            title: 'Logout success!',
            text: '',
            confirmButtonColor: 'black',
        });
        Navigate('/');
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
                    fontWeight: '500',
                    fontSize: '14px',
                }}
            >
                <Container>
                    <Navbar.Brand
                        as={Link}
                        to="/"
                        style={{ marginRight: '7%' }}
                    >
                        <Brand />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link
                                as={Link}
                                to="/"
                                active={home}
                                style={{ marginRight: '10%' }}
                            >
                                HOME
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/complex"
                                active={complex}
                                style={{ marginRight: '10%' }}
                            >
                                COMPLEX
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/buildings"
                                active={building}
                                style={{ marginRight: '10%' }}
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
                                        style={{
                                            marginRight: '23px',
                                        }}
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
                                            style={{
                                                fontSize: '14px',
                                            }}
                                        >
                                            MY ACCOUNT
                                        </NavDropdown.Item>{' '}
                                        {user?.Role_ID === 1 ? (
                                            <>
                                                <NavDropdown.Item
                                                    as={Link}
                                                    to="/management/user"
                                                    style={{
                                                        fontSize:
                                                            '14px',
                                                    }}
                                                >
                                                    MANAGEMENT USER
                                                </NavDropdown.Item>
                                                <NavDropdown.Item
                                                    as={Link}
                                                    to="/management/building"
                                                    style={{
                                                        fontSize:
                                                            '14px',
                                                    }}
                                                >
                                                    MANAGEMENT
                                                    BUILDING
                                                </NavDropdown.Item>
                                                <NavDropdown.Item
                                                    as={Link}
                                                    to="/management/review"
                                                    style={{
                                                        fontSize:
                                                            '14px',
                                                    }}
                                                >
                                                    MANAGEMENT REVIEW
                                                </NavDropdown.Item>
                                                <NavDropdown.Item
                                                    as={Link}
                                                    to="/management/user/edit"
                                                    style={{
                                                        fontSize:
                                                            '14px',
                                                    }}
                                                >
                                                    CHANGE USER
                                                </NavDropdown.Item>
                                            </>
                                        ) : null}
                                        <NavDropdown.Item
                                            onClick={handleLogout}
                                            style={{
                                                fontSize: '14px',
                                            }}
                                        >
                                            LOGOUT
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            ) : (
                                <>
                                    <Nav.Link as={Link} to="/login">
                                        LOGIN/SIGNUP
                                    </Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}
