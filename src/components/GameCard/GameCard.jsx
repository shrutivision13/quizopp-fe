import React, { useRef } from "react";

const gameList = [
  {
    href: "https://cfuucl7YgA.play.gamezop.com/game/HJP4afkvqJQ/CityCricket",
    img: "https://static.gamezop.com/HJP4afkvqJQ/square.png",
    title: "City Cricket",
  },
  {
    href: "https://cfuucl7YgA.play.gamezop.com/game/B1fSpMkP51m/BottleShoot",
    img: "https://static.gamezop.com/B1fSpMkP51m/square.png",
    title: "Bottle Shoot",
  },
  {
    href: "https://cfuucl7YgA.play.gamezop.com/game/HJP4afkvqJQ/CityCricket",
    img: "https://static.gamezop.com/HJP4afkvqJQ/square.png",
    title: "City Cricket",
  },
  {
    href: "https://cfuucl7YgA.play.gamezop.com/game/B1fSpMkP51m/BottleShoot",
    img: "https://static.gamezop.com/B1fSpMkP51m/square.png",
    title: "Bottle Shoot",
  },
];

const GameCard = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      <div className="relative">
        {/* Arrows */}
        <div className="absolute justify-between inset-0 flex w-full items-center">
          <div
            className="cursor-pointer horizontal-scroll-bg-left h-full flex justify-start items-center z-50 scale-1"
            onClick={() => scroll("left")}
          >
            <div className="pl-10">
              {/* Left Arrow */}
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                <path
                  d="M15 30C6.71573 30 0 23.2843 0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15C30 23.2843 23.2843 30 15 30Z"
                  fill="#FFCC5B"
                />
                <path
                  d="M14.9969 15.0002L18.2578 11.5219L16.6273 9.78271L11.7361 15.0002L16.6273 20.2175L18.2578 18.4784L14.9969 15.0002Z"
                  fill="#2C2C2C"
                />
              </svg>
            </div>
          </div>
          <div
            className="cursor-pointer horizontal-scroll-bg-right h-full flex justify-end items-center z-50 scale-1"
            onClick={() => scroll("right")}
          >
            <div className="pr-10">
              {/* Right Arrow */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                className="rotate-180"
              >
                <path
                  d="M15 30C6.71573 30 0 23.2843 0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15C30 23.2843 23.2843 30 15 30Z"
                  fill="#FFCC5B"
                />
                <path
                  d="M14.9969 15.0002L18.2578 11.5219L16.6273 9.78271L11.7361 15.0002L16.6273 20.2175L18.2578 18.4784L14.9969 15.0002Z"
                  fill="#2C2C2C"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Scrollable Carousel */}
        <div
          ref={scrollRef}
          className="flex overflow-x-scroll scrollbar-hide snap-x snap-mandatory space-x-4 px-4"
        >
          {gameList.map((game, index) => (
            <a
              key={index}
              href={game.href}
              className="snap-center relative rounded-20 min-w-145 min-h-210"
            >
              <div className="rounded-20 relative overflow-hidden h-full w-full">
                <img
                  alt={game.title}
                  loading="lazy"
                  decoding="async"
                  className="rounded-20 object-cover"
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    inset: 0,
                    color: "transparent",
                  }}
                  sizes="100vw"
                  src={game.img}
                />
              </div>
              <div className="absolute inset-0 z-10 bg-gamezop-overlay rounded-20" />
              <div className="absolute bottom-20 w-full z-10 px-10">
                <p className="text-14 text-CFFFFFF text-center font-medium">{game.title}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameCard;
