import React, { Component } from "react";
import Slider from "react-slick";
import styles from './SeasonCarousel.module.scss';

// static files
import cat from "../../image/mainPage/cat.png"
import rooster from "../../image/mainPage/rooster.png"
import deer from "../../image/mainPage/deer.png"
import dragon from "../../image/mainPage/dragon.png"
import hawk from "../../image/mainPage/hawk.png"
import pig from "../../image/mainPage/pig.png"
import rabbit from "../../image/mainPage/rabbit.png"
import sheep from "../../image/mainPage/sheep.png"
import tiger from "../../image/mainPage/tiger.png"

export default class SeasonCarousel extends Component {
  
  render() {
    const jav = [cat, rooster, deer, dragon, hawk, pig, rabbit, sheep, tiger]
    const settings = {
      infinite: true,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 0,
      cssEase: "linear",
      slidesToShow: 5,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1750,
          settings: {
            slidesToShow: 4,
          }
        },
        {
          breakpoint: 1400,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 1,
          }
        }
      ]
    };
    return (
      <div className={styles.seasonCarousel}>
        <p className={styles.SCTitle}>Season 1 - OOZ Project</p>
        <Slider {...settings}>
          {jav.map((item) => {
            return (
              <div key={item} className={styles.carouselCard}>
                <img className={styles.carouselImg} src={item} alt="" />
              </div>
            );
          })}
        </Slider>
      </div>
    );
  }
}