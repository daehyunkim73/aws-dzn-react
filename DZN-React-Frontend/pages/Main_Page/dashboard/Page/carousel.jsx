import React from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import First_MainText from "../components/First_MainText";
import Second_MainText from "../components/Second_MainText";
import Carousel_img_first from "../../../../image/Dev_Center/DashBoard/Carousel/main_first.png";
import Carousel_img_second from "../../../../image/Dev_Center/DashBoard/Carousel/main_second.png";

const Slide = () => {
  return (
    <React.Fragment>
      <Carousel infiniteLoop useKeyboardArrows>
        <div>
          <img src={Carousel_img_first} className="carousel_img" />
          {/* <p className="legend">Legend 1</p> */}

          <First_MainText />
        </div>
        <div>
          <img src={Carousel_img_second} className="carousel_img" />
          {/* <p className="legend">Legend 2</p> */}
          <Second_MainText />
        </div>
      </Carousel>
    </React.Fragment>
  );
};

export default Slide;
