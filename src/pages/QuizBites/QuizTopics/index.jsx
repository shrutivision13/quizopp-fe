import React, { useState, useRef, useEffect } from "react";
import TopQuiz from "../../Home/TopQuiz";

const QuizTopics = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);
  const [height, setHeight] = useState("60px");

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  useEffect(() => {
    if (isExpanded && contentRef.current) {
      setHeight(`${contentRef.current.scrollHeight + 555}px`);
    } else {
      setHeight("60px");
    }
  }, [isExpanded]);

  return (
    <aside
      className="z-20 bottom-sheet_fadeInUp__X6_5w fixed w-full bottom-0 transition-all duration-300 ease-in-out"
      style={{ height }}
    >
      <div className="shadow-contestCard text-CFFFFFF rounded-t-20 max-w-maxW w-full bg-C20213F transition-all duration-300 ease-in-out">
        <div className="w-full">
          {/* Header */}
          <div className="py-20 px-20 text-2C2C2C text-14 font-medium flex justify-between">
            <div className="flex items-center">
              <div className="w-30 h-30 bg-C26284C rounded-full flex items-center justify-center">
                <img
                  alt="drawer icon"
                  loading="lazy"
                  width="20"
                  height="20"
                  decoding="async"
                  data-nimg="1"
                  style={{ color: "transparent" }}
                  src="https://static.quizzop.com/newton/assets/ic_quiz_category_dark.svg"
                />
              </div>
              <span className="ml-[7px]">QUIZ TOPICS</span>
            </div>
            <div
              onClick={toggleExpand}
              className="cursor-pointer rounded-full h-30 w-30 bg-C26284C flex items-center justify-center"
            >   
              <div className="h-24 w-24">
                {isExpanded ? (
                  <svg
                    fill="none"
                    viewBox="0 0 48 48"
                    className="fill-current text-CBBBDDD"
                  >
                    <path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z" />
                    <path d="M0 0h48v48H0z" fill="none" />
                  </svg>
                ) : (
                  <svg
                    fill="none"
                    viewBox="0 0 48 48"
                    className="fill-current text-CBBBDDD"
                  >
                    <path
                      d="M14 20l10 10 10-10"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            </div>
          </div>

          {/* Animated content */}
          <div
            ref={contentRef}
            className="transition-all duration-300 ease-in-out overflow-y-auto hide-scrollbar"
          >
            {isExpanded && (
              <>
                <hr className="h-2 border border-C404380" />
                <TopQuiz removeHeader={true} />
              </>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default QuizTopics;
