import * as React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";

export default function SignIn() {
  const [email , setEmail] = React.useState("")
  const [password , setPassword] = React.useState("")
  const navigate = useNavigate();
  function SignUser(){
    const user = {email:email, password: password };
    axios.post('http://127.0.0.1:3000/sessions', {
      email:email,
      password: password
    })
    .then(function (response){
      if(response.status == 200)
      localStorage.setItem("token", response.data.token);
      console.log(response.data.token)
      navigate("/");
    }
           ).catch((error) => {
            console.log(error.response)
         })};
  return (
    <center>
      <h1 className="sign-title">Sign In</h1>
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
              <TextField onChange={(user) => setEmail(user.target.value)} value={email} id="outlined-basic" label="Email" variant="outlined" required />
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={(user) => setPassword(user.target.value)}
                value={password}
                required
              />
            </Box>
            
           <button className="sign-button" onClick={SignUser}>Sign In</button>
           <p>Don't have an account? <a className="sign-link" href="SignUp">SignUp</a></p>
          </div>
        </div>
      </div>
    </center>
  );
}
