import { gql, useSubscription } from '@apollo/client';
import jwt_decode from 'jwt-decode';
import { parseCookies } from 'nookies';
import { Spinner } from 'react-bootstrap';

import MessageBubble from './MessageBubble';

const getMessage = gql`
    subscription MySubscription($user_id: Int!) {
        chat(where: { user_id: { _eq: $user_id } }) {
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

const MessageAdmin = ({ user }) => {
    const auth = parseCookies('auth').auth;
    const jwtDefault =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwicm9sZV9pZCI6MCwiZXhwIjoxNjQwNTIzODE1fQ.RTtmDJ2fXyxY4N9GXWJnH-beaFIuHsgUSF3hJHHRXqU';
    const jwt = jwt_decode(auth || jwtDefault);

    let paramGetMessage = {
        user_id: user?.user_id,
    };
    if (jwt.ID === 0) {
        window.location.reload();
    }
    const { data: dataMessage, loading } = useSubscription(
        getMessage,
        {
            variables: paramGetMessage,
        },
    );

    setTimeout(() => {
        const scroll =
            document.getElementById('chat-content').parentElement;
        if (scroll) {
            scroll.scrollTop = scroll.scrollHeight;
        }
    }, 200);
    return (
        <div id="chat-content">
            {loading ? (
                <div id="spinner">
                    <Spinner size="xs" animation="border" />
                </div>
            ) : (
                <>
                    {dataMessage?.chat.map((m) => {
                        return (
                            <div key={m?.id}>
                                {/* {m.to === 'admin' ? (
                                    <p>Admin : {m.Message}</p>
                                ) : (
                                    <p>
                                        {m?.user_name} : {m.Message}
                                    </p>
                                )} */}
                                <MessageBubble
                                    message={m}
                                    isMe={
                                        m?.to ===
                                        user?.user_id.toString()
                                    }
                                    dataMessage={dataMessage}
                                />
                            </div>
                        );
                    })}
                </>
            )}
        </div>
    );
};
export default MessageAdmin;
