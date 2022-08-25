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

  useEffect(() => {
    if (activeCard !== false) {
      setVisibility(true);
    }
  }, [activeCard]);

  useEffect(() => {
    fetchData();
  }, []);

  const date = new Date(activeCard.date);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const newDate = day + "-" + month + "-" + year;
  return (
    <div className="App">
      <Navbar />
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
      >
      </CustomPopup>
      <h2 className="home-title">UpComing Events</h2>
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
