import { Container, Row, Col, Spinner } from "react-bootstrap";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";

import { Link } from "react-router-dom";
const Chat = () => {
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
                        <Row className="justify-content-center">
                            <Container >
                                List Room Chat
                            </Container>
                        </Row>
                    </Col>
                    <Col lg={6}>
                        <Row className="justify-content-center">
                            <Container  >
                                Chat Content
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