import React from "react";
import InitialPage from "../pages/InitialPage";
import StartQuiz from "../pages/StartQuiz";
import AuthPage from "../pages/AuthPage";
import PhoneLogin from "../pages/AuthPage/PhoneLogin";
import Home from "../pages/Home";
import Category from "../pages/Category";
import OrderHistory from "../pages/OrderHistory";
import CategoryDetails from "../pages/CategoryDetails";
import { Contests } from "../pages/Contests";
import QuizBites from "../pages/QuizBites";
import JoinContest from "../pages/Contests/JoinContest";
import ContestRules from "../pages/Contests/ContestRules";
import PlayContest from "../pages/Contests/PlayContest";
import ContestResult from "../pages/Contests/ContestResult";
import Games from "../pages/Games";
import SpinWheel from "../pages/SpinWheel";
import QuizBattles from "../pages/Games/QuizBattles/QuizBattles";
import BeginQuiz from "../pages/Games/BeginQuiz/BeginQuiz";
import BlogArticles from "../pages/BlogArticles/BlogArticles";
import BlogArticlesDetails from "../pages/BlogArticlesDetails/BlogArticlesDetails";
import { AuthProtectedRoute } from "../components/AuthProtectedRoute/AuthProtectedRoute";
import FindOponent from "../pages/Games/FindOponent";
import MiniQuizPlay from "../pages/QuizBites/MiniQuizPlay";
import MiniQuizOver from "../pages/QuizBites/MiniQuizOver";
import DownloadApp from "../pages/DownloadApp";
import TermsofUse from "../pages/FooterPages/TermsofUse";
import PrivacyPolicy from "../pages/FooterPages/PrivacyPolicy";

export const routes = [
  {
    path: "/",
    element: (
      <AuthProtectedRoute>
        <Home />
      </AuthProtectedRoute>
    ),
  },
  {
    path: "/get-started",
    element: <InitialPage />,
  },
  {
    path: "/start-quiz",
    element: <StartQuiz />,
  },
  {
    path: "/login",
    element: <AuthPage />,
  },
  {
    path: "/login/phone",
    element: <PhoneLogin />,
  },
  {
    path: "/category",
    element: <Category />,
  },
  {
    path: "/order-history",
    element: <OrderHistory />,
  },
  {
    path: "/:categoryName/category",
    element: <CategoryDetails />,
  },
  {
    path: "/contests",
    element: <Contests />,
  },
  {
    path: "/:categoryName/join-contest",
    element: <JoinContest />,
  },
  {
    path: "/mini-quiz-category-selection",
    element: <QuizBites />,
  },
  {
    path: "/contest-rules",
    element: <ContestRules />,
  },
  {
    path: "/:categoryName/play-contest",
    element: <PlayContest />,
  },
  {
    path: "/:categoryName/contest-rank",
    element: <ContestResult />,
  },
  {
    path: "/:categoryName/play-quiz",
    element: <Games />,
  },
  {
    path: "/:categoryName/join-quiz",
    element: <FindOponent />,
  },
  {
    path: "/spin-wheel",
    element: <SpinWheel />,
  },
  {
    path: "/:categoryName/end-quiz",
    element: <QuizBattles />,
  },
  {
    path: "/:categoryName/begin-quiz",
    element: <BeginQuiz />,
  },
  {
    path: "/blogs",
    element: <BlogArticles />,
  },
  {
    path: "/blogs/:categoryName",
    element: <BlogArticles />,
  },
  {
    path: "/blogs-details/:articleId",
    element: <BlogArticlesDetails />,
  },
  {
    path: "/mini-quiz-play",
    element: <MiniQuizPlay />,
  },
  {
    path: "/mini-quiz-over",
    element: <MiniQuizOver />,
  },
  {
    path: "/download-app",
    element: <DownloadApp />,
  },
   {
    path: "/termsofuse",
    element: <TermsofUse />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
];
