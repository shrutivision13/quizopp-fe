import React, { useRef } from "react";

function TrendingArticles() {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

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
              Trending Articles
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
                  src="/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2Fright-arrow-filled-icon.png&amp;w=32&amp;q=75"
                />
              </div>
            </a>
          </div>
          <div>
            <div className="relative">
              {/* Left Navigation Arrow */}
              <div
                data-testid="slider-button"
                className="absolute left-0 z-10 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={scrollLeft}
              >
                <div className="pl-10 mb-16">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 30 30"
                    fill="none"
                  >
                    <path
                      d="M15 30C6.71573 30 -1.90735e-06 23.2843 -1.90735e-06 15C-1.90735e-06 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15C30 23.2843 23.2843 30 15 30Z"
                      fill="#FFCC5B"
                    ></path>
                    <path
                      d="M14.9969 15.0002L18.2578 11.5219L16.6273 9.78271L11.7361 15.0002L16.6273 20.2175L18.2578 18.4784L14.9969 15.0002Z"
                      fill="#2C2C2C"
                    ></path>
                  </svg>
                </div>
              </div>

              {/* Right Navigation Arrow */}
              <div
                data-testid="slider-button"
                className="absolute right-0 z-10 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={scrollRight}
              >
                <div className="pr-10 mb-16">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 30 30"
                    fill="none"
                    className="rotate-180 fill-C20213F"
                  >
                    <path
                      d="M15 30C6.71573 30 -1.90735e-06 23.2843 -1.90735e-06 15C-1.90735e-06 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15C30 23.2843 23.2843 30 15 30Z"
                      fill="#FFCC5B"
                    ></path>
                    <path
                      d="M14.9969 15.0002L18.2578 11.5219L16.6273 9.78271L11.7361 15.0002L16.6273 20.2175L18.2578 18.4784L14.9969 15.0002Z"
                      fill="#2C2C2C"
                    ></path>
                  </svg>
                </div>
              </div>

              {/* Scrollable Quiz Topics */}
              <div
                ref={scrollContainerRef}
                className="flex scroll mx-1 snap-x snap-mandatory overflow-scroll px-14 hide-scroll-bar"
              >
                <div
                  className="snap-center relative rounded-20 mr-10 flex flex-col items-center justify-center min-w-[70px] first:ml-0 last:mr-0 pr-[0px]"
                  data-testid="quiz-category-icon-0"
                >
                  <a href="/india/category">
                    <div
                      className="whitespace-nowrap text-18 font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-CFFDEE5 cursor-pointer relative flex justify-center items-center h-[70px] w-[70px] rounded-[12px]"
                      style={{ backgroundColor: "#f8d7b0" }}
                    >
                      <img
                        alt="India"
                        fetchPriority="high"
                        width="45"
                        height="45"
                        decoding="async"
                        style={{ color: "transparent" }}
                        src="/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2Fcategory%2Findia-new.png&amp;w=96&amp;q=75"
                      />
                    </div>
                    <div className="pt-6 text-10 text-CBBBDDD line-clamp-1">
                      <p className="text-center">India</p>
                    </div>
                  </a>
                </div>
                <div
                  className="snap-center relative rounded-20 mr-10 flex flex-col items-center justify-center min-w-[70px] first:ml-0 last:mr-0 pr-[0px]"
                  data-testid="quiz-category-icon-1"
                >
                  <a href="/bollywood/category">
                    <div
                      className="whitespace-nowrap text-18 font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-CFFDEE5 cursor-pointer relative flex justify-center items-center h-[70px] w-[70px] rounded-[12px]"
                      style={{ backgroundColor: "#ffeaf3" }}
                    >
                      <img
                        alt="Bollywood"
                        fetchPriority="high"
                        width="45"
                        height="45"
                        decoding="async"
                        style={{ color: "transparent" }}
                        src="/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2Fcategory%2Fbollywood.png&amp;w=96&amp;q=75"
                      />
                    </div>
                    <div className="pt-6 text-10 text-CBBBDDD line-clamp-1">
                      <p className="text-center">Bollywood</p>
                    </div>
                  </a>
                </div>
                <div
                  className="snap-center relative rounded-20 mr-10 flex flex-col items-center justify-center min-w-[70px] first:ml-0 last:mr-0 pr-[0px]"
                  data-testid="quiz-category-icon-2"
                >
                  <a href="/ipl/category">
                    <div
                      className="whitespace-nowrap text-18 font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-CFFDEE5 cursor-pointer relative flex justify-center items-center h-[70px] w-[70px] rounded-[12px]"
                      style={{ backgroundColor: "#fff0e0" }}
                    >
                      <img
                        alt="IPL"
                        fetchPriority="high"
                        width="45"
                        height="45"
                        decoding="async"
                        style={{ color: "transparent" }}
                        src="/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2Fcategorystatic.quizzop.com%2Fnewton%2Fassets%2Fcategory%2Fipl.png&amp;w=96&amp;q=75"
                      />
                    </div>
                    <div className="pt-6 text-10 text-CBBBDDD line-clamp-1">
                      <p className="text-center">IPL</p>
                    </div>
                  </a>
                </div>
                <div
                  className="snap-center relative rounded-20 mr-10 flex flex-col items-center justify-center min-w-[70px] first:ml-0 last:mr-0 pr-[0px]"
                  data-testid="quiz-category-icon-3"
                >
                  <a href="/hindi-english/category">
                    <div
                      className="whitespace-nowrap text-18 font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-CFFDEE5 cursor-pointer relative flex justify-center items-center h-[70px] w-[70px] rounded-[12px]"
                      style={{ backgroundColor: "#f8efff" }}
                    >
                      <img
                        alt="Hindi English"
                        fetchPriority="high"
                        width="45"
                        height="45"
                        decoding="async"
                        style={{ color: "transparent" }}
                        src="/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2Fcategory%2Fhindi_english.png&amp;w=96&amp;q=75"
                      />
                    </div>
                    <div className="pt-6 text-10 text-CBBBDDD line-clamp-1">
                      <p className="text-center">Hindi English</p>
                    </div>
                  </a>
                </div>
                <div
                  className="snap-center relative rounded-20 mr-10 flex flex-col items-center justify-center min-w-[70px] first:ml-0 last:mr-0 pr-[0px]"
                  data-testid="quiz-category-icon-4"
                >
                  <a href="/ssc/category">
                    <div
                      className="whitespace-nowrap text-18 font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-CFFDEE5 cursor-pointer relative flex justify-center items-center h-[70px] w-[70px] rounded-[12px]"
                      style={{ backgroundColor: "#ffe7d4" }}
                    >
                      <img
                        alt="SSC"
                        fetchPriority="high"
                        width="45"
                        height="45"
                        decoding="async"
                        style={{ color: "transparent" }}
                        src="/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2Fcategory%2Fssc.png&amp;w=96&amp;q=75"
                      />
                    </div>
                    <div className="pt-6 text-10 text-CBBBDDD line-clamp-1">
                      <p className="text-center">SSC</p>
                    </div>
                  </a>
                </div>
                <div
                  className="snap-center relative rounded-20 mr-10 flex flex-col items-center justify-center min-w-[70px] first:ml-0 last:mr-0 pr-[0px]"
                  data-testid="quiz-category-icon-5"
                >
                  <a href="/bank-po-clerk/category">
                    <div
                      className="whitespace-nowrap text-18 font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-CFFDEE5 cursor-pointer relative flex justify-center items-center h-[70px] w-[70px] rounded-[12px]"
                      style={{ backgroundColor: "#c8f3ff" }}
                    >
                      <img
                        alt="Bank PO &amp; Clerk"
                        fetchPriority="high"
                        width="45"
                        height="45"
                        decoding="async"
                        style={{ color: "transparent" }}
                        src="/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2Fcategory%2Fbank_po.png&amp;w=96&amp;q=75"
                      />
                    </div>
                    <div className="pt-6 text-10 text-CBBBDDD line-clamp-1">
                      <p className="text-center">Bank PO &amp; Clerk</p>
                    </div>
                  </a>
                </div>
                <div
                  className="snap-center relative rounded-20 mr-10 flex flex-col items-center justify-center min-w-[70px] first:ml-0 last:mr-0 pr-[0px]"
                  data-testid="quiz-category-icon-6"
                >
                  <a href="/indian-independence/category">
                    <div
                      className="whitespace-nowrap text-18 font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-CFFDEE5 cursor-pointer relative flex justify-center items-center h-[70px] w-[70px] rounded-[12px]"
                      style={{ backgroundColor: "#ffeee0" }}
                    >
                      <img
                        alt="Indian Independence"
                        fetchPriority="high"
                        width="45"
                        height="45"
                        decoding="async"
                        style={{ color: "transparent" }}
                        src="/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2Fcategory%2Findian-independence-new.png&amp;w=96&amp;q=75"
                      />
                    </div>
                    <div className="pt-6 text-10 text-CBBBDDD line-clamp-1">
                      <p className="text-center">Indian Independence</p>
                    </div>
                  </a>
                </div>
                <div
                  className="snap-center relative rounded-20 mr-10 flex flex-col items-center justify-center min-w-[70px] first:ml-0 last:mr-0 pr-[0px]"
                  data-testid="quiz-category-icon-7"
                >
                  <a href="/indian-mythology/category">
                    <div
                      className="whitespace-nowrap text-18 font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-CFFDEE5 cursor-pointer relative flex justify-center items-center h-[70px] w-[70px] rounded-[12px]"
                      style={{ backgroundColor: "#efe1c3" }}
                    >
                      <img
                        alt="Indian Mythology"
                        fetchPriority="high"
                        width="45"
                        height="45"
                        decoding="async"
                        style={{ color: "transparent" }}
                        src="/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2Fcategory%2Findian-mythology-new.png&amp;w=96&amp;q=75"
                      />
                    </div>
                    <div className="pt-6 text-10 text-CBBBDDD line-clamp-1">
                      <p className="text-center">Indian Mythology</p>
                    </div>
                  </a>
                </div>
                <div
                  className="snap-center relative rounded-20 mr-10 flex flex-col items-center justify-center min-w-[70px] first:ml-0 last:mr-0 pr-[0px]"
                  data-testid="quiz-category-icon-8"
                >
                  <a href="/shah-rukh-khan/category">
                    <div
                      className="whitespace-nowrap text-18 font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-CFFDEE5 cursor-pointer relative flex justify-center items-center h-[70px] w-[70px] rounded-[12px]"
                      style={{ backgroundColor: "#ffeae4" }}
                    >
                      <img
                        alt="Shah Rukh Khan"
                        fetchPriority="high"
                        width="45"
                        height="45"
                        decoding="async"
                        style={{ color: "transparent" }}
                        src="/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2Fcategory%2Fsrk.png&amp;w=96&amp;q=75"
                      />
                    </div>
                    <div className="pt-6 text-10 text-CBBBDDD line-clamp-1">
                      <p className="text-center">Shah Rukh Khan</p>
                    </div>
                  </a>
                </div>
                <div
                  className="snap-center relative rounded-20 mr-10 flex flex-col items-center justify-center min-w-[70px] first:ml-0 last:mr-0 pr-[0px]"
                  data-testid="quiz-category-icon-9"
                >
                  <a href="/salman-khan/category">
                    <div
                      className="whitespace-nowrap text-18 font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-CFFDEE5 cursor-pointer relative flex justify-center items-center h-[70px] w-[70px] rounded-[12px]"
                      style={{ backgroundColor: "#dae5ff" }}
                    >
                      <img
                        alt="Salman Khan"
                        fetchPriority="high"
                        width="45"
                        height="45"
                        decoding="async"
                        style={{ color: "transparent" }}
                        src="/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2Fcategory%2Fsalman_khan.png&amp;w=96&amp;q=75"
                      />
                    </div>
                    <div className="pt-6 text-10 text-CBBBDDD line-clamp-1">
                      <p className="text-center">Salman Khan</p>
                    </div>
                  </a>
                </div>
                <div
                  className="snap-center relative rounded-20 mr-10 flex flex-col items-center justify-center min-w-[70px] first:ml-0 last:mr-0 pr-[0px]"
                  data-testid="quiz-category-icon-10"
                >
                  <a href="/narendra-modi/category">
                    <div
                      className="whitespace-nowrap text-18 font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-CFFDEE5 cursor-pointer relative flex justify-center items-center h-[70px] w-[70px] rounded-[12px]"
                      style={{ backgroundColor: "#ffedda" }}
                    >
                      <img
                        alt="Narendra Modi"
                        fetchPriority="high"
                        width="45"
                        height="45"
                        decoding="async"
                        style={{ color: "transparent" }}
                        src="/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2Fcategory%2Fnarendra-modi.png&amp;w=96&amp;q=75"
                      />
                    </div>
                    <div className="pt-6 text-10 text-CBBBDDD line-clamp-1">
                      <p className="text-center">Narendra Modi</p>
                    </div>
                  </a>
                </div>
                <div
                  className="snap-center relative rounded-20 mr-10 flex flex-col items-center justify-center min-w-[70px] first:ml-0 last:mr-0 pr-[0px]"
                  data-testid="quiz-category-icon-11"
                >
                  <a href="/mahatma-gandhi/category">
                    <div
                      className="whitespace-nowrap text-18 font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-CFFDEE5 cursor-pointer relative flex justify-center items-center h-[70px] w-[70px] rounded-[12px]"
                      style={{ backgroundColor: "#ffeada" }}
                    >
                      <img
                        alt="Mahatma Gandhi"
                        fetchPriority="high"
                        width="45"
                        height="45"
                        decoding="async"
                        style={{ color: "transparent" }}
                        src="/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2Fcategory%2Fmahatma-gandhi.png&amp;w=96&amp;q=75"
                      />
                    </div>
                    <div className="pt-6 text-10 text-CBBBDDD line-clamp-1">
                      <p className="text-center">Mahatma Gandhi</p>
                    </div>
                  </a>
                </div>
                <div
                  className="snap-center relative rounded-20 mr-10 flex flex-col items-center justify-center min-w-[70px] first:ml-0 last:mr-0 pr-[0px]"
                  data-testid="quiz-category-icon-12"
                >
                  <a href="/indian-constitution/category">
                    <div
                      className="whitespace-nowrap text-18 font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-CFFDEE5 cursor-pointer relative flex justify-center items-center h-[70px] w-[70px] rounded-[12px]"
                      style={{ backgroundColor: "#f2d4bf" }}
                    >
                      <img
                        alt="Indian Constitution"
                        fetchPriority="high"
                        width="45"
                        height="45"
                        decoding="async"
                        style={{ color: "transparent" }}
                        src="/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2Fcategory%2Findian-constitution.png&amp;w=96&amp;q=75"
                      />
                    </div>
                    <div className="pt-6 text-10 text-CBBBDDD line-clamp-1">
                      <p className="text-center">Indian Constitution</p>
                    </div>
                  </a>
                </div>
                <div
                  className="snap-center relative rounded-20 mr-10 flex flex-col items-center justify-center min-w-[70px] first:ml-0 last:mr-0 pr-[0px]"
                  data-testid="quiz-category-icon-13"
                >
                  <a href="/icc-world-cup/category">
                    <div
                      className="whitespace-nowrap text-18 font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-CFFDEE5 cursor-pointer relative flex justify-center items-center h-[70px] w-[70px] rounded-[12px]"
                      style={{ backgroundColor: "#f3d6bb" }}
                    >
                      <img
                        alt="ICC World Cup"
                        fetchPriority="high"
                        width="45"
                        height="45"
                        decoding="async"
                        style={{ color: "transparent" }}
                        src="/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2Fcategory%2Ficc-worldcup.png&amp;w=96&amp;q=75"
                      />
                    </div>
                    <div className="pt-6 text-10 text-CBBBDDD line-clamp-1">
                      <p className="text-center">ICC World Cup</p>
                    </div>
                  </a>
                </div>
                <div
                  className="snap-center relative rounded-20 mr-10 flex flex-col items-center justify-center min-w-[70px] first:ml-0 last:mr-0 pr-[0px]"
                  data-testid="quiz-category-icon-14"
                >
                  <a href="/sachin-tendulkar/category">
                    <div
                      className="whitespace-nowrap text-18 font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-CFFDEE5 cursor-pointer relative flex justify-center items-center h-[70px] w-[70px] rounded-[12px]"
                      style={{ backgroundColor: "#c7e5ff" }}
                    >
                      <img
                        alt="Sachin Tendulkar"
                        fetchPriority="high"
                        width="45"
                        height="45"
                        decoding="async"
                        style={{ color: "transparent" }}
                        src="/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2Fcategory%2Fsachin_tendulkar.png&amp;w=96&amp;q=75"
                      />
                    </div>
                    <div className="pt-6 text-10 text-CBBBDDD line-clamp-1">
                      <p className="text-center">Sachin Tendulkar</p>
                    </div>
                  </a>
                </div>
                <div
                  className="snap-center relative rounded-20 mr-10 flex flex-col items-center justify-center min-w-[70px] first:ml-0 last:mr-0 pr-[0px]"
                  data-testid="quiz-category-icon-15"
                >
                  <a href="/virat-kohli/category">
                    <div
                      className="whitespace-nowrap text-18 font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-CFFDEE5 cursor-pointer relative flex justify-center items-center h-[70px] w-[70px] rounded-[12px]"
                      style={{ backgroundColor: "#ffe1d4" }}
                    >
                      <img
                        alt="Virat Kohli"
                        fetchPriority="high"
                        width="45"
                        height="45"
                        decoding="async"
                        style={{ color: "transparent" }}
                        src="/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2Fcategory%2Fvirat_kohli.png&amp;w=96&amp;q=75"
                      />
                    </div>
                    <div className="pt-6 text-10 text-CBBBDDD line-clamp-1">
                      <p className="text-center">Virat Kohli</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TrendingArticles;
