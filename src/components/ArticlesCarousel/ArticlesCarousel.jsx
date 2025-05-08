import React from 'react';
import Slider from 'react-slick';

const ArticlesCarousel = ({ articles = [] }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };
    return (
        <div className="w-full max-w-maxW">
            <div
                className="blog-carousel-section"
                style={{ width: "100%", margin: "0 auto" }}
            >
                <Slider {...settings}>
                    {articles.map((item, index) => (
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
                                            paddingBottom: "14px"
                                        }}
                                        className="blog-carousal-card pb-14 pt-120"
                                    >
                                        <h3 style={{ marginBottom: "10px" }} className="font-medium text-16 leading-24 mb-12 text-CFAFAFA" >{item.title}</h3>
                                        <p className="text-10 text-C8789C3 leading-14">
                                            {item.date} •{" "}
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
        </div>
    )
}

export default ArticlesCarousel;
