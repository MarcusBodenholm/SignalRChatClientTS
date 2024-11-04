import { Box, Stack, TextField, Typography, Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import useUserContext from "../../contexts/useUserContext";
import { TextInputEvent } from "../../types/types";


const Login = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string>("");
    const {setUser} = useUserContext();
    const navigate = useNavigate();

    const handleUsernameChange = (event:TextInputEvent) => {
        const usernameValue = event.target.value;
        setUsername(usernameValue);
    }
    const handlePasswordChange = (event:TextInputEvent) => {
        const passwordValue = event.target.value;
        setPassword(passwordValue)
    }
    const handleLoginClick = async():Promise<void> => {
        if (username.length === 0 || password.length === 0) return;
        try {
            //https://signalrchat-prog23.azurewebsites.net/login
            let url = "https://signalrchat-prog23.azurewebsites.net/login"
            if (window.location.href.includes("localhost")) {
                url = "https://localhost:7174/login"
            }

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                })
            })
            if (response.ok) {
                const data = await response.json();
                sessionStorage.setItem('jwtToken', data.token);
                setUser(username);
                navigate('/chat')

            }
            else {
                setError("Error: " + "The username or password was incorrect.")
            }
        }
        catch (error) {
            console.log(error)

        }

    }


    return (
        <>
        <Box sx={{height: "90vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Stack direction="column" spacing={2} sx={{ minWidth: "400px", padding: "2rem", backgroundColor: "white", borderRadius: "5px", textAlign: "left"}}>
                <Typography variant="h2">Login</Typography>
                <Typography>To use the SignalRChat you need to log in.</Typography>
                <TextField value={username} id="register-username" label="Username" variant="standard" onChange={(event) => handleUsernameChange(event)}/>
                <TextField value={password} id="register-password" label="Password" variant="standard" onChange={(event) => handlePasswordChange(event)}/>
                <Button variant="outlined" onClick={() => handleLoginClick()}>Login</Button>
                {error.length === 0 ? <></> : <Typography sx={{color: "red", fontStyle: "italic"}}>{error}</Typography>}
                <NavLink to="/register">Not registered? Register here!</NavLink>
            </Stack>
        </Box>

        </>
    )
}


export default Login;