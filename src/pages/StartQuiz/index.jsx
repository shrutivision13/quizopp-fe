import React, { useEffect, useState } from "react";
import PrimaryButton from "../../components/Button/Button";
import videoPoster from "../../assets/images/start-quiz-dark.png";
import videourl from "../../assets/video/start-quiz-dark.mp4";
import videourlwebm from "../../assets/video/start-quiz-dark.webm";
import AdSlot from "../../components/AdSense/AdSlot";
import { useNavigate } from "react-router-dom";

const StartQuiz = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const nevigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDisabled(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="px-20 mt-30">
        <div className="flex justify-center mb-14">
          <video
            poster={videoPoster}
            autoPlay
            muted
            playsInline
            width="80"
            height="80"
            className="h-80"
          >
            <source src={videourl} type="video/mp4" />
            <source src={videourlwebm} type="video/webm" />
          </video>
        </div>

        <p className="text-14 mb-28 text-center font-bold text-CFAFAF9">
          Quizzop is ready for you!
        </p>

        <PrimaryButton
          onClick={() => {nevigate("/");}}
          text="Start Now"
          shine={!isDisabled}
          disabled={isDisabled}
        />
      </div>

      <AdSlot
        slotId="div-gpt-ad-1745314508467-0"
        adUnitPath="/23289596447/adx6"
        sizes={[336, 5]}
      />
    </>
  );
};

export default StartQuiz;
