import { Container, Row, Col, Spinner } from "react-bootstrap";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import "./Chat.css";
import { Link, useNavigate } from "react-router-dom";
import { parseCookies, destroyCookie } from "nookies";
import jwt_decode from "jwt-decode";
import MessageInput from "../../components/message/MessageInput";
import Message from "./Message";
import Swal from "sweetalert2";

const Chat = () => {
    const Navigate = useNavigate();
    const auth = parseCookies("auth").auth;
    const jwtDefault =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwicm9sZV9pZCI6MCwiZXhwIjoxNjQwNTIzODE1fQ.RTtmDJ2fXyxY4N9GXWJnH-beaFIuHsgUSF3hJHHRXqU";
    const jwt = jwt_decode(auth || jwtDefault);
    const role_id = jwt.Role_ID;
    const handleLogout = () => {
    destroyCookie(null, "auth");
    Swal.fire({
        icon: "success",
        title: "Logout success!",
        text: "",
        confirmButtonColor: "black",
    });
    Navigate("/");
    window.location.reload();
    };
    return(
        <>
            <NavBar chat={true} />
            <Container fluid className="conheaderchat">
                <div className="titlechat">
                    <h2  >CHAT</h2>
                    {/* <h4>Office Space</h4> */}
                    <h3>
                        <Link className="spanhome" to="/">
                            <span>HOME</span>{" "}
                        </Link>
                        <span className="spancon"> / CHAT</span>
                    </h3>
                </div>
                <Row className="justify-content-center">
                    <Col lg={2}></Col>
                    <Col lg={8}>
                        
                    </Col>
                    <Col lg={2}> </Col>
                </Row>
            </Container>
            <Container fluid className="container2">
                <Row className="justify-content-center">
                    <Col lg={4}>
                        <Row>
                        <Container className="con-fitur">
                            <Row className="row-fitur listrowacc">
                                <p className="nameLeft">{jwt.Name}</p>
                                <Row className="barLeft" as={Link} to="/chat">
                                    <p>Chat</p>
                                    </Row>
                                    <Row
                                    className="barLeftLog"
                                    as="button"
                                    onClick={handleLogout}
                                    >
                                        <p>Log out</p>
                                    </Row>
                                </Row>
                        </Container>
                        </Row>
                    </Col>
                    <Col lg={6}>
                        <Row>
                            <Container>
                                
                                <Message></Message>
                                <MessageInput></MessageInput>
                            </Container>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
};

export default Chat