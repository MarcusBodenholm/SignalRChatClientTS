declare type ChatContextProviderProps = {
    children: ReactElement;
}

declare type Message = {
    username:string;
    message:string;
    timeStamp:Date
}
declare type Room = {
    name:string;
    owner:string;
}
declare type PrivateMessageDetails = {
    messages:PrivateMessage[];
    id:string;
    participant1:string;
    participant2:string;
}
declare type PrivateMessage = {
    username:string;
    message:string;
    timeStamp:Date
}
declare type Member = {
    name:string;
    online:boolean;
    present:boolean;
}


declare type ComplexObjectChatContext = {
    activeChat:string;
    setActiveChat: React.Dispatch<React.SetStateAction<string>>;
    connection: HubConnection | null;
    chatMessages: Message[];
    setChatMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    chats: Room[];
    setChats: React.Dispatch<React.SetStateAction<Room[]>>;
    initializeConnection: () => void;
    members:Member[];
    setMembers:React.Dispatch<React.SetStateAction<Member[]>>;
    dmOpen:boolean;
    setDmOpen:React.Dispatch<React.SetStateAction<boolean>>;
    dmDetails:PrivateMessageDetails;
    setDmDetails:React.Dispatch<React.SetStateAction<PrivateMessageDetails>>;
}

export {ChatContextProviderProps, ChatMessage, Room, 
    PrivateMessageDetails, PrivateMessage, Member, ComplexObjectChatContext, Message}
