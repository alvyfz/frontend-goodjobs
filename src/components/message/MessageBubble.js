import { makeStyles } from "@material-ui/core";
import moment from "moment";
import React from "react";

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    padding: "0 16px 0px",
    paddingLeft: (props) => (props.isMe ? "40px" : "16px"),
    marginTop: "40px",
  },

  bubble: {
    position: "relative",
    fontSize: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "7px",
    maxWidth: "90%",
    minWidth: "10%",
    borderRadius: "18px",
    wordBreak: "break-word",
    border: "1px solid #333333",
    backgroundColor: (props) => (props.isMe ? "#333333" : "white"),
    color: (props) => (props.isMe ? "white" : "black"),
    marginLeft: (props) => (props.isMe ? "auto" : "initial"),
  },

  timestamp: {
    position: "absolute",
    width: "100%",
    fontSize: "8px",
    marginTop: "2px",
    top: "100%",
    left: "0",
    whiteSpace: "nowrap",
    color: "#999",
    textAlign: (props) => (props.isMe ? "right" : "left"),
  },
}));

const MessageBubble = (props) => {
  const classes = useStyles(props);
  const { message } = props;
  return (
    <div className={classes.root}>
      <div className={classes.bubble}>
        <div>{message.message}</div>
        <div className={classes.timestamp}>
          {moment(message.created_at).calendar()}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
