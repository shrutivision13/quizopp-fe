import React from 'react';
import InitialPage from '../pages/InitialPage';
import StartQuiz from '../pages/Start-Quiz';
import Auth from '../pages/AuthPage/Auth';

export const routes = [
  {
    path: '/get-started',
    element: <InitialPage />,
  },
  {
    path: '/start-quiz',
    element: <StartQuiz />,
  }
];
