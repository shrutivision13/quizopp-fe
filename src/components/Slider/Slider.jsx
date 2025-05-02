import React, { useRef, useState, useEffect } from "react";

function Slider({ children }) {
  const scrollContainerRef = useRef(null);
  const [isLeftArrowVisible, setIsLeftArrowVisible] = useState(false);
  const [isRightArrowVisible, setIsRightArrowVisible] = useState(true);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setIsLeftArrowVisible(scrollLeft > 0);
      setIsRightArrowVisible(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      handleScroll(); // Initialize visibility on mount
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="relative">
      {/* Left Navigation Arrow */}
      {isLeftArrowVisible && (
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
      )}

      {/* Right Navigation Arrow */}
      {isRightArrowVisible && (
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
      )}

      {/* Scrollable Content */}
      <div
        ref={scrollContainerRef}
        className="flex scroll  snap-x snap-mandatory overflow-scroll  hide-scroll-bar"
      >
        {children}
      </div>
    </div>
  );
}

export default Slider;
