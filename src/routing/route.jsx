import React from "react";
import InitialPage from "../pages/InitialPage";
import StartQuiz from "../pages/StartQuiz";
import AuthPage from "../pages/AuthPage";
import PhoneLogin from "../pages/AuthPage/PhoneLogin";
import Home from "../pages/Home";
import Category from "../pages/Category";
import OrderHistory from "../pages/OrderHistory";

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
    path: "/order-history",
    element: <OrderHistory />,
  },
];
