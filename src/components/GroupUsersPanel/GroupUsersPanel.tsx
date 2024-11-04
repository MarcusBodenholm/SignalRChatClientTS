import { Button, Divider, Stack, TextField, Typography } from "@mui/material";
import useChatContext from "../../contexts/useChatcontext";
import "./GroupUsersPanel.css";
import { useState } from "react";
import { faRocketchat } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useUserContext from "../../contexts/useUserContext";


const GroupUsersPanel = () => {
    
    const {members, activeChat, connection} = useChatContext();
    const [toggleAddUser, setToggleAddUser] = useState<boolean>(false);
    const [addUser, setAddUser] = useState<string>("");
    const {user} = useUserContext();
    const handleAddUser = async() => {
        const userToAdd = addUser;
        setAddUser("");
        setToggleAddUser(!toggleAddUser)
        connection.invoke("AddUserToGroup", activeChat, userToAdd)
            .then(() => {
                console.log("user added")
            })
            .catch((err:Error) => console.error(err.toString()))
    }
    const handleOpenDmClick = (username:string) => {
        connection.invoke("StartPrivateChat", username )
    }
    return (
        <Stack className="groupuserpanelcontainer">
            <Stack direction="row" sx={{height: "100%", width:"100%"}}>
                <Divider orientation="vertical" flexItem></Divider>
                <Stack direction="column" sx={{height: "100%", width:"100%", justifyContent:"space-between"}}>
                    <Stack direction="column" sx={{height: "100%", width:"100%", paddingLeft:"10px"}} spacing={1}>
                        <Typography variant="h5" fontWeight="bold">Users</Typography>
                        {/* <Typography textAlign="left">Online {onlineUsers.length}</Typography> */}
                        {members.map((item, idx) => {
                            const isPresent = item.present
                            const notPresent = item.present === false && item.online
                            let typography
                            if (isPresent) {
                                typography = <Typography sx={{color: "green"}} textAlign="left" key={idx}>{item.name} (online)</Typography>
                            } else if (notPresent) {
                                typography = <Typography sx={{color: "orange"}} textAlign="left" fontStyle="italic" key={idx}>{item.name} (elsewhere)</Typography>
                            } else {
                                typography = <Typography textAlign="left" key={idx}>{item.name}</Typography>
                            }  
                            return (
                                <Stack key={idx} direction="row" sx={{justifyContent: "space-between", paddingRight: "5px", alignItems: "center"}}>
                                    {typography}
                                    {item.name !== user ? <FontAwesomeIcon data-username={item.name} onClick={() => handleOpenDmClick(item.name)} className="opendmbutton" icon={faRocketchat}/> : <></>}
                                </Stack>
                            )
                        })}
                    </Stack>
                    {activeChat !== "Lobby" ? <Button variant="outlined" onClick={() => setToggleAddUser(!toggleAddUser)}>Add user</Button> : <></>}
                    {toggleAddUser ? 
                        <Stack direction="row">
                            <TextField id="adduserfield" label="Username to add" value={addUser} onChange={(event) => setAddUser(event.target.value)}></TextField>
                            <Button disabled={addUser.length === 0} variant="outlined" onClick={() => handleAddUser()}>Add</Button>
                        </Stack> 
                    
                    : <></>}

                </Stack>
            </Stack>
        </Stack>
    )
}

export default GroupUsersPanel