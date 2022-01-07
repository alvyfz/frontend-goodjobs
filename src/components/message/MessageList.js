import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        color: "#FFF"
    },
    img: {
        height: "40px",
        marginRight: theme.spacing(2),
    },
    }));

    const MessageList = (props) => {
    const classes = useStyles(props);
    const { user } = props;

    return (
        <ListItem button key={user.id} className={classes.root}>
        <ListItemText primary={user.name} />
        </ListItem>
    );
};

export default MessageList;