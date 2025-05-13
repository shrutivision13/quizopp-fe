import React, { useReducer, useEffect, useMemo, useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ApiGetGamesQuestions } from '../../api-wrapper/games/ApiGames';
import { ApiSubmitContest } from '../../api-wrapper/contest/ApiGetcontest';
import lifelinesData from "../../utils/lifelinesData.json";

import player1 from '../../assets/images/players/player-1.webp';
import playerYou from '../../assets/images/players/player-0.webp';
import chatIcon from '../../assets/images/chat-icon.webp';
import stopWatch from '../../assets/images/stopwatch.webp';
import speakerActive from '../../assets/images/battle-speaker-active.webp';
import speakerInactive from '../../assets/images/battle-speaker-inactive.webp';
import fiftyfiftyImg from '../../assets/images/fifty-fifty.webp';


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
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_QUESTIONS':
            return { ...state, questions: action.questions };
        case 'NEXT_QUESTION':
            return {
                ...state,
                currentIndex: state.currentIndex + 1,
                selectedOption: null,
                shakeIndex: null,
                timerPaused: false,
            };
        case 'ANSWER':
            return {
                ...state,
                selectedOption: action.option,
                score: state.score + (action.correct ? 20 : -10),
                shakeIndex: action.correct ? null : action.index,
            };
        case 'TOGGLE_MUTE':
            return { ...state, isMuted: !state.isMuted };
        case 'TOGGLE_LIFELINES':
            return { ...state, lifelineOpen: !state.lifelineOpen, activeLifelineId: null };
        case 'ACTIVATE_LIFELINE':
            return { ...state, activeLifelineId: action.id, timerPaused: true };
        case 'CLOSE_LIFELINE':
            return { ...state, lifelineOpen: false, activeLifelineId: null, timerPaused: false };
        case 'SHOW_REPORT':
            return { ...state, showReportUI: true };
        default:
            throw new Error(`Unknown action ${action.type}`);
    }
}

// 2) countdown hook
function useCountdown(initial, paused, onExpire) {
    const [count, setCount] = React.useState(initial);

    useEffect(() => {
        if (paused) return;
        if (count <= 0) {
            onExpire();
            return;
        }
        const t = setTimeout(() => setCount(c => c - 1), 1000);
        return () => clearTimeout(t);
    }, [count, paused, onExpire]);

    const reset = () => setCount(initial);
    return { count, reset };
}

const Games = () => {
    const { categoryName } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const participantId = location.state?.participantId;

    const [state, dispatch] = useReducer(reducer, initialState);
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
    } = state;

    // fetch once
    useEffect(() => {
        ApiGetGamesQuestions("6809c8051b04c23b60a5fb37")
            .then(res => {
                if (res.isSuccess) {
                    dispatch({ type: 'SET_QUESTIONS', questions: res.data.slice(0, 5) });
                    resetTimer();
                }
            })
            .catch(console.error);
    }, []);

    const currentQuestion = questions[currentIndex] || { options: [], question: '' };

    // shuffle options only when question changes
    const shuffledOptions = useMemo(() => {
        return [...currentQuestion.options].sort(() => Math.random() - 0.5);
    }, [currentQuestion]);

    // handle next or submit
    const goToNextOrSubmit = useCallback(() => {
        if (currentIndex < questions.length - 1) {
            dispatch({ type: 'NEXT_QUESTION' });
            resetTimer();
        } else {
            ApiSubmitContest(participantId, {
                totalQuestions: questions.length,
                correctAnswers: score / 20,
            })
                .then(res => {
                    if (res.isSuccess) {
                        navigate(`/${categoryName}/contest-rank`, { state: { result: res.data } });
                    }
                })
                .catch(console.error);
        }
    }, [currentIndex, questions, score, participantId, navigate, categoryName]);

    // countdown
    const { count: timeLeft, reset: resetTimer } = useCountdown(10, timerPaused, goToNextOrSubmit);

    // auto‐close lifeline after 5s when activated
    useEffect(() => {
        if (activeLifelineId != null) {
            const t = setTimeout(() => dispatch({ type: 'CLOSE_LIFELINE' }), 5000);
            return () => clearTimeout(t);
        }
    }, [activeLifelineId]);

    // event handlers
    const handleAnswer = useCallback((option, idx) => {
        const correct = option === currentQuestion.options[0];
        dispatch({ type: 'ANSWER', option, index: idx, correct });
        setTimeout(goToNextOrSubmit, 800);
    }, [currentQuestion, goToNextOrSubmit]);

    const toggleMute = () => dispatch({ type: 'TOGGLE_MUTE' });
    const toggleLifelines = () => dispatch({ type: 'TOGGLE_LIFELINES' });
    const activateLifeline = id => dispatch({ type: 'ACTIVATE_LIFELINE', id });
    const closeLifeline = () => dispatch({ type: 'CLOSE_LIFELINE' });
    const showReport = () => dispatch({ type: 'SHOW_REPORT' });

    const activeLifeline = lifelinesData.find(l => l.id === activeLifelineId);

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
                                        <img alt="stopwatch" width="11" height="12" src={stopWatch} />
                                    </div>
                                    <span className={`text-12 font-bold transition-all duration-250 ${timeLeft > 5 ? "text-white" : "text-red-700"}`}>
                                        00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}s
                                    </span>
                                </div>
                                <div className="cursor-pointer mr-20" onClick={toggleMute}>
                                    <img alt="Speaker Icon" width="30" height="30"
                                        src={isMuted ? speakerInactive : speakerActive} />
                                </div>
                            </div>
                        </div>

                        <div className="mt-14 px-20 w-full flex items-center justify-between">
                            <div className="flex">
                                <div className="relative">
                                    <div className="relative flex items-center justify-center mb-10">
                                        <img alt="player image" width="26" height="26"
                                            className="rounded-[50%]"
                                            src={playerYou} />
                                        <div id="emoji-animation" className="relative" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-center">
                                    <div className="pl-10 flex flex-col text-10">
                                        <div className="text-CFAFAFA uppercase">You</div>
                                        <div className="font-bold text-CFFCC5B">Score: {score}</div>
                                    </div>
                                    <div id="chat-icon" className="ml-8 relative cursor-pointer chat-icon">
                                        <img alt="chat icon" width="24" height="24" src={chatIcon} />
                                    </div>
                                </div>
                            </div>

                            <div className="flex">
                                <div className="pr-10 flex flex-col text-10">
                                    <div className="text-CFAFAFA uppercase">IronHunter</div>
                                    <div className="font-bold text-CA96DFF">Score: -20</div>
                                </div>
                                <div className="relative">
                                    <div className="relative flex items-center justify-center mb-10">
                                        <img alt="player image" width="26" height="26"
                                            className="rounded-[50%]" src={player1} />
                                        <div id="emoji-animation" className="relative" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full px-20 my-14 h-4 flex items-center justify-center mb-28">
                            <div className="h-full rounded-l-10 bg-CFFD949 background-transition" style={{ width: "230%" }} />
                            <div className="transition-all duration-350">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="23"
                                    height="24"
                                    viewBox="0 0 23 24"
                                    fill="none"
                                >
                                    <circle cx="11.5" cy="12" r="11.22" fill="#191A32" stroke="#FFD949" strokeWidth="0.44"></circle>
                                    <path
                                        d="M15.73 17.82L13.975 16.08L12.655 17.4L12.235 16.98C12.005 16.75 11.89 16.465 11.89 16.125C11.89 15.785 12.005 15.5 12.235 15.27L14.77 12.735C15 12.505 15.285 12.39 15.625 12.39C15.965 12.39 16.25 12.505 16.48 12.735L16.9 13.155L15.58 14.475L17.32 16.23C17.44 16.35 17.5 16.49 17.5 16.65C17.5 16.81 17.44 16.95 17.32 17.07L16.57 17.82C16.45 17.94 16.31 18 16.15 18C15.99 18 15.85 17.94 15.73 17.82ZM17.5 8.4L10.69 15.21L10.765 15.27C10.995 15.5 11.11 15.785 11.11 16.125C11.11 16.465 10.995 16.75 10.765 16.98L10.345 17.4L9.025 16.08L7.27 17.82C7.15 17.94 7.01 18 6.85 18C6.69 18 6.55 17.94 6.43 17.82L5.68 17.07C5.56 16.95 5.5 16.81 5.5 16.65C5.5 16.49 5.56 16.35 5.68 16.23L7.42 14.475L6.1 13.155L6.52 12.735C6.75 12.505 7.035 12.39 7.375 12.39C7.715 12.39 8 12.505 8.23 12.735L8.29 12.81L15.1 6H17.5V8.4ZM8.47 11.37L5.5 8.4V6H7.9L10.87 8.97L8.47 11.37Z"
                                        fill="#FFD949"
                                    ></path>
                                </svg>
                            </div>
                            <div className="h-full rounded-r-10 bg-CA96DFF background-transition" style={{ width: "170%" }} />
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
                        <div className="cursor-pointer" onClick={showReport}>
                            <img alt="Flag Icon" width="30" height="30"
                                src="https://static.quizzop.com/newton/assets/flag_active_dark.svg" />
                        </div>
                    </div>

                    <div className="text-center px-40 text-18 text-C2C2C2C font-bold mt-10 dark:text-CFFFFFF">
                        {currentQuestion.question}
                    </div>

                    <div className="grid mt-30 grid-cols-2 gap-20">
                        {shuffledOptions.map((option, idx) => (
                            <div key={idx}
                                className={`justify-center py-10 text-14 shadow-quizCard border-1 font-medium rounded-10 bg-CFFFFFF border-CF1F1F1 dark:text-CFFFFFF dark:border-C26284C dark:bg-C26284C px-22 answer-input cursor-pointer flex items-center flex-col select-none ${shakeIndex === idx ? 'animate-shake' : ''}`}
                                style={{
                                    backgroundColor: selectedOption
                                        ? (option === currentQuestion.options[0]
                                            ? "#74C465"
                                            : option === selectedOption
                                                ? "#EF353D"
                                                : "")
                                        : ""
                                }}
                                onClick={() => !selectedOption && handleAnswer(option, idx)}
                            >
                                {option}
                            </div>
                        ))}
                    </div>

                    {/* Lifelines Toggle */}
                    <div className="cursor-pointer flex justify-center text-center -mt-12 z-40 absolute -bottom-16 left-1/2 -translate-x-1/2">
                        <div onClick={toggleLifelines}
                            className="border border-CC7C7C7 text-CC7C7C7 dark:text-CFAFAFA dark:border-C404380 rounded-full py-4 px-16 mb-4 bg-CFAFAFA dark:bg-C191A32 transition-all">
                            <p className="text-12 uppercase font-bold flex items-center gap-4 justify-center">
                                {lifelineOpen ? "Close" : <>
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
                                </>}
                            </p>
                        </div>
                    </div>

                    {/* Lifeline Cards */}
                    {/* <div className={`transition-all duration-300 ease-in-out overflow-hidden ${lifelineOpen ? "h-auto opacity-100 mt-5" : "h-0 opacity-0"}`}>
                        <div className="px-20 flex w-full gap-30 justify-between pt-14">
                            {lifelinesData.map(ll => (
                                <div key={ll.id} onClick={() => activateLifeline(ll.id)} className="flex flex-col items-center cursor-pointer">
                                    <div className="border rounded-full p-4 lifeline-icon-box">
                                        <img src={fiftyfiftyImg} alt={ll.name} width="56" height="56" />
                                    </div>
                                    <p className="mt-2 text-12 font-bold">{ll.name}</p>
                                </div>
                            ))}
                        </div>
                    </div> */}
                    <div
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${lifelineOpen ? "h-auto opacity-100 mt-5" : "h-0 opacity-0"}`}
                    >
                        <div className="z-10 animate__playContest_fadeInUp">
                            <div className="lifeline-card-container dark:text-CFFFFFF bg-CFFFFFF dark:bg-C20213F max-w-maxW animate__animated bottomsheet_animated lifeline-box-container w-full">
                                <div className="px-20 flex w-full gap-30 justify-between transition-all ease-in duration-[250ms] overflow-hidden h-[120px] max-h-[120px] pt-14">
                                    <div
                                        data-testid="50:50-lifeline"
                                        onClick={() => activateLifeline(1)}
                                        className="flex justify-center animate__animated"
                                    >
                                        <div className="max-w-60">
                                            <div className="border rounded-full py-8 px-4 h-56 w-56 flex justify-center items-center cursor-pointer border-CFFCC5B lifeline-icon-box">
                                                <div className="lifeline-icon">
                                                    <svg
                                                        width="31"
                                                        height="9"
                                                        viewBox="0 0 31 9"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="fill-current text-CB36916 dark:text-CFFCC5B"
                                                    >
                                                        <path d="M0.607422 4.55469L1.09961 0.21875H5.88086V1.63086H2.48828L2.27734 3.46484C2.67969 3.25 3.10742 3.14258 3.56055 3.14258C4.37305 3.14258 5.00977 3.39453 5.4707 3.89844C5.93164 4.40234 6.16211 5.10742 6.16211 6.01367C6.16211 6.56445 6.04492 7.05859 5.81055 7.49609C5.58008 7.92969 5.24805 8.26758 4.81445 8.50977C4.38086 8.74805 3.86914 8.86719 3.2793 8.86719C2.76367 8.86719 2.28516 8.76367 1.84375 8.55664C1.40234 8.3457 1.05273 8.05078 0.794922 7.67188C0.541016 7.29297 0.40625 6.86133 0.390625 6.37695H2.06641C2.10156 6.73242 2.22461 7.00977 2.43555 7.20898C2.65039 7.4043 2.92969 7.50195 3.27344 7.50195C3.65625 7.50195 3.95117 7.36523 4.1582 7.0918C4.36523 6.81445 4.46875 6.42383 4.46875 5.91992C4.46875 5.43555 4.34961 5.06445 4.11133 4.80664C3.87305 4.54883 3.53516 4.41992 3.09766 4.41992C2.69531 4.41992 2.36914 4.52539 2.11914 4.73633L1.95508 4.88867L0.607422 4.55469ZM12.9883 5.22266C12.9883 6.40234 12.7441 7.30469 12.2559 7.92969C11.7676 8.55469 11.0527 8.86719 10.1113 8.86719C9.18164 8.86719 8.4707 8.56055 7.97852 7.94727C7.48633 7.33398 7.23438 6.45508 7.22266 5.31055V3.74023C7.22266 2.54883 7.46875 1.64453 7.96094 1.02734C8.45703 0.410156 9.16992 0.101562 10.0996 0.101562C11.0293 0.101562 11.7402 0.408203 12.2324 1.02148C12.7246 1.63086 12.9766 2.50781 12.9883 3.65234V5.22266ZM11.2949 3.5C11.2949 2.79297 11.1973 2.2793 11.002 1.95898C10.8105 1.63477 10.5098 1.47266 10.0996 1.47266C9.70117 1.47266 9.40625 1.62695 9.21484 1.93555C9.02734 2.24023 8.92773 2.71875 8.91602 3.37109V5.44531C8.91602 6.14062 9.00977 6.6582 9.19727 6.99805C9.38867 7.33398 9.69336 7.50195 10.1113 7.50195C10.5254 7.50195 10.8242 7.33984 11.0078 7.01562C11.1914 6.69141 11.2871 6.19531 11.2949 5.52734V3.5ZM14.2891 7.91797C14.2891 7.64844 14.3789 7.42969 14.5586 7.26172C14.7422 7.09375 14.9707 7.00977 15.2441 7.00977C15.5215 7.00977 15.75 7.09375 15.9297 7.26172C16.1133 7.42969 16.2051 7.64844 16.2051 7.91797C16.2051 8.18359 16.1152 8.40039 15.9355 8.56836C15.7559 8.73242 15.5254 8.81445 15.2441 8.81445C14.9668 8.81445 14.7383 8.73242 14.5586 8.56836C14.3789 8.40039 14.2891 8.18359 14.2891 7.91797ZM14.2891 3.11914C14.2891 2.84961 14.3789 2.63086 14.5586 2.46289C14.7422 2.29492 14.9707 2.21094 15.2441 2.21094C15.5215 2.21094 15.75 2.29492 15.9297 2.46289C16.1133 2.63086 16.2051 2.84961 16.2051 3.11914C16.2051 3.38477 16.1152 3.60156 15.9355 3.76953C15.7559 3.93359 15.5254 4.01562 15.2441 4.01562C14.9668 4.01562 14.7383 3.93359 14.5586 3.76953C14.3789 3.60156 14.2891 3.38477 14.2891 3.11914ZM17.7754 4.55469L18.2676 0.21875H23.0488V1.63086H19.6562L19.4453 3.46484C19.8477 3.25 20.2754 3.14258 20.7285 3.14258C21.541 3.14258 22.1777 3.39453 22.6387 3.89844C23.0996 4.40234 23.3301 5.10742 23.3301 6.01367C23.3301 6.56445 23.2129 7.05859 22.9785 7.49609C22.748 7.92969 22.416 8.26758 21.9824 8.50977C21.5488 8.74805 21.0371 8.86719 20.4473 8.86719C19.9316 8.86719 19.4531 8.76367 19.0117 8.55664C18.5703 8.3457 18.2207 8.05078 17.9629 7.67188C17.709 7.29297 17.5742 6.86133 17.5586 6.37695H19.2344C19.2695 6.73242 19.3926 7.00977 19.6035 7.20898C19.8184 7.4043 20.0977 7.50195 20.4414 7.50195C20.8242 7.50195 21.1191 7.36523 21.3262 7.0918C21.5332 6.81445 21.6367 6.42383 21.6367 5.91992C21.6367 5.43555 21.5176 5.06445 21.2793 4.80664C21.041 4.54883 20.7031 4.41992 20.2656 4.41992C19.8633 4.41992 19.5371 4.52539 19.2871 4.73633L19.123 4.88867L17.7754 4.55469ZM30.1562 5.22266C30.1562 6.40234 29.9121 7.30469 29.4238 7.92969C28.9355 8.55469 28.2207 8.86719 27.2793 8.86719C26.3496 8.86719 25.6387 8.56055 25.1465 7.94727C24.6543 7.33398 24.4023 6.45508 24.3906 5.31055V3.74023C24.3906 2.54883 24.6367 1.64453 25.1289 1.02734C25.625 0.410156 26.3379 0.101562 27.2676 0.101562C28.1973 0.101562 28.9082 0.408203 29.4004 1.02148C29.8926 1.63086 30.1445 2.50781 30.1562 3.65234V5.22266ZM28.4629 3.5C28.4629 2.79297 28.3652 2.2793 28.1699 1.95898C27.9785 1.63477 27.6777 1.47266 27.2676 1.47266C26.8691 1.47266 26.5742 1.62695 26.3828 1.93555C26.1953 2.24023 26.0957 2.71875 26.084 3.37109V5.44531C26.084 6.14062 26.1777 6.6582 26.3652 6.99805C26.5566 7.33398 26.8613 7.50195 27.2793 7.50195C27.6934 7.50195 27.9922 7.33984 28.1758 7.01562C28.3594 6.69141 28.4551 6.19531 28.4629 5.52734V3.5Z" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <p class="text-CB36916 dark:text-CFFFAF0 text-center mt-8 font-bold text-12 ">
                                                50:50
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        data-testid="audience-poll-lifeline"
                                        onClick={() => activateLifeline(2)}
                                        className="flex justify-center animate__animated"
                                    >
                                        <div className="max-w-60">
                                            <div className="border rounded-full py-8 px-4 h-56 w-56 flex justify-center items-center cursor-pointer border-CFFCC5B lifeline-icon-box">
                                                <div className="lifeline-icon">
                                                    <svg
                                                        width="21"
                                                        height="20"
                                                        viewBox="0 0 21 20"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="fill-current text-CB36916 dark:text-CFFCC5B"
                                                    >
                                                        <path d="M7.87879 18.8985V14.282C7.87879 13.8406 8.06574 13.6499 8.50333 13.6496C9.83456 13.6496 11.1658 13.6496 12.497 13.6496C12.936 13.6496 13.1233 13.8382 13.1236 14.2796C13.1236 15.7428 13.1236 17.206 13.1236 18.6692V18.8848C13.188 18.8903 13.2372 18.8978 13.2865 18.8978C13.6996 18.8978 14.1128 18.8937 14.5259 18.9013C14.6602 18.9037 14.7036 18.8669 14.7025 18.7291C14.6967 17.897 14.6994 17.0652 14.6994 16.2331C14.6994 14.5461 14.6994 12.8591 14.6994 11.1721C14.6994 10.6791 14.8795 10.4997 15.3746 10.4997H19.2994C19.7628 10.4997 19.947 10.6804 19.9474 11.1445C19.9487 13.6576 19.9479 16.1709 19.9449 18.6844C19.9449 18.8613 19.9928 18.9209 20.1667 18.9016C20.2813 18.8913 20.3967 18.893 20.5109 18.9068C20.8081 18.9357 21.0115 19.1647 20.9995 19.4473C20.9947 19.581 20.9381 19.7077 20.8418 19.8005C20.7455 19.8934 20.6169 19.9452 20.4831 19.9452C20.0758 19.9544 19.6685 19.95 19.2609 19.95C13.0582 19.95 6.85546 19.9505 0.652599 19.9517C0.377171 19.9517 0.150632 19.8877 0.0380513 19.6119C0.00908913 19.5413 -0.00361486 19.4651 0.0008848 19.389C0.00538446 19.3128 0.0269713 19.2387 0.0640429 19.172C0.101115 19.1053 0.152721 19.0479 0.215033 19.0039C0.277345 18.9599 0.348764 18.9304 0.423993 18.9178C0.572242 18.8971 0.722284 18.8922 0.871564 18.9033C1.01444 18.9113 1.05713 18.8634 1.0561 18.7195C1.0499 17.876 1.053 17.0325 1.053 16.189C1.053 13.4694 1.053 10.7495 1.053 8.02946C1.053 7.98367 1.053 7.93753 1.05507 7.89174C1.07091 7.55159 1.273 7.35259 1.61556 7.3519C2.80335 7.35007 3.99113 7.35007 5.17891 7.3519C5.37412 7.3519 5.56899 7.34812 5.7642 7.3519C6.06613 7.35741 6.26926 7.54746 6.29853 7.84871C6.30507 7.91756 6.30266 7.98642 6.30266 8.05528C6.30266 11.5899 6.30266 15.1246 6.30266 18.6593C6.30266 18.9003 6.30266 18.9003 6.54366 18.9003L7.87879 18.8985ZM2.11237 8.40645V18.8861H5.234V8.40645H2.11237ZM15.7626 18.882H18.8883V11.5604H15.7626V18.882ZM8.94126 14.7038V18.883C8.97359 18.8892 9.00623 18.8936 9.03903 18.8961C10.003 18.8961 10.967 18.8961 11.929 18.9009C12.0598 18.9009 12.0773 18.8448 12.0773 18.7353C12.0746 17.4394 12.0738 16.1436 12.0749 14.8477C12.0725 14.7995 12.0675 14.7514 12.0601 14.7038H8.94126Z" />
                                                        <path d="M15.6835 6.54701C15.2982 6.02163 15.1326 5.44737 15.2727 4.80941C15.3758 4.31514 15.6558 3.8755 16.0601 3.57308C16.8303 2.98401 17.9461 3.00983 18.6708 3.63471C19.5396 4.38364 19.642 5.35636 18.9783 6.55286C19.3866 6.76288 19.7357 7.04347 20.0008 7.42322C20.2905 7.83326 20.4542 8.31894 20.4718 8.82067C20.4886 9.22727 20.28 9.44451 19.8748 9.44486C18.5268 9.44623 17.1789 9.44623 15.8312 9.44486C15.4755 9.44486 15.1199 9.4483 14.7639 9.44486C14.3776 9.44176 14.1645 9.22658 14.1827 8.84064C14.2295 7.85702 14.6926 7.12438 15.5378 6.62757C15.5819 6.60279 15.6267 6.57938 15.6835 6.54701ZM16.2808 5.23597C16.2785 5.37356 16.3035 5.51025 16.3544 5.63809C16.4053 5.76594 16.4811 5.8824 16.5774 5.98072C16.6737 6.07905 16.7885 6.15728 16.9152 6.21087C17.042 6.26446 17.1781 6.29236 17.3157 6.29293C17.5939 6.29542 17.8618 6.18778 18.0609 5.99351C18.26 5.79924 18.3742 5.5341 18.3785 5.25594C18.3785 4.97791 18.2694 4.71098 18.0748 4.51246C17.8801 4.31394 17.6154 4.19967 17.3374 4.19417C17.0593 4.19279 16.792 4.30164 16.594 4.49689C16.3959 4.69214 16.2833 4.95789 16.2808 5.23597ZM19.3105 8.38653C19.1931 7.9183 18.7125 7.4604 18.1885 7.39568C17.7251 7.33887 17.2517 7.35608 16.7828 7.35264C16.3617 7.34954 15.9995 7.5086 15.6993 7.80021C15.5351 7.9603 15.4005 8.1445 15.3354 8.38549L19.3105 8.38653Z" />
                                                        <path d="M8.85146 9.70474C7.9849 8.4815 8.52405 7.28132 9.18507 6.7611C9.99139 6.12659 11.121 6.15 11.8784 6.81172C12.589 7.43143 12.9354 8.61542 12.1511 9.69613C12.1883 9.71954 12.2241 9.74433 12.2616 9.76499C13.1292 10.257 13.5902 11.0044 13.6498 11.9963C13.6714 12.363 13.4473 12.5929 13.0769 12.5933C11.3616 12.5951 9.6463 12.5951 7.93084 12.5933C7.55213 12.5933 7.32766 12.3616 7.35245 11.9839C7.41786 10.9855 7.88505 10.2363 8.76642 9.75191C8.79121 9.74055 8.81428 9.72574 8.85146 9.70474ZM10.4982 7.35018C10.3602 7.35036 10.2235 7.37777 10.0961 7.43085C9.96871 7.48393 9.85302 7.56163 9.7557 7.6595C9.65837 7.75737 9.58132 7.87348 9.52895 8.00118C9.47658 8.12889 9.44993 8.26567 9.45052 8.40369C9.45304 8.67954 9.5639 8.94334 9.75919 9.13817C9.95448 9.33301 10.2185 9.44326 10.4944 9.44515C10.7732 9.44552 11.0408 9.33561 11.2388 9.13939C11.4368 8.94318 11.5492 8.6766 11.5513 8.39784C11.5513 8.25979 11.5241 8.12311 11.4711 7.99564C11.4181 7.86817 11.3404 7.75243 11.2425 7.65508C11.1447 7.55772 11.0285 7.48066 10.9008 7.42834C10.773 7.37601 10.6362 7.34945 10.4982 7.35018ZM8.51303 11.5298H12.4885C12.3184 10.9752 11.7562 10.5358 11.1523 10.5076C10.7178 10.487 10.2806 10.488 9.8461 10.5093C9.2405 10.5389 8.6745 10.9817 8.51303 11.5298Z" />
                                                        <path d="M2.03187 3.39811C1.25791 2.34701 1.56536 1.13823 2.31487 0.498203C2.69937 0.173104 3.18755 -0.00360696 3.69106 5.58174e-05C4.19456 0.00371859 4.68012 0.187514 5.05985 0.518173C5.78285 1.14787 6.0989 2.33634 5.32254 3.39364C5.37487 3.426 5.42582 3.45802 5.47712 3.48832C6.32406 3.98615 6.77508 4.72774 6.81983 5.70723C6.8367 6.07631 6.62876 6.29252 6.25934 6.29252C4.53792 6.29527 2.81764 6.29527 1.09851 6.29252C0.731158 6.29252 0.516324 6.0739 0.53044 5.70999C0.564869 4.76906 0.99488 4.05019 1.78191 3.54099C1.85766 3.49279 1.93891 3.45113 2.03187 3.39811ZM4.72211 2.10223C4.72302 1.96425 4.69667 1.82746 4.64458 1.6997C4.59249 1.57193 4.51569 1.45571 4.41857 1.3577C4.32146 1.25969 4.20595 1.18182 4.07866 1.12856C3.95138 1.0753 3.81484 1.0477 3.67686 1.04734C3.39803 1.04852 3.13096 1.15983 2.93383 1.35702C2.73669 1.55422 2.62547 1.82133 2.62438 2.10016C2.62801 2.37588 2.73882 2.63935 2.93334 2.83478C3.12787 3.03021 3.39083 3.14223 3.66653 3.14713C3.80445 3.14795 3.94117 3.12155 4.06888 3.06945C4.19658 3.01735 4.31275 2.94057 4.41074 2.84351C4.50872 2.74645 4.5866 2.63102 4.63992 2.50382C4.69323 2.37662 4.72092 2.24015 4.72142 2.10223H4.72211ZM5.66889 5.24107C5.663 5.20834 5.6546 5.17611 5.64376 5.14467C5.41102 4.6403 5.02714 4.29876 4.47629 4.23438C3.9808 4.18119 3.48133 4.17601 2.98485 4.21889C2.73008 4.2392 2.46842 4.3659 2.24119 4.49707C1.96576 4.65648 1.78501 4.91779 1.6714 5.24107H5.66889Z" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <p class="text-CB36916 dark:text-CFFFAF0 text-center mt-8 font-bold text-12 ">
                                                Audience Poll
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        data-testid="freeze-timer-lifeline"
                                        onClick={() => activateLifeline(3)}
                                        className="flex justify-center animate__animated"
                                    >
                                        <div className="max-w-60">
                                            <div className="border rounded-full py-8 px-4 h-56 w-56 flex justify-center items-center cursor-pointer border-CFFCC5B lifeline-icon-box">
                                                <div className="lifeline-icon">
                                                    <svg
                                                        width="29"
                                                        height="27"
                                                        viewBox="0 0 29 27"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        class="fill-current text-CB36916 dark:text-CFFCC5B"
                                                    >
                                                        <path
                                                            fill-rule="evenodd"
                                                            clip-rule="evenodd"
                                                            d="M14.5301 24.7302C14.575 24.8009 14.604 24.8806 14.6152 24.9637V24.9537C14.6293 25.0329 14.6259 25.1143 14.6051 25.192C14.5844 25.2698 14.5469 25.342 14.4952 25.4037C14.3697 25.5322 14.2036 25.6134 14.0252 25.6337C12.4687 25.9003 10.875 25.857 9.33527 25.5064C7.79557 25.1559 6.34021 24.5048 5.0526 23.5907C3.765 22.6766 2.67048 21.5173 1.8318 20.1793C0.993107 18.8413 0.426741 17.351 0.165166 15.7937C-0.319033 12.9163 0.269862 9.96134 1.82011 7.48942C3.37035 5.01751 5.77407 3.20068 8.57517 2.38368C9.25059 2.20223 9.93946 2.07515 10.6352 2.00368V1.96368L11.0352 1.90368C11.115 1.86068 11.176 1.85164 11.2112 1.84643C11.2333 1.84316 11.2452 1.84139 11.2452 1.83368V1.64368C11.2513 1.53043 11.2513 1.41693 11.2452 1.30368C11.2568 1.26453 11.2568 1.22283 11.2452 1.18368H11.1152H9.68517C9.50536 1.18733 9.32945 1.13104 9.18517 1.02368C9.12474 0.969639 9.07654 0.90333 9.04377 0.829179C9.01101 0.755029 8.99444 0.674743 8.99517 0.59368C8.99002 0.512021 9.0046 0.430322 9.03767 0.355482C9.07073 0.280642 9.12132 0.214856 9.18517 0.16368C9.32945 0.0563176 9.50536 2.64238e-05 9.68517 0.0036796H11.9452H14.1852C14.3962 -0.0161368 14.607 0.0445906 14.7752 0.17368C14.8402 0.224363 14.8923 0.289787 14.927 0.364553C14.9618 0.439318 14.9783 0.521282 14.9752 0.60368C14.9791 0.687624 14.963 0.771301 14.9282 0.847805C14.8935 0.924309 14.841 0.991447 14.7752 1.04368C14.6265 1.14983 14.4478 1.20587 14.2652 1.20368H12.7852V1.31368C12.6552 1.26368 12.5952 1.29368 12.5952 1.31368V1.51368V1.83368C12.5873 1.8733 12.5873 1.91406 12.5952 1.95368C12.6307 1.97953 12.6718 1.99666 12.7152 2.00368H13.0452V1.95368C15.6225 2.18822 18.055 3.2497 19.9797 4.97978C21.9044 6.70987 23.2182 9.01582 23.7252 11.5537C23.7718 11.7373 23.7541 11.9314 23.6752 12.1037C23.6365 12.1795 23.5798 12.2447 23.5101 12.2935C23.4403 12.3424 23.3597 12.3733 23.2752 12.3837C23.1953 12.4013 23.1122 12.3986 23.0336 12.3759C22.955 12.3532 22.8834 12.3112 22.8252 12.2537C22.6947 12.1203 22.6106 11.9485 22.5852 11.7637C22.3194 10.3708 21.776 9.04566 20.9874 7.86713C20.1989 6.6886 19.1813 5.68078 17.9952 4.90368V4.84368L17.9352 4.93368C16.4249 3.92693 14.6849 3.3178 12.8765 3.16278C11.0681 3.00776 9.24983 3.31186 7.59028 4.04689C5.93073 4.78192 4.48364 5.92408 3.38317 7.36747C2.28271 8.81085 1.56451 10.5087 1.29517 12.3037C1.08292 13.7208 1.15774 15.1661 1.51517 16.5537C1.87713 17.9433 2.50915 19.2482 3.37517 20.3937C4.24323 21.537 5.3307 22.4956 6.57389 23.2134C7.81708 23.9311 9.191 24.3936 10.6152 24.5737V24.5837C11.6829 24.7222 12.7656 24.6952 13.8252 24.5037V24.4937C14.0037 24.4556 14.1897 24.4766 14.3552 24.5537C14.4256 24.5992 14.4852 24.6594 14.5301 24.7302ZM1.80517 5.44376C1.90443 5.55132 2.03957 5.61889 2.18517 5.63376C2.25807 5.64185 2.33186 5.63347 2.40109 5.60924C2.47032 5.58501 2.53323 5.54555 2.58517 5.49376C3.02769 5.10969 3.40747 4.71864 3.78271 4.33227L3.78281 4.33216C3.85696 4.25582 3.93093 4.17965 4.00517 4.10376C4.06769 4.01598 4.10252 3.9115 4.10517 3.80376C4.13015 3.70532 4.13015 3.6022 4.10517 3.50376C4.08339 3.43346 4.03731 3.3732 3.97517 3.33376C3.92591 3.29149 3.87228 3.25462 3.81517 3.22376L3.66517 3.10376H3.42517C3.33876 3.12698 3.25964 3.17171 3.19517 3.23376C2.72517 3.69376 2.25517 4.15376 1.80517 4.63376C1.73964 4.69152 1.68971 4.76485 1.66 4.847C1.63029 4.92914 1.62175 5.01745 1.63517 5.10376C1.65204 5.23297 1.71192 5.35274 1.80517 5.44376ZM13.4543 14.3761C13.3269 14.7455 13.0671 15.0545 12.7252 15.2436L12.7752 15.2236C12.5468 15.3543 12.2883 15.423 12.0252 15.423C11.7621 15.423 11.5035 15.3543 11.2752 15.2236C11.0184 15.0936 10.8029 14.8948 10.6528 14.6493C10.5027 14.4038 10.4239 14.1213 10.4252 13.8336V13.7636C10.4122 13.7043 10.4122 13.6429 10.4252 13.5836C10.4593 13.5206 10.4772 13.4502 10.4772 13.3786C10.4772 13.307 10.4593 13.2365 10.4252 13.1736C10.3441 13.039 10.2429 12.9176 10.1252 12.8136C9.83268 12.5511 9.55706 12.2717 9.28145 11.9924L9.28142 11.9923C9.18955 11.8992 9.09767 11.8061 9.00517 11.7136L8.62517 11.3336C8.48629 11.2106 8.39147 11.0455 8.35517 10.8636C8.34394 10.7812 8.35261 10.6974 8.38045 10.6191C8.40829 10.5408 8.45449 10.4703 8.51517 10.4136C8.56838 10.3501 8.63625 10.3005 8.71291 10.2692C8.78958 10.2378 8.87273 10.2256 8.95517 10.2336C9.13941 10.2651 9.30811 10.3565 9.43517 10.4936C10.0152 11.0636 10.5952 11.6436 11.1652 12.2336L11.1552 12.2436C11.1972 12.2922 11.253 12.3271 11.3152 12.3436C11.377 12.3628 11.4433 12.3628 11.5052 12.3436C11.8793 12.2343 12.2802 12.2627 12.6352 12.4236C12.9864 12.5928 13.2637 12.8843 13.4152 13.2436C13.5678 13.6033 13.5818 14.0067 13.4543 14.3761ZM12.2352 14.1836C12.3116 14.1054 12.3577 14.0026 12.3652 13.8936V13.8836C12.3734 13.8003 12.3559 13.7166 12.3152 13.6436C12.273 13.573 12.2102 13.5172 12.1352 13.4836C12.0564 13.4641 11.974 13.4641 11.8952 13.4836C11.8162 13.4998 11.7435 13.538 11.6852 13.5936C11.6268 13.6513 11.5853 13.7239 11.5652 13.8036C11.5453 13.8823 11.5453 13.9648 11.5652 14.0436C11.595 14.1179 11.6475 14.1809 11.7152 14.2236C11.7817 14.2735 11.8621 14.3015 11.9452 14.3036C12.0531…83 11.4837 20.8239 11.5386 20.7699C11.5935 20.7159 11.6586 20.6734 11.7302 20.6448C11.8017 20.6163 11.8782 20.6023 11.9552 20.6036C12.0314 20.6031 12.107 20.6179 12.1774 20.6471C12.2478 20.6763 12.3117 20.7193 12.3652 20.7736C12.4712 20.8882 12.5316 21.0376 12.5352 21.1936C12.5402 21.2602 12.5402 21.327 12.5352 21.3936ZM3.98516 14.4637H4.11516H4.21516H4.40516H4.72516C4.80147 14.4589 4.87583 14.4376 4.94315 14.4014C5.01047 14.3651 5.06915 14.3147 5.11516 14.2537C5.19583 14.1584 5.24168 14.0385 5.24516 13.9137C5.25041 13.783 5.21551 13.6539 5.14516 13.5437C5.10951 13.4861 5.06131 13.4373 5.00417 13.4009C4.94704 13.3646 4.88243 13.3416 4.81516 13.3337C4.51314 13.2937 4.20718 13.2937 3.90516 13.3337C3.83901 13.3448 3.77609 13.3702 3.72081 13.4082C3.66553 13.4463 3.61923 13.4959 3.58516 13.5537C3.52558 13.6709 3.50126 13.8029 3.51516 13.9337C3.5237 14.066 3.58066 14.1906 3.67516 14.2837C3.76252 14.3709 3.87395 14.4301 3.99516 14.4537L3.98516 14.4637ZM5.77243 16.7538H5.77517C5.78292 16.66 5.76992 16.5657 5.73708 16.4776C5.70424 16.3894 5.65237 16.3096 5.58517 16.2438C5.52603 16.1812 5.45145 16.1353 5.36894 16.1107C5.28643 16.0861 5.1989 16.0837 5.11517 16.1038C4.85187 16.1714 4.5994 16.2758 4.36517 16.4138C4.29118 16.4579 4.22933 16.5198 4.18517 16.5938C4.13482 16.6646 4.1038 16.7473 4.09517 16.8338C4.08494 16.9242 4.09172 17.0158 4.11517 17.1038C4.14537 17.1781 4.18949 17.246 4.24517 17.3038C4.32941 17.3992 4.44366 17.4631 4.56909 17.4849C4.69452 17.5067 4.82364 17.4852 4.93517 17.4238C5.01522 17.3827 5.09891 17.3493 5.18517 17.3238C5.31863 17.269 5.4433 17.1948 5.55517 17.1038C5.61887 17.0619 5.67192 17.0057 5.71011 16.9398C5.74327 16.8825 5.76442 16.8192 5.77243 16.7538ZM4.26516 11.2637C4.46413 11.3876 4.67127 11.4978 4.88516 11.5937L5.20516 11.7337H5.26516V11.6837L5.41516 11.5537L5.57516 11.4037C5.63244 11.3548 5.67126 11.2877 5.68516 11.2137C5.71486 11.1023 5.71486 10.9851 5.68516 10.8737C5.64689 10.768 5.58538 10.6723 5.50516 10.5937C5.28013 10.4228 5.01499 10.3127 4.73516 10.2737C4.62503 10.2643 4.51443 10.2851 4.41516 10.3337C4.31647 10.383 4.2282 10.4509 4.15516 10.5337C4.10706 10.5803 4.0725 10.639 4.05516 10.7037C4.04029 10.7661 4.04029 10.8312 4.05516 10.8937C4.0572 10.9676 4.07783 11.0398 4.11516 11.1037C4.14782 11.1565 4.19233 11.201 4.24516 11.2337L4.26516 11.2637ZM15.5108 6.80228C15.4884 6.8405 15.4652 6.88018 15.4652 6.92372H15.4952C15.4112 7.12814 15.3109 7.32544 15.1952 7.51372L15.1525 7.48173C15.1175 7.52918 15.0742 7.56999 15.0246 7.60212C14.9689 7.63825 14.9064 7.66267 14.8409 7.67389C14.7754 7.68512 14.7084 7.68291 14.6438 7.66741C14.5792 7.65191 14.5184 7.62344 14.4652 7.58372C14.3485 7.5284 14.2561 7.43239 14.2052 7.31372C14.1799 7.25358 14.1668 7.18898 14.1668 7.12372C14.1668 7.05847 14.1799 6.99387 14.2052 6.93372V6.87372C14.2581 6.64621 14.3567 6.43185 14.4952 6.24372C14.5719 6.16591 14.6638 6.10465 14.7652 6.06372C14.8633 6.0228 14.9688 6.00238 15.0752 6.00372V6.09372C15.1441 6.09578 15.2114 6.11519 15.2708 6.15015C15.3302 6.18511 15.3799 6.23449 15.4152 6.29372C15.4995 6.42503 15.5446 6.57768 15.5452 6.73372C15.5376 6.7564 15.5243 6.77907 15.5108 6.80228ZM5.90515 8.63357C6.06348 8.84369 6.25222 9.02906 6.46515 9.18357C6.55001 9.22524 6.64129 9.25229 6.73515 9.26357C6.83101 9.26746 6.92656 9.25039 7.01515 9.21357C7.12946 9.14719 7.22297 9.05022 7.28515 8.93357V8.87358C7.28469 8.73912 7.24658 8.60749 7.17515 8.49358C7.13188 8.35649 7.0714 8.22544 6.99515 8.10357C6.90349 7.99993 6.79537 7.91208 6.67515 7.84357C6.57872 7.77573 6.46303 7.74067 6.34515 7.74358C6.2443 7.74909 6.14672 7.7813 6.06241 7.83692C5.97809 7.89254 5.91007 7.96957 5.86531 8.06011C5.82054 8.15066 5.80064 8.25147 5.80765 8.35223C5.81465 8.453 5.8483 8.55009 5.90515 8.63357ZM7.28516 19.3136C7.3419 19.2294 7.37222 19.1302 7.37222 19.0286C7.37222 18.9271 7.3419 18.8278 7.28516 18.7436C7.22954 18.6588 7.15396 18.5889 7.06504 18.5401C6.97612 18.4913 6.87658 18.465 6.77516 18.4636C6.6641 18.4731 6.55735 18.511 6.46516 18.5736C6.35331 18.6458 6.2494 18.7296 6.15516 18.8236C6.05985 18.9194 5.97287 19.0231 5.89516 19.1336C5.83088 19.2287 5.79293 19.3391 5.78516 19.4536C5.78642 19.5537 5.8127 19.6519 5.8616 19.7392C5.91051 19.8265 5.98048 19.9002 6.06516 19.9536C6.14885 20.0117 6.24829 20.0428 6.35016 20.0428C6.45202 20.0428 6.55146 20.0117 6.63516 19.9536C6.89028 19.7832 7.11083 19.5661 7.28516 19.3136ZM19.7355 11.044C19.7053 11.1278 19.6602 11.2054 19.6026 11.2729L19.6052 11.2736L19.5972 11.2792C19.5839 11.2945 19.5698 11.3094 19.5552 11.3236L19.5473 11.3131C19.3455 11.4457 19.1212 11.5408 18.8852 11.5936C18.7627 11.6396 18.6276 11.6396 18.5052 11.5936C18.3919 11.5304 18.2984 11.4369 18.2352 11.3236C18.1648 11.2111 18.14 11.0759 18.1661 10.9458C18.1921 10.8156 18.2669 10.7004 18.3752 10.6236C18.5679 10.5097 18.7684 10.4095 18.9752 10.3236L19.2952 10.1936H19.3552V10.2436L19.4952 10.3636C19.5534 10.4081 19.607 10.4584 19.6552 10.5136C19.7121 10.5686 19.7534 10.6375 19.7752 10.7136C19.7872 10.8253 19.7737 10.9383 19.7355 11.044Z"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                            <p class="text-CB36916 dark:text-CFFFAF0 text-center mt-8 font-bold text-12 ">
                                                Freeze Timer
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        data-testid="flip-question-lifeline"
                                        onClick={() => activateLifeline(4)}
                                        className="flex justify-center animate__animated"
                                    >
                                        <div className="max-w-60">
                                            <div className="border rounded-full py-8 px-4 h-56 w-56 flex justify-center items-center cursor-pointer border-CFFCC5B lifeline-icon-box">
                                                <div className="lifeline-icon">
                                                    <svg
                                                        width="25"
                                                        height="25"
                                                        viewBox="0 0 25 25"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        class="fill-current ml-2 text-CB36916 dark:text-CFFCC5B"
                                                    >
                                                        <mask id="path-1-inside-1" fill="white">
                                                            <path
                                                                fill-rule="evenodd"
                                                                clip-rule="evenodd"
                                                                d="M11.6423 0.657983L10.6318 2.76678L11.0272 2.85464C16.5628 3.46971 21.0001 5.0513 21.0001 10.7187C21.0001 12.4321 20.6047 14.0137 19.9017 15.4635C19.9457 15.0241 19.9896 14.5848 19.9896 14.1455C19.9896 8.82956 15.9917 7.42369 10.8954 6.45716H10.6318L11.6423 8.56596C11.818 8.96136 11.4226 9.35675 11.0272 9.18102L1.80127 4.61197H1.8452L11.0272 0.0429186C11.4226 -0.132814 11.818 0.262585 11.6423 0.657983ZM9.44563 21.2187L10.3682 19.2856L9.97283 19.1977C4.43725 18.5827 0 17.0011 0 11.3776C0 9.66424 0.395399 8.08264 1.09833 6.63285C1.0544 7.07218 1.01046 7.51151 1.01046 7.95084C1.01046 13.2228 5.00838 14.6287 10.1046 15.6391H10.3682L9.44563 13.6622C9.22597 13.2228 9.70923 12.7396 10.1486 12.9592L19.2427 17.4404H19.1988L10.1486 21.9216C9.70923 22.1413 9.22597 21.658 9.44563 21.2187Z"
                                                            />
                                                        </mask>
                                                        <path
                                                            d="M10.6318 2.76678L9.73002 2.33466L9.18606 3.46989L10.4149 3.74296L10.6318 2.76678ZM11.6423 0.657983L12.5441 1.0901L12.5503 1.0772L12.5561 1.06412L11.6423 0.657983ZM11.0272 2.85464L10.8103 3.83083L10.8631 3.84256L10.9168 3.84853L11.0272 2.85464ZM19.9017 15.4635L18.9067 15.364L20.8016 15.8997L19.9017 15.4635ZM10.8954 6.45716L11.0818 5.47468L10.9894 5.45716H10.8954V6.45716ZM10.6318 6.45716V5.45716H9.0438L9.73002 6.88929L10.6318 6.45716ZM11.6423 8.56596L12.5561 8.15982L12.5503 8.14674L12.5441 8.13384L11.6423 8.56596ZM11.0272 9.18102L10.5834 10.0771L10.6021 10.0864L10.6211 10.0948L11.0272 9.18102ZM1.80127 4.61197V3.61197L1.35747 5.5081L1.80127 4.61197ZM1.8452 4.61197V5.61197H2.08026L2.2907 5.50725L1.8452 4.61197ZM11.0272 0.0429186L10.6211 -0.870893L10.6012 -0.862056L10.5817 -0.852364L11.0272 0.0429186ZM10.3682 19.2856L11.2707 19.7163L11.8121 18.5821L10.5852 18.3094L10.3682 19.2856ZM9.44563 21.2187L10.3401 21.6659L10.3442 21.6577L10.3481 21.6494L9.44563 21.2187ZM9.97283 19.1977L10.1898 18.2216L10.137 18.2098L10.0833 18.2039L9.97283 19.1977ZM1.09833 6.63285L2.09337 6.73235L0.198516 6.19657L1.09833 6.63285ZM10.1046 15.6391L9.91014 16.6201L10.0064 16.6391H10.1046V15.6391ZM10.3682 15.6391V16.6391H11.9384L11.2744 15.2163L10.3682 15.6391ZM9.44563 13.6622L10.3518 13.2393L10.3461 13.227L10.3401 13.2149L9.44563 13.6622ZM10.1486 12.9592L9.70134 13.8537L9.70656 13.8562L10.1486 12.9592ZM19.2427 17.4404V18.4404L19.6847 16.5434L19.2427 17.4404ZM19.1988 17.4404V16.4404H18.9648L18.7551 16.5443L19.1988 17.4404ZM10.1486 21.9216L9.70483 21.0254L9.70135 21.0272L10.1486 21.9216ZM11.5337 3.1989L12.5441 1.0901L10.7405 0.225863L9.73002 2.33466L11.5337 3.1989ZM11.2442 1.87846L10.8488 1.79059L10.4149 3.74296L10.8103 3.83083L11.2442 1.87846ZM22.0001 10.7187C22.0001 7.56452 20.7345 5.43015 18.6377 4.0557C16.6278 2.73825 13.9327 2.17131 11.1377 1.86076L10.9168 3.84853C13.6574 4.15304 15.9487 4.68443 17.5413 5.72838C19.047 6.71534 20.0001 8.20547 20.0001 10.7187H22.0001ZM20.8016 15.8997C21.5667 14.3216 22.0001 12.5915 22.0001 10.7187H20.0001C20.0001 12.2727 19.6426 13.7057 19.0019 15.0272L20.8016 15.8997ZM18.9896 14.1455C18.9896 14.5266 18.9515 14.9161 18.9067 15.364L20.8968 15.563C20.9399 15.1322 20.9896 14.6431 20.9896 14.1455H18.9896ZM10.7091 7.43965C13.2582 7.92309 15.3389 8.48838 16.7831 9.4916C18.1362 10.4315 18.9896 11.7972 18.9896 14.1455H20.9896C20.9896 11.1778 19.8441 9.18265 17.9241 7.849C16.0953 6.57867 13.629 5.95777 11.0818 5.47468L10.7091 7.43965ZM10.6318 7.45716H10.8954V5.45716H10.6318V7.45716ZM12.5441 8.13384L11.5337 6.02504L9.73002 6.88929L10.7405 8.99808L12.5441 8.13384ZM10.6211 10.0948C11.8533 10.6425 13.1038 9.39203 12.5561 8.15982L10.7285 8.9721C10.5323 8.53068 10.992 8.07103 11.4334 8.26721L10.6211 10.0948ZM1.35747 5.5081L10.5834 10.0771L11.471 8.28489L2.24506 3.71584L1.35747 5.5081ZM1.8452 3.61197H1.80127V5.61197H1.8452V3.61197ZM10.5817 -0.852364L1.3997 3.71669L2.2907 5.50725L11.4727 0.938201L10.5817 -0.852364ZM12.5561 1.06412C13.1038 -0.168086 11.8533 -1.41854 10.6211 -0.870893L11.4334 0.95673C10.992 1.15291 10.5323 0.693255 10.7285 0.251843L12.5561 1.06412ZM9.46575 18.8549L8.54315 20.7879L10.3481 21.6494L11.2707 19.7163L9.46575 18.8549ZM9.7559 20.1739L10.1513 20.2618L10.5852 18.3094L10.1898 18.2216L9.7559 20.1739ZM-1 11.3776C-1 14.5131 0.268268 16.6359 2.36415 18.0033C4.37323 19.3141 7.06721 19.881 9.8624 20.1916L10.0833 18.2039C7.34287 17.8994 5.05044 17.3679 3.457 16.3283C1.95036 15.3453 1 13.8656 1 11.3776H-1ZM0.198516 6.19657C-0.566636 7.7747 -1 9.50482 -1 11.3776H1C1 9.82365 1.35743 8.39059 1.99814 7.06912L0.198516 6.19657ZM2.01046 7.95084C2.01046 7.56976 2.04858 7.1802 2.09337 6.73235L0.103292 6.53334C0.0602107 6.96416 0.0104634 7.45326 0.0104634 7.95084H2.01046ZM10.2991 14.6582C7.74772 14.1524 5.66423 13.5771 4.21695 12.5718C2.86085 11.6298 2.01046 10.2733 2.01046 7.95084H0.0104634C0.0104634 10.9003 1.15903 12.8828 3.07596 14.2144C4.9017 15.4826 7.3653 16.1155 9.91014 16.6201L10.2991 14.6582ZM10.3682 14.6391H10.1046V16.6391H10.3682V14.6391ZM8.53945 14.085L9.46205 16.062L11.2744 15.2163L10.3518 13.2393L8.53945 14.085ZM10.5958 12.0648C9.29689 11.4154 7.90177 12.8105 8.55121 14.1094L10.3401 13.2149C10.4524 13.4397 10.3634 13.6643 10.2571 13.7707C10.1507 13.877 9.92606 13.966 9.70135 13.8537L10.5958 12.0648ZM19.6847 16.5434L10.5906 12.0622L9.70656 13.8562L18.8007 18.3374L19.6847 16.5434ZM19.1988 18.4404H19.2427V16.4404H19.1988V18.4404ZM10.5923 22.8178L19.6425 18.3366L18.7551 16.5443L9.70484 21.0254L10.5923 22.8178ZM8.55121 20.7715C7.90177 22.0703 9.29688 23.4655 10.5958 22.816L9.70135 21.0272C9.92606 20.9148 10.1507 21.0038 10.2571 21.1101C10.3634 21.2165 10.4524 21.4412 10.3401 21.6659L8.55121 20.7715Z"
                                                            mask="url(#path-1-inside-1)"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                            <p class="text-CB36916 dark:text-CFFFAF0 text-center mt-8 font-bold text-12 ">
                                                Flip Question
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Active Lifeline Drawer */}
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
            </div>
        </>
    );
};

export default Games;
