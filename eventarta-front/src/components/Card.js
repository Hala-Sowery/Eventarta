import Bookmark from "../images/bookmark.png";
import Calender from "../images/calendar.png";
import Location from "../images/location.png";
import Info from "../images/info.png";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";

export default function MyCard({ props, setActiveCard, size }) {
  return (
    <div className="card-container">
      {props.map((event) => {
        // console.log(event.kind);
        const date = new Date(event.date);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const newDate = day + "-" + month + "-" + year;
        const card = (
          <React.Fragment>
            <CardContent className="card-content">
              <div className="card-header">
                <div className="left-div">
                  <p width="60px"></p>
                </div>
                <h4
                className="card-title"
                  style={{
                    margin: "0px 0px 10px 10px",
                    fontSize: size <= 470 ? size / 15 : size / 18,
                  }}
                >
                  {event.title}
                </h4>
                <div>
                  <img src={Bookmark} className="shabara"></img>
                  <h5 className="bookmark-content">{event.joined}</h5>
                </div>
              </div>
              {/* <div className="box-container">
                  <div className="box">
                    <div className="box-content">
                      <img className="bookmark" src={Bookmark}></img>
                      <h4 className="bookmark-content">{event.joined}</h4>
                    </div>
                  </div>
                </div> */}
              <div className="card-img">
                <img width={size} height={size / 2} src={event.images[0]}></img>
              </div>

              <section className="event-detail">
                <div>
                  <div className="inner-detail" width={size} height={size}>
                    <img src={Calender} className="detail-logos cal-img"></img>
                    <div className="type-add">
                      <h5 className="event-date">{newDate}</h5>
                      <h5 className="event-date">{event.kind}</h5>
                    </div>
                  </div>

                  <div className="inner-detail">
                    <img src={Location} className="detail-logos loc-img"></img>
                    <ReactTooltip className="tooltip" backgroundColor="black" />
                    <h5
                      className="inner-detail"
                      data-tip={
                        event.country +
                        " - " +
                        event.city +
                        " - " +
                        event.street
                      }
                    >
                      {event.country +
                        " - " +
                        event.city +
                        " - " +
                        event.street}
                    </h5>
                  </div>
                  <div className="inner-detail">
                    <img src={Info} className="info-logo info-img"></img>
                    <p className="event-desc">{event.description}</p>
                  </div>
                </div>
              </section>
            </CardContent>
          </React.Fragment>
        );

        return (
          <a onClick={() => setActiveCard(event)} key={event.id}>
            <Card
              className="margin-just new-card"
              sx={{ maxWidth: size }}
              variant="outlined"
            >
              {card}
            </Card>
            {/* <div className="card-outer" key={event.id}>
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
                <div> */}
            {/* <h1 key={index}>{event.title}</h1> */}
            {/* <div className="inner-detail">
                    <img src={Calender} className="detail-logos cal-img"></img>
                    <h5 className="event-date">{newDate}</h5>
                  </div>
                  <div className="inner-detail loc">
                    <img src={Location} className="detail-logos loc-img"></img> */}
            {/* <p data-tip="hello world"></p> */}
            {/* <ReactTooltip className="tooltip" backgroundColor="black" />
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
                    <img src={Info} className="info-logo info-img"></img>
                    <p className="event-desc">{event.description}</p>
                  </div>
                </div>
              </section>
            </div> */}
          </a>
        );
      })}
    </div>
  );
}
