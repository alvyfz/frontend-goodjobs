import "./Message.css";

import { gql, useMutation } from "@apollo/client";
import { TextareaAutosize } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import jwt_decode from "jwt-decode";
import { parseCookies } from "nookies";
import { useState, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { BiSend } from "react-icons/bi";
import base64 from "base-64";
import { useLocation } from "react-router-dom";

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
    "&.MuiInputBase-input": { height: "1px" },
  },
  messageForm: {
    overflow: "hidden",
    margin: "5px",
    paddingTop: "5px",
  },
}));

const MessageInput = ({ isAdmin, userId }) => {
  const auth = parseCookies("auth").auth;
  const jwtDefault =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwicm9sZV9pZCI6MCwiZXhwIjoxNjQwNTIzODE1fQ.RTtmDJ2fXyxY4N9GXWJnH-beaFIuHsgUSF3hJHHRXqU";
  const jwt = jwt_decode(
    auth ? base64.decode(auth) : null || jwtDefault,
  );
  const user_id = jwt.ID;
  const user_name = jwt.Name;
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const idUnit = parseInt(query.get("key"));
  const name = query.get("n");
  const buildingName = query.get("b");
  const classes = useStyles();
  const [message, setMessage] = useState("");
  let paramInsertMessage = {};
  useEffect(() => {
    if (idUnit) {
      setMessage(
        `#${idUnit} - Hello can i find out more about the unit #${name}(${buildingName}). `,
      );
    }
  }, [idUnit, buildingName, name]);

  paramInsertMessage = {
    user_id: user_id,
    user_name: user_name,
    to: "admin",
    message: message,
  };

  const [insertM, { loading }] = useMutation(InsertMessage, {
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
                background: "#fff",
                padding: "4px 0  0 5px",
                width: "100%",
                height: "28px",
                fontSize: "12px",
                borderRadius: "5px",
              }}
            />
          </Col>
          <Col lg={1} xs={1} style={{ padding: "0px" }}>
            <Button
              size="sm"
              variant="awdasd"
              style={{ padding: "0px", margin: 0 }}
            >
              {loading ? (
                <div className="loading-custom"></div>
              ) : (
                <BiSend onClick={handleSubmit} size={27} />
              )}
            </Button>
          </Col>
        </Row>
      </form>
    </div>
  );
};
export default MessageInput;
