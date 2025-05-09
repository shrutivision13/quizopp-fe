import React from 'react';
import Slider from 'react-slick';
import { SectionHeading } from '../Ui/SectionHeading';
import ArticleCard from '../ArticleCard/ArticleCard';
import { formatDate } from '../../utils/formateDate';
import { Link } from 'react-router-dom';

const ArticlesCarousel = ({
    articles = [],
    sectionTitle = '',
    buttonName = 'see all',
    routePath = '',
    isArticalContent = false,
    isShowSectionHeader = false,
    imagePath = 'article'
}) => {
    const IMAGEURL = import.meta.env.VITE_API_BASE_URL;

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    return (
        <div>
            {/* Section Header */}
            {
                isShowSectionHeader &&
                <div className="px-20 mb-20">
                    <SectionHeading
                        title={sectionTitle}
                        button={buttonName}
                        route={routePath}
                    />
                </div>
            }
            {/* Carousel */}
            <div className="w-full max-w-maxW">
                <div
                    className="article-carousel-section"
                    style={{ width: "100%", margin: "0 auto" }}
                >
                    <Slider {...settings}>
                        {(articles ?? [])?.slice(0,3)?.map((item) => (
                            <div key={item?._id} className="blog-slide">
                                <Link
                                     to={`/blogs/${item?._id}`}
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
                                                paddingBottom: "14px"
                                            }}
                                            className="blog-carousal-card pb-14 pt-120"
                                        >
                                            <h3 style={{ marginBottom: "10px" }} className="font-medium text-16 leading-24 mb-12 text-CFAFAFA" >{item?.title}</h3>
                                            <p className="text-10 text-C8789C3 leading-14">
                                                {formatDate(item?.publishedAt)} •{" "}
                                                {item.views.toLocaleString()} Views
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
            {/* Article Content */}
            {
                isArticalContent &&
                <div>
                    {
                        articles?.slice(3, 6)?.map((article, index) => (
                        <div key={article.id || index}>
                            <ArticleCard
                                article={article}
                                imagePath={'article'}
                                isShowCategoryName={false}
                            />
                            {index < 2 && <hr className="h-2 border-C404380" />}
                        </div>
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default ArticlesCarousel;
