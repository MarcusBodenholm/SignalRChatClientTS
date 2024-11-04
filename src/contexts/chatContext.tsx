import { createContext, useState } from "react";
import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr/src";
import {ChatContextProviderProps, Message, Room, 
    PrivateMessageDetails, Member, ComplexObjectChatContext} from "../types/chatContextTypes"


export const ChatContext = createContext<ComplexObjectChatContext | null>(null);


export default function ChatContextProvider(props:ChatContextProviderProps){
    const [activeChat, setActiveChat] = useState<string>("Lobby");
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [chatMessages, setChatMessages] = useState<Message[]>([])
    const [chats, setChats] = useState<Room[]>([]);
    const [members, setMembers] = useState<Member[]>([]);
    const [dmOpen, setDmOpen] = useState<boolean>(false);
    const [dmDetails, setDmDetails] = useState<PrivateMessageDetails>({participant1: "", participant2: "", messages: [], id:""});

    const initializeConnection = () => {
        const token = sessionStorage.getItem('jwtToken')
        let url = "https://signalrchat-prog23.azurewebsites.net/chathub"
        if (window.location.href.includes("localhost")) {
            url = "https://localhost:7174/chathub"
        }

        const connection = new HubConnectionBuilder()
        .withUrl(url, {accessTokenFactory: () => token})
        .withAutomaticReconnect()
        .build();
        connection.start().then(() => {
            console.log("connected to the hub");
        }).catch((error) => console.error(error))
        setChatMessages([])
        connection.on('ReceiveGroupMessage',(message) => {
            setChatMessages(prev => [...prev, {username:message.username, message:message.message, timeStamp:message.timeStamp}])
        })
        connection.on('ReceiveError', (message) => {
            setChatMessages(prev => [...prev, {username:message.username, message:message.message, timeStamp:message.timeStamp}])
        })
        connection.on("ReceiveGroup", (room) => {
            setChats(prev => [...prev, room])

        })
        connection.on("GroupGone", (groupDeleted) => {
            setChats(prev => [...prev.filter(c => c.name !== groupDeleted)])
            setActiveChat(() => "Lobby");

        })
        connection.on("SwitchGroupInfo", (groupInfo) => {
            setMembers(groupInfo.groupUsers);
            setChatMessages(groupInfo.messages);
        })
        //Payload structure {messages: [{}], }
        connection.on("InitialPayload", (payload) => {
            setChats(payload.groups);
            setMembers(payload.groupUsers)
            setChatMessages(payload.messages)
        })
        connection.on("UpdateListOfUsers", (groupUsers) => {
            setMembers(groupUsers);
        })
        connection.on("OpenPrivateChat", (payload) => {
            setDmDetails(payload);
            setDmOpen(true);
        })
        connection.on("ReceivePrivateMessage", (message) => {
            setDmDetails((prev) => ({...prev, messages: [...prev.messages, message]}));

        })
        setConnection(connection);
        
    }
    return <ChatContext.Provider value={{activeChat, 
                        setActiveChat, connection, chatMessages, 
                        setChatMessages, chats, setChats, 
                        initializeConnection, 
                        members, setMembers, dmOpen, setDmOpen,
                        dmDetails, setDmDetails}}>
        {props.children}
    </ChatContext.Provider>

}