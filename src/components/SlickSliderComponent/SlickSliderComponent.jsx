import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const imageList = [
  "downloadPageSliderOneImg1.png",
  "downloadPageSliderOneImg2.png",
  "downloadPageSliderOneImg3.png",
  "downloadPageSliderOneImg4.png",
];

const SlickSliderComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    focusOnSelect: true,
    centerMode: true,
    centerPadding: "0px",
    autoplay: true,
    autoplaySpeed: 3000,
  
  };

  return (
    <div className="slick-slider slider-images-download img-slick slick-initialized" dir="ltr">
      <Slider {...settings}>
        {imageList.map((fileName, index) => (
          <div
            key={index}
            data-index={index}
            className="slick-slide"
            tabIndex="-1"
            aria-hidden="false"
            style={{
              width: "164px",
              outline: "none",
              // width: "1804px",
              opacity: "1",

            }}
          >
            <div style={{padding: '8px'}} >
              <img
                alt="slider image"
                tabIndex="-1"
                loading="lazy"
                decoding="async"
                style={{
                  color: "transparent",
                  width: "100%",
                  display: "inline-block",
                }}
                sizes="100vw"
                src={`https://static.quizzop.com/newton/assets/download-page/${fileName}?w=3840&q=75`}
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SlickSliderComponent;
