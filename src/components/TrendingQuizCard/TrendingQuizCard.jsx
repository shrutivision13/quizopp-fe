import React from "react";

const TrendingQuizCard = ({ category }) => {
  const IMAGEURL = import.meta.env.VITE_API_BASE_URL;
  return (
    <div
      className="snap-center min-w-97px relative rounded-20 mr-10 last:mr-20 flex flex-col items-center justify-center"
      data-testid="category-card-0"
    >
      <a href="/india/category">
        <div
          className="whitespace-nowrap text-18 font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer relative flex justify-center items-center bg-CFFDEE5 h-[120px] w-[97px] rounded-[12px] pb-10"
          style={{ backgroundColor: "rgb(248, 215, 176)" }}
        >
          <img
            alt="India"
            width="70"
            height="70"
            decoding="async"
            data-nimg="1"
            src={
              category?.categoryIcon
                ? `${IMAGEURL}/images/category/${category?.categoryIcon}`
                : category?.imgsrc
            }
            style={{ color: "transparent" }}
          />
          <div className="absolute z-10 w-full flex justify-center bottom-8 px-10">
            <p className="text-12 text-C2C2C2C font-bold text-center leading-[14px] line-clamp-2">
              {category?.categoryName}
            </p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default TrendingQuizCard;
