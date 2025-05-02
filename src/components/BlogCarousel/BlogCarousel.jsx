import React from "react";
import Slider from "react-slick";

const blogData = [
  {
    title: "5 Reasons Why Coldplay Concerts Are So Famous",
    category: "Music",
    date: "10 Jan, 2025",
    views: 34829,
    image: "https://ghost.quizzop.com/content/images/2025/01/h-7.webp",
    link: "/blogs/music/5-reasons-why-coldplay-concerts-are-so-famous-67810c11bdccdd0001d364d1?access=full",
  },
  {
    title: "Best Stargazing Spots Around the World",
    category: "General Knowledge",
    date: "31 Mar, 2025",
    views: 10155,
    image: "https://ghost.quizzop.com/content/images/2025/03/h-21.jpg",
    link: "/blogs/general-knowledge/best-stargazing-spots-around-the-world-67eaa4b2bdccdd0001d37d11?access=full",
  },
  {
    title: "Weird and Fascinating Facts About Human Biology",
    category: "General Knowledge",
    date: "31 Mar, 2025",
    views: 9575,
    image: "https://ghost.quizzop.com/content/images/2025/03/h-3.jpeg",
    link: "/blogs/general-knowledge/weird-and-fascinating-facts-about-human-biology-67eaa153bdccdd0001d37cd2?access=full",
  },
];

const BlogCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div
      className="blog-carousel-section"
      style={{ width: "100%", margin: "0 auto" }}
    >
      <Slider {...settings}>
        {blogData.map((item, index) => (
          <div key={index} className="blog-slide">
            <a
              href={item.link}
              className="link-anchor"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{
                  position: "relative",
                  paddingTop: "56.25%",
                  overflow: "hidden",
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background:
                      "linear-gradient(180deg,transparent 19.25%,rgba(0,0,0,.58) 53.57%,rgba(0,0,0,.76) 67.45%,rgba(0,0,0,.91) 81.75%,#000)",
                    color: "white",
                    padding: "20px",
                  }}
                  className="blog-carousal-card pb-14 pt-120"
                >
                  <h3 style={{ marginBottom: "10px" }} className="font-medium text-16 leading-24 mb-12 text-CFAFAFA" >{item.title}</h3>
                  <p className="text-10 text-C8789C3 leading-14">
                    {item.category} • {item.date} •{" "}
                    {item.views.toLocaleString()} Views
                  </p>
                </div>
                <ul style={{ display: "" }} className="slick-dots">
                  <li className="slick-active">
                    <button>1</button>
                  </li>
                  <li className="">
                    <button>2</button>
                  </li>
                  <li className="">
                    <button>3</button>
                  </li>
                </ul>
              </div>
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BlogCarousel;
