import React from "react";

const PickCategories = () => {
  return (
    <div className="relative rounded-10 px-20 py-20 shadow-contestCard z-10 ">
      <div className="absolute inset-0 h-full w-full -z-1">
        <img
          alt="mini-quiz"
          fetchpriority="high"
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
          srcSet="https://static.quizzop.com/newton/assets/mini-quiz-bg.png?w=640&q=75 640w, https://static.quizzop.com/newton/assets/mini-quiz-bg.png?w=750&q=75 750w, https://static.quizzop.com/newton/assets/mini-quiz-bg.png?w=828&q=75 828w, https://static.quizzop.com/newton/assets/mini-quiz-bg.png?w=1080&q=75 1080w, https://static.quizzop.com/newton/assets/mini-quiz-bg.png?w=1200&q=75 1200w, https://static.quizzop.com/newton/assets/mini-quiz-bg.png?w=1920&q=75 1920w, https://static.quizzop.com/newton/assets/mini-quiz-bg.png?w=2048&q=75 2048w, https://static.quizzop.com/newton/assets/mini-quiz-bg.png?w=3840&q=75 3840w"
          src="https://static.quizzop.com/newton/assets/mini-quiz-bg.png?w=3840&q=75"
        />
      </div>

      <div className="flex items-center justify-center mb-14">
        <p className="text-CFFFFFF z-8 text-16 text-center font-bold">
          Pick Upto 3 Categories
        </p>
      </div>

      <div className="flex justify-between mb-14">
        <div
          style={{ background: "#F3D6BB" }}
          data-testid="mini-quiz-category-item-0"
          className="rounded-12 bg-CFFDEE5 cursor-pointer relative flex justify-center items-center h-120 w-97 mr-16 last:mr-0"
        >
          <div className="w-full flex justify-center absolute top-14">
            <img
              alt="ICC World Cup"
              loading="lazy"
              width="60"
              height="60"
              decoding="async"
              style={{ color: "transparent" }}
            />
          </div>
          <div className="absolute z-10 w-full flex justify-center bottom-8 px-10">
            <p className="text-12 text-C2C2C2C font-bold text-center leading-14 line-clamp-2">
              ICC World Cup
            </p>
          </div>
        </div>

        <div
          className="min-h-120 flex justify-center items-center mr-16 last:mr-0 border-1 border-dashed placeholder-box border-CFEDC34 rounded-8 bg-CFFFFFF1F w-85 !min-h-120 cursor-pointer"
          data-testid="mini-quiz-add-card"
        >
          <span className="text-40 font-medium text-CFEDC34">+</span>
        </div>

        <div
          className="min-h-120 flex justify-center items-center mr-16 last:mr-0 border-1 border-dashed placeholder-box border-CFEDC34 rounded-8 bg-CFFFFFF1F w-85 !min-h-120 cursor-pointer"
          data-testid="mini-quiz-add-card"
        >
          <span className="text-40 font-medium text-CFEDC34">+</span>
        </div>
      </div>

      <button
        className="items-center justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-C0DB25B rounded-3 font-bold text-CFFFFFF uppercase text-center inline-block py-5 px-20 rounded-3 text-14 !py-8 w-full"
        data-testid="create-quiz-button"
      >
        CREATE QUIZ
      </button>
    </div>
  );
};

export default PickCategories;
