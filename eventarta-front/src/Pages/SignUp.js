import * as React from 'react';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import axios from "axios";
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

export default function SignUp(){
  const [name , setName] = React.useState("")
  const [email , setEmail] = React.useState("")
  const [password , setPassword] = React.useState("")
  const [confirnPassword , setConfirnPassword] = React.useState("")
  const navigate = useNavigate();
  function CheckPass(){
    if(password == confirnPassword){

    }
  }
  function addUser(){
    if(password == confirnPassword){
      const user = { name: name, email:email, password: password };
    axios.post('http://127.0.0.1:3000/users', user)
        .then(function (response){
          if(response.status == 200)
          localStorage.setItem("token", response.data.token);
          Swal.fire({
            title: 'success!',
            text: "Your account has been created!",
            icon: 'success',
            confirmButtonText: 'Ok'
          })
          navigate("/");
        }
           ).catch((error) => {
              console.log(error.response)
           })
    }
    else{
      Swal.fire({
        title: 'Error!',
        text: "passwords are not match",
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
          };
    return(
      <center className="signup">
      <h1 className="sign-title">Sign Up</h1>
      <div className="centered-div">
        <div className="sign-wraper">
          <div className="signup-inputs">
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
              <TextField
                id="outlined-password-input"
                label="Confirm Password"
                type="password"
                autoComplete="current-password"
                onChange={(user) => setConfirnPassword(user.target.value)}
                value={confirnPassword}
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