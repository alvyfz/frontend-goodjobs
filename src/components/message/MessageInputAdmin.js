// import './Message.css';
// import { gql, useMutation } from '@apollo/client';
// import { TextField } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
// import jwt_decode from 'jwt-decode';
// import { parseCookies } from 'nookies';
// import { useState } from 'react';
// import { Button, Col, Row } from 'react-bootstrap';
// import { TextareaAutosize } from '@material-ui/core';

// const InsertMessage = gql`
//     mutation MyMutation(
//         $message: String!
//         $to: String!
//         $user_id: Int!
//         $user_name: String!
//     ) {
//         insert_chat_one(
//             object: {
//                 message: $message
//                 to: $to
//                 user_id: $user_id
//                 user_name: $user_name
//             }
//         ) {
//             id
//         }
//     }
// `;
// const useStyles = makeStyles(() => ({
//     messageForm: {
//         overflow: 'hidden',
//         margin: '20px',
//         padding: '0',
//     },
// }));

const MessageInputAdmin = () => {
    // const auth = parseCookies('auth').auth;
    // const jwtDefault =
    //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwicm9sZV9pZCI6MCwiZXhwIjoxNjQwNTIzODE1fQ.RTtmDJ2fXyxY4N9GXWJnH-beaFIuHsgUSF3hJHHRXqU';
    // const jwt = jwt_decode(auth || jwtDefault);
    // const user_id = jwt.ID;
    // const user_name = jwt.Name;
    // const classes = useStyles();
    // const [message, setMessage] = useState('');
    // let paramInsertMessage = {};
    // paramInsertMessage = {
    //     user_id: user_id,
    //     user_name: user_name,
    //     // to          : user,
    //     message: message,
    // };
    // const [insertM] = useMutation(InsertMessage, {
    //     variables: paramInsertMessage,
    // });
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     insertM();
    //     setMessage('');
    // };
    // const onChange = (e) => {
    //     setMessage(e.target.value);
    // };
    // return (
    //     <div>
    //         <form
    //             className={classes.messageForm}
    //             noValidate
    //             autoComplete="off"
    //             onSubmit={handleSubmit}
    //         ></form>
    //     </div>
    // );
};
export default MessageInputAdmin;
