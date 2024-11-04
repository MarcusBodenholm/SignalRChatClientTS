import { ChatMessage, Message } from "./chatContextTypes";

declare type TextInputEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
declare type ChatroomButtonProps = {
    chatname:string;
    owner:string;
    user:string;
    connection:HubConnection | null;
}
declare type ChatMessageListProps = {
    chatMessages:ChatMessage[];
    cssClass:string;
}
declare type ChatMessageProps = {
    message:Message;
}

declare type Username = {
    error: boolean;
    errorText: string;
    username: string;
}
declare type Password = {
    error: boolean;
    errorText: string;
    password: string;
}

export {TextInputEvent, ChatroomButtonProps, ChatMessageListProps, ChatMessageProps, Username, Password}