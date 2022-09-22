import "./App.css";
import * as React from "react";
import axios from "axios";
import { alpha, styled } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import Switch from "@mui/material/Switch";
import Navbar from "./components/Navbar";
import MyCard from "./components/Card";
import ListItem from "./components/ListItem";
import CustomPopup from "./components/CustomPopup";
import { useState, useEffect } from "react";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
function App() {
  const [activeCard, setActiveCard] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [SignedUser, setSignedUser] = useState(false);
  const [SignedUserName, setSignedUserName] = useState("");
  const [activeDate, setActiveDate] = useState([]);
  const [events, setEvents] = useState([]);
  const [reset, setReset] = useState(false);
  const [view, setView] = useState("module");
  const [size, setSize] = useState(270);
  const [remainCapacity, setRemsinCapacity] = useState(0)

  function valuetext(value) {
    setSize(value);
  }

  const today = new Date();

  if (visibility === true) {
    document.body.style.overflow = "hidden";
  }

  // const GreenSwitch = styled(Switch)(({ theme }) => ({
  //   "& .MuiSwitch-switchBase.Mui-checked": {
  //     color: red[600],
  //     "&:hover": {
  //       backgroundColor: alpha(red[600], theme.palette.action.hoverOpacity),
  //     },
  //   },
  //   "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
  //     backgroundColor: red[600],
  //   },
  // }));

  const handleChange1 = (event, nextView) => {
    setView(nextView);
  };

  // const label = { inputProps: { "aria-label": "Switch demo" } };

  const popupCloseHandler = () => {
    setVisibility(false);
    setActiveCard(false);
    setReset(true);
    document.body.style.overflow = "";
  };
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    await axios
      .get("http://127.0.0.1:3000/events", {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
        },
      })
      .then(function (response) {
        setEvents(response.data);
        setActiveDate(
          response.data.filter((event) => {
            const date = new Date(event.date);
            const day1 = date.getDate();
            const month1 = date.getMonth() + 1;
            const year1 = date.getFullYear();
            const day2 = today.getDate();
            const month2 = today.getMonth() + 1;
            const year2 = today.getFullYear();
            if (day1 >= day2 && month1 >= month2 && year1 >= year2)
              return event;
          })
        );
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
        // console.log(response.data.name);
        setSignedUserName(response.data.name);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (activeCard !== false) {
      setVisibility(true);
      setRemsinCapacity(activeCard.capacity - activeCard.joined)
    }
  }, [activeCard]);
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    SignedUserExsist();
    // console.log(SignedUser);
  }, []);
  const date = new Date(activeCard.date);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  // console.log(SignedUserName);
  const newDate = day + "-" + month + "-" + year;
  return (
    <div className="App">
      <Navbar SignedUser={SignedUser} />
      <div></div>
      <CustomPopup
        activeCard={{ ...activeCard }}
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
        status={activeCard.joined_status}
        joined={activeCard.joined}
        refresh={() => fetchData()}
        reset={reset}
        setReset={() => setReset(false)}
        remain={remainCapacity}
        setJoined={(value) => {
          if(value === "join"){
            setActiveCard(obj => ({
              ...obj,
              ...{"joined":activeCard.joined-1}
            }))
          }
          else if(value==="un join"){
            setActiveCard(obj => ({
              ...obj,
              ...{"joined":activeCard.joined+1}
            }))
          }
        }}
      ></CustomPopup>
      <div className="UpComing-create">
        <div className="signedName">
          {SignedUser &&(<h5 className="home-title">{"welcome "+SignedUserName+","}</h5>)}
          <h2 className="home-title">{"UpComing Events"}</h2>
        </div>

        {view === "module" &&(<Box sx={{ width: 200 }}>
          <Slider
            className="margin-just"
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            step={50}
            marks
            min={270}
            max={570}
          />
        </Box>)}
        <ToggleButtonGroup
          className="toggle-group"
          orientation="horizontal"
          value={view}
          exclusive
          onChange={handleChange1}
        >
          <ToggleButton value="list" aria-label="list">
            <ViewListIcon />
          </ToggleButton>
          <ToggleButton value="module" aria-label="module">
            <ViewModuleIcon />
          </ToggleButton>
        </ToggleButtonGroup>
        {/* <Box width={300}>
      <Slider defaultValue={500} aria-label="Default" valueLabelDisplay="auto" min={500} max={700}/>
    </Box> */}
        <div>
          {/* <GreenSwitch checked={checked} onChange={handleChange} {...label} /> */}
          {SignedUser && (
            <a href="/event/create">
              <button className="create-button">Create Event</button>
            </a>
          )}
          {SignedUser && (
            <a href="/myevents">
              <button className="create-button">
                {"My Events (" + activeDate.length + ")"}
              </button>
            </a>
          )}
        </div>
      </div>
      {view === "module" && (
        <div className="home-body">
          <MyCard
            size={size}
            className="card"
            props={events}
            setActiveCard={(card) => setActiveCard(card)}
          />
        </div>
      )}
      {view === "list" && (
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
