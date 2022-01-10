import { useParams } from "react-router";
import { Spinner } from "react-bootstrap";
import { gql, useSubscription } from "@apollo/client";
import MessageBubble from "./MessageBubble";
import { parseCookies } from "nookies";
import jwt_decode from "jwt-decode";

const getMessage = gql`
    subscription MySubscription($user_id: Int!) {
        chat(where: {user_id: {_eq: $user_id}}) {
        created_at
        id
        message
        to
        updated_at
        user_id
        user_name
        }
    }
    `;

    const Message = () => {
        const auth = parseCookies("auth").auth;
        const jwtDefault =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwicm9sZV9pZCI6MCwiZXhwIjoxNjQwNTIzODE1fQ.RTtmDJ2fXyxY4N9GXWJnH-beaFIuHsgUSF3hJHHRXqU";
        const jwt = jwt_decode(auth || jwtDefault);
        const role_id = jwt.Role_ID;
        const user_id = jwt.ID;
        const user_name = jwt.Name;
        let paramGetMessage = {
            "user_id": user_id
        };
        if (jwt.ID === 0 ){
                    window.location.reload();

        }
        const { data: dataMessage, loading } = useSubscription(getMessage, {
            variables: paramGetMessage,
        });

        
        
        setTimeout(() => {
            const scroll = document.getElementById("chat-content").parentElement;
            if (scroll) {
            scroll.scrollTop = scroll.scrollHeight;
            }
        }, 200);

        return (
            <div id ="chat-content"  >
                {loading ? <div id="spinner">
                    <Spinner size="xs" animation="border" />
                </div> : <>
                            {dataMessage?.chat.map((m) => {
                                return (
                                <div >
                                    <MessageBubble
                                    key={m.id}
                                    message={m}
                                    isMe={m.to === "admin"}
                                    dataMessage={dataMessage}
                                    ></MessageBubble>
                                </div>
                                );
                        })}
                </> } 
            </div>
        );
};
export default Message;