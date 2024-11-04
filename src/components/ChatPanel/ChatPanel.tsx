/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Divider, Stack, TextField, Typography, useMediaQuery } from "@mui/material";
import "./ChatPanel.css";
import useChatContext from "../../contexts/useChatcontext";
import { useEffect, useState } from "react";
import ChatMessageList from "../ChatMessageList/ChatMessageList";
import GroupUsersPanel from "../GroupUsersPanel/GroupUsersPanel";
import { TextInputEvent } from "../../types/types";

const ChatPanel = () => {

    const {activeChat, connection, initializeConnection, chatMessages, setChatMessages} = useChatContext();
    const [message, setMessage] = useState<string>("");
    useEffect(():void => {
        initializeConnection();
    }, [])
    useEffect(():void => {
        const changeChatRoom = async() => {
            if (connection !== null && connection.state === "Connected") {
                setChatMessages([]);
                await connection.invoke('SwitchGroup', activeChat)
            }

        }
        changeChatRoom();
    }, [activeChat, connection])

    const handleMessageChange = (event:TextInputEvent) => {
        const messageValue = event.target.value;
        setMessage(messageValue);
    }
    const handleMessageSend = ():void => {
        try {
            const messageToSend = message.replace("script", "")
            connection.send("SendGroupMessage", messageToSend, activeChat);
            setMessage("");
        }
        catch(err) {
            console.error(err);
        }
    }
    const mobile = useMediaQuery("(max-width:900px)")

    return (
        <Stack className="chatpanelstack" sx={{display: "grid"}}>
            <Typography sx={{marginTop:"5px", marginBottom: "5px"}} variant="h3">{activeChat}</Typography>
            <Divider sx={{marginBottom:"5px"}}/>
            <ChatMessageList cssClass="chatview" chatMessages={chatMessages}/>
            <Divider sx={{marginBottom:"10px", marginTop:"0px"}}/>
            <Stack className="chatuserpanel" direction="row">

                <TextField sx={{width: "90%"}} id="chatmessagefield" label="What's on your mind?" value={message} onChange={(event) => handleMessageChange(event)}></TextField>
                <Button  disabled={message.length == 0} variant="contained"  onClick={() => handleMessageSend()}>Send</Button>
            </Stack>
            {mobile ? <></>
            
            : 
            <GroupUsersPanel/> }

            
        </Stack>
    )
}

export default ChatPanel;