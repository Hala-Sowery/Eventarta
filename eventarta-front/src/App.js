import './App.css';
import React from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Card from './components/Card';
import { useState, useEffect } from "react";

function App() {
  const [events, setEvents] = React.useState([])
  const fetchData = async () =>{
    await axios.get('http://127.0.0.1:3000/events')
    .then(function (response) {
      // console.log(response.data)
    setEvents(response.data);
})
    .catch(function (error) {
    console.log(error);
});
} 
  useEffect( () => {
    fetchData();
    }, []);
  
  return (
    <div className="App">
      <Navbar/>
      <h2 className='home-title'>UpComing Events</h2>
      <div className='home-body'>
      <Card className="card" props={events}/>
      </div>
      <span className='space'></span>
    </div>
  );
}

export default App;
