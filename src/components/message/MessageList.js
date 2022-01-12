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
            user_name
            user_id
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
    const { setUserId, userId } = props;
    const { data: dataUsers, loading } = useSubscription(
        GetHistoryUniqueUser,
    );
    useEffect(() => {
        if (dataUsers?.chat?.length > 0) {
            setUserId(dataUsers?.chat[0]?.user_id);
        }
    }, [dataUsers?.chat]);

    return (
        <>
            {loading && (
                <div id="spinner">
                    <Spinner size="xs" animation="border" />
                </div>
            )}
            {dataUsers?.chat?.map((user) => (
                <ListItem
                    button
                    key={user?.user_id}
                    className={classes.root}
                    onClick={() => {
                        setUserId(user?.user_id);
                    }}
                    style={{
                        backgroundColor: `${
                            userId === user?.user_id
                                ? '#EFEFEF'
                                : 'transparent'
                        }`,
                        border: '2px solid #E5E5E5',
                        borderRadius: '15px',
                        margin: '5px',
                    }}
                >
                    <ListItemText primary={user?.user_name} />
                </ListItem>
            ))}
        </>
    );
};

export default MessageList;
