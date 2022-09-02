import * as React from 'react';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import axios from "axios";
import TextField from '@mui/material/TextField';

export default function SignUp(){
  const [name , setName] = React.useState("")
  const [email , setEmail] = React.useState("")
  const [password , setPassword] = React.useState("")
  const navigate = useNavigate();
  function addUser(){
    const user = { name: name, email:email, password: password };
    axios.post('http://127.0.0.1:3000/users', user)
        .then(function (response){
          if(response.status == 200)
          localStorage.setItem("token", response.data.token);
          navigate("/");
        }
           ).catch((error) => {
              console.log(error.response)
           })
          
          };
  
    return(
      <center>
      <h1 className="sign-title">Sign Up</h1>

      <div className="centered-div">
        <div className="sign-wraper">
          <div className="sign-inputs">
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField onChange={(user) => setName(user.target.value)} value={name} id="outlined-basic" label="Name" variant="outlined" />
              <TextField onChange={(user) => setEmail(user.target.value)} value={email} id="outlined-basic" label="Email" variant="outlined" />
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={(user) => setPassword(user.target.value)}
                value={password}
              />
            </Box>
           <button className="sign-button" onClick={addUser}>Sign Up</button>
           <p>Already have an account? <a className="sign-link" href='SignIn'>SignIn</a></p>
          </div>
        </div>
      </div>
    </center>   
    )
}