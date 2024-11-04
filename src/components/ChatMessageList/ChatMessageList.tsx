import { Stack } from "@mui/material";
import "./ChatMessageList.css";
import { useEffect, useRef } from "react";
import ChatMessage from "../ChatMessage/ChatMessage";
import { ChatMessageListProps } from "../../types/types";
import { Message } from "../../types/chatContextTypes";


const ChatMessageList = ({chatMessages, cssClass}:ChatMessageListProps) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const messagesEndRef = useRef<any>(null);
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
        
    })
    return (
        <Stack className={cssClass} direction="column" ref={messagesEndRef}>
            {chatMessages.map((message:Message, idx:number) => {
                return <ChatMessage key={idx + message.username} message={message}/>
            })}
            <div ref={messagesEndRef}></div>
        </Stack>

    )
}

export default ChatMessageList