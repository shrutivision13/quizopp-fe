import React from "react";
import { useNavigate } from "react-router-dom";

const PickCategories = ({
  title,
  quizBites,
  button,
  quizBitesData,
  handleRemove,
}) => {
  const IMAGEURL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  return (
    <div
      className={`relative rounded-10 px-20 py-20 shadow-contestCard z-10 ${
        quizBites ? "bg-C20213F" : ""
      }`}
    >
      {!quizBites ? (
        <div
          className="absolute inset-0 h-full w-full"
          style={{ zIndex: -100 }}
        >
          <img
            alt="mini-quiz"
            decoding="async"
            className="mini-quiz-bg"
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              color: "transparent",
            }}
            sizes="100vw"
            src="https://static.quizzop.com/newton/assets/mini-quiz-bg.png?w=3840&q=75"
          />
        </div>
      ) : null}
      <div className="flex items-center justify-center mb-14">
        <p className="text-CFFFFFF z-8 text-16 text-center font-bold">
          {title}
        </p>
      </div>
      <div className="flex justify-between mb-14">
        {quizBitesData?.map((item) => (
          <div
            style={{ background: item?.backgroundColor }}
            key={item?._id}
            data-testid="mini-quiz-category-item-0"
            className="rounded-12 bg-CFFDEE5 cursor-pointer relative flex justify-center items-center h-120 w-97 mr-16 last:mr-0 "
          >
            {quizBites && (
              <div
                data-testid="remove-category-button-0"
                className="absolute -top-12 -right-12"
                onClick={(event) => {
                  event.stopPropagation();
                  handleRemove(item?._id);
                }}
              >
                <svg
                  width="38"
                  height="38"
                  viewBox="0 0 38 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transform transition-transform duration-300 ease-in-out rotate-0"
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
            )}

            <div className="w-full flex justify-center absolute top-14">
              <img
                alt="ICC World Cup"
                loading="lazy"
                width="60"
                height="60"
                decoding="async"
                style={{ color: "transparent" }}
                src={`${IMAGEURL}/images/category/${item?.categoryIcon}`}
              />
            </div>
            <div className="absolute z-10 w-full flex justify-center bottom-8 px-10">
              <p className="text-12 text-C2C2C2C font-bold text-center leading-14 line-clamp-2">
                {item?.categoryName}
              </p>
            </div>
          </div>
        ))}

        {Array.from({ length: 3 - (quizBitesData?.length || 0) }).map(
          (_, idx) => (
            <div
              key={`add-card-${idx}`}
              className="min-h-120 flex justify-center items-center mr-16 last:mr-0 border-1 border-dashed placeholder-box border-CFEDC34 rounded-8 bg-CFFFFFF1F w-95 !min-h-120 cursor-pointer"
              data-testid="mini-quiz-add-card"
            >
              <span className="text-40 font-medium text-CFEDC34">+</span>
            </div>
          )
        )}
      </div>
      {button && (
        <button
          className="items-center justify-center z-10 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-C0DB25B rounded-3 font-bold text-CFFFFFF uppercase text-center inline-block py-5 px-20 rounded-3 text-14 !py-8 w-full"
          data-testid="create-quiz-button"
          onClick={() => {
            if (button.name === "CREATE QUIZ") {
              navigate("/mini-quiz-category-selection");
            }
          }}
        >
          {button.name}
        </button>
      )}
    </div>
  );
};

export default PickCategories;
