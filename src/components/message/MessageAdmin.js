import { gql, useSubscription } from '@apollo/client';
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
    let paramGetMessage = {
        user_id: user?.user_id,
    };

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
                <div id="spinner" style={{ marginTop: '255px' }}>
                    <Spinner size="xs" animation="border" />
                </div>
            ) : (
                <>
                    {dataMessage?.chat.map((m) => {
                        return (
                            <div key={m?.id}>
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
