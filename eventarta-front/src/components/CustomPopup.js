import { useEffect, useState } from "react";
import Event from "../images/event.jpg";
import popupStyles from "./custom-popup.module.css";
import PropTypes from "prop-types";
import SimpleImageSlider from "react-simple-image-slider";

const CustomPopup = (props, data) => {
  const images = [
    {
      url: "https://media-cdn.tripadvisor.com/media/photo-s/1a/b8/46/6d/london-stock.jpg",
    },
    {
      url: "https://images.adsttc.com/media/images/5e4c/1025/6ee6/7e0b/9d00/0877/large_jpg/feature_-_Main_hall_1.jpg?1582043123",
    },
    {
      url: "https://upload.wikimedia.org/wikipedia/commons/6/62/Barbieri_-_ViaSophia25668.jpg",
    },
  ];

  const [show, setShow] = useState(false);

  const closeHandler = (e) => {
    setShow(false);
    props.onClose(false);
  };

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

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
                images={images}
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
          </section>
        </div>
      </div>
    </div>
  );
};

CustomPopup.propTypes = {
  title: PropTypes.string,
  show: PropTypes.bool,
  onClose: PropTypes.func,
  Date: PropTypes.string,
  Location: PropTypes.string,
  Capcity: PropTypes.string,
  Description: PropTypes.string,
};

export default CustomPopup;
