import Chat from "./Chat/Chat.tsx";
import Login from "./Login/Login.tsx"
import Register from "./Register/Register.tsx";


const pagesData = [
    {
        path: "login",
        element: <Login/>,
        title: "Login"
    },
    {
        path: "register",
        element: <Register/>,
        title: "Register"
    },
    {
        path: "chat",
        element: <Chat/>,
        title: "Chat"
    }
]

export default pagesData;