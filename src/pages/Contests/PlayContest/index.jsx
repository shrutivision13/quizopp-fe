import React, { useEffect, useReducer } from "react";
import {
  ApiGetContestQuestions,
  ApiSubmitContest,
} from "../../../api-wrapper/contest/ApiGetcontest";
import { useLocation, useNavigate, useParams } from "react-router-dom"; // Add this import
import AdSlot from "../../../components/AdSense/AdSlot";
import lifelinesData from "../../../utils/lifelinesData.json";

import player1 from "../../../assets/images/players/player-1.webp";
import playerYou from "../../../assets/images/players/player-0.webp";
import chatIcon from  "../../../assets/images/chat-icon.webp";
import stopWatch from "../../../assets/images/stopwatch.webp";
import speakerActive from "../../../assets/images/battle-speaker-active.webp";
import speakerInactive from "../../../assets/images/battle-speaker-inactive.webp";
import fiftyfiftyImg from "../../../assets/images/fifty-fifty.webp";

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
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_QUESTIONS":
      return { ...state, questions: action.questions };
    case "NEXT_QUESTION":
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
        selectedOption: null,
        shakeIndex: null,
        timerPaused: false,
      };
    case "ANSWER":
      return {
        ...state,
        selectedOption: action.option,
        score: state.score + (action.correct ? 20 : -10),
        shakeIndex: action.correct ? null : action.index,
      };
    case "TOGGLE_MUTE":
      return { ...state, isMuted: !state.isMuted };
    case "TOGGLE_LIFELINES":
      return {
        ...state,
        lifelineOpen: !state.lifelineOpen,
        activeLifelineId: null,
      };
    case "ACTIVATE_LIFELINE":
      return { ...state, activeLifelineId: action.id, timerPaused: true };
    case "CLOSE_LIFELINE":
      return {
        ...state,
        lifelineOpen: false,
        activeLifelineId: null,
        timerPaused: false,
      };
    case "SHOW_REPORT":
      return { ...state, showReportUI: true };
    default:
      throw new Error(`Unknown action ${action.type}`);
  }
}

function useCountdown(initial, paused, onExpire) {
  const [count, setCount] = React.useState(initial);

  useEffect(() => {
    if (paused) return;
    if (count <= 0) {
      onExpire();
      return;
    }
    const t = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [count, paused, onExpire]);

  const reset = () => setCount(initial);
  return { count, reset };
}

function PlayContest() {
  const { categoryName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const contestId = searchParams.get("contestId");
  const participantId = location.state?.participantId;
  const timeAllowed = location.state?.timeAllowed;
  const [questions, setQuestions] = React.useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [shuffledOptions, setShuffledOptions] = React.useState([]);
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [shakeOptionIndex, setShakeOptionIndex] = React.useState(null);
  const [legacyTimeLeft, setLegacyTimeLeft] = React.useState(66);
  const [isMuted, setIsMuted] = React.useState(false);
  const [showReportUI, setShowReportUI] = React.useState(false);

  const [state, dispatch] = useReducer(reducer, initialState);

  const reportOptions = [
    "Factual Error",
    "Grammar / Spelling Error",
    "Vulgar or Obscene",
    "Wrong Category",
    "Question Unclear",
  ]; // Array of report options

  const goToNextOrSubmit = React.useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Submit contest if last question
      const payload = {
        totalQuestions: questions.length,
        score: score,
      };
      ApiSubmitContest(participantId, payload)
        .then((response) => {
          if (response?.isSuccess) {
            navigate(`/${categoryName}/contest-rank`, {
              state: {
                result: response?.data,
                participantId,
                categoryId: location?.state?.categoryId,
              },
            });
          }
        })
        .catch((error) => {
          console.error("Error submitting contest:", error);
        });
    }
  }, [currentQuestionIndex, questions.length, score, participantId, navigate, categoryName, location?.state?.categoryId]);

  const { count: timeLeft, reset: resetTimer } = useCountdown(
    timeAllowed,
    state.timerPaused,
    goToNextOrSubmit
  );

  const toggleLifelines = () => dispatch({ type: "TOGGLE_LIFELINES" });
  const activateLifeline = (id) => dispatch({ type: "ACTIVATE_LIFELINE", id });
  const closeLifeline = () => dispatch({ type: "CLOSE_LIFELINE" });

  const activeLifeline = lifelinesData.find(
    (l) => l.id === state.activeLifelineId
  );

  useEffect(() => {
    if (state.activeLifelineId != null) {
      const t = setTimeout(() => dispatch({ type: "CLOSE_LIFELINE" }), 5000);
      return () => clearTimeout(t);
    }
  }, [state.activeLifelineId]);

  useEffect(() => {
    if (contestId) {
      ApiGetContestQuestions(contestId)
        .then((response) => {
          if (response?.isSuccess) {
            setQuestions(response?.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching contest questions:", error);
        });
    }
  }, []); // Empty dependency array ensures this runs only once on initial render

  useEffect(() => {
    if (questions.length > 0) {
      const currentQuestion = questions[currentQuestionIndex];
      const options = [...currentQuestion.options];
      setShuffledOptions(options.sort(() => Math.random() - 0.5));
      setSelectedOption(null);
      setShakeOptionIndex(null);
    }
  }, [questions, currentQuestionIndex]);

  useEffect(() => {
    if (legacyTimeLeft > 0) {
      const timer = setTimeout(
        () => setLegacyTimeLeft((prev) => prev - 1),
        1000
      );
      return () => clearTimeout(timer);
    } else if (
      legacyTimeLeft === 0 ||
      currentQuestionIndex === questions.length
    ) {
      const payload = {
        totalQuestions: questions.length,
        score: score,
      }; // Prepare the payload
      ApiSubmitContest(participantId, payload)
        .then((response) => {
          if (response?.isSuccess) {
            navigate(`/${categoryName}/contest-rank`, {
              state: {
                result: response?.data,
                participantId: participantId,
                categoryId: location?.state?.categoryId,
              },
            }); // Navigate to the rank page
          }
        })
        .catch((error) => {
          console.error("Error submitting contest:", error);
        });
    }
  }, [
    legacyTimeLeft,
    currentQuestionIndex,
    questions.length,
    score,
    participantId,
    navigate,
    categoryName,
  ]); // Add dependencies

  const handleAnswer = (selectedOption, index) => {
    setSelectedOption(selectedOption);
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion?.options[0];
    setScore((prevScore) => {
      const newScore =
        selectedOption === correctAnswer ? prevScore + 20 : prevScore - 10;

      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else {
          const payload = {
            totalQuestions: questions.length,
            score: newScore, // Use the newScore we just calculated
          };
          ApiSubmitContest(participantId, payload)
            .then((response) => {
              if (response?.isSuccess) {
                navigate(`/${categoryName}/contest-rank`, {
                  state: {
                    result: response?.data,
                    participantId,
                    categoryId: location?.state?.categoryId,
                  },
                });
              }
            })
            .catch((error) => {
              console.error("Error submitting contest:", error);
            });
        }
      }, 1000);

      return newScore;
    });

    if (selectedOption !== correctAnswer) {
      setShakeOptionIndex(index);
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
        <div className="relative mt-5 flex-1 pt-12 mb-20 overflow-y-scroll hide-scroll-bar">
          <div className="text-left px-20 mb-10 flex items-center justify-between">
            <div className="flex justify-between">
              <div className="my-10 text-center font-bold text-18 dark:text-CFFFFFF">
                Your Score:{" "}
                <span className="text-C4782F4 font-black">{score}</span>
              </div>
            </div>

            <div className="flex gap-14">
              <div className="flex items-center justify-center">
                <span className="absolute text-[9px] text-C4782F4 font-bold">
                  {timeLeft}s
                </span>
                <svg
                  className="timer-svg"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                >
                  <circle
                    className="transition-all duration-1000"
                    cx="15"
                    cy="15"
                    r="15"
                    fill="#26284C"
                  ></circle>
                  <circle
                    className="transition-all duration-1000"
                    cx="15.18"
                    cy="15.18"
                    r="13.25"
                    stroke="#4782F4"
                    strokeWidth="1"
                    style={{
                      strokeDasharray: 83.78, // Total circumference of the circle
                      strokeDashoffset: 83.78 - (timeLeft / 66) * 83.78, // Reverse the offset
                      transform: "rotate(-90deg)", // Rotate the circle to start from the top
                      transformOrigin: "center", // Set the rotation origin to the center
                    }}
                  ></circle>
                </svg>
              </div>
              <div className="cursor-pointer" onClick={toggleMute}>
                <img
                  alt="Speaker Icon"
                  width="30"
                  height="30"
                  src={
                    isMuted
                      ? "https://static.quizzop.com/newton/assets/speaker_inactive_dark.svg"
                      : "https://static.quizzop.com/newton/assets/speaker_active_dark.svg"
                  }
                />
              </div>
            </div>
          </div>

          <div>
            <div className="bg-CFFFFFF mx-10 my-5 p-10 pt-0 border-1 rounded-10 border-CF1F1F1 shadow-quizCard dark:border-C26284C dark:bg-C20213F relative pb-30">
              <div className="flex items-end justify-between mt-8">
                <div className="font-bold text-C4782F4 dark:text-CBAC8FF">
                  <span className="text-20 font-bold">
                    {currentQuestionIndex + 1}
                  </span>
                  <span className="text-12">/{questions?.length}</span>
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => setShowReportUI(true)}
                >
                  <img
                    alt="Flag Icon"
                    width="30"
                    height="30"
                    src="https://static.quizzop.com/newton/assets/flag_active_dark.svg"
                  />
                </div>
              </div>

              <div className="text-center px-40 text-18 text-C2C2C2C font-bold mt-10 dark:text-CFFFFFF">
                {currentQuestion?.question}
              </div>

              <div className="grid mt-30 grid-cols-2 gap-20">
                {shuffledOptions?.map((option, index) => (
                  <div
                    key={index}
                    className={`justify-center py-10 text-14 shadow-quizCard border-1 font-medium rounded-10 bg-CFFFFFF border-CF1F1F1 dark:text-CFFFFFF dark:border-C26284C dark:bg-C26284C px-22 answer-input cursor-pointer flex items-center flex-col select-none opacity-100 ${
                      shakeOptionIndex === index ? "animate-shake" : ""
                    }`}
                    style={{
                      backgroundColor: selectedOption
                        ? option === questions[currentQuestionIndex]?.options[0]
                          ? "#74C465"
                          : option === selectedOption
                          ? "#EF353D"
                          : ""
                        : "",
                    }}
                    onClick={() =>
                      !selectedOption && handleAnswer(option, index)
                    }
                  >
                    {option}
                  </div>
                ))}
              </div>

              {/* Lifeline Button */}
              <div className="cursor-pointer flex justify-center text-center -mt-12 z-40 absolute -bottom-16 left-1/2 -translate-x-1/2">
                <div
                  onClick={toggleLifelines}
                  className="border border-CC7C7C7 text-CC7C7C7 dark:text-CFAFAFA dark:border-C404380 rounded-full py-4 px-16 mb-4 bg-CFAFAFA dark:bg-C191A32 transition-all"
                >
                  <p className="text-12 text-center uppercase font-bold flex items-center gap-4 justify-center">
                    {state.lifelineOpen ? (
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

              {/* Lifeline Dropdown */}
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  state.lifelineOpen
                    ? "h-auto opacity-100 mt-5"
                    : "h-0 opacity-0"
                }`}
              >
                <div className="z-10 animate__playContest_fadeInUp">
                  <div className="lifeline-card-container dark:text-CFFFFFF bg-CFFFFFF dark:bg-C20213F max-w-maxW animate__animated bottomsheet_animated lifeline-box-container w-full">
                    <div className="px-20 flex w-full gap-30 justify-between transition-all ease-in duration-[250ms] overflow-hidden h-[120px] max-h-[120px] pt-14">
                      {lifelinesData.map((ll) => (
                        <div
                          key={ll.id}
                          onClick={() => activateLifeline(ll.id)}
                          className="flex flex-col items-center cursor-pointer"
                        >
                          <div className="border rounded-full p-4 lifeline-icon-box">
                            <img
                              src={fiftyfiftyImg}
                              alt={ll.name}
                              width="56"
                              height="56"
                            />
                          </div>
                          <p className="mt-2 text-12 font-bold">{ll.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {activeLifeline && (
                              <div className="fixed bottom-0 left-0 right-0 z-102 animate-slideInUp bg-C20213F border-C404380 border-1 rounded-t-10 text-center py-20 px-20 transition-opacity h-min-360 max-w-[500px] mx-auto">
                                  {/* Close Button */}
                                  <div data-testid="lifeline-close-sheet-button" className="text-CFFFFFF flex flex-row-reverse cursor-pointer absolute top-15 right-15" onClick={closeLifeline}>
                                      <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M15 30.9985C23.2843 30.9985 30 24.2828 30 15.9985C30 7.71426 23.2843 0.998535 15 0.998535C6.71573 0.998535 0 7.71426 0 15.9985C0 24.2828 6.71573 30.9985 15 30.9985Z" className="fill-current text-C404380" />
                                          <path className="fill-current text-C8789C3" d="M16.4452 15.9987L19.6102 12.8317C19.6454 12.7945 19.665 12.7453 19.665 12.6942C19.665 12.643 19.6454 12.5938 19.6102 12.5567L18.4402 11.3887C18.4222 11.3706 18.4008 11.3562 18.3772 11.3464C18.3536 11.3366 18.3283 11.3315 18.3027 11.3315C18.2772 11.3315 18.2519 11.3366 18.2283 11.3464C18.2047 11.3562 18.1832 11.3706 18.1652 11.3887L15.0002 14.5537L11.8322 11.3887C11.7951 11.3535 11.7459 11.3339 11.6947 11.3339C11.6436 11.3339 11.5944 11.3535 11.5572 11.3887L10.3902 12.5587C10.355 12.5958 10.3354 12.645 10.3354 12.6962C10.3354 12.7473 10.355 12.7965 10.3902 12.8337L13.5552 15.9987L10.3902 19.1637C10.355 19.2008 10.3354 19.25 10.3354 19.3012C10.3354 19.3523 10.355 19.4015 10.3902 19.4387L11.5602 20.6077C11.5782 20.6258 11.5997 20.6402 11.6233 20.65C11.6469 20.6598 11.6722 20.6648 11.6977 20.6648C11.7233 20.6648 11.7486 20.6598 11.7722 20.65C11.7958 20.6402 11.8172 20.6258 11.8352 20.6077L15.0002 17.4427L18.1652 20.6077C18.1832 20.6258 18.2047 20.6402 18.2283 20.65C18.2519 20.6598 18.2772 20.6648 18.3027 20.6648C18.3283 20.6648 18.3536 20.6598 18.3772 20.65C18.4008 20.6402 18.4222 20.6258 18.4402 20.6077L19.6102 19.4387C19.6454 19.4015 19.665 19.3523 19.665 19.3012C19.665 19.25 19.6454 19.2008 19.6102 19.1637L16.4452 15.9987Z"></path>
                                      </svg>
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
                                              src={fiftyfiftyImg}
                                              style={{ color: 'transparent' }}
                                          />
                                      </div>
                                  </div>
          
                                  {/* Title & Description */}
                                  <div className="font-bold text-18 text-CFFFFFF">{activeLifeline.name}</div>
                                  <div className="px-20 mt-8 text-14 text-C8789C3">
                                      {activeLifeline.description}
                                  </div>
                                  <button className="inline-flex items-center justify-center whitespace-nowrap text-18 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary primary-button disabled:primary-button-disabled box-shadow text-primary-foreground hover:bg-primary/90 font-bold rounded-6 py-12 px-48 mt-30 w-full flex-row lifeline-button" onClick={closeLifeline}>
                                      <svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-4"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.6724 1H16.3966H4.60345H1.32759C1.14676 1 1 1.1477 1 1.33043V4.96522V8.6V12.2348V15.8696C1 16.0523 1.14676 16.2 1.32759 16.2H4.60345H16.3966H19.6724C19.8532 16.2 20 16.0523 20 15.8696V12.2348V8.6V4.96522V1.33043C20 1.1477 19.8532 1 19.6724 1Z" stroke="#FAFAFA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M13.0112 8.78994L8.97998 11.6399V5.93994L13.0112 8.78994Z" stroke="#FAFAFA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20.0002 1H16.2002V4.8H20.0002V1Z" stroke="#FAFAFA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.8 1H1V4.8H4.8V1Z" stroke="#FAFAFA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20.0002 4.80005H16.2002V8.60005H20.0002V4.80005Z" stroke="#FAFAFA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.8 4.80005H1V8.60005H4.8V4.80005Z" stroke="#FAFAFA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20.0002 8.6001H16.2002V12.4001H20.0002V8.6001Z" stroke="#FAFAFA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.8 8.6001H1V12.4001H4.8V8.6001Z" stroke="#FAFAFA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20.0002 12.3999H16.2002V16.1999H20.0002V12.3999Z" stroke="#FAFAFA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.8 12.3999H1V16.1999H4.8V12.3999Z" stroke="#FAFAFA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                      <p className="text-2xl">Use for Free</p>
                                  </button>
                                  <p className="px-20 mt-20 font-bold text-14 text-C8789C3">OR</p>
                                  <button
                                      // onClick={handleUseForCoins}
                                      className="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground py-12 px-48 mt-10 w-full text-lg border rounded-2 border-C8789C3 bg-C20213F hover:bg-C20213F text-primary-foreground"
                                  >
                                      <p className="text-2xl">Use for</p>
                                      <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="ml-6 mr-2"><path d="M8.03105 12.465C4.05605 12.465 0.831055 11.645 0.831055 10.803V12.741C0.831055 13.582 4.05705 14.404 8.03105 14.404C12.0051 14.404 15.2311 13.582 15.2311 12.741V10.803C15.2311 11.645 12.0061 12.465 8.03105 12.465Z" fill="#E4AF18"></path><path d="M7.2 9.4181C3.225 9.4181 0 8.5981 0 7.7561V9.6941C0 10.5351 3.226 11.3561 7.2 11.3561C11.174 11.3561 14.4 10.5341 14.4 9.6931V7.7561C14.4 8.5981 11.175 9.4181 7.2 9.4181Z" fill="#F4BF1A"></path><path d="M8.86211 6.37099C4.88711 6.37099 1.66211 5.55098 1.66211 4.70898V6.64698C1.66211 7.48798 4.88811 8.30998 8.86211 8.30998C12.8361 8.30998 16.0621 7.48798 16.0621 6.64698V4.70898C16.0621 5.55098 12.8371 6.37099 8.86211 6.37099Z" fill="#E4AF18"></path><path d="M14.4 1.421C14.4 2.262 11.175 3.047 7.2 3.047C3.225 3.047 0 2.262 0 1.421C0 0.58 3.225 0 7.2 0C11.175 0 14.4 0.58 14.4 1.421Z" fill="#FFD949"></path><path d="M7.2 3.04701C3.225 3.04701 0 2.22701 0 1.38501V3.32301C0 4.16401 3.226 4.98501 7.2 4.98501C11.174 4.98501 14.4 4.16301 14.4 3.32201V1.38501C14.4 2.22701 11.175 3.04701 7.2 3.04701Z" fill="#F4BF1A"></path><path d="M1.10791 2.23706V4.17506C1.27658 4.23706 1.46124 4.29673 1.66191 4.35406V2.41606C1.46191 2.35873 1.27724 2.29906 1.10791 2.23706Z" fill="#DCA815"></path><path d="M12.7432 2.41606V4.35406C12.9432 4.29673 13.1278 4.23706 13.2972 4.17506V2.23706C13.1285 2.29906 12.9438 2.35873 12.7432 2.41606Z" fill="#DCA815"></path><path d="M2.49316 2.61597V4.55397C2.6705 4.59063 2.85516 4.62397 3.04716 4.65397V2.72097C2.85516 2.6883 2.6705 2.65497 2.49316 2.62097" fill="#DCA815"></path><path d="M11.3569 2.72097V4.65997C11.5489 4.62663 11.7336 4.5933 11.9109 4.55997V2.61597C11.7336 2.65263 11.5489 2.68597 11.3569 2.71597" fill="#DCA815"></path><path d="M3.87793 2.84497V4.78397C4.05893 4.80697 4.24293 4.82897 4.43193 4.84797V2.90897C4.24293 2.88997 4.05893 2.86797 3.87793 2.84497Z" fill="#DCA815"></path><path d="M9.97217 2.90997V4.84897C10.1612 4.82897 10.3452 4.80797 10.5262 4.78497V2.84497C10.3452 2.86897 10.1612 2.88997 9.97217 2.90997Z" fill="#DCA815"></path><path d="M5.26318 2.97998V4.92098C5.44518 4.93365 5.62985 4.94465 5.81718 4.95398V3.01298C5.62985 3.00365 5.44518 2.99265 5.26318 2.97998Z" fill="#DCA815"></path><path d="M8.58691 3.01298V4.95198C8.77425 4.94265 8.95891 4.93165 9.14091 4.91898V2.97998C8.95891 2.99265 8.77425 3.00365 8.58691 3.01298Z" fill="#DCA815"></path><path d="M7.20181 3.05092H6.9248V4.98992H7.20181H7.47881V3.04492H7.20181" fill="#DCA815"></path><path d="M2.77002 5.56104V7.49903C2.93869 7.56103 3.12335 7.6207 3.32402 7.67804V5.74004C3.12402 5.6827 2.93935 5.62304 2.77002 5.56104Z" fill="#C49214"></path><path d="M14.4048 5.74004V7.67804C14.6048 7.6207 14.7895 7.56103 14.9588 7.49903V5.56104C14.7901 5.62304 14.6055 5.6827 14.4048 5.74004Z" fill="#C49214"></path><path d="M4.15479 5.94092V7.87892C4.33212 7.91558 4.51679 7.94892 4.70879 7.97892V6.04592C4.51679 6.01325 4.33212 5.97992 4.15479 5.94592" fill="#C49214"></path><path d="M13.02 6.04592V7.98492C13.212 7.95159 13.3967 7.91825 13.574 7.88492V5.94092C13.3967 5.97758 13.212 6.01092 13.02 6.04092" fill="#C49214"></path><path d="M5.54004 6.16895V8.10794C5.72104 8.13094 5.90504 8.15295 6.09404 8.17195V6.23294C5.90504 6.21294 5.72104 6.19195 5.54004 6.16895Z" fill="#C49214"></path><path d="M11.6338 6.23294V8.17195C11.8228 8.15195 12.0068 8.13094 12.1878 8.10794V6.16895C12.0068 6.19195 11.8228 6.21394 11.6338 6.23294Z" fill="#C49214"></path><path d="M6.9248 6.30396V8.24496C7.1068 8.25762 7.29147 8.26862 7.47881 8.27795V6.33695C7.29147 6.32762 7.1068 6.31662 6.9248 6.30396Z" fill="#C49214"></path><path d="M10.249 6.33793V8.27693C10.4364 8.2676 10.621 8.2566 10.803 8.24393V6.30493C10.621 6.3176 10.4364 6.3286 10.249 6.33793Z" fill="#C49214"></path><path d="M8.86391 6.37612H8.58691V8.31512H8.86391H9.14091V6.37012H8.86391" fill="#C49214"></path><path d="M1.10791 8.60791V10.5459C1.27658 10.6079 1.46124 10.6676 1.66191 10.7249V8.78691C1.46191 8.72957 1.27724 8.66991 1.10791 8.60791Z" fill="#DCA815"></path><path d="M12.7432 8.78691V10.7249C12.9432 10.6676 13.1278 10.6079 13.2972 10.5459V8.60791C13.1285 8.66991 12.9438 8.72957 12.7432 8.78691Z" fill="#DCA815"></path><path d="M2.49316 8.98804V10.926C2.6705 10.9627 2.85516 10.996 3.04716 11.026V9.09304C2.85516 9.06037 2.6705 9.02704 2.49316 8.99304" fill="#DCA815"></path><path d="M11.3569 9.09304V11.032C11.5489 10.9987 11.7336 10.9654 11.9109 10.932V8.98804C11.7336 9.0247 11.5489 9.05804 11.3569 9.08804" fill="#DCA815"></path><path d="M3.87793 9.21606V11.1551C4.05893 11.1781 4.24293 11.2001 4.43193 11.2191V9.28006C4.24293 9.26006 4.05893 9.23906 3.87793 9.21606Z" fill="#DCA815"></path><path d="M9.97217 9.28006V11.2191C10.1612 11.1991 10.3452 11.1781 10.5262 11.1551V9.21606C10.3452 9.23906 10.1612 9.26106 9.97217 9.28006Z" fill="#DCA815"></path><path d="M5.26318 9.35205V11.2931C5.44518 11.3057 5.62985 11.3167 5.81718 11.3261V9.38505C5.62985 9.37572 5.44518 9.36472 5.26318 9.35205Z" fill="#DCA815"></path><path d="M8.58691 9.38505V11.3241C8.77425 11.3147 8.95891 11.3037 9.14091 11.2911V9.35205C8.95891 9.36472 8.77425 9.37572 8.58691 9.38505Z" fill="#DCA815"></path><path d="M7.20181 9.42299H6.9248V11.362H7.20181H7.47881V9.41699H7.20181" fill="#DCA815"></path><path d="M1.93896 11.655V13.593C2.10763 13.655 2.2923 13.7147 2.49296 13.772V11.834C2.29296 11.7767 2.1083 11.717 1.93896 11.655Z" fill="#C49214"></path><path d="M13.5742 11.834V13.772C13.7742 13.7147 13.9589 13.655 14.1282 13.593V11.655C13.9596 11.717 13.7749 11.7767 13.5742 11.834Z" fill="#C49214"></path><path d="M3.32422 12.0349V13.9729C3.50155 14.0096 3.68622 14.0429 3.87822 14.0729V12.1399C3.68622 12.1072 3.50155 12.0739 3.32422 12.0399" fill="#C49214"></path><path d="M12.189 12.1399V14.0789C12.381 14.0456 12.5656 14.0122 12.743 13.9789V12.0349C12.5656 12.0716 12.381 12.1049 12.189 12.1349" fill="#C49214"></path><path d="M4.70898 12.2629V14.2019C4.88998 14.2249 5.07399 14.2469 5.26299 14.2659V12.3269C5.07399 12.3069 4.88998 12.2859 4.70898 12.2629Z" fill="#C49214"></path><path d="M10.8032 12.3269V14.2659C10.9922 14.2459 11.1762 14.2249 11.3572 14.2019V12.2629C11.1762 12.2859 10.9922 12.3079 10.8032 12.3269Z" fill="#C49214"></path><path d="M6.09424 12.3989V14.3399C6.27624 14.3526 6.46091 14.3636 6.64824 14.3729V12.4319C6.46091 12.4226 6.27624 12.4116 6.09424 12.3989Z" fill="#C49214"></path><path d="M9.41797 12.4319V14.3709C9.6053 14.3616 9.78997 14.3506 9.97197 14.3379V12.3989C9.78997 12.4116 9.6053 12.4226 9.41797 12.4319Z" fill="#C49214"></path><path d="M8.03286 12.4701H7.75586V14.4091H8.03286H8.30986V12.4641H8.03286" fill="#C49214"></path><path d="M14.1861 10.075C13.3991 10.767 10.5711 11.3569 7.20205 11.3569C5.1048 11.4148 3.01237 11.1263 1.00905 10.5029C0.957053 10.5429 0.914248 10.5936 0.883538 10.6516C0.852829 10.7096 0.83493 10.7735 0.831055 10.839C0.831055 11.681 4.05605 12.465 8.03105 12.465C12.0061 12.465 15.2311 11.681 15.2311 10.839C15.2311 10.549 14.8471 10.29 14.1821 10.075" fill="#FCC62D"></path><path d="M8.864 8.30993C5.204 8.30993 2.184 7.60992 1.724 6.84692C0.65 7.08992 0 7.41493 0 7.79193C0 8.63293 3.225 9.41792 7.2 9.41792C11.175 9.41792 14.4 8.63293 14.4 7.79193C14.3991 7.75468 14.392 7.71783 14.379 7.68292C12.5739 8.12786 10.7189 8.3386 8.86 8.30993" fill="#FFD949"></path><path d="M14.1261 3.75293C13.2641 4.42293 10.4921 4.98593 7.20311 4.98593C5.4021 5.00983 3.60488 4.81439 1.85111 4.40393C1.79695 4.44384 1.75203 4.49497 1.71941 4.55381C1.68679 4.61266 1.66725 4.67785 1.66211 4.74493C1.66211 5.58693 4.88711 6.37093 8.86211 6.37093C12.8371 6.37093 16.0621 5.58693 16.0621 4.74493C16.0621 4.34493 15.3241 4.00093 14.1211 3.75293" fill="#FCC62D"></path></svg>
                                      <p className="text-2xl">30</p>
                                  </button>
                              </div>
                          )}
                          {activeLifeline && <div className="blur-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm z-50"></div>}

          <AdSlot
            slotId="ad-slot-2"
            adUnitPath="/123456/ad-unit"
            sizes={[78, 80]}
          />

          {/* Report UI */}
          <div
            className={`animate__animated bottomsheet_animated ${
              showReportUI
                ? "animate__slideInUp h-auto opacity-100"
                : "animate__slideOutDown h-0 opacity-0"
            } bg-CFFFFFF w-full rounded-t-10 text-center py-20 px-20 transition-all duration-300 ease-in-out max-w-maxW dark:bg-C20213F dark:border-C404380 dark:border-1 z-100`}
            style={{
              overflow: showReportUI ? "visible" : "hidden",
            }}
          >
            <div
              data-testid="flag-close-sheet-button"
              className="dark:text-CFFFFFF flex flex-row-reverse cursor-pointer absolute top-15 right-15"
              onClick={() => setShowReportUI(false)} // Close the report UI
            >
              <svg
                width="30"
                height="31"
                viewBox="0 0 30 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 30.9985C23.2843 30.9985 30 24.2828 30 15.9985C30 7.71426 23.2843 0.998535 15 0.998535C6.71573 0.998535 0 7.71426 0 15.9985C0 24.2828 6.71573 30.9985 15 30.9985Z"
                  className="fill-current text-CEDEDED dark:text-C404380"
                />
                <path
                  className="fill-current text-C959595 dark:text-C8789C3"
                  d="M16.4452 15.9987L19.6102 12.8317C19.6454 12.7945 19.665 12.7453 19.665 12.6942C19.665 12.643 19.6454 12.5938 19.6102 12.5567L18.4402 11.3887C18.4222 11.3706 18.4008 11.3562 18.3772 11.3464C18.3536 11.3366 18.3283 11.3315 18.3027 11.3315C18.2772 11.3315 18.2519 11.3366 18.2283 11.3464C18.2047 11.3562 18.1832 11.3706 18.1652 11.3887L15.0002 14.5537L11.8322 11.3887C11.7951 11.3535 11.7459 11.3339 11.6947 11.3339C11.6436 11.3339 11.5944 11.3535 11.5572 11.3887L10.3902 12.5587C10.355 12.5958 10.3354 12.645 10.3354 12.6962C10.3354 12.7473 10.355 12.7965 10.3902 12.8337L13.5552 15.9987L10.3902 19.1637C10.355 19.2008 10.3354 19.25 10.3354 19.3012C10.3354 19.3523 10.355 19.4015 10.3902 19.4387L11.5602 20.6077C11.5782 20.6258 11.5997 20.6402 11.6233 20.65C11.6469 20.6598 11.6722 20.6648 11.6977 20.6648C11.7233 20.6648 11.7486 20.6598 11.7722 20.65C11.7958 20.6402 11.8172 20.6258 11.8352 20.6077L15.0002 17.4427L18.1652 20.6077C18.1832 20.6258 18.2047 20.6402 18.2283 20.65C18.2519 20.6598 18.2772 20.6648 18.3027 20.6648C18.3283 20.6648 18.3536 20.6598 18.3772 20.65C18.4008 20.6402 18.4222 20.6258 18.4402 20.6077L19.6102 19.4387C19.6454 19.4015 19.665 19.3523 19.665 19.3012C19.665 19.25 19.6454 19.2008 19.6102 19.1637L16.4452 15.9987Z"
                />
              </svg>
            </div>
            <div className="flex pb-15">
              <div className="mr-8 mb-3">
                <img
                  alt="Flag Icon"
                  fetchPriority="high"
                  width="30"
                  height="30"
                  decoding="async"
                  data-nimg="1"
                  src="https://static.quizzop.com/newton/assets/flag_active_dark.svg"
                  style={{ color: "transparent" }}
                />
              </div>
              <div className="text-14 flex items-center font-medium text-C676767 dark:text-CFAFAFA">
                REPORT QUESTION
              </div>
            </div>
            <hr className="h-1 w-500 translate-x-n20 text-CF1F1F1 dark:text-C404380"></hr>
            <div className="px-20 mt-24 mt-8 font-bold text-18 dark:text-C8789C3">
              What do you wish to report about this question?
            </div>
            <div className="my-28">
              {reportOptions.map((option, index) => (
                <div
                  key={index}
                  data-testid={`flag-option-${index}`}
                  className="flex justify-center items-center w-full mt-20 px-15 py-15 bg-CFAFAFA border-2 border-CE0E0E0 rounded-10 text-center text-14 font-dark dark:border-C404380 dark:bg-C20213F dark:text-CFFFFFF active:border-C4782F4 active:bg-CF5F7FF hover:border-C4782F4 hover:bg-CF5F7FF dark:text-CFAFAFA dark:hover:bg-CFFFFFF dark:hover:text-C404380 cursor-pointer flex items-center flex-col select-none opacity-100"
                >
                  <span className="font-bold">{option}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlayContest;
