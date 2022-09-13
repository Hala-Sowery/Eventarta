import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom'  
import { BrowserRouter } from 'react-router-dom';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import MyEvents from './Pages/MyEvents'
import CreateEvent from './Pages/CreateEvent';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
        {/* <Route path='/' exact>
          <App />
        </Route> */}
        <Route path="/" element={<App />}/>
        <Route path="/SignUp" element={<SignUp />}/>
        <Route path="/SignIn" element={<SignIn />}/>
        <Route path="/" element={<SignIn />}/>
        <Route path='/myEvents' element={ <MyEvents />}/>
        <Route path='/event/create' element={ <CreateEvent />}/>
  </Routes>
  </BrowserRouter>,
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
