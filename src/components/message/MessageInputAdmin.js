import './Message.css';

import { gql, useMutation } from '@apollo/client';
import { TextareaAutosize } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { BiSend } from 'react-icons/bi';

const InsertMessage = gql`
    mutation MyMutation(
        $message: String!
        $to: String!
        $user_id: Int!
        $user_name: String!
    ) {
        insert_chat_one(
            object: {
                message: $message
                to: $to
                user_id: $user_id
                user_name: $user_name
            }
        ) {
            id
        }
    }
`;
const useStyles = makeStyles(() => ({
    inputChat: {
        '&.MuiInputBase-input': { height: '1px' },
    },
    messageForm: {
        overflow: 'hidden',
        margin: '5px',
        paddingTop: '5px',
    },
}));

const MessageInputAdmin = ({ user }) => {
    const classes = useStyles();
    const [message, setMessage] = useState('');
    let paramInsertMessage = {};
    paramInsertMessage = {
        user_id: parseInt(user?.user_id),
        user_name: user?.user_name.toString(),
        to: user?.user_id.toString(),
        message: message,
    };
    const [insertM, { loading }] = useMutation(InsertMessage, {
        variables: paramInsertMessage,
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        insertM();
        setMessage('');
    };
    const onChange = (e) => {
        setMessage(e.target.value);
    };
    return (
        <div>
            <form
                className={classes.messageForm}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <Row>
                    <Col lg={11} xs={10}>
                        <TextareaAutosize
                            inputProps={{
                                className: classes.inputChat,
                            }}
                            id="input-message"
                            size="sm"
                            placeholder="  Write a message..."
                            minRows={1}
                            required
                            value={message}
                            onChange={onChange}
                            style={{
                                background: '#fff',
                                padding: '4px 0  0 5px',
                                width: '100%',
                                height: '28px',
                                fontSize: '12px',
                                borderRadius: '5px',
                            }}
                        />
                    </Col>
                    <Col lg={1} xs={2} style={{ padding: '0px' }}>
                        <Button
                            size="sm"
                            variant="awdasd"
                            style={{ padding: '0px', margin: 0 }}
                        >
                            {loading ? (
                                <div className="loading-custom"></div>
                            ) : (
                                <BiSend
                                    onClick={handleSubmit}
                                    size={27}
                                />
                            )}
                        </Button>
                    </Col>
                </Row>
            </form>
        </div>
    );
};
export default MessageInputAdmin;
