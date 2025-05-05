import React from "react";
import TopQuiz from "./TopQuiz";
import { QuizContests } from "./QuizContests";
import QuizBites from "./QuizBites";
import TrendingQuiz from "./TrendingQuiz";
import AdSlot from "../../components/AdSense/AdSlot";
import TrendingArticles from "./TrendingArticles/TrendingArticles";
import TrendingGames from "./TrendingGames/Index";
import LiveScoreCard from "./LiveScoreCard";
import HoroscopeCard from "./HoroscopeCard";

const Home = () => {
  return (
    <>
      <TopQuiz />
      <AdSlot
        slotId="div-gpt-ad-1745314508467-0"
        adUnitPath="/23289596447/adx6"
        sizes={[336, 280]}
      />
      <QuizContests />
      <QuizBites />
      <AdSlot
        slotId="div-gpt-ad-1745314508467-0"
        adUnitPath="/23289596447/adx6"
        sizes={[336, 280]}
      />
      <TrendingQuiz />
      <TrendingArticles />
      <LiveScoreCard />
      <TrendingGames />
      <HoroscopeCard />
    </>
  );
};

export default Home;
