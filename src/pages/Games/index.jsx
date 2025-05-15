import React, {
  useReducer,
  useEffect,
  useMemo,
  useCallback,
  useState,
} from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ApiGetGamesQuestions,
  ApiUpdateQuizParticipation,
} from "../../api-wrapper/games/ApiGames";
import lifelinesData from "../../utils/lifelinesData.json";
import "../../styles/components/games/games.css";
import player1 from "../../assets/images/players/player-1.webp";
import playerYou from "../../assets/images/players/player-0.webp";
import chatIcon from "../../assets/images/chat-icon.webp";
import stopWatch from "../../assets/images/stopwatch.webp";
import speakerActive from "../../assets/images/battle-speaker-active.webp";
import speakerInactive from "../../assets/images/battle-speaker-inactive.webp";
import Lifelines from "../../components/Lifelines/Lifelines";
import FiftyFiftyIcon from "../../components/Icons/FiftyFiftyIcon";
import FlipQuestion from "../../components/Icons/FlipQuestion";
import FreezeTime from "../../components/Icons/FreezeTime";

import AudiencePoll from "../../components/Icons/AudiencePoll";
import Coins from "../../components/Icons/Coins";
import AdVideoIcon from "../../components/Icons/AdVideoIcon";
import CloseIcon from "../../components/Icons/CloseIcon";
import ReportQuestion from "./ReportQuestion";
import { toast } from "react-toastify";
import EmojiDrawer from "../../components/EmojiDrawer/EmojiDrawer";



// 1) reducer + initialState
const initialState = {
  questions: [],
  currentIndex: 0,
  score: 0,
  selectedOption: null,
  shakeIndex: null,
  isMuted: false,
  lifelineOpen: false,
  activeLifelineId: null,
  showReportUI: false,
  timerPaused: false,
  freezeLifelineActivated: false,
  lifelinesUsed: 0,
  totalSeconds: 0,
  coinsSpent: 0,
  correctAnswer: 0,
  usedLifelines: [],
  hasReportedQuestions: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_QUESTIONS": {
      const formatOptions = (options) =>
        options?.map((opt) => ({ text: opt?.text||opt, hidden: false }));

      const formattedQs = action?.questions?.slice(0, 5)?.map((q) => ({
        ...q,
        options: formatOptions(q?.options),
      }));

      const extraQuestion = {
        ...action?.questions[5],
        options: formatOptions(action?.questions[5]?.options),
      };

      return {
        ...state,
        questions: formattedQs,
        extraQuestion,
      };
    }

    case "NEXT_QUESTION":
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
        selectedOption: null,
        shakeIndex: null,
        timerPaused: false,
        freezeLifelineActivated: false,
      };

    case "ANSWER":
      return {
        ...state,
        selectedOption: action?.option,
        score: state.score + (action?.correct ? 20 : -10),
        correctAnswer: state.correctAnswer + (action?.correct ? 1 : 0),
        shakeIndex: action?.correct ? null : action?.index,
      };

    case "TOGGLE_MUTE":
      return { ...state, isMuted: !state.isMuted };

    case "TOGGLE_LIFELINES":
      return {
        ...state,
        lifelineOpen: !state.lifelineOpen,
        activeLifelineId: null,
      };

    case "ACTIVATE_LIFELINE": {
      return {
        ...state,
        activeLifelineId: action?.id,
        timerPaused: true,
      };
    }
    case "CONFIRM_LIFELINE_USE": {
      if (state.usedLifelines.includes(action?.id)) return state;
      return {
        ...state,
        coinsSpent: state.coinsSpent + (action?.price || 0),
        lifelinesUsed: state.lifelinesUsed + 1,
        usedLifelines: [...state.usedLifelines, action?.id],
      };
    }
    case "CLOSE_LIFELINE":
      return {
        ...state,
        lifelineOpen: false,
        activeLifelineId: null,
        timerPaused: state?.freezeLifelineActivated,
      };

    case "ACTIVATE_FREEZE_TIMER":
      return {
        ...state,
        freezeLifelineActivated: true,
      };
    case "MARK_QUESTION_REPORTED":
      return {
        ...state,
        hasReportedQuestions: {
          ...state?.hasReportedQuestions,
          _id: action.questionId,
        },
      };
    case "SHOW_REPORT":
      return { ...state, showReportUI: true };

    case "HIDE_REPORT":
      return { ...state, showReportUI: false };

    case "INCREMENT_TOTAL_SECONDS":
      return {
        ...state,
        totalSeconds: state.totalSeconds + 1,
      };

    case "ACTIVATE_50_50_LIFELINE": {
      const currentQ = state.questions[state.currentIndex];
      const correctAnswer = currentQ.options[0].text;

      const updatedOptions = currentQ?.options?.map((o) => ({ ...o }));
      const wrongIndexes = updatedOptions
        .map((o, idx) => (o.text !== correctAnswer ? idx : null))
        .filter((i) => i !== null)
        .slice(0, 2);

      wrongIndexes.forEach((i) => (updatedOptions[i].hidden = true));

      return {
        ...state,
        questions: state?.questions?.map((q, index) =>
          index === state.currentIndex ? { ...q, options: updatedOptions } : q
        ),
        usedLifelines: [...state.usedLifelines, "50_50"],
        lifelinesUsed: state.lifelinesUsed + 1,
      };
    }

    default:
      throw new Error(`Unknown action ${action.type}`);
  }
}

// 2) countdown hook
function useCountdown(initial, paused, onExpire) {
  const [count, setCount] = React.useState(initial);

  useEffect(() => {
    let timerId;

    if (!paused && count > 0) {
      timerId = setTimeout(() => setCount((c) => c - 1), 1000);
    } else if (count <= 0 && !paused) {
      onExpire();
    }

    return () => clearTimeout(timerId);
  }, [count, paused, onExpire]);

  const reset = () => setCount(initial);
  const setTime = (time) => setCount(time);

  return { count, reset, setTime };
}

const generateRandomBotData = (
  botUpdateCount,
  setBotUpdateCount,
  setBotScore,
  setBotCorrectAnswers,
  setLifelinesUsed,
  setBotTotalSeconds
) => {
  useEffect(() => {
    if (botUpdateCount < 5) {
      const intervalDuration = Math.floor(Math.random() * (4000 - 3000) + 3000);
      const interval = setInterval(() => {
        const scoreChange = Math.random() > 0.5 ? 20 : -10;

        if (scoreChange === 20) {
          setBotTotalSeconds(
            (prevTotalSeconds) => prevTotalSeconds + intervalDuration / 1000
          );
        }

        setBotScore((prevScore) => {
          const newScore = prevScore + scoreChange;
          if (scoreChange === 20) {
            setBotCorrectAnswers(
              (prevCorrectAnswers) => prevCorrectAnswers + 1
            );
          }
          return newScore;
        });

        if (Math.random() > 0.7) {
          setLifelinesUsed((prevLifelines) => {
            const newLifelines = prevLifelines + 1;
            return newLifelines <= 10 ? newLifelines : prevLifelines;
          });
        }

        setBotUpdateCount((prevCount) => prevCount + 1);
      }, intervalDuration);

      return () => clearInterval(interval);
    }
  }, [
    botUpdateCount,
    setBotScore,
    setBotCorrectAnswers,
    setLifelinesUsed,
    setBotTotalSeconds,
  ]);
};

const Games = () => {
  const { categoryName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const participantId = location.state?.participantId;

  const [botScore, setBotScore] = useState(0);

  const [botCorrectAnswers, setBotCorrectAnswers] = useState(0);
  const [botUpdateCount, setBotUpdateCount] = useState(0);
  const [botLifelinesUsed, setBotLifelinesUsed] = useState(0);
  const [botTotalSeconds, setBotTotalSeconds] = useState(0);
  const [openEmojiDrawer, setOpenEmojiDrawer] = useState(false);

  const [state, dispatch] = useReducer(reducer, initialState);
  const category = location.state?.categoryName;
  const IMAGEURL = import.meta.env.VITE_API_BASE_URL;
  const [audienceVotes, setAudienceVotes] = useState([0, 0, 0, 0]);

  generateRandomBotData(
    botUpdateCount,
    setBotUpdateCount,
    setBotScore,
    setBotCorrectAnswers,
    setBotLifelinesUsed,
    setBotTotalSeconds
  );

  const {
    questions,
    currentIndex,
    score,
    selectedOption,
    shakeIndex,
    isMuted,
    lifelineOpen,
    activeLifelineId,
    showReportUI,
    timerPaused,
    usedLifelines,
  } = state;

  // fetch once
  useEffect(() => {
    ApiGetGamesQuestions(location?.state?.categoryId)
      .then((res) => {
        if (res.isSuccess) {
          dispatch({ type: "SET_QUESTIONS", questions: res.data });
          resetTimer();
        }
      })
      .catch(console.error);
  }, []);
  const currentQuestion = questions[currentIndex] || {
    options: [],
    question: "",
  };

  const shuffledOptions = useMemo(() => {
    if (
      Array.isArray(currentQuestion.options) &&
      typeof currentQuestion.options[0] === "object"
    ) {
      return [...currentQuestion.options].sort(() => Math.random() - 0.5);
    }

    return currentQuestion.options
      .map((o) => ({ text: o, hidden: false }))
      .sort(() => Math.random() - 0.5);
  }, [currentQuestion]);

  const updateAudienceVotes = useCallback(() => {
    // Get the current question's options
    const correctAnswerIndex = shuffledOptions.indexOf(
      currentQuestion.options[0]
    );

    // Create new vote data
    // const newVotes = [...audienceVotes];
    // newVotes[correctAnswerIndex] += 1;

    // // Optionally add votes for other options
    // const randomIndex = Math.floor(Math.random() * 4);
    // if (randomIndex !== correctAnswerIndex) {
    //   newVotes[randomIndex] += 1;
    // }

    const totalVotes = 100;

    // Initialize audienceVotes with all 0 votes for the options
    const newVotes = [0, 0, 0, 0];

    // Allocate most of the votes to the correct answer
    newVotes[correctAnswerIndex] = totalVotes * 0.75; // 75% of the votes to the correct answer

    // Distribute the remaining 25% of votes randomly among the other options
    let remainingVotes = totalVotes * 0.25;

    while (remainingVotes > 0) {
      // Randomly choose an incorrect option
      const randomIndex = Math.floor(Math.random() * 4);

      if (
        randomIndex !== correctAnswerIndex &&
        newVotes[randomIndex] < totalVotes * 0.25
      ) {
        // Add 1 vote to the randomly chosen incorrect option, ensuring no option gets more than 25% of the votes
        newVotes[randomIndex] += 1;
        remainingVotes--;
      }
    }

    setAudienceVotes(newVotes?.map((item) => (item < 75 ? item + 40 : item)));
  }, [usedLifelines]);

  useEffect(() => {
    let intervalId;
    let timeoutId;
    if (usedLifelines?.includes(2)) {
      intervalId = setInterval(updateAudienceVotes, 1000); // Update votes every second

      timeoutId = setTimeout(() => {
        clearInterval(intervalId); // Stop the interval after 3 seconds
      }, 3000);
    }

    // Cleanup
    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [usedLifelines]);

  // fetch once
  useEffect(() => {
    ApiGetGamesQuestions(location?.state?.categoryId)
      .then(res => {
        if (res.isSuccess) {
          dispatch({ type: 'SET_QUESTIONS', questions: res.data });
          resetTimer();
        }
      })
      .catch(console.error);
  }, []);

  // handle next or submit
  const goToNextOrSubmit = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      dispatch({ type: "NEXT_QUESTION" });
      resetTimer();
    } else {
      if (currentIndex === questions.length - 1) {
        // if (state?.isBot) {
        dispatch({ type: "INCREMENT_TOTAL_SECONDS" });

        const payload = {
          user: {
            score: score,
            totalSeconds: state.totalSeconds,
            lifelinesUsed: state.lifelinesUsed,
            correctAnswer: state.correctAnswer,
            coin: state.coinsSpent,
          },
          bot: {
            score: botScore,
            totalSeconds: botTotalSeconds,
            lifelinesUsed: botLifelinesUsed,
            correctAnswer: botCorrectAnswers,
          },
        };

        setTimeout(() => {
          ApiUpdateQuizParticipation(participantId, payload)
            .then((res) => {
              if (res.isSuccess) {
                navigate(`/${categoryName}/end-quiz`, {
                  state: {
                    result: res.data,
                    userImage: location?.state?.userImage,
                  },
                });
              }
            })
            .catch(console.error);
        }, 200);
        // }/
      }
    }
    setAudienceVotes([0, 0, 0, 0]);
  }, [currentIndex, questions, score, participantId, navigate, categoryName]);

  // countdown
  const { count: timeLeft, reset: resetTimer } = useCountdown(
    10,
    timerPaused,
    goToNextOrSubmit
  );

  // auto‐close lifeline after 5s when activated
  useEffect(() => {
    if (activeLifelineId != null) {
      const t = setTimeout(() => dispatch({ type: "CLOSE_LIFELINE" }), 5000);
      return () => clearTimeout(t);
    }
  }, [activeLifelineId]);

  useEffect(() => {
    let interval;

    if (!timerPaused) {
      interval = setInterval(() => {
        dispatch({ type: "INCREMENT_TOTAL_SECONDS" });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerPaused, currentIndex]);

  useEffect(() => {
    setTimeout(() => {
      if (currentIndex === questions.length - 1) {
        goToNextOrSubmit();
        // setTimeout(goToNextOrSubmit, 2000);
      } else {
        goToNextOrSubmit();
      }
    }, 800);
  }, [state.score]);

  // event handlers
  const handleAnswer = useCallback(
    (option, idx) => {
      const correct = option === currentQuestion.options[0].text;
      dispatch({ type: "ANSWER", option, index: idx, correct });
    },
    [currentQuestion, goToNextOrSubmit]
  );

  const toggleMute = () => dispatch({ type: "TOGGLE_MUTE" });
  const toggleLifelines = () => dispatch({ type: "TOGGLE_LIFELINES" });
  const activateLifeline = (id) => dispatch({ type: "ACTIVATE_LIFELINE", id });
  const closeLifeline = () => dispatch({ type: "CLOSE_LIFELINE" });
  const showReport = () => dispatch({ type: "SHOW_REPORT" });
  const hideReport = () => dispatch({ type: "HIDE_REPORT" });

  const activeLifeline = lifelinesData.find((l) => l.id === activeLifelineId);

  const handleUseForCoins = useCallback(async () => {
    if (activeLifelineId == null) return;
    const cost = activeLifeline.price || 0;

    // 1) Deduct coins & mark lifeline used
    dispatch({ type: "ACTIVATE_LIFELINE", id: activeLifelineId, price: cost });

    if (activeLifelineId == 1) {
      // 50:50 Lifeline
      dispatch({ type: "ACTIVATE_50_50_LIFELINE" });
      dispatch({
        type: "CONFIRM_LIFELINE_USE",
        id: activeLifelineId,
        price: cost,
      });
      // resetTimer();
    }

    if (activeLifelineId === 4) {
      try {
        dispatch({
          type: "CONFIRM_LIFELINE_USE",
          id: activeLifelineId,
          price: cost,
        });
        const updatedQuestions = [...state.questions];
        updatedQuestions[state.currentIndex] = state.extraQuestion;
        dispatch({ type: "SET_QUESTIONS", questions: updatedQuestions });
        resetTimer();
      } catch (err) {
        console.error("Flip Question failed:", err);
      } finally {
        dispatch({ type: "CLOSE_LIFELINE" });
      }
      return;
    }

    // 3) Other lifelines (such as Freeze Timer)
    if (activeLifelineId === 3) {
      dispatch({
        type: "CONFIRM_LIFELINE_USE",
        id: activeLifelineId,
        price: cost,
      });
      dispatch({ type: "ACTIVATE_FREEZE_TIMER" });
    }


    if (activeLifelineId === 2) {
      dispatch({
        type: "CONFIRM_LIFELINE_USE",
        id: activeLifelineId,
        price: cost,
      });
      //   dispatch({ type: "" });
    }

    // 4) Close drawer & resume
    dispatch({ type: "CLOSE_LIFELINE" });
  }, [
    activeLifelineId,
    activeLifeline,
    state.questions,
    state.extraQuestion,
    resetTimer,
  ]);

  const lifelines = [
    { id: 1, label: "50:50", icon: <FiftyFiftyIcon /> },
    { id: 2, label: "Audience Poll", icon: <AudiencePoll /> },
    { id: 3, label: "Freeze Timer", icon: <FreezeTime /> },
    { id: 4, label: "Flip Question", icon: <FlipQuestion /> },
  ];

  // Handle Open Report Question
  const handleopenReportQuestion = () => {
    const currentQId = questions[currentIndex];
    if (state.hasReportedQuestions?._id === currentQId?._id) {
      toast.warning("You have already flagged this question.");
    } else {
      showReport();
    }
  };

  const maxScore = 100; // Change this as needed for your max score

  const totalWidth = 100;
  const centerPosition = 50;

  const player1Offset = ((botScore - score) / maxScore) * totalWidth;
  const playerYouOffset = ((score - botScore) / maxScore) * totalWidth;

  return (
    <>
      <div className="w-full h-full flex flex-col items-center justify-start">
        <div className="relative mt-5 pt-12 mb-20 overflow-y-scroll hide-scroll-bar w-full">
          <div>
            <div className="flex flex-col items-center justify-center">
              <div className="my-12 w-full flex justify-between items-center">
                <div className="invisible" />
                <div
                  className="flex items-center justify-center py-10 px-16 bg-C20213F rounded-16 transition-all duration-250 ml-50"
                  data-testid="battle-timer-icon"
                >
                  <div className="rounded-full mr-3 p-3 flex items-center justify-center bg-C191A32">
                    <img
                      alt="stopwatch"
                      width="11"
                      height="12"
                      src={stopWatch}
                    />
                  </div>
                  <span
                    className={`text-12 font-bold transition-all duration-250 ${timeLeft > 5 ? "text-white" : "text-red-700"
                      }`}
                  >
                    00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}s
                  </span>
                </div>
                <div className="cursor-pointer mr-20" onClick={toggleMute}>
                  <img
                    alt="Speaker Icon"
                    width="30"
                    height="30"
                    src={isMuted ? speakerInactive : speakerActive}
                  />
                </div>
              </div>
            </div>

            <div className="mt-14 px-20 w-full flex items-center justify-between">
              <div className="flex">
                <div className="relative">
                  <div className="relative flex items-center justify-center mb-10">
                    <img
                      alt="player image"
                      width="26"
                      height="26"
                      className="rounded-[50%]"
                      src={playerYou}
                    />
                    <div id="emoji-animation" className="relative" />
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="pl-10 flex flex-col text-10">
                    <div className="text-CFAFAFA uppercase">You</div>
                    <div className="font-bold text-CFFCC5B">Score: {score}</div>
                  </div>
                  <div
                    id="chat-icon"
                    className="ml-8 relative cursor-pointer chat-icon"
                    onClick={() => setOpenEmojiDrawer(true)}
                  >
                    <img
                      alt="chat icon"
                      width="24"
                      height="24"
                      src={chatIcon}
                    />
                  </div>
                </div>
              </div>

              <div className="flex">
                <div className="pr-10 flex flex-col text-10">
                  <div className="text-CFAFAFA uppercase">
                    {location?.state?.opponentUserName}
                  </div>
                  <div className="font-bold text-CA96DFF">
                    Score: {botScore}
                  </div>
                </div>
                <div className="relative">
                  <div className="relative flex items-center justify-center mb-10">
                    <img
                      alt="player image"
                      width="26"
                      height="26"
                      className="rounded-[50%]"
                      src={location?.state?.userImage}
                    />
                    <div id="emoji-animation" className="relative" />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full px-20 my-14 h-4 flex items-center justify-center mb-28">
              <div
                className="h-full rounded-l-10 bg-CFFD949 background-transition"
                style={{
                  width: `${centerPosition + playerYouOffset}%`,
                  transition: "width 2s ease",
                }}
              />
              <div className="transition-all duration-350">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="24"
                  viewBox="0 0 23 24"
                  fill="none"
                >
                  <circle
                    cx="11.5"
                    cy="12"
                    r="11.22"
                    fill="#191A32"
                    stroke="#FFD949"
                    strokeWidth="0.44"
                  ></circle>
                  <path
                    d="M15.73 17.82L13.975 16.08L12.655 17.4L12.235 16.98C12.005 16.75 11.89 16.465 11.89 16.125C11.89 15.785 12.005 15.5 12.235 15.27L14.77 12.735C15 12.505 15.285 12.39 15.625 12.39C15.965 12.39 16.25 12.505 16.48 12.735L16.9 13.155L15.58 14.475L17.32 16.23C17.44 16.35 17.5 16.49 17.5 16.65C17.5 16.81 17.44 16.95 17.32 17.07L16.57 17.82C16.45 17.94 16.31 18 16.15 18C15.99 18 15.85 17.94 15.73 17.82ZM17.5 8.4L10.69 15.21L10.765 15.27C10.995 15.5 11.11 15.785 11.11 16.125C11.11 16.465 10.995 16.75 10.765 16.98L10.345 17.4L9.025 16.08L7.27 17.82C7.15 17.94 7.01 18 6.85 18C6.69 18 6.55 17.94 6.43 17.82L5.68 17.07C5.56 16.95 5.5 16.81 5.5 16.65C5.5 16.49 5.56 16.35 5.68 16.23L7.42 14.475L6.1 13.155L6.52 12.735C6.75 12.505 7.035 12.39 7.375 12.39C7.715 12.39 8 12.505 8.23 12.735L8.29 12.81L15.1 6H17.5V8.4ZM8.47 11.37L5.5 8.4V6H7.9L10.87 8.97L8.47 11.37Z"
                    fill="#FFD949"
                  ></path>
                </svg>
              </div>
              <div
                className="h-full rounded-r-10 bg-CA96DFF background-transition"
                style={{
                  width: `${centerPosition + player1Offset}%`,
                  transition: "width 2s ease",
                }}
              />
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-CFFFFFF mx-10 my-5 p-10 pt-0 border-1 rounded-10 border-CF1F1F1 shadow-quizCard dark:border-C26284C dark:bg-C20213F relative pb-30">
          <div className="flex items-end justify-between mt-8">
            <div className="font-bold text-C4782F4 dark:text-CBAC8FF">
              <span className="text-20 font-bold">{currentIndex + 1}</span>
              <span className="text-12">/{questions.length}</span>
            </div>
            <div className="cursor-pointer" onClick={handleopenReportQuestion}>
              <img
                alt="Flag Icon"
                width="30"
                height="30"
                src={
                  state.hasReportedQuestions?._id ===
                    questions[currentIndex]?._id
                    ? "https://static.quizzop.com/newton/assets/flag_inactive_dark.svg"
                    : "https://static.quizzop.com/newton/assets/flag_active_dark.svg"
                }
              />
            </div>
          </div>

          <div className="text-center px-40 text-18 text-C2C2C2C font-bold mt-10 dark:text-CFFFFFF">
            {currentQuestion.question}
          </div>

          {currentQuestion?.questionImage && (
            <div className="flex justify-center mt-22">
              <img
                alt="QuestionImage"
                loading="lazy"
                width="200"
                height="=140"
                decoding="async"
                data-nimg="1"
                className="question-section-img object-contain rounded-10 !w-min h-auto"
                style={{ color: "transparent" }}
                src={`${IMAGEURL}/images/${category}/${currentQuestion?.questionImage}`}
              />
            </div>
          )}

          <div className="grid mt-30 grid-cols-2 gap-20">
            {shuffledOptions?.map((optionObj, idx) => {
              const { text, hidden } = optionObj;

              const correctAnswerText = currentQuestion.options[0]?.text;
              const isCorrect = selectedOption && text === correctAnswerText;
              const isSelectedWrong =
                selectedOption && text === selectedOption && !isCorrect;

              const totalVotes = audienceVotes?.reduce(
                (sum, vote) => sum + vote,
                0
              );
              const votePercentage = totalVotes === 0 ? 0 : audienceVotes[idx];

              return (
                <div
                  key={idx}
                  className={`${usedLifelines?.includes(2) && votePercentage > 0
                      ? "audience-poll"
                      : ""
                    }   justify-center py-10 text-14 shadow-quizCard border-1 font-medium rounded-10 bg-CFFFFFF border-CF1F1F1 dark:text-CFFFFFF dark:border-C26284C dark:bg-C26284C px-22 answer-input cursor-pointer flex items-center flex-col select-none text-center min-h-[60px] ${shakeIndex === idx ? "animate-shake" : ""
                    } ${!votePercentage && "aud-animation"}
                    ${votePercentage &&
                    usedLifelines?.includes(2) &&
                    Math.max(...audienceVotes) === votePercentage &&
                    "active-button"
                    }
                  `}
                  style={{
                    backgroundColor: isCorrect
                      ? "#74C465"
                      : isSelectedWrong
                        ? "#EF353D"
                        : "",
                    color: hidden ? "transparent" : "",
                    pointerEvents: selectedOption || hidden ? "none" : "auto",
                    "--votePercentage": votePercentage + "%",
                  }}
                  onClick={() =>
                    !selectedOption && !hidden && handleAnswer(text, idx)
                  }
                >
                  <p
                    className={votePercentage && "width-class"}
                    style={{ visibility: hidden ? "hidden" : "visible" }}
                  >
                    {text}
                  </p>
                  {/* Adjust the width directly in the .audience-poll div using the ::after pseudo-element */}
                </div>
              );
            })}

          </div>

          {/* Lifelines Toggle */}
          <div className="cursor-pointer flex justify-center text-center -mt-12 z-40 absolute -bottom-16 left-1/2 -translate-x-1/2">
            <div
              onClick={toggleLifelines}
              className="border border-CC7C7C7 text-CC7C7C7 dark:text-CFAFAFA dark:border-C404380 rounded-full py-4 px-16 mb-4 bg-CFAFAFA dark:bg-C191A32 transition-all"
            >
              <p className="text-12 uppercase font-bold flex items-center gap-4 justify-center">
                {lifelineOpen ? (
                  "Close"
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.51091 11.4736L8.46896 17.8502C8.62986 18.3743 9.31705 18.3602 9.45953 17.8299L12.656 5.93124L14.444 11.1079C14.4811 11.2153 14.5475 11.3079 14.6344 11.3733C14.7213 11.4386 14.8244 11.4736 14.9301 11.4736H18.5615C18.7058 11.4736 18.8228 11.3488 18.8228 11.189V10.6312C18.8228 10.4739 18.7053 10.3466 18.5631 10.3466H15.2898L13.0805 3.95024C12.9051 3.44309 12.2358 3.47013 12.0962 3.99025L8.9283 15.7827L7.37743 10.732C7.34301 10.6198 7.27694 10.5222 7.18859 10.453C7.10023 10.3839 6.99407 10.3466 6.88513 10.3466H1.43583C1.40149 10.3465 1.36747 10.3538 1.33575 10.3681C1.30404 10.3824 1.27525 10.4034 1.25106 10.4299C1.22688 10.4564 1.20777 10.4878 1.19485 10.5223C1.18193 10.5569 1.17545 10.5939 1.17579 10.6312V11.189C1.17579 11.3465 1.29232 11.4736 1.43323 11.4736H6.51091ZM4.59491 2.55472C3.98712 1.89457 2.99889 1.89401 2.39266 2.55218L2.30183 2.65136C2.1572 2.80837 2.04252 2.99481 1.96433 3.2C1.88615 3.40519 1.84601 3.62511 1.8462 3.84716C1.84639 4.06922 1.88692 4.28905 1.96546 4.49408C2.044 4.69911 2.15901 4.88532 2.30391 5.04203L4.42337 7.3431C4.5207 7.44875 4.6527 7.50809 4.79032 7.50809C4.92795 7.50809 5.05995 7.44875 5.15728 7.3431L7.27674 5.04203C7.42166 4.88533 7.53669 4.69915 7.61525 4.49413C7.69381 4.28911 7.73436 4.06928 7.73458 3.84722C7.7348 3.62517 7.69468 3.40525 7.61652 3.20005C7.53836 2.99484 7.42369 2.80839 7.27908 2.65136L7.18799 2.55218C6.5815 1.89401 5.59352 1.89457 4.98548 2.55472L4.79007 2.76688L4.59465 2.55472H4.59491Z"
                        fill="#FAFAFA"
                      />
                    </svg>
                    <span>Use a Lifeline</span>
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Lifeline Cards */}
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${lifelineOpen ? "h-auto opacity-100 mt-5" : "h-0 opacity-0"
              }`}
          >
            <div className="z-10 animate__playContest_fadeInUp">
              <div className="lifeline-card-container dark:text-CFFFFFF bg-CFFFFFF dark:bg-C20213F max-w-maxW animate__animated bottomsheet_animated lifeline-box-container w-full">
                <div className="px-20 flex w-full gap-30 justify-between transition-all ease-in duration-[250ms] overflow-hidden h-[120px] max-h-[120px] pt-14">
                  {lifelines?.map((l) => (
                    <Lifelines
                      key={l.id}
                      lifelineId={l.id}
                      label={l.label}
                      icon={l.icon}
                      usedLifelines={usedLifelines}
                      activateLifeline={activateLifeline}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Active Lifeline Drawer */}
        {activeLifeline?.id && (
          <div className="fixed bottom-0 left-0 right-0 z-102 animate-slideInUp bg-C20213F border-C404380 border-1 rounded-t-10 text-center py-20 px-20 transition-opacity h-min-360 max-w-[500px] mx-auto">
            {/* Close Button */}
            <div
              data-testid="lifeline-close-sheet-button"
              className="text-CFFFFFF flex flex-row-reverse cursor-pointer absolute top-15 right-15"
              onClick={closeLifeline}
            >
              <CloseIcon />
            </div>

            {/* Icon */}
            <div className="flex justify-center -mt-60 mb-20">
              <div className="scale-125 p-4 rounded-full bg-C20213F">
                <img
                  alt="audience_poll"
                  loading="lazy"
                  width="95"
                  height="95"
                  decoding="async"
                  data-nimg="1"
                  src={IMAGEURL + activeLifeline?.image}
                  style={{ color: "transparent" }}
                />
              </div>
            </div>

            {/* Title & Description */}
            <div className="font-bold text-18 text-CFFFFFF">
              {activeLifeline?.name}
            </div>
            <div className="px-20 mt-8 text-14 text-C8789C3">
              {activeLifeline?.description}
            </div>
            <button
              className="inline-flex items-center justify-center whitespace-nowrap text-18 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary primary-button disabled:primary-button-disabled box-shadow text-primary-foreground hover:bg-primary/90 font-bold rounded-6 py-12 px-48 mt-30 w-full flex-row lifeline-button"
              onClick={closeLifeline}
            >
              <AdVideoIcon />
              <p className="text-2xl">Use for Free</p>
            </button>
            <p className="px-20 mt-20 font-bold text-14 text-C8789C3">OR</p>
            <button
              onClick={handleUseForCoins}
              className="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground py-12 px-48 mt-10 w-full text-lg border rounded-2 border-C8789C3 bg-C20213F hover:bg-C20213F text-primary-foreground"
            >
              <p className="text-2xl">Use for</p>
              <Coins />
              <p className="text-2xl">{activeLifeline?.price}</p>
            </button>
          </div>
        )}
        {activeLifeline?.id && (
          <div className="blur-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm z-50"></div>
        )}

        {openEmojiDrawer && (
          <div className="blur-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm z-50"></div>
        )}

        {/* Emoji Drawer */}
        {openEmojiDrawer && (
          <EmojiDrawer
            setOpenEmojiDrawer={setOpenEmojiDrawer}
            openEmojiDrawer={openEmojiDrawer}
          />
        )}

        {showReportUI && (
          <ReportQuestion
            onClose={hideReport}
            questionId={questions[currentIndex]?._id}
            dispatch={dispatch}
          />
        )}
      </div>
    </>
  );
};

export default Games;
