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
  const [JoinedFiltered, setJoinedFiltered] = useState([]);
  const [OwnedFiltered, setOwnedFiltered] = useState([]);
  const [Joinedlist, setJoinedList] = useState([]);
  const [activeCard, setActiveCard] = useState(false);
  const [visibility, setVisibility] = useState(false);
  // const [activeList, setActiveList] = useState([]);
  const today = new Date();

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
        setOwnedFiltered(
          response.data.events.filter((event) => {
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
        setJoinedFiltered(
          response.data.events.filter((event) => {
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
  useEffect(() => {
    SignedUserExsist();
    CreatedByUser();
    JoinedByUser();

    // console.log(JoinedFiltered.length)
    // console.log(OwnedFiltered)
  }, []);

  const date = new Date(activeCard.date);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const newDate = day + "-" + month + "-" + year;

  return (
    <div>
      <Navbar SignedUser={SignedUser} />
      <Box sx={{ width: "100%" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab
                label={"Owned Events (" + OwnedFiltered.length + ")"}
                value="1"
                className="tab-name"
              />
              <Tab
                label={"Joined Events (" + JoinedFiltered.length + ")"}
                value="2"
                className="tab-name"
              />
            </TabList>
          </Box>
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
            refresh={() => JoinedByUser()}
            remain={activeCard.capacity-activeCard.joined}
          ></CustomPopup>
          <TabPanel key={Ownedlist.id} value="1">
            <Card
              size={270}
              key={activeCard.id}
              className="card"
              props={Ownedlist}
              setActiveCard={(card) => setActiveCard(card)}
            />
          </TabPanel>
          <TabPanel value="2">
            <Card
              size={270}
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
