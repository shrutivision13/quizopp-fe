import React from "react";
import TrendingQuizCard from "../../../components/TrendingQuizCard/TrendingQuizCard";
import { SectionHeading } from "../../../components/Ui/SectionHeading";

const TrendingQuiz = () => {
  return (
    <div className="mt-24 px-20">
      <SectionHeading title={"Trending Quiz Topics"} button={"See all"} />
      <div className="flex scroll mx-1 snap-x snap-mandatory overflow-scroll hide-scroll-bar">
        <TrendingQuizCard />
        <TrendingQuizCard />
        <TrendingQuizCard />
        <TrendingQuizCard />
        <TrendingQuizCard />
        <TrendingQuizCard />
        <TrendingQuizCard />
        <TrendingQuizCard />
        <TrendingQuizCard />
        <TrendingQuizCard />
      </div>
    </div>
  );
};

export default TrendingQuiz;
