import { Container, Row, Col, Spinner } from "react-bootstrap";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import "./Chat.css";
import { Link } from "react-router-dom";
import { parseCookies } from "nookies";
import jwt_decode from "jwt-decode";
import MessageInput from "../../components/message/MessageInput";
import Message from "./Message";

const Chat = () => {
    const auth = parseCookies("auth").auth;
    const jwtDefault =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwicm9sZV9pZCI6MCwiZXhwIjoxNjQwNTIzODE1fQ.RTtmDJ2fXyxY4N9GXWJnH-beaFIuHsgUSF3hJHHRXqU";
    const jwt = jwt_decode(auth || jwtDefault);
    const role_id = jwt.Role_ID;
    console.log(jwt.Name)
    return(
        <>
            <NavBar chat={true} />
            <Container fluid className="container2">
                <div className="title2">
                    <h2>CHAT</h2>
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
                            <Container>
                                <div >
                                    List Room Chat
                                </div>
                            </Container>
                        </Row>
                    </Col>
                    <Col lg={6}>
                        <Row>
                            <Container>
                                Chat Content
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