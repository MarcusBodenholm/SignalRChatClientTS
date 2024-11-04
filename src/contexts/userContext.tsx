import { createContext, useState, ReactElement } from "react";
type ComplexObjectUserContext = {
    user:string;
    setUser: React.Dispatch<React.SetStateAction<string>>

}
type UserContextProviderProps = {
    children: ReactElement;
}
export const UserContext = createContext<ComplexObjectUserContext | null>(null);

export default function UserContextProvider(props:UserContextProviderProps) {
    const [user, setUser] = useState("");


    return <UserContext.Provider value={{user, setUser}}>
        {props.children}
    </UserContext.Provider>
}



