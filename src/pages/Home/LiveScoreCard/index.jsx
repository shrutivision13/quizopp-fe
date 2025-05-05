import React from "react";
import { SectionHeading } from "../../../components/Ui/SectionHeading";
import ScoreCard from "../../../components/ScoreCard/ScoreCard";

const LiveScoreCard = () => {
  return (
    <div className="px-20 mt-24">
      <SectionHeading title={"Play Games"} powerdBy />
      <div className="grid gap-14">
        <ScoreCard
          image={
            "https://www.quizzop.com/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2Fcriczop-banner.png&w=1920&q=75"
          }
        />
      </div>
    </div>
  );
};

export default LiveScoreCard;
