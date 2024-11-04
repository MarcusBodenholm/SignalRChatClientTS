import { Stack, Typography, useMediaQuery } from "@mui/material";
import "./ChatMessage.jsx"
import DateFormatter from "../../helpers/dateformatter";
import useUserContext from "../../contexts/useUserContext";
import { ChatMessageProps } from "../../types/types.js";



const ChatMessage = ({message}:ChatMessageProps) => {
    const formatTimeStamp = (time:Date) => {
        const timestamp = new Date(time);
        const dateFormatter = new DateFormatter();
        return dateFormatter.FullDate(timestamp);
    }
    const {user} = useUserContext();
    const color = user === message.username ? "black" : "red";
    const mobile = useMediaQuery("(max-width:900px)")

    return (
        <Stack direction="row">
            {mobile ? <></> : <Typography textAlign="start" sx={{marginRight: "10px", fontStyle:"italic"}}>{formatTimeStamp(message.timeStamp)}</Typography>}
            
            <Typography textAlign="start" sx={{marginRight: "5px", fontWeight:"bold", color: color}}>{message.username}:</Typography>
            <Typography textAlign="start">{message.message}</Typography>
        </Stack>
    )
}


export default ChatMessage;