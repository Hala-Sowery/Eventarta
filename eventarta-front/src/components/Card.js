import Event from "../images/event.jpg";
import Calender from "../images/calendar.png";
import Location from "../images/location.png";
import Info from "../images/info.png";
import CustomPopup from "../components/CustomPopup";
import { useEffect, useState, useRef } from "react";

export default function Card({ props, setActiveCard }) {
  const ref = useRef(null);
  return (
    <div className="card-container">
      {props.map((event) => {
        const date = new Date(event.date);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const newDate = day + "-" + month + "-" + year;
        return (
          <a onClick={() => setActiveCard(event)}>
            <div className="card-outer" key={event.id}>
              <center>
                <h3 className="event-title">{event.title}</h3>
              </center>
              <section>
                <div className="card-img">
                  <img src={Event}></img>
                </div>
                <div className="box-container">
                  <div className="box">
                    <div className="box-content">
                      <center>{event.capacity} coming</center>
                    </div>
                  </div>
                </div>
              </section>
              <section className="event-detail">
                <div>
                  {/* <h1 key={index}>{event.title}</h1> */}
                  <div className="inner-detail">
                    <img src={Calender} className="detail-logos"></img>
                    <h5 className="event-date">{newDate}</h5>
                  </div>
                  <div className="inner-detail">
                    <img src={Location} className="detail-logos"></img>
                    <h5 className="event-loc">
                      {event.country +
                        " - " +
                        event.city +
                        " - " +
                        event.street}
                    </h5>
                  </div>
                  {/* <p>{event.description}</p> */}
                  <div className="inner-detail">
                    <img src={Info} className="info-logo"></img>
                    <p className="event-desc">{event.description}</p>
                  </div>
                </div>
              </section>
            </div>
          </a>
        );
      })}
    </div>
  );
}
