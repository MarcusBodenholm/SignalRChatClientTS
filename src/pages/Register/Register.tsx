import { Box, Stack, TextField, Typography, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { TextInputEvent, Username, Password } from "../../types/types";



const Register = () => {
    const [username, setUsername] = useState<Username>({error: false, errorText: "", username: ""});
    const [password, setPassword] = useState<Password>({error: false, errorText: "", password: ""});
    const [confirmPassword, setConfirmPassword] = useState<Password>({error: false, errorText: "", password: ""})
    const [error, setError] = useState("");
    const handleUsernameChange = (event:TextInputEvent) => {
        const usernameValue = event.target.value;
        if (usernameValue.length < 5) {
            setUsername({error: true, errorText: "Username must be at least 5 characters", username: usernameValue});
            return;
        }
        setUsername({error: false, errorText:"", username: usernameValue});
    }
    const handlePasswordChange = (event:TextInputEvent) => {
        const passwordValue = event.target.value;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
        const passwordCheck = passwordRegex.test(passwordValue);
        if (passwordCheck === false) {
            setPassword({error: true, errorText:"Password criteria: 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number", password: passwordValue})
        }
        else {
            setPassword({error: false, errorText:"", password: passwordValue})
        }
    }
    const handleConfirmPasswordChange = (event:TextInputEvent) => {
        const passwordValue = event.target.value;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
        const passwordCheck = passwordRegex.test(passwordValue);
        if (passwordCheck === false) {
            setConfirmPassword({error: true, errorText:"Password criteria: 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number", password: passwordValue})

        }
        else if (passwordValue !== password.password) {
            setConfirmPassword({error: true, errorText:"The passwords need to match", password: passwordValue})
        }
        else {
            setConfirmPassword({error: false, errorText:"", password: passwordValue})
        }

    }
    const handleRegisterClick = async() => {
        if (password.password.length === 0 || username.username.length === 0 || confirmPassword.password.length === 0) return;
        try {
            let url = "https://signalrchat-prog23.azurewebsites.net/signup"
            if (window.location.href.includes("localhost")) {
                url = "https://localhost:7174/signup"
            }
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username.username,
                    password: password.password,
                    confirmPassword: confirmPassword.password
                })
            })
            if (response.ok) {
                window.location.href = '/login'
            }
            else {
                const data = await response.json();
                console.log(data)
                setError("Error: " + data.message)
            }
        }
        catch (error) {
            console.log(error)
            setError("Something went wrong.")

        }
    }

    return (
        <>
        <Box sx={{height: "90vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Stack direction="column" spacing={2} sx={{ width: "550px", padding: "2rem", backgroundColor: "white", borderRadius: "5px", textAlign: "left"}}>
                <Typography variant="h2">Register</Typography>
                <Typography>To use the SignalRChat you need to be registered.</Typography>
                <TextField value={username.username} id="register-username" label="Username" variant="standard" onChange={(event) => handleUsernameChange(event)} error={username.error} helperText={username.errorText}/>
                <TextField value={password.password} id="register-password" label="Password" variant="standard" onChange={(event) => handlePasswordChange(event)} error={password.error} helperText={password.errorText}/>
                <TextField value={confirmPassword.password} id="register-password-confirm" label="Confirm password" variant="standard" onChange={(event) => handleConfirmPasswordChange(event)} error={confirmPassword.error} helperText={confirmPassword.errorText}/>
                
                <Button disabled={password.error || username.error || confirmPassword.error} variant="outlined" onClick={() => handleRegisterClick()}>Register</Button>
                {error.length === 0 ? <></> : <Typography sx={{color: "red", fontStyle: "italic"}}>{error}</Typography>}
                <NavLink to="/login">Already registered? Login here!</NavLink>
            </Stack>
        </Box>

        </>
    )
}


export default Register;