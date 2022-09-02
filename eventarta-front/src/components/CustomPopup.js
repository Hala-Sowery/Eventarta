import { useEffect, useState } from "react";
import Event from "../images/event.jpg";
import popupStyles from "./custom-popup.module.css";
import PropTypes from "prop-types";
import SimpleImageSlider from "react-simple-image-slider";

const CustomPopup = (props, data) => {
  const [show, setShow] = useState(false);

  const closeHandler = (e) => {
    setShow(false);
    props.onClose(false);
  };

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

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
                  height={200}
                  images={props.images}
                  showBullets={true}
                  showNavs={true}
                />
              </div>
            </center>
            <div className="popup-title">
            <h2>{props.title}</h2>
            <button>JOIN</button>
            </div>
            <section className="popup-details">
              <h5>{props.Date}</h5>
              <h5>{props.Location}</h5>
              <h5>{props.Capcity+" "}capacity</h5>
            </section>
            <section className="popup-desc">
              <h5>{props.Description}</h5>
            </section>
            <section className="comment">
              <h5>Comment:</h5>
              <textarea placeholder="Add your comment here..."></textarea>
              <button>Submit</button>
            </section>
          </div>
        </div>
      </div>
    );
  }
};

CustomPopup.propTypes = {
  title: PropTypes.string,
  show: PropTypes.bool,
  onClose: PropTypes.func,
  Date: PropTypes.string,
  Location: PropTypes.string,
  Capcity: PropTypes.string,
  Description: PropTypes.string,
  images: PropTypes.array,
};

export default CustomPopup;
