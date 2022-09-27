import React, { Component } from "react";
import Slider from "react-slick";

// static files
import cat from "../../image/mainPage/cat.png"
import chicken from "../../image/mainPage/chicken.png"
import deer from "../../image/mainPage/deer.png"
import dragon from "../../image/mainPage/dragon.png"
import hawk from "../../image/mainPage/hawk.png"
import pig from "../../image/mainPage/pig.png"
import rabbit from "../../image/mainPage/rabbit.png"
import sheep from "../../image/mainPage/sheep.png"
import tiger from "../../image/mainPage/tiger.png"

export default class SeasonCarousel extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 7,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 0,
      cssEase: "linear"
    };
    return (
      <div>
        <h2>Auto Play</h2>
        <Slider {...settings}>
          <div>
            <img src={cat} alt="" />
          </div>
          <div>
            <img src={chicken} alt="" />
          </div>
          <div>
            <img src={deer} alt="" />
          </div>
          <div>
            <img src={dragon} alt="" />
          </div>
          <div>
            <img src={hawk} alt="" />
          </div>
          <div>
            <img src={pig} alt="" />
          </div>
          <div>
            <img src={rabbit} alt="" />
          </div>
          <div>
            <img src={sheep} alt="" />
          </div>
          <div>
            <img src={tiger} alt="" />
          </div>
        </Slider>
      </div>
    );
  }
}