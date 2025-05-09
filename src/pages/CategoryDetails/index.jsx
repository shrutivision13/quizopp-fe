import React, { useState, useEffect, Fragment } from "react";
import { useLocation } from "react-router-dom";

import AdSlot from "../../components/AdSense/AdSlot";
import { ApiGetAllCategoryDetails } from "../../api-wrapper/categories/ApiCategories";
import ContestsCard from "../../components/ContestsCard/ContestsCard";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import ArticlesCarousel from "../../components/ArticlesCarousel/ArticlesCarousel";

const articlesCarousel = [
  {
    title: "Dhanteras 2024: Significance, Traditions, and Items to Buy for Prosperity",
    date: "28 Oct, 2024",
    views: 8862,
    image: "https://www.quizzop.com/_next/image?url=https%3A%2F%2Fghost.quizzop.com%2Fcontent%2Fimages%2F2024%2F10%2Fh-25.webp&w=1920&q=75",
    link: "/blogs//indian-mythology/dhanteras-2024-significance-traditions-and-items-to-buy-for-prosperity-671f1d01bdccdd0001d32b7d?access=full",
  },
  {
    title: "Diwali 2024: Celebrations, Origins, and Auspicious Timings",
    date: "25 Oct, 2024",
    views: 6949,
    image: "https://www.quizzop.com/_next/image?url=https%3A%2F%2Fghost.quizzop.com%2Fcontent%2Fimages%2F2024%2F10%2Fh-35.jpg&w=1920&q=75",
    link: "/blogs/indian-mythology/diwali-2024-celebrations-origins-and-auspicious-timings-671ba790bdccdd0001d32b0a?access=full",
  },
  {
    title: "Navratri 2024: How Indian States Celebrate the Festival",
    date: "3 Oct, 2024",
    views: 4795,
    image: "https://www.quizzop.com/_next/image?url=https%3A%2F%2Fghost.quizzop.com%2Fcontent%2Fimages%2F2024%2F10%2Fh.webp&w=1920&q=75",
    link: "/blogs/indian-mythology/navratri-2024-how-indian-states-celebrate-the-festival-66fe4b76bdccdd0001d31bf5?access=full",
  },
  {
    title: "Top 10 Must-Read Hindu Mythology Books",
    date: "21 May, 2024",
    views: 5401,
    image: "https://www.quizzop.com/_next/image?url=https%3A%2F%2Fghost.quizzop.com%2Fcontent%2Fimages%2F2024%2F05%2F1-26.jpeg&w=1920&q=75",
    link: "/blogs/indian-mythology/top-10-must-read-hindu-mythology-books-664c9112bdccdd0001d2ef50?access=full",
  },
];

function CategoryDetails() {
  const IMAGEURL = import.meta.env.VITE_API_BASE_URL;
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [categoryDetails, setCategoriesDetails] = useState([])

  const categoryData = location.state;

  useEffect(() => {
    if (categoryData?._id) {
      ApiGetAllCategoryDetails(categoryData?._id).then((data) => {
        if (data?.isSuccess) {
          setCategoriesDetails(data?.data);
        }
        else {
          setCategoriesDetails([]);
        }
      }).catch((error) =>
        console.error("Error fetching get all category details:", error)
      );
    }
  }, [categoryData?._id]);

  const truncatedDescription = categoryDetails?.category?.description && categoryDetails?.category?.description?.slice(0, 300) + "…";

  return (
    <div className="bg-CFFFFFF dark:bg-C15162E hide-scroll-bar">
      <main className="font-sans">
        <div className="flex justify-center">
          <div className="max-w-[500px] w-full h-dynamic-screen relative overflow-x-hidden bg-CFFFFFF dark:bg-C191A32 hide-scroll-bar">
            <div className="mb-20">
              {/* About Section */}
              <div className="px-20 my-14">
                <h2 className="mb-14 text-18 font-bold dark:text-CFAFAFA">
                  About {categoryDetails?.category?.categoryName}
                </h2>
                <div className="bg-CFFFFFF dark:bg-C20213F px-20 py-20 rounded-10 shadow-contestCard">
                  {/* Float layout instead of flex */}
                  <div className="relative">
                    {/* Image Box */}
                    <div className={`${categoryDetails?.category?.description  && 'float-left'} mr-20 mb-4 w-[97px]`}>
                      <CategoryCard
                        category={categoryDetails?.category}
                        removeHeader={true}
                        removeheart={true}
                        height="h-[120px]"
                      />
                    </div>

                    {/* Description */}
                    {
                      categoryDetails?.category?.description &&
                      <div className="text-justify">
                        <p className="whitespace-pre-line text-12 text-C2C2C2C dark:text-C8789C3">
                          {isExpanded ? categoryDetails?.category?.description : truncatedDescription}
                          <span
                            datatype="view-more-description-button"
                            className={`text-12 text-CBAC8FF font-medium cursor-pointer ${isExpanded && 'block'}`}
                            onClick={() => setIsExpanded(!isExpanded)}
                          >
                            {isExpanded ? "View Less" : "View More"}
                          </span>
                        </p>
                      </div>
                    }
                  </div>
                </div>
              </div>

              {/* Practice Quiz Section */}
              <div className="mb-20" data-testid="practice-quiz-card">
                <div className="mt-24 bg-C26284C border-y border-C8789C3">
                  <p className="px-20 my-14 text-12 text-center font-bold text-C2C2C2C dark:text-C8789C3">
                    {categoryDetails?.category?.categoryName?.toUpperCase()} QUIZ • 10 QUESTIONS • 2 MINS
                  </p>
                  <a
                    rel=""
                    className="anchor-link"
                    href={`/${categoryDetails?.category?.categorySlug?.toLowerCase()}/begin-quiz`}
                  >
                    <div className="border border-CFFCC5B mx-20 px-20 mb-14 py-10 relative rounded-10 overflow-hidden">
                      <div className="relative z-[10] flex justify-between items-center">
                        <div className="w-[180px]">
                          <p className="mb-14 font-medium text-16 text-CFFFFFF leading-22">
                            We've got a {categoryDetails?.category?.categoryName} quiz for you!
                          </p>
                          <p className="max-w-[100px] text-CFFCC5B text-14 font-black">
                            TAP TO PLAY
                          </p>
                        </div>
                        <div>
                          <div
                            style={{
                              background: categoryDetails?.category?.backgroundColor,
                            }}
                            className="rounded-12 bg-CFFDEE5 cursor-pointer relative flex justify-center items-center h-[80px] w-[80px]"
                          >
                            <div className="w-full flex justify-center px-12">
                              <img
                                alt=""
                                loading="lazy"
                                width="70"
                                height="70"
                                style={{ color: "transparent" }}
                                src={`${IMAGEURL}/images/category/${categoryDetails?.category?.categoryIcon}`}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <video
                        poster="https://static.quizzop.com/newton/assets/play-practice-quiz-card.png"
                        className="absolute inset-0 w-full practice-quiz-card-video rounded-10"
                        autoPlay
                        playsInline
                        muted
                        loop
                      >
                        <source
                          src="https://static.quizzop.com/newton/assets/play-practice-quiz-card.mp4"
                          type="video/mp4"
                        />
                        <source
                          src="https://static.quizzop.com/newton/assets/play-practice-quiz-card.webm"
                          type="video/webm"
                        />
                      </video>
                    </div>
                  </a>
                </div>
              </div>

              <AdSlot
                slotId="ad-slot-1"
                adUnitPath="/123456/ad-unit"
                sizes={[728, 80]}
              />

              {/* Contests Section */}
              {
                categoryDetails?.contest?.length !== 0 &&
                <Fragment>
                  <div className="pt-14">
                    <div className="px-20 mb-20">
                      <div className="flex justify-between items-center">
                        <h2 className="text-18 font-black dark:text-CFFFFFF">
                          Contests in {categoryDetails?.category?.categoryName}
                        </h2>
                      </div>
                      <div>
                        {categoryDetails?.contest?.map((contest) => (
                          <ContestsCard
                            key={contest._id}
                            quizContest={{
                              categoryId: {
                                categoryName: categoryDetails?.category?.categoryName,
                                categoryIcon: categoryDetails?.category?.categoryIcon,
                                backgroundColor: categoryDetails?.category?.backgroundColor
                              },
                              _id: contest?._id,
                              prize: contest?.prize,
                              endTime: contest?.endTime,
                              participation: contest?.participation,
                              entryFee: contest?.entryFee,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <AdSlot
                    slotId="ad-slot-1"
                    adUnitPath="/123456/ad-unit"
                    sizes={[728, 80]}
                  />
                </Fragment>
              }


              {/* Articles Section */}
              {
                categoryDetails?.articles?.length !== 0 &&
                <Fragment>
                  <div className="pt-14">
                    <ArticlesCarousel
                      isShowSectionHeader
                      sectionTitle={`Articles on ${categoryDetails?.category?.categoryName}`}
                      articlesCarousel={articlesCarousel}
                      isArticalContent
                      articles={categoryDetails?.articles}
                    />
                  </div>
                  <AdSlot
                    slotId="ad-slot-1"
                    adUnitPath="/123456/ad-unit"
                    sizes={[728, 80]}
                  />
                </Fragment>
              }
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CategoryDetails;
