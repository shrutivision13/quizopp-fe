import React from "react";
import InitialPage from "../pages/InitialPage";
import StartQuiz from "../pages/Start-Quiz";
import AuthPage from "../pages/AuthPage";
import PhoneLogin from "../pages/AuthPage/PhoneLogin";
import Home from "../pages/Home";
import Category from "../pages/Category";
import CategoryDetails from "../pages/CategoryDetails";
import { Contests } from "../pages/Contests";
import JoinContest from "../pages/JoinContest";

export const routes = [
  {
    path: "/",
    element: <Home />,
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
];
