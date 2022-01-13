import { Container, Row, Col } from 'react-bootstrap';
import NavBar from '../../components/navbar/NavBar';
import Footer from '../../components/footer/Footer';
import './Chat.css';
import { Link, useNavigate } from 'react-router-dom';
import { parseCookies } from 'nookies';
import jwt_decode from 'jwt-decode';
import Chat from './Chat';
import ChatAdmin from './ChatAdmin';
import NotFound from '../error/NotFound';

const Chats = () => {
    const Navigate = useNavigate();
    const auth = parseCookies('auth').auth;
    const jwtDefault =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwicm9sZV9pZCI6MCwiZXhwIjoxNjQwNTIzODE1fQ.RTtmDJ2fXyxY4N9GXWJnH-beaFIuHsgUSF3hJHHRXqU';
    const jwt = jwt_decode(auth || jwtDefault);
    const role_id = jwt.Role_ID;
    if (role_id === 0) {
        <NotFound />;
    }
    if (!role_id) {
        Navigate('/');
    }
    return (
        <>
            <NavBar chat={true} />
            <Container fluid className="conheader">
                <div className="textheader">
                    <h1 style={{ fontWeight: '700' }}>CHAT</h1>
                    <h3>
                        <Link className="spanhome" to="/">
                            <span>HOME</span>{' '}
                        </Link>
                        <span className="spancon"> / CHAT</span>
                    </h3>
                </div>
            </Container>
            <Container fluid className="container2">
                <Row className="justify-content-center">
                    <Col lg={2}></Col>
                    <Col lg={8}>
                        {role_id === 4 ? <Chat /> : <ChatAdmin />}
                    </Col>
                    <Col lg={2}> </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
};

export default Chats;
