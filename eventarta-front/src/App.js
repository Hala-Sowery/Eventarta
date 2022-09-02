import "./App.css";
import React from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import CustomPopup from "./components/CustomPopup";
import { useState, useEffect, useModal } from "react";

function App() {
  const [activeCard, setActiveCard] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [SignedUser, setSignedUser] = useState(false);

  const popupCloseHandler = () => {
    setVisibility(false);
  };
  const [events, setEvents] = React.useState([]);
  const fetchData = async () => {
    await axios
      .get("http://127.0.0.1:3000/events")
      .then(function (response) {
        // console.log(response.data)
        setEvents(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const SignedUserExsist = async () => {
    const token = localStorage.getItem('token');
    await axios
      .get("http://127.0.0.1:3000/sessions",{
        headers: {
          Authorization: 'Bearer ' + token //the token is a variable which holds the token
        }})
      .then(function (response) {
        setSignedUser(response.data);
        // console.log(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (activeCard !== false) {
      setVisibility(true);
    }
  }, [activeCard]);

  useEffect(() => {
    fetchData();
  }, []);


  useEffect(() => {
    SignedUserExsist();
  }, []);
  const date = new Date(activeCard.date);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const newDate = day + "-" + month + "-" + year;
  return (
    <div className="App">
      <Navbar SignedUser = {SignedUser}/>
      <div>
    </div>
      <CustomPopup
        onClose={popupCloseHandler}
        show={visibility}
        title={activeCard.title}
        Date = {newDate}
        Location = {activeCard.country+" - "+activeCard.city+" - "+activeCard.street}
        Capcity = {activeCard.capacity}
        Description ={activeCard.description}
        images = {activeCard.images}
      >
      </CustomPopup>
      <div className="UpComing-create">
      <h2 className="home-title">UpComing Events</h2>
      { SignedUser &&<button className="create-button">Create Event</button>}
      </div>
      
      <div className="home-body">
        <Card
          className="card"
          props={events}
          setActiveCard={(card) => setActiveCard(card)}
        />
      </div>
      <span className="space"></span>
    </div>
  );
}

export default App;
