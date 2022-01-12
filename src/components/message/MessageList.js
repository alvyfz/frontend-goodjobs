import { gql, useSubscription } from '@apollo/client';
import { makeStyles } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';

const GetHistoryUniqueUser = gql`
    subscription MySubscription {
        chat(distinct_on: user_id, where: { to: { _eq: "admin" } }) {
            id
            message
            user_name
            user_id
            created_at
        }
    }
`;

const useStyles = makeStyles((theme) => ({
    root: {
        color: 'black',
    },
    img: {
        height: '40px',
        marginRight: theme.spacing(2),
    },
}));

const MessageList = (props) => {
    const classes = useStyles(props);
    const { setUser, user } = props;
    const { data: dataUsers, loading } = useSubscription(
        GetHistoryUniqueUser,
    );
    useEffect(() => {
        if (dataUsers?.chat?.length > 0) {
            setUser(dataUsers?.chat[0]);
        }
    }, [dataUsers?.chat]);
    console.log('dari list', user);
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
                        <div
                            key={v?.user_id}
                            className={classes.root}
                            onClick={() => {
                                setUser(v);
                            }}
                            style={{
                                backgroundColor: `${
                                    user.user_id === v?.user_id
                                        ? '#333333'
                                        : 'transparent'
                                }`,
                                color: `${
                                    user.user_id === v?.user_id
                                        ? 'white'
                                        : 'black'
                                }`,

                                border: '3px solid #E5E5E5',
                                borderRadius: '20px',
                                margin: '5px',
                            }}
                        >
                            <div> {v?.user_name}</div>
                            <div>{v?.message}</div>
                        </div>
                    ))}{' '}
                </>
            )}
        </>
    );
};

export default MessageList;
