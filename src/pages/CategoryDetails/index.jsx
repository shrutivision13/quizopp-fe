import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import AdSlot from "../../components/AdSense/AdSlot";
import { ApiGetActiveContent, ApiGetAllCategoryDetails } from "../../api-wrapper/categories/ApiCategories";
import CountdownTimer from "../../components/CountdownTimer/CountdownTimer";
import ContestsCard from "../../components/ContestsCard/ContestsCard";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import ArticlesCarousel from "../../components/ArticlesCarousel/ArticlesCarousel";
import { SectionHeading } from "../../components/Ui/SectionHeading";

const articles = [
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


function CategoryDetails() {
  const IMAGEURL = import.meta.env.VITE_API_BASE_URL;

  const { categoryName: categoryPath } = useParams();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeContests, setActiveContests] = useState([]);
  const [categoryDetails, setCategoriesDetails] = useState([])
  console.log("🚀 ~ CategoryDetails ~ categoryDetails:", categoryDetails)

  const categoryData = location.state;

  useEffect(() => {
    if (categoryData?._id) {
      ApiGetActiveContent(categoryData?._id)
        .then((data) => {
          if (data?.isSuccess) {
            setActiveContests(data?.data);
          }
        })
        .catch((error) =>
          console.error("Error fetching active contests:", error)
        );

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

  const truncatedDescription = categoryDetails?.category?.description.slice(0, 300) + "…";

  return (
    <div className="bg-CFFFFFF dark:bg-C15162E hide-scroll-bar">
      <main className="font-sans">
        <div className="flex justify-center">
          <div className="max-w-[500px] w-full h-dynamic-screen relative overflow-x-hidden bg-CFFFFFF dark:bg-C191A32 hide-scroll-bar">
            <div className="">
              {/* About Section */}
              <div className="px-20 my-14">
                <h2 className="mb-14 text-18 font-bold dark:text-CFAFAFA">
                  About {categoryDetails?.category?.categoryName}
                </h2>
                <div className="bg-CFFFFFF dark:bg-C20213F px-20 py-20 rounded-10 shadow-contestCard">
                  {/* Float layout instead of flex */}
                  <div className="relative">
                    {/* Image Box */}
                    <div className="float-left mr-20 mb-4 w-[97px]">
                      <CategoryCard
                        category={categoryDetails?.category}
                        removeHeader={true}
                        removeheart={true}
                        height="h-[120px]"
                      />
                    </div>

                    {/* Description */}
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
                    href={`/${categoryPath?.toLowerCase()}/begin-quiz`}
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

              {/* Articles Section */}
              <div className="pt-14">
                <div className="px-20 mb-20">
                  <SectionHeading
                    title={`Articles on Indian Mythology`}
                    button={"See all"}
                    route="/category"
                  />
                </div>
                <ArticlesCarousel articles={articles} />
              </div>
              {/* {
                categoryDetails?.articles?.map((article) => (
                  <ArticleCard key={article?._id} article={article} />
                ))
              } */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CategoryDetails;
