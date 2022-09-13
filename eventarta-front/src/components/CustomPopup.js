import { useEffect, useState } from "react";
import Event from "../images/event.jpg";
import popupStyles from "./custom-popup.module.css";
import PropTypes from "prop-types";
import SimpleImageSlider from "react-simple-image-slider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

const CustomPopup = (props ) => {
  var animateButton = function(e) {

    e.preventDefault();
    //reset animation
    e.target.classList.remove('animate');
    
    e.target.classList.add('animate');
    setTimeout(function(){
      e.target.classList.remove('animate');
    },700);
  };
  // console.log(props)
  var bubblyButtons = document.getElementsByClassName("bubbly-button");
  
  for (var i = 0; i < bubblyButtons.length; i++) {
    bubblyButtons[i].addEventListener('click', animateButton, false);
  }
  const [show, setShow] = useState(false);
  // const [SignedUser, setSignedUser] = useState(false);
  const [content, setContent] = useState("");
  const [joinedStatus, setJoinedStatus] = useState("");
  const navigate = useNavigate();
  
  const closeHandler = (e) => {
    setShow(false);
    props.onClose(false);
  };

  useEffect(() => {
    setShow(props.show);
    if(props.status === true)
    {
      setJoinedStatus("Un join");
    }
    else{
      setJoinedStatus("Join");
    }
    console.log(props.status)
  }, [props.show]);

  function JoinEvent(){
    setJoinedStatus("Loading");

    const token = localStorage.getItem('token');
    axios.post('http://127.0.0.1:3000/event_members', {
      event_id: props.activeCard.id,
    },{
      headers: {
        Authorization: 'Bearer ' + token
      },
    }).then(function (response) {
      if(props.refresh){
        props.refresh()
      }
      if(joinedStatus === "Join")
      {
        setJoinedStatus("Un join");
      }
      else{
        setJoinedStatus("Join");
      }
      })
      .catch(function (error) {
      });
  }
  function addComment(){
    const token = localStorage.getItem('token');
    // console.log(props.activeCard.id)
    axios.post('http://127.0.0.1:3000/comments', {
      event_id: props.activeCard.id,
      content: content,
    },{
      headers: {
        Authorization: 'Bearer ' + token
      }})
        .then(function (response){
          if(response.status == 200){
            Swal.fire({
              title: 'success!',
              text: "Your comment has been saved!",
              icon: 'success',
              confirmButtonText: 'Ok'
            })
          }
        }
           ).catch((error) => {
              console.log(error.response.data.message)
           })
}
  if(props.images !== undefined){
    return (
      <div
        style={{
          visibility: show ? "visible" : "hidden",
          opacity: show ? "1" : "0",
        }}
        className={popupStyles.overlay}
      >
        <div className={popupStyles.popup}>
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
            <button className="bubbly-button" onClick={JoinEvent} disabled={joinedStatus === "Loading"}>{joinedStatus}</button>
            </div>
            <section className="popup-details">
              <h5>{props.Date}</h5>
              <h5>{props.Location}</h5>
              <h5>{(props.Capcity-props.joined)+" "}capacity</h5>
            </section>
            <section className="popup-desc">
              {/* <textarea>{props.Description}</textarea> */}
              <h5>{props.Description}</h5>
            </section>
            <section className="comment">
              <h5>comment:</h5>
              <textarea  className="comment-area" onChange={(event) => setContent(event.target.value)}
                value={content} placeholder={"Add your comment here..."}></textarea>
              <button onClick={addComment}>Submit</button>
            </section>
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
  refresh: PropTypes.func
};

export default CustomPopup;
