import { Container, Row, Col } from 'react-bootstrap';
import './Chat.css';
import MessageInputAdmin from '../../components/message/MessageInputAdmin';
import MessageList from '../../components/message/MessageList';
import { useState } from 'react';
import MessageAdmin from '../../components/message/MessageAdmin';

const ChatAdmin = () => {
    const [user, setUser] = useState(null);

    return (
        <>
            <Row className="justify-content-center">
                <Col lg={4}>
                    <Row>
                        <Container
                            className="con-fitur "
                            style={{
                                padding: ' 20px 20px 0px 20px',
                                height: '624px',
                            }}
                        >
                            <div className="contactlist">
                                Contact List
                            </div>
                            <hr className="hrChat" />

                            <Row className="row-fitur listrowacc containerScroll conRowCont">
                                <MessageList
                                    setUser={setUser}
                                    user={user}
                                />
                            </Row>
                        </Container>
                    </Row>
                </Col>
                <Col lg={6}>
                    <Container className="con-fitur ">
                        <Row className="brandChat heighRowChat">
                            <Col>
                                <div className="user-name-chat">
                                    {user?.user_name}
                                </div>
                            </Col>
                            <div className="brandChat"></div>
                            <hr className="hrChat" />
                        </Row>

                        <Row className="row-fitur containerScroll">
                            <MessageAdmin user={user} />
                        </Row>
                        <Col>
                            <MessageInputAdmin user={user} />
                        </Col>
                    </Container>
                </Col>
            </Row>
        </>
    );
};

export default ChatAdmin;
