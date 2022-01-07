import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { gql, useMutation } from '@apollo/client';
import {MdMoreVert} from 'react-icons/md'
// import Swal from 'sweetalert2'

const deleteMessage = gql`
mutation MyMutation($id: uuid!) {
        delete_messages_by_pk(id: $id) {
        id
        }
    }  
    `;
    const updateMessage = gql`mutation MyMutation($id: uuid!, $message: String!) {
    update_messages_by_pk(pk_columns: {id: $id}, _set: {message: $message}) {
        id
        message
    }
    }
    `;
    const DropDown = (props) => {
    const { id, dataMessage } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [delM] = useMutation(deleteMessage,{variables: {id}} );
    const [upM] = useMutation(updateMessage,)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const deleteM = (id) =>{
        delM()
    }
    const updateM = (id) =>{
        const item = dataMessage.messages.find((item)=> item.id === id)
        const MessageChange = prompt("Change ur message for sure", item.message)
        if(MessageChange){
            upM({ variables:{
                id,
                message : MessageChange}
            })
        }
    } 
    return (
        <div>
        <MdMoreVert
            id="basic-button"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
        />
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            "aria-labelledby": "basic-button",
            }}
        >
            <MenuItem onClick={() => deleteM(id)}>Delete</MenuItem>
            <MenuItem onClick={() => updateM(id)}>Edit</MenuItem>
            <MenuItem onClick={handleClose}>Close</MenuItem>
        </Menu>
        </div>
    );
}
export default DropDown;