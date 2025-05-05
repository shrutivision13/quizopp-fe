import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import AdSlot from "../../components/AdSense/AdSlot";
import { ApiGetActiveContent } from "../../api-wrapper/categories/ApiCategories";
import CountdownTimer from "../../components/CountdownTimer/CountdownTimer";
import ContestsCard from "../../components/ContestsCard/ContestsCard";

function CategoryDetails() {
  const { categoryName } = useParams();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeContests, setActiveContests] = useState([]);

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
    }
  }, [categoryData?._id]);

  const truncatedDescription = `Wеlcomе to thе India Quiz catеgory on Quizzop, whеrе you can test your knowledge of onе of the world's most divеrsе and culturally rich countriеs. Our quiz covеrs a widе rangе of topics, including Indian history, gеography, culturе, fеstivals, litеraturе, art and architеcturе, national symbols, food, language, and morе. Lеarn about thе co...`;

  const fullDescription = `Wеlcomе to thе India Quiz catеgory on Quizzop, whеrе you can test your knowledge of onе of the world's most divеrsе and culturally rich countriеs. Our quiz covеrs a widе rangе of topics, including Indian history, gеography, culturе, fеstivals, litеraturе, art and architеcturе, national symbols, food, language, and morе. Lеarn about thе country's fascinating past, including the Indus Valley civilization, thе Mughal Empirе, the Mauryan Empire, and India's struggle for indеpеndеncе from the Britishers. Tеst your knowlеdgе of India's divеrsе gеography with our quiz which covеrs еvеrything from thе Himalayas to thе India Ocеan, the picturesque north-east to the bustling beaches of Goa. Explorе India's vibrant culturе by answering quеstions on dancе, music, food, and customs.
Tеst your knowlеdgе of India's statеs and capitals and sее if you can idеntify the famous landmarks that these places have to offer. Learn more about the variety of flavors that the states of this country have to offer not just in the form of food, but also in the form of culture, clothing, heritage, festivals, language, and its own unique quirks. Celebrate India's indеpеndеncе with questions that covеr kеy events and figures in India's fight for freedom. Lеarn about India's divеrsе fеstivals, or tеst your knowlеdgе of India’s leading literary figures. Discovеr thе bеauty of Indian art and architеcturе that our beautiful country has to offer, which covers еvеrything from anciеnt tеmplеs to modеrn art. Lеarn about India's historical figurеs who helped shape our country and drive its prosperity. So what arе you waiting for? Takе a quiz on India and sее how much you rеally know about this incrеdiblе country!`;

  return (
    <div className="bg-CFFFFFF dark:bg-C15162E hide-scroll-bar">
      <main className="font-sans">
        <div className="flex justify-center">
          <div className="max-w-[500px] w-full h-dynamic-screen relative overflow-x-hidden bg-CFFFFFF dark:bg-C191A32 hide-scroll-bar">
            <div className="">
              {/* About Section */}
              <div className="px-20 my-14">
                <h2 className="mb-14 text-18 font-bold dark:text-CFAFAFA">
                  About {categoryName}
                </h2>
                <div className="bg-CFFFFFF dark:bg-C20213F px-20 py-20 rounded-10 shadow-contestCard">
                  {/* Float layout instead of flex */}
                  <div className="relative">
                    {/* Image Box */}
                    <div
                      style={{ background: categoryData?.backgroundColor }}
                      className="rounded-12 bg-CFFDEE5 cursor-pointer flex justify-center items-center h-[120px] w-[97px] relative float-left mr-6 mb-4"
                    >
                      <div className="flex flex-col justify-center items-center rounded-10 w-[90px]">
                        <img
                          alt={categoryName}
                          loading="lazy"
                          width="70"
                          height="70"
                          style={{ color: "transparent" }}
                          src={`http://132.148.0.110:3000/images/category/${categoryData?.categoryIcon}`}
                        />
                        <p className="mt-8 font-bold text-12 text-C2C2C2C text-center px-10 leading-[14px] line-clamp-2">
                          {categoryName}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="text-justify">
                      <p className="whitespace-pre-line text-12 text-C2C2C2C dark:text-C8789C3">
                        {isExpanded ? fullDescription : truncatedDescription}
                      </p>
                      <span
                        datatype="view-more-description-button"
                        className="text-12 text-CBAC8FF font-medium cursor-pointer"
                        onClick={() => setIsExpanded(!isExpanded)}
                      >
                        {isExpanded ? "View Less" : "View More"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Practice Quiz Section */}
              <div className="mb-20" data-testid="practice-quiz-card">
                <div className="mt-24 bg-C26284C border-y border-C8789C3">
                  <p className="px-20 my-14 text-12 text-center font-bold text-C2C2C2C dark:text-C8789C3">
                    {categoryName.toUpperCase()} QUIZ • 10 QUESTIONS • 2 MINS
                  </p>
                  <a
                    rel=""
                    className="anchor-link"
                    href={`/${categoryName.toLowerCase()}/begin-quiz`}
                  >
                    <div className="border border-CFFCC5B mx-20 px-20 mb-14 py-10 relative rounded-10 overflow-hidden">
                      <div className="relative z-[10] flex justify-between items-center">
                        <div className="w-[180px]">
                          <p className="mb-14 font-medium text-16 text-CFFFFFF leading-22">
                            We've got a {categoryName} quiz for you!
                          </p>
                          <p className="max-w-[100px] text-CFFCC5B text-14 font-black">
                            TAP TO PLAY
                          </p>
                        </div>
                        <div>
                          <div
                            style={{ background: categoryData?.backgroundColor }}
                            className="rounded-12 bg-CFFDEE5 cursor-pointer relative flex justify-center items-center h-[80px] w-[80px]"
                          >
                            <div className="w-full flex justify-center px-12">
                              <img
                                alt=""
                                loading="lazy"
                                width="70"
                                height="70"
                                style={{ color: "transparent" }}
                                src={`http://132.148.0.110:3000/images/category/${categoryData?.categoryIcon}`}
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
                      Contests in {categoryName}
                    </h2>
                  </div>
                  <div>
                    {activeContests?.map((contest) => (
                      <ContestsCard key={contest._id} quizContest={contest} />
                    ))}
                  </div>
                </div>
              </div>

              <AdSlot
                slotId="ad-slot-1"
                adUnitPath="/123456/ad-unit"
                sizes={[728, 80]}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CategoryDetails;
