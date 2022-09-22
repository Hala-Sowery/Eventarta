import { useEffect, useState } from "react";
import Event from "../images/event.jpg";
import popupStyles from "./custom-popup.module.css";
import PropTypes from "prop-types";
import SimpleImageSlider from "react-simple-image-slider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import * as React from "react";
import Rating from "@mui/material/Rating";

const CustomPopup = (props) => {
  var animateButton = function (e) {
    e.preventDefault();
    //reset animation
    e.target.classList.remove("animate");

    e.target.classList.add("animate");
    setTimeout(function () {
      e.target.classList.remove("animate");
    }, 700);
  };

  var bubblyButtons = document.getElementsByClassName("bubbly-button");

  for (var i = 0; i < bubblyButtons.length; i++) {
    bubblyButtons[i].addEventListener("click", animateButton, false);
  }
  const [show, setShow] = useState(false);
  const [content, setContent] = useState("");
  const [joinedStatus, setJoinedStatus] = useState("");
  const [showComment, setShowComment] = useState(false);
  const [value, setValue] = React.useState(2);
  const [theme, setTheme] = useState("");

  const closeHandler = (e) => {
    setShow(false);
    props.onClose(false);
  };

  useEffect(() =>{
    if(props.reset === true){
      setContent("");
      setValue(0);
      props.setReset();
    }
  },[props.reset])

  useEffect(() => {
    setShow(props.show);
    if (props.status === true) {
      setJoinedStatus("Un join");
      setShowComment(true);
    } else {
      setJoinedStatus("Join");
      setShowComment(false);
    }
    const mode = localStorage.getItem("theme");
    setTheme(mode)
    
  }, [props.show]);

  function JoinEvent() {
    setJoinedStatus("Loading");

    const token = localStorage.getItem("token");
    axios
      .post(
        "http://127.0.0.1:3000/event_members",
        {
          event_id: props.activeCard.id,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(function (response) {
        if (props.refresh) {
          props.refresh();
        }
        if (joinedStatus === "Join") {
          setJoinedStatus("Un join");
          props.setJoined("un join");
          setShowComment(true);
          console.log(props.remain);
        } else {
          setJoinedStatus("Join");
          props.setJoined("join");
          setShowComment(false);
          console.log(props.remain);
        }
      })
      .catch(function (error) {});
  }
  function addComment() {
    const token = localStorage.getItem("token");
    axios
      .post(
        "http://127.0.0.1:3000/comments",
        {
          event_id: props.activeCard.id,
          content: content,
          rate: value,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(function (response) {
        if (response.status == 200) {
          Swal.fire({
            title: "success!",
            text: "Your comment has been saved!",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }
  if (props.images !== undefined) {
    return (
      <div
        style={{
          visibility: show ? "visible" : "hidden",
          opacity: show ? "1" : "0",
        }}
        className={popupStyles.overlay}
      >
        <div 
      style={{
          background: theme === "dark" ? "#222222" : "#fff",
        }}
         className={popupStyles.popup} id="box">
          <span className={popupStyles.close} onClick={closeHandler}>
            &times;
          </span>
          <div className={popupStyles.content}>
            <center>
              <div className="slider-container">
                <SimpleImageSlider
                  width={436}
                  height={180}
                  images={props.images}
                  showBullets={true}
                  showNavs={true}
                />
              </div>
            </center>
            <div className="popup-title">
              <h3>{props.title}</h3>
              <button
                className="bubbly-button"
                onClick={JoinEvent}
                disabled={joinedStatus === "Loading"}
              >
                {joinedStatus}
              </button>
            </div>
            <section className="popup-details">
              <h5>{props.Date}</h5>
              <h5>{props.Location}</h5>
              <h5>{props.remain + " "}capacity</h5>
            </section>
            <section className="popup-desc">
              {/* <textarea>{props.Description}</textarea> */}
              <h5>{props.Description}</h5>
            </section>
            {showComment && (
              <section className="comment">
                <div className="rating">
                  <h5 className="h5">comment:</h5>
                  <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                </div>

                <textarea
                  className="comment-area"
                  onChange={(event) => setContent(event.target.value)}
                  value={content}
                  placeholder={"Add your comment here..."}
                ></textarea>
                <button onClick={addComment}>Submit</button>
              </section>
            )}
          </div>
        </div>
      </div>
    );
  }
};
CustomPopup.propTypes = {
  activeCard: PropTypes.object,
  title: PropTypes.string,
  show: PropTypes.bool,
  onClose: PropTypes.func,
  Date: PropTypes.string,
  Location: PropTypes.string,
  Capcity: PropTypes.number,
  Description: PropTypes.string,
  images: PropTypes.array,
  status: PropTypes.bool,
  joined: PropTypes.number,
  refresh: PropTypes.func,
  isDark: PropTypes.bool,
  reset: PropTypes.bool, 
  setReset: PropTypes.func,
  setJoined: PropTypes.func,
  remain: PropTypes.number,
};

export default CustomPopup;
