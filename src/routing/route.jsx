import React from 'react';
import InitialPage from '../pages/InitialPage';
import StartQuiz from '../pages/Start-Quiz';
import AuthPage from '../pages/AuthPage';
import PhoneLogin from '../pages/AuthPage/PhoneLogin';
import Home from '../pages/Home';
import MenuPage from '../pages/MenuPage';

export const routes = [
  {
    path: '/get-started',
    element: <InitialPage />,
  },
  {
    path: '/start-quiz',
    element: <StartQuiz />,
  },
  {
    path: '/login',
    element: <AuthPage />,
  },
  {
    path: '/login/phone',
    element: <PhoneLogin />,
  },
  {
    path: '/',
    element: <Home />,
    path: '/menu-page',
    element: <MenuPage />,
  },
];
