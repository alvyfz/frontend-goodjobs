/* eslint-disable react-hooks/exhaustive-deps */
import { gql, useSubscription } from '@apollo/client';
// import { makeStyles } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';

const GetHistoryUniqueUser = gql`
    subscription MySubscription {
        chat(distinct_on: user_id) {
            created_at
            id
            message
            to
            updated_at
            user_name
            user_id
        }
    }
`;

const MessageList = (props) => {
    const { user, setUser } = props;
    const { data: dataUsers, loading } = useSubscription(
        GetHistoryUniqueUser,
    );
    useEffect(() => {
        if (dataUsers?.chat?.length > 0) {
            setUser(dataUsers?.chat[0]);
        }
    }, [dataUsers?.chat]);
    return (
        <>
            {loading ? (
                <div id="spinner" style={{ margin: 'auto' }}>
                    <Spinner animation="border" />
                </div>
            ) : (
                <>
                    {' '}
                    {dataUsers?.chat?.map((v) => (
                        <ListItem
                            key={v?.user_id}
                            onClick={() => {
                                setUser(v);
                            }}
                            style={{
                                backgroundColor: `${
                                    user?.user_id === v?.user_id
                                        ? '#333333'
                                        : 'transparent'
                                }`,

                                border: '3px solid #E5E5E5',
                                borderRadius: '15px',
                                margin: '4px',
                                padding: '0px 15px 0px 15px',
                            }}
                        >
                            <ListItemText
                                button
                                className="wrapListContact"
                                disableTypography
                                style={{
                                    color: `${
                                        user?.user_id === v?.user_id
                                            ? 'white'
                                            : 'black'
                                    }`,
                                }}
                                primary={v?.user_name}
                                secondary={
                                    <div
                                        style={{
                                            color: `${
                                                user?.user_id ===
                                                v?.user_id
                                                    ? 'white'
                                                    : 'black'
                                            }`,
                                            fontSize: '12px',
                                        }}
                                    >
                                        {v?.to === 'admin'
                                            ? `${v.message}`
                                            : `me: ${v.message}`}
                                    </div>
                                }
                            />
                        </ListItem>
                    ))}{' '}
                </>
            )}
        </>
    );
};

export default MessageList;
