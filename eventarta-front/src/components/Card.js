import Bookmark from "../images/bookmark.png";
import Calender from "../images/calendar.png";
import Location from "../images/location.png";
import Info from "../images/info.png";
import { useEffect, useState } from "react";
import ReactTooltip from 'react-tooltip';

export default function Card({ props, setActiveCard }) {
  return (
    <div className="card-container">
      {props.map((event) => {
        const date = new Date(event.date);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const newDate = day + "-" + month + "-" + year;
        return (
          <a onClick={() => setActiveCard(event)} key={event.id}>
            <div className="card-outer" key={event.id}>
              <center>
                <h4 className="event-title">{event.title}</h4>
              </center>
              <section>
                <div className="card-img">
                  <img src={event.images[0]}></img>
                </div>
                <div className="box-container">
                  <div className="box">
                    <div className="box-content">
                      <img className="bookmark" src={Bookmark}></img>
                      <h4 className="bookmark-content">{event.joined}</h4>
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
                  <div className="inner-detail loc">
                    <img src={Location} className="detail-logos"></img>
                    {/* <p data-tip="hello world"></p> */}
                    <ReactTooltip className="tooltip" backgroundColor="black" />
                      <h5 data-tip={event.country +
                          " - " +
                          event.city +
                          " - " +
                          event.street} className="event-loc">
                        {event.country +
                          " - " +
                          event.city +
                          " - " +
                          event.street}
                      </h5>
                    </div>
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
