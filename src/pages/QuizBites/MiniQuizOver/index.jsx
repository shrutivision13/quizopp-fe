import { useEffect, useState } from "react";
import AdSlot from "../../../components/AdSense/AdSlot";
import trophy from '../../../assets/images/trophy.webp';
import coinsLost from '../../../assets/images/coins-lost.png';
import coinsWin from '../../../assets/images/coins-win.png';
import { useLocation, useNavigate } from "react-router-dom";

const MiniQuizOver = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const totalCorrect = state?.totalCorrect || 0;
    const totalQuestion = state?.totalQuestion || 5;

    // Calculate percentage
    const percentage = totalQuestion > 0 ? Math.round((totalCorrect / totalQuestion) * 100) : 0;

    // Circle progress variables
    const radius = 45; // same as r in <circle>
    const circumference = 2 * Math.PI * radius;

    // Calculate strokeDashoffset
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const handleNavigatePlayAgain = () => {
        navigate('/mini-quiz-category-selection')
    }

    useEffect(() => {
        const userData = localStorage.getItem("userData");
        setUserData(userData);
    }, [])

    return (
        <div>
            <div className="bg-C20213F rounded-10 m-20">
                <div className="relative px-20 pt-0 pb-20 text-center shadow-contestCard bg-mini-quiz-over bg-center">
                    {
                        (userData?.isRegister ? totalCorrect >= 3 : totalCorrect >= 4) ?
                            <p class="pt-20 text-18 font-bold mb-14 text-C24A561">Congratulations!</p>
                            :
                            <p className="pt-20 text-18 font-bold mb-14 text-CE63737">Oops!</p>
                    }

                    {
                        userData?.isRegister ?
                            <div className="flex flex-col items-center justify-center relative overflow-hidden">
                                <div class="flex justify-center mb-14">
                                    <img
                                        alt="coinsLost"
                                        loading="lazy"
                                        width="70"
                                        height="70"
                                        decoding="async"
                                        data-nimg="1"
                                        src={totalCorrect >= 3 ? coinsWin : coinsLost}
                                        style={{ color: "transparent" }}
                                    />
                                </div>

                                <div className="text-CFFFFFF text-12 font-bold mb-14">
                                    {
                                        totalCorrect >= 3 ? ` You just got ${state?.prize?.data?.awardedCoins} coins!` : "Better Luck Next Time"
                                    }
                                </div>
                            </div>
                            :
                            <div className="flex flex-col items-center justify-center relative overflow-hidden">
                                <div className="relative w-[100px] h-[100px] rounded-[50%] z-1 mb-14">
                                    <svg className="relative w-[100px] h-[100px] rotate-[-90deg]">
                                        <circle
                                            fill="#191A32"
                                            strokeWidth="6"
                                            strokeLinecap="round"
                                            className="stroke-[6px] circular-progress-shadow stroke-CFEDE34"
                                            cx="50%"
                                            cy="50%"
                                            r={45}
                                            style={{
                                                transformOrigin: "center",
                                                strokeDasharray: circumference,
                                                strokeDashoffset: strokeDashoffset
                                            }}
                                        />
                                    </svg>

                                    <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full rounded-[50%]">
                                        <h2 className="text-C2C2C2C dark:text-CFFFFFF text-24 font-black">
                                            <img
                                                alt="trophy"
                                                loading="lazy"
                                                width="80"
                                                height="80"
                                                decoding="async"
                                                className="mx-auto"
                                                src={trophy}
                                                style={{ color: "transparent" }}
                                            />
                                        </h2>
                                    </div>
                                </div>

                                <div className="text-center text-16 text-CFAFAFA font-bold">
                                    You answered {`${state?.totalCorrect}/${state?.totalQuestion}`} questions correctly!
                                </div>
                            </div>
                    }
                    <button
                        onClick={handleNavigatePlayAgain}
                        className="inline-flex items-center ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-full justify-center bg-C0DB25B border-1 border-C0DB25B rounded-10 text-center font-medium text-CFFFFFF shadow-quizCard px-12 py-10 text-14 whitespace-normal rounded-3 mt-14"
                        data-testid="play-again-button"
                    >
                        PLAY AGAIN
                    </button>
                </div>
            </div>
            <AdSlot
                slotId="ad-slot-1"
                adUnitPath="/123456/ad-unit"
                sizes={[728, 80]}
                marginTop="mt-0"
            />
        </div>
    )
}

export default MiniQuizOver;
