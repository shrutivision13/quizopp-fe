import React from "react";
import Slider from "../../../components/Slider/Slider";

function PopularQuizTopics() {
  const quizTopics = [
    {
      name: "India",
      image: "src/assets/images/india-new.webp",
      link: "/india/category",
      bgColor: "#f8d7b0",
    },
    {
      name: "Bollywood",
      image: "src/assets/images/bollywood.png",
      link: "/bollywood/category",
      bgColor: "#ffeaf3",
    },
    { name: "IPL", image: "", link: "/ipl/category", bgColor: "#fff0e0" },
    {
      name: "Hindi English",
      image: "/src/assets/images/hindi_english.webp",
      link: "/hindi-english/category",
      bgColor: "#f8efff",
    },
    {
      name: "SSC",
      image: "/src/assets/images/ssc.webp",
      link: "/ssc/category",
      bgColor: "#ffe7d4",
    },
    {
      name: "Bank PO & Clerk",
      image: "src/assets/images/bank_po.png",
      link: "/bank-po-clerk/category",
      bgColor: "#c8f3ff",
    },
    {
      name: "Indian Independence",
      image: "src/assets/images/indian-independence-new.WEBP",
      link: "/indian-independence/category",
      bgColor: "#ffeee0",
    },
    {
      name: "Indian Mythology",
      image: "src/assets/images/indian-mythology-new.WEBP",
      link: "/indian-mythology/category",
      bgColor: "#efe1c3",
    },
    {
      name: "Shah Rukh Khan",
      image: "src/assets/images/srk.WEBP",
      link: "/shah-rukh-khan/category",
      bgColor: "#ffeae4",
    },
    {
      name: "Salman Khan",
      image: "src/assets/images/salman_khan.WEBP",
      link: "/salman-khan/category",
      bgColor: "#dae5ff",
    },
    {
      name: "Narendra Modi",
      image: "src/assets/images/narendra-modi.WEBP",
      link: "/narendra-modi/category",
      bgColor: "#ffedda",
    },
    {
      name: "Mahatma Gandhi",
      image: "src/assets/images/mahatma-gandhi.WEBP",
      link: "/mahatma-gandhi/category",
      bgColor: "#ffeada",
    },
    {
      name: "Indian Constitution",
      image: "src/assets/images/indian-constitution.WEBP",
      link: "/indian-constitution/category",
      bgColor: "#f2d4bf",
    },
    {
      name: "ICC World Cup",
      image: "src/assets/images/icc-worldcup.WEBP",
      link: "/icc-world-cup/category",
      bgColor: "#f3d6bb",
    },
    {
      name: "Sachin Tendulkar",
      image: "/src/assets/images/sachin_tendulkar.WEBP",
      link: "/sachin-tendulkar/category",
      bgColor: "#c7e5ff",
    },
    {
      name: "Virat Kohli",
      image: "/src/assets/images/virat_kohli.WEBP",
      link: "/virat-kohli/category",
      bgColor: "#ffe1d4",
    },
  ];

  return (
    <>
      <div
        style={{
          backgroundColor: "#20213F",
          margin: "5px",
          padding: "5px",
          borderRadius: "10px",
        }}
        id="S:4"
      >
        <div>
          <div className="flex justify-between items-center px-20 mb-14">
            <h2 className="text-14 font-bold text-CFAFAFA">
              Popular Quiz Topics
            </h2>
            <a href="/category">
              <div
                className="flex cursor-pointer items-center"
                data-testid="quiz-see-all-button"
              >
                <p className="text-10 uppercase font-bold text-CFFCC5B mr-4">
                  See All
                </p>
                <img
                  alt="arrow filled icon"
                  fetchPriority="high"
                  width="16"
                  height="16"
                  decoding="async"
                  style={{ color: "transparent" }}
                  src="src/assets/images/next-arrow-yellow.svg"
                />
              </div>
            </a>
          </div>
          <Slider>
            <div className="relative">
              <div className="flex scroll snap-x snap-mandatory overflow-scroll px-14 hide-scroll-bar">
                {quizTopics.map((topic, index) => (
                  <div
                    key={index}
                    className="snap-center relative rounded-20 mr-10 flex flex-col items-center justify-center min-w-[70px] first:ml-0 last:mr-0 pr-[0px]"
                    data-testid={`quiz-category-icon-${index}`}
                  >
                    <a href={topic.link}>
                      <div
                        className="whitespace-nowrap text-18 font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-CFFDEE5 cursor-pointer relative flex justify-center items-center h-[70px] w-[70px] rounded-[12px]"
                        style={{ backgroundColor: topic.bgColor }}
                      >
                        <img
                          alt={topic.name}
                          fetchPriority="high"
                          width="45"
                          height="45"
                          decoding="async"
                          style={{ color: "transparent" }}
                          src={topic.image}
                        />
                      </div>
                      <div className="pt-6 text-10 text-CBBBDDD line-clamp-1">
                        <p className="text-center">{topic.name}</p>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </>
  );
}

export default PopularQuizTopics;
