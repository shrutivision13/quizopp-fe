import React from 'react';
import InitialPage from '../pages/InitialPage';
import StartQuiz from '../pages/Start-Quiz';
import AuthPage from '../pages/AuthPage';
import PhoneLogin from '../pages/AuthPage/PhoneLogin';

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
    path: '//login/phone',
    element: <PhoneLogin />,
  },
];
