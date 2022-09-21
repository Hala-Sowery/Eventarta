import Logo from "../images/logo.png";
import * as React from "react";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useState, useEffect } from "react";

export default function Navbar({ SignedUser }) {
  const [theme, setTheme] = useState();
  const themeToggler = () => {
    theme === 'light' ? setMode('dark') : setMode('light')
};

  const setMode = mode => {
    window.localStorage.setItem('theme', mode)
    setTheme(mode)
};
  // useEffect(() => {

  //   const theme = localStorage.getItem("theme");
  //   if (theme === "light") {
  //     setTheme("dark");
  //     // document.getElementById('dn').checked;
  //   } else {
  //     setTheme("light");
  //   }
  //   document.body.className = theme;
  // }, [theme]);

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    localTheme && setTheme(localTheme)
   
    document.body.className = theme;
}, [theme, themeToggler]);

  const signOutUser = async () => {
    localStorage.removeItem("token");
  };
  return (
    <div>
      <header className="navbar">
        <a href="/">
          <img src={Logo} className="logo"></img>
        </a>
          <div className="toggleWrapper">
            <input onClick={themeToggler} type="checkbox" checked={theme ==="dark" ? 'checked' : ''} className="dn" id="dn"/>
          
            <label htmlFor="dn" className="toggle">
              <span className="toggle__handler">
              </span>
              <span className="star star--1"></span>
              <span className="star star--2"></span>
              <span className="star star--4"></span>
            </label>
          {!SignedUser && (
            <a href="/signUp" className="nav-link">
              Sign Up
            </a>
          )}
          {!SignedUser && (
            <a href="/signIn" className="nav-link">
              Sign In
            </a>
          )}
          {SignedUser && (
            <a href="/" className="nav-link" onClick={signOutUser}>
              Sign Out
            </a>
          )}
        </div>
      </header>
    </div>
  );
}
