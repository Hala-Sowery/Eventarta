import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import CustomPopup from "../components/CustomPopup";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from "../components/Card";

export default function MyEvents() {
  const [value, setValue] = React.useState("1");
  const [SignedUser, setSignedUser] = useState(false);
  const [Ownedlist, setOwnedList] = useState([]);
  const [Joinedlist, setJoinedList] = useState([]);
  const [activeCard, setActiveCard] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [activeList, setActiveList] = useState([]);
  const popupCloseHandler = () => {
    setVisibility(false);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  
  useEffect(() => {
    if (activeCard !== false) {
      setVisibility(true);
    }
  }, [activeCard]);

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

  const CreatedByUser = async () => {
    const token = localStorage.getItem("token");
    await axios
      .get("http://127.0.0.1:3000/users/created_events", {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
        },
      })
      .then(function (response) {
        setOwnedList(response.data.events);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const JoinedByUser = async () => {
    const token = localStorage.getItem("token");
    await axios
      .get("http://127.0.0.1:3000/users/joined_events", {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
        },
      })
      .then(function (response) {
        setJoinedList(response.data.events);
        //  console.log(Joinedlist);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    SignedUserExsist();
    CreatedByUser();
    JoinedByUser();
 }, []);

  const date = new Date(activeCard.date);
  const now = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const newDate = day + "-" + month + "-" + year;
    // const today = new Date();
  
    // // 👇️ OPTIONAL!
    // // This line sets the hour of the current date to midnight
    // // so the comparison only returns `true` if the passed in date
    // // is at least yesterday
    // today.setHours(0, 0, 0, 0);
  
    // if (date < today){
    //   console.log("this is expired"+{date})
    //   setActiveList(activeCard)
    //   console.log(activeList)
    // }

  return (
    <div>
      <Navbar SignedUser={SignedUser} />
      <Box sx={{ width: "100%" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Owned Events" value="1" />
              <Tab label="Joined Events" value="2" />
              {/* <Tab label="Item Three" value="3" /> */}
            </TabList>
          </Box>
          <CustomPopup
            activeCard={{...activeCard}}
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
            refresh={() => JoinedByUser()}
          ></CustomPopup>
          <TabPanel key={Ownedlist.id} value="1">
            <Card 
              key={activeCard.id}
              className="card"
              props={Ownedlist}
              setActiveCard={(card) => setActiveCard(card)}
            />
          </TabPanel>
          <TabPanel value="2">
            <Card
              className="card"
              props={Joinedlist}
              setActiveCard={(card) => setActiveCard(card)}
            />
          </TabPanel>
          {/* <TabPanel value="3">Item Three</TabPanel> */}
        </TabContext>
      </Box>
    </div>
  );
}
