import React from "react";
import CountdownTimer from "../CountdownTimer/CountdownTimer";
import { useNavigate } from "react-router-dom";

const ContestsCard = ({ quizContest }) => {

  const navigate = useNavigate();
  const data = {
    _id: "680a12111b04c23b60a600df",
    categoryId: {
      _id: "6809c8051b04c23b60a5fb10",
      isActive: true,
      categoryName: "Hollywood",
      categoryIcon: "/hollywood.webp",
      backgroundColor: "#FFF6E2",
    },
    questionCount: 10,
    prize: 550,
    entryFee: 0,
    startTime: 1746163200,
    endTime: 1746170400,
    timeAllowed: 75,
    participation: 165,
  };

 

  const handelJoinContest = () => {
      navigate(
        `/${quizContest?.categoryId?.categoryName.toLowerCase().replace(/\s+/g, '-')}/join-contest?contestId=${quizContest?._id}`,
        { state: { quizContest } }
      );
  
  };

  return (
    <div onClick={handelJoinContest} className="contests-card-container" key={quizContest.id}>
     
        <div className="bg-C20213F flex rounded-10 p-20 shadow-contestCard mt-20">
          <div className="w-120 mr-20 flex">
            <div
              style={{ background: quizContest?.categoryId?.backgroundColor }}
              className="flex flex-col justify-center items-center rounded-10 w-[90px]"
            >
              <img
                alt="Bollywood"
                width={70}
                height={70}
                decoding="async"
                style={{ color: "transparent" }}
                src={`http://132.148.0.110:3000/images/category/${quizContest?.categoryId?.categoryIcon}`}
              />
              <p className="mt-8 font-bold text-12 text-C2C2C2C text-center px-10 leading-[14px] line-clamp-2">
                {quizContest?.categoryId?.categoryName}
              </p>
            </div>
          </div>

          <div className="w-full">
            <p className="text-16 font-bold text-CFFFFFF mb-4">
              Win up to{" "}
              <img
                alt="coin"
                src="https://static.quizzop.com/newton/assets/coin.png"
                style={{
                  width: "16px",
                  height: "16px",
                  display: "inline-block",
                  marginBottom: "2px",
                }}
              />{" "}
              {quizContest?.prize}
            </p>

            <div className="flex items-center mb-[4px]">
              <img
                alt="timer icon"
                width={11}
                height={14}
                decoding="async"
                style={{ color: "transparent" }}
                srcSet="https://static.quizzop.com/newton/assets/timer.png 1x, https://static.quizzop.com/newton/assets/timer.png 2x"
                src="https://static.quizzop.com/newton/assets/timer.png"
              />
              {/* <p className="ml-6 text-12 text-C8789C3">Ends in 00:21:59</p> */}
              <CountdownTimer endTime={quizContest.endTime} />
            </div>

            <div className="flex items-center mb-14">
              <img
                alt="play icon"
                width={9}
                height={10}
                decoding="async"
                style={{ color: "transparent" }}
                srcSet="https://static.quizzop.com/newton/assets/play-contest-icon.png 1x, https://static.quizzop.com/newton/assets/play-contest-icon.png 2x"
                src="https://static.quizzop.com/newton/assets/play-contest-icon.png"
              />
              <p className="ml-6 text-12 text-C8789C3">
                {quizContest?.participation} players playing
              </p>
            </div>

            <button className="whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border justify-center text-center font-bold text-14 text-C0DB25B bg-C20213F cursor-pointer flex items-center flex-col select-none opacity-100 px-24 py-6 rounded-[5px] border-C0DB25B uppercase w-full">
              <p>
                Play for{" "}
                <img
                  alt="coin"
                  src="https://static.quizzop.com/newton/assets/coin.png"
                  style={{
                    width: "14px",
                    height: "14px",
                    display: "inline-block",
                    marginBottom: "2px",
                  }}
                />{" "}
                {quizContest?.entryFee}
              </p>
            </button>
          </div>
        </div>
    </div>
  );
};

export default ContestsCard;
