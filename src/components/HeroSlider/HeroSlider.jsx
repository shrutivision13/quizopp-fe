import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = ["sachin.png", "dhoni.png", "cr7.png"];

export default function HeroSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    appendDots: (dots) =>{
        console.log("🚀 ~ HeroSlider ~ dots:", dots)
        return (
      <div
        style={{
          borderRadius: "10px",
          padding: "10px",
          bottom: "13px",
          position: "absolute",
        }}
      >
        {dots}
      </div>
    )},
    customPaging: (i) => (
      <div
        style={{
          width: "71px",
         
        }}
      >
        <img
          width={"100%"}
          src={`https://static.quizzop.com/newton/assets/download-page/${images[i]}`}
          alt="slider image"
          className="w-full inline-block"
          loading="lazy"
        />
      </div>
    ),
  };

  return (
    <div className="font-black text-[28px] dark:text-CFFFFFF uppercase">
      <div className="my-0 mx-auto text-center mb-24 italic px-20">
        <p>Game On...Score Big! TOP THE</p>
        <span className="dark:text-CFEDE34 relative">
          <svg
            width="20"
            height="10"
            viewBox="0 0 20 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-[-6%] top-[-5%] rotate-45"
          >
            <path
              d="M14.6484 9.00003C15.2759 7.98043 16.9543 5.80005 18.6484 5.23535"
              stroke="#FEDE34"
              strokeLinecap="round"
            />
            <path
              d="M9.57723 6.31065C9.57041 5.11348 9.84153 2.3753 10.9806 0.999979"
              stroke="#FEDE34"
              strokeLinecap="round"
            />
            <path
              d="M5 9.00003C4.37255 7.98043 2.69413 5.80005 1.00003 5.23535"
              stroke="#FEDE34"
              strokeLinecap="round"
            />
          </svg>
          Sports Quiz!
        </span>
      </div>

      <div className="mx-20 mb-24">
        <div className="sliderBorder custom-dots p-[12px] relative">
          <Slider {...settings}>
            {images.map((img, idx) => (
              <div key={idx}>
                <img
                  src={`https://static.quizzop.com/newton/assets/download-page/${img}`}
                  alt="slider image"
                  className="w-full inline-block"
                  loading="lazy"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
