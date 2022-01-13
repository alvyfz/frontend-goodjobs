import { Container, Row, Col } from 'react-bootstrap';
import './Chat.css';
import MessageInput from '../../components/message/MessageInput';
import Message from '../../components/message/Message';
import BrandChat from '../../components/brand/BrandChat';
import { MdVerifiedUser } from 'react-icons/md';
import LeftMenu from '../../components/menu/LeftMenu';

const Chat = () => {
    return (
        <>
            <Row className="justify-content-center">
                <Col lg={4}>
                    <LeftMenu />
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
                            <Message></Message>
                        </Row>
                        <Col>
                            <MessageInput></MessageInput>
                        </Col>
                    </Container>
                </Col>
            </Row>
        </>
    );
};

export default Chat;
