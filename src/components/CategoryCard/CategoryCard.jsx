import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const CategoryCard = ({ category }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleCardClick = () => {
    navigate(`/${category?.categorySlug}/category`, { state: category }); // Pass the entire category object in state
  };

  const isLiked = category?.categoryName === "Holi";

  return (
    <div className="relative" key={category?._id} onClick={handleCardClick}> {/* Add onClick */}
      {/* Like Icon */}
      <div
        data-testid={`category-${category?.categoryName?.toLowerCase()}-like-icon`}
        className="absolute top-[4px] right-[4px] cursor-pointer"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" rx="12" fill="white" />
          <path
            d="M11.9924 7.91613C13.3998 6.65247 15.5748 6.69441 16.9308 8.05274C18.2861 9.41167 18.3329 11.5759 17.0722 12.9876L11.9912 18.0758L6.91135 12.9876C5.65068 11.5759 5.69802 9.40808 7.05276 8.05274C8.40989 6.69621 10.5807 6.65067 11.9924 7.91613Z"
            fill={isLiked ? "#FF4D4D" : "none"}
            stroke={isLiked ? "none" : "#959595"}
          />
        </svg>
      </div>

      {/* Category Content */}
      <div className="rounded-12 h-140 flex flex-col items-center justify-center" style={{ backgroundColor: category?.backgroundColor }}>
        <div className="flex justify-center mb-14">
          <img
            alt={category?.categoryName}
            loading="lazy"
            width="70"
            height="70"
            style={{ color: "transparent" }}
            src={`http://132.148.0.110:3000/images/category/${category?.categoryIcon}`}
          />
        </div>
        <div className="z-10 w-full flex justify-center px-10">
          <p className="text-12 text-C000000 font-bold text-center">
            {category?.categoryName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
