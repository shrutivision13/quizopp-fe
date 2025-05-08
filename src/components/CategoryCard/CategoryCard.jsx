import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const CategoryCard = ({
  category,
  handleLikeCategory,
  handleDislikeCategory,
  removeHeader,
  removeheart
}) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleCardClick = () => {
    navigate(`/${category?.categorySlug}/category`, { state: category }); // Pass the entire category object in state
  };


  return (
    <div className="relative" key={category?._id} onClick={handleCardClick}>
      {" "}
      {/* Add onClick */}
      {/* Like Icon */}
      {!removeHeader ? (
        <>
          <div
            data-testid="remove-category-button-0"
            className="absolute -top-12 -right-12"
          >
            <svg
              width="38"
              height="38"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transform transition-transform duration-300 ease-in-out -rotate-45"
            >
              <g filter="url(#filter0_d_9453_60829)">
                <path
                  d="M19 29C25.6274 29 31 23.6274 31 17C31 10.3726 25.6274 5 19 5C12.3726 5 7 10.3726 7 17C7 23.6274 12.3726 29 19 29Z"
                  className="fill-current text-C26284C"
                ></path>
              </g>
              <path
                d="M20.4457 17.0002L23.6107 13.8332C23.6459 13.796 23.6655 13.7468 23.6655 13.6957C23.6655 13.6445 23.6459 13.5953 23.6107 13.5582L22.4407 12.3902C22.4227 12.372 22.4012 12.3577 22.3777 12.3479C22.3541 12.3381 22.3288 12.333 22.3032 12.333C22.2776 12.333 22.2523 12.3381 22.2288 12.3479C22.2052 12.3577 22.1837 12.372 22.1657 12.3902L19.0007 15.5552L15.8327 12.3902C15.7956 12.355 15.7464 12.3354 15.6952 12.3354C15.6441 12.3354 15.5948 12.355 15.5577 12.3902L14.3907 13.5602C14.3555 13.5973 14.3359 13.6465 14.3359 13.6977C14.3359 13.7488 14.3555 13.798 14.3907 13.8352L17.5557 17.0002L14.3907 20.1652C14.3555 20.2023 14.3359 20.2515 14.3359 20.3027C14.3359 20.3538 14.3555 20.403 14.3907 20.4402L15.5607 21.6092C15.5787 21.6273 15.6002 21.6416 15.6237 21.6514C15.6473 21.6612 15.6726 21.6663 15.6982 21.6663C15.7238 21.6663 15.7491 21.6612 15.7727 21.6514C15.7962 21.6416 15.8177 21.6273 15.8357 21.6092L19.0007 18.4442L22.1657 21.6092C22.1837 21.6273 22.2052 21.6416 22.2288 21.6514C22.2523 21.6612 22.2776 21.6663 22.3032 21.6663C22.3288 21.6663 22.3541 21.6612 22.3777 21.6514C22.4012 21.6416 22.4227 21.6273 22.4407 21.6092L23.6107 20.4402C23.6459 20.403 23.6655 20.3538 23.6655 20.3027C23.6655 20.2515 23.6459 20.2023 23.6107 20.1652L20.4457 17.0002Z"
                className="fill-current text-CBBBDDD"
              ></path>
              <defs>
                <filter
                  id="filter0_d_9453_60829"
                  x="0"
                  y="0"
                  width="38"
                  height="38"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood
                    floodOpacity="0"
                    result="BackgroundImageFix"
                  ></feFlood>
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  ></feColorMatrix>
                  <feOffset dy="2"></feOffset>
                  <feGaussianBlur stdDeviation="3"></feGaussianBlur>
                  <feComposite in2="hardAlpha" operator="out"></feComposite>
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.13 0"
                  ></feColorMatrix>
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_9453_60829"
                  ></feBlend>
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_9453_60829"
                    result="shape"
                  ></feBlend>
                </filter>
              </defs>
            </svg>
          </div>
        </>
      ) : (
        !removeheart && (
        <div
          data-testid={`category-${category?.categoryName?.toLowerCase()}-like-icon`}
          className="absolute top-[4px] right-[4px] cursor-pointer"
          onClick={(event) => {
            event.stopPropagation();
            if (category?.isFavourite) {
              handleDislikeCategory(category?._id);
            } else {
              handleLikeCategory(category?._id);
            }
          }}
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
              fill={category?.isFavourite ? "#FF4D4D" : "none"}
              stroke={category?.isFavourite ? "none" : "#959595"}
            />
          </svg>
        </div>
        )
      )}
      <div
        className="rounded-12 h-140 flex flex-col items-center justify-center"
        style={{ backgroundColor: category?.backgroundColor }}
      >
        <div className="flex justify-center mb-14">
          <img
            alt={category?.categoryName}
            loading="lazy"
            width="70"
            height="70"
            style={{ color: "transparent" }}
            src={category.categoryIcon ? `http://132.148.0.110:3000/images/category/${category?.categoryIcon}` : category?.imgsrc}
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
