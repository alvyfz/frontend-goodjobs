import { Container, Row, Col } from 'react-bootstrap';
import NavBar from '../../components/navbar/NavBar';
import Footer from '../../components/footer/Footer';
import './Chat.css';
import { Link, useNavigate } from 'react-router-dom';
import { parseCookies, destroyCookie } from 'nookies';
import jwt_decode from 'jwt-decode';
import Message from '../../components/message/Message';
import MessageInput from '../../components/message/MessageInput';
import Swal from 'sweetalert2';
import BrandChat from '../../components/brand/BrandChat';
import { MdVerifiedUser } from 'react-icons/md';
import LeftMenu from '../../components/menu/LeftMenu';
import MessageList from '../../components/message/MessageList';
import { useState } from 'react';

const ChatAdmin = () => {
    const Navigate = useNavigate();
    const auth = parseCookies('auth').auth;
    const jwtDefault =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwicm9sZV9pZCI6MCwiZXhwIjoxNjQwNTIzODE1fQ.RTtmDJ2fXyxY4N9GXWJnH-beaFIuHsgUSF3hJHHRXqU';
    const jwt = jwt_decode(auth || jwtDefault);
    const role_id = jwt.Role_ID;
    // useEffect(() => {
    //    if(!parseCookies("auth").auth){
    //        Navigate("/")
    //    } else if (!)
    //     }
    // }, [])

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
    // if (role_id === 0){
    //     window.location.reload();
    // }
    if (!parseCookies('auth').auth) {
        window.location.reload();
        Navigate('/');
    }

    const [userId, setUserId] = useState(null);

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
                        <Row className="justify-content-center">
                            <Col lg={4}>
                                <Row>
                                    <Container className="con-fitur ">
                                        <Row className="row-fitur listrowacc">
                                            <div>Contact List</div>
                                            <MessageList
                                                setUserId={setUserId}
                                                userId={userId}
                                            />
                                        </Row>
                                    </Container>
                                </Row>
                            </Col>
                            <Col lg={6}>
                                <Container className="con-fitur ">
                                    <Row className="brandChat">
                                        <Col>
                                            <BrandChat />
                                            <MdVerifiedUser color="#29D445" />
                                        </Col>
                                        <div className="brandChat"></div>
                                        <hr className="hrChat" />
                                    </Row>

                                    <Row className="row-fitur containerScroll">
                                        <Message
                                            userId={userId}
                                            isAdmin
                                        ></Message>
                                    </Row>
                                    <Col>
                                        <MessageInput
                                            isAdmin
                                            userId={userId}
                                        ></MessageInput>
                                    </Col>
                                </Container>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={2}> </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
};

export default ChatAdmin;
