import React from "react";
import Slider from "../../../components/Slider/Slider";

const trendingArticlesData = [
  {
    id: 0,
    title: "India",
    href: "/india/category",
    imgSrc: "src/assets/images/india-new.webp",
    bgColor: "#f8d7b0",
  },
  {
    id: 1,
    title: "Bollywood",
    href: "/bollywood/category",
    imgSrc: "src/assets/images/bollywood.png",
    bgColor: "#ffeaf3",
  },
  {
    id: 13,
    title: "ICC World Cup",
    href: "/icc-world-cup/category",
    imgSrc: "src/assets/images/icc-worldcup.WEBP",
    bgColor: "#f3d6bb",
  },
  {
    id: 2,
    title: "IPL",
    href: "/ipl/category",
    imgSrc: "",
    bgColor: "#fff0e0",
  },
  {
    id: 6,
    title: "Indian Independence",
    href: "/indian-independence/category",
    imgSrc: "src/assets/images/indian-independence-new.WEBP",
    bgColor: "#ffeee0",
  },
  {
    id: 8,
    title: "Shah Rukh Khan",
    href: "/shah-rukh-khan/category",
    imgSrc: "src/assets/images/srk.WEBP",
    bgColor: "#ffeae4",
  },
  {
    id: 6,
    title: "Raksha Bandhan",
    href: "/blogs/raksha-bandhan",
    imgSrc: "src/assets/images/raksha-bandhan.webp",
    bgColor: "#f5e2c3",
  },
  {
    id: 7,
    title: "Indian Mythology",
    href: "/indian-mythology/category",
    imgSrc: "src/assets/images/indian-mythology-new.WEBP",
    bgColor: "#efe1c3",
  },
  {
    id: 15,
    title: "Virat Kohli",
    href: "/virat-kohli/category",
    imgSrc: "/src/assets/images/virat_kohli.WEBP",
    bgColor: "#ffe1d4",
  },
  {
    id: 5,
    title: "Bank PO & Clerk",
    href: "/bank-po-clerk/category",
    imgSrc: "src/assets/images/bank_po.png",
    bgColor: "#c8f3ff",
  },
  {
    id: 10,
    title: "MS Dhoni",
    href: "/blogs/ms-dhoni",
    imgSrc: "src/assets/images/ms_dhoni.webp",
    bgColor: "#ebeab3",
  },
  {
    id: 11,
    title: "Holi",
    href: "/blogs/holi",
    imgSrc: "src/assets/images/holi.webp",
    bgColor: "#dafffe",
  },
  {
    id: 14,
    title: "Sachin Tendulkar",
    href: "/sachin-tendulkar/category",
    imgSrc: "/src/assets/images/sachin_tendulkar.WEBP",
    bgColor: "#c7e5ff",
  },
  {
    id: 13,
    title: "Ashneer Grover",
    href: "/blogs/ashneer-grover",
    imgSrc: "src/assets/images/ashneer-grover.webp",
    bgColor: "#c7d2ff",
  },
  {
    id: 9,
    title: "Salman Khan",
    href: "/salman-khan/category",
    imgSrc: "src/assets/images/salman_khan.WEBP",
    bgColor: "#dae5ff",
  },
  {
    id: 12,
    title: "Indian Constitution",
    href: "/indian-constitution/category",
    imgSrc: "src/assets/images/indian-constitution.WEBP",
    bgColor: "#f2d4bf",
  },
];

function TrendingArticles() {
  return (
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
          <h2 className="text-14 font-bold text-CFAFAFA">Trending Articles</h2>
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
              {trendingArticlesData.map((article) => (
                <div
                  key={article.id}
                  className="snap-center relative rounded-20 mr-10 flex flex-col items-center justify-center min-w-[70px] first:ml-0 last:mr-0 pr-[0px]"
                  data-testid={`quiz-category-icon-${article.id}`}
                >
                  <a href={article.href}>
                    <div
                      className="whitespace-nowrap text-18 font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-CFFDEE5 cursor-pointer relative flex justify-center items-center h-[70px] w-[70px] rounded-[12px]"
                      style={{ backgroundColor: article.bgColor }}
                    >
                      <img
                        alt={article.title}
                        fetchPriority="high"
                        width="45"
                        height="45"
                        decoding="async"
                        style={{ color: "transparent" }}
                        src={article.imgSrc}
                      />
                    </div>
                    <div className="pt-6 text-10 text-CBBBDDD line-clamp-1">
                      <p className="text-center">{article.title}</p>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default TrendingArticles;
