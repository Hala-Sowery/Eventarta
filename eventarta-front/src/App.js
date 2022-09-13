import "./App.css";
import * as React from "react";
import axios from "axios";
import { alpha, styled } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import Switch from "@mui/material/Switch";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import ListItem from "./components/ListItem";
import CustomPopup from "./components/CustomPopup";
import { useState, useEffect } from "react";

function App() {
  const [activeCard, setActiveCard] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [SignedUser, setSignedUser] = useState(false);
  const [checked, setChecked] = React.useState(true);

  if(visibility === true)
        {document.body.style.overflow = 'hidden';}

  const GreenSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: red[600],
      "&:hover": {
        backgroundColor: alpha(red[600], theme.palette.action.hoverOpacity),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: red[600],
    },
  }));

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const popupCloseHandler = () => {
    setVisibility(false);
        document.body.style.overflow = '';
  };
  const [events, setEvents] = React.useState([]);
  const token = localStorage.getItem("token");
  const fetchData = async () => {
    await axios
      .get("http://127.0.0.1:3000/events", {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
        },
      })
      .then(function (response) {
        // console.log(response.data)
        setEvents(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const SignedUserExsist = async () => {
    const token = localStorage.getItem("token");
    await axios
      .get("http://127.0.0.1:3000/sessions", {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
        },
      })
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
  // function getData(){
  //   axios.get('getItems')
  // }
  const newDate = day + "-" + month + "-" + year;
  return (
    <div className="App">
      <Navbar SignedUser={SignedUser} />
      <div></div>
      <CustomPopup
        activeCard={activeCard}
        onClose={popupCloseHandler}
        show={visibility}
        title={activeCard.title}
        Date={newDate}
        Location={
          activeCard.country +
          " - " +
          activeCard.city +
          " - " +
          activeCard.street
        }
        Capcity={activeCard.capacity}
        Description={activeCard.description}
        images={activeCard.images}
        status = {activeCard.joined_status}
        joined = {activeCard.joined}
        refresh={() => fetchData()}
      ></CustomPopup>
      <div className="UpComing-create">
        <h2 className="home-title">UpComing Events</h2>
        {/* <Box width={300}>
      <Slider defaultValue={500} aria-label="Default" valueLabelDisplay="auto" min={500} max={700}/>
    </Box> */}
        <div>
          <GreenSwitch
            checked={checked}
            onChange={handleChange}
            {...label}
          />
          {SignedUser && (
            <a href="/event/create">
              <button  className="create-button">Create Event</button>
             </a>
          )}
          {SignedUser && (
            <a href="/myevents">
              <button className="create-button">My Events</button>
            </a>
          )}
        </div>
      </div>
      {checked && (
        <div
          style={
            {
              // visibility: show ? "visible" : "hidden",
            }
          }
          className="home-body"
        >
          <Card 
            className="card"
            props={events}
            setActiveCard={(card) => setActiveCard(card)}
          />
        </div>
      )}
      {!checked && (
        <div>
          <ListItem
            props={events}
            setActiveCard={(card) => setActiveCard(card)}
          />
        </div>
      )}
      <span className="space"></span>
    </div>
  );
}

export default App;
