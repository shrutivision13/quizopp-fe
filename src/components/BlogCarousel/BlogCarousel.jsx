import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { formatDate } from "../../utils/formateDate";

const BlogCarousel = ({ blogCarouselData, imagePath = 'article' }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  const IMAGEURL = import.meta.env.VITE_API_BASE_URL;

  return (
    <div
      className="article-carousel-section"
      style={{ width: "100%", margin: "0 auto" }}
    >
      <Slider {...settings}>
        {blogCarouselData?.map((item, index) => (
          <div key={index} className="blog-slide">
            <Link
              to={`/blogs-details/${item?._id}`}
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
                  src={`${IMAGEURL}/images/${imagePath}/${item?.thumbnail}`}
                  alt={item?.title}
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
                  <h3 style={{ marginBottom: "10px" }} className="font-medium text-16 leading-24 mb-12 text-CFAFAFA" >{item?.title}</h3>
                  <p className="text-10 text-C8789C3 leading-14">
                    {item?.categoryId?.categoryName} • {formatDate(item?.publishedAt)} •{" "}
                    {item.views.toLocaleString()} Views
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BlogCarousel;
