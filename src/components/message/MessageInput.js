import { TextareaAutosize } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react"; 
import { parseCookies } from "nookies";
import jwt_decode from "jwt-decode";
import "./Message.css"
import { RiLoader4Line } from "react-icons/ri"
import { BiSend, BiLoaderCircle } from "react-icons/bi";
import { Button,Spinner, Row, Col } from "react-bootstrap";

const InsertMessage = gql`
    mutation MyMutation($message: String!, $to: String!, $user_id: Int!, $user_name: String!) {
        insert_chat_one(object: {message: $message, to: $to, user_id: $user_id, user_name: $user_name}) {
        id
        }
    }
    `;
    const useStyles = makeStyles((theme) => ({
        inputChat: {
            "&.MuiInputBase-input":{ height:"1px" }
        },
    messageForm: {
        overflow: "hidden",
        margin: "5px",
        paddingTop: "5px",
    },
    }));

    const MessageInput = () => {
        const auth = parseCookies("auth").auth;
        const jwtDefault =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwicm9sZV9pZCI6MCwiZXhwIjoxNjQwNTIzODE1fQ.RTtmDJ2fXyxY4N9GXWJnH-beaFIuHsgUSF3hJHHRXqU";
        const jwt = jwt_decode(auth || jwtDefault);
        const role_id = jwt.Role_ID;
        const user_id = jwt.ID;
        const user_name = jwt.Name;
        const classes = useStyles();
        const [message, setMessage] = useState("");
        let paramInsertMessage = {};
            paramInsertMessage = {
            user_id     : user_id,
            user_name   : user_name,
            to          : "admin",
            message     : message,
            };
        
        const [insertM, {loading}] = useMutation(InsertMessage, {
            variables: paramInsertMessage,
        });
        const handleSubmit = (e) => {
            e.preventDefault();
            insertM();
            setMessage("");
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
                            inputProps={{className:classes.inputChat}}
                            id="input-message"
                            size="sm"
                            placeholder="  Write a message..."
                            minRows={1}
                            required
                            value={message}
                            onChange={onChange}
                            style={{ background: "#fff", padding: "4px 0  0 5px" , width: "100%", height:"28px" , fontSize:"12px", borderRadius:"5px"}}
                        />
                    </Col>
                    <Col  lg={1} xs={2} style={{padding: "0px"}}>
                        <Button size="sm" variant="awdasd" style={{padding:"0px", margin: 0}}>
                            {loading?  <div className="loading-custom"></div> : <BiSend onClick={handleSubmit} size={27}/>}
                        </Button>
                    </Col>
                    
                </Row>
            </form>
            </div>
        );
        };
export default MessageInput;
