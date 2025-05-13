import { useNavigate } from "react-router-dom";
import '../../styles/components/quizbattles/quizbattles.css';
import AdSlot from "../../components/AdSense/AdSlot";
import GameStats from "../../components/GameStats/GameStats";
import GameStateSkeleton from "../../components/GameStateSkeleton/GameStateSkeleton";
import QuizBattlesOpponentStat from "../../components/QuizBattlesOpponent/QuizBattlesOpponent";

const QuizBattlesEndQuiz = () => {
    const navigate = useNavigate();

    return (
        <div className="hide-scroll-bar">
            <div className="style_background__W3FcZ">
                <div className="style_foreground__jJqg2 hide-scroll-bar" id="shell">
                    <div>
                        <div className="mb-14">
                            {/* Skeleton for Calculating result*/}
                            {/* <div className="px-20 font-black mt-24 flex flex-col items-center justify-center text-CE63737">
                                <p className="text-[18px] mb-4 text-C8789C3 uppercase font-bold">Brain Teasers</p>
                                <p className="text-10 text-C8789C3">Calculating Result...</p>
                            </div> */}
                            <div class="px-20 font-black mt-24 flex flex-col items-center justify-center text-CE63737">
                                <p class="mb-4 uppercase font-bold text-[24px] style_enlarge_text__0eTO9">You lose</p>
                                <p class="text-C8789C3 uppercase font-bold style_shrink_text__1kxLI">Brain Teasers</p>
                            </div>

                            <div className="flex flex-col item-center justify-center">
                                <div className="mt-14 px-20 w-full flex items-center justify-between">
                                    <QuizBattlesOpponentStat
                                        score={20}
                                        opponentImage="https://www.quizzop.com/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2Fbattles%2Fplayer-0.png&w=96&q=75"
                                        opponentName="You"
                                        // isLoading={true}
                                    />
                                    <div>
                                        <img
                                            alt="versus"
                                            loading="lazy"
                                            width="35"
                                            height="50"
                                            decoding="async"
                                            style={{ color: 'transparent' }}
                                            src="http://quizzop.com/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2FVersus.png&w=48&q=75"
                                        />
                                    </div>
                                    <QuizBattlesOpponentStat
                                        score={70}
                                        opponentImage="https://www.quizzop.com/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2Fbattles%2Fplayer-1.png&w=96&q=75"
                                        opponentName="TitanGuard"
                                        statColor="text-CA96DFF"
                                        isWinner={true}
                                        // isLoading={true}
                                    />
                                </div>
                            </div>

                            <div className="relative bg-C20213F flex items-center justify-between px-20 w-full gap-18 pt-36 mb-18 mt-14 animate__animated animate__slideInUp">
                                <div className="absolute bg-C20213F rounded-full py-4 px-16 mb-4 top-[-6%] left-p35 button-shadow">
                                    <p className="text-14 text-center text-CFFCC5B uppercase font-black">・Game Stats・</p>
                                </div>
                                <GameStats
                                    accuracy={2}
                                    accuracyPercentage="40%"
                                    speed={21}
                                    speedPercentage="42%"
                                    lifelinesUsed={2}
                                    lifelinesUsedPercentage="50%"
                                />
                                <div className="flex flex-col gap-20 self-baseline">
                                    <div className="h-32 w-32 bg-C12132A rounded-6 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6.95 11.45L12.2375 6.1625L11.1875 5.1125L6.95 9.35L4.8125 7.2125L3.7625 8.2625L6.95 11.45ZM8 15.5C6.9625 15.5 5.9875 15.3031 5.075 14.9094C4.1625 14.5156 3.36875 13.9813 2.69375 13.3063C2.01875 12.6313 1.48438 11.8375 1.09063 10.925C0.696875 10.0125 0.5 9.0375 0.5 8C0.5 6.9625 0.696875 5.9875 1.09063 5.075C1.48438 4.1625 2.01875 3.36875 2.69375 2.69375C3.36875 2.01875 4.1625 1.48438 5.075 1.09063C5.9875 0.696875 6.9625 0.5 8 0.5C9.0375 0.5 10.0125 0.696875 10.925 1.09063C11.8375 1.48438 12.6313 2.01875 13.3063 2.69375C13.9813 3.36875 14.5156 4.1625 14.9094 5.075C15.3031 5.9875 15.5 6.9625 15.5 8C15.5 9.0375 15.3031 10.0125 14.9094 10.925C14.5156 11.8375 13.9813 12.6313 13.3063 13.3063C12.6313 13.9813 11.8375 14.5156 10.925 14.9094C10.0125 15.3031 9.0375 15.5 8 15.5Z" fill="#BBBDDD"></path></svg>
                                    </div>
                                    <div className="h-32 w-32 bg-C12132A rounded-6 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M8.125 12.7916L12.8333 8.08325L11.6458 6.89575L8.125 10.4166L6.35417 8.64575L5.16667 9.83325L8.125 12.7916ZM9 17.3333C7.95833 17.3333 6.98264 17.1353 6.07292 16.7395C5.16319 16.3437 4.37153 15.8089 3.69792 15.1353C3.02431 14.4617 2.48958 13.6701 2.09375 12.7603C1.69792 11.8506 1.5 10.8749 1.5 9.83325C1.5 8.79159 1.69792 7.81589 2.09375 6.90617C2.48958 5.99645 3.02431 5.20478 3.69792 4.53117C4.37153 3.85756 5.16319 3.32284 6.07292 2.927C6.98264 2.53117 7.95833 2.33325 9 2.33325C10.0417 2.33325 11.0174 2.53117 11.9271 2.927C12.8368 3.32284 13.6285 3.85756 14.3021 4.53117C14.9757 5.20478 15.5104 5.99645 15.9063 6.90617C16.3021 7.81589 16.5 8.79159 16.5 9.83325C16.5 10.8749 16.3021 11.8506 15.9063 12.7603C15.5104 13.6701 14.9757 14.4617 14.3021 15.1353C13.6285 15.8089 12.8368 16.3437 11.9271 16.7395C11.0174 17.1353 10.0417 17.3333 9 17.3333ZM3.66667 0.958252L4.83333 2.12492L1.29167 5.66659L0.125 4.49992L3.66667 0.958252ZM14.3333 0.958252L17.875 4.49992L16.7083 5.66659L13.1667 2.12492L14.3333 0.958252Z" fill="#BBBDDD"></path></svg>
                                    </div>
                                    <div className="h-32 w-32 bg-C12132A rounded-6 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none"><path d="M11.0938 0.25C12.3438 0.25 13.3906 0.7125 14.2344 1.6375C15.0781 2.5625 15.5 3.6625 15.5 4.9375C15.5 5.1625 15.4875 5.38438 15.4625 5.60313C15.4375 5.82188 15.3938 6.0375 15.3312 6.25H10.6438L9.36875 4.3375C9.30625 4.2375 9.21875 4.15625 9.10625 4.09375C8.99375 4.03125 8.875 4 8.75 4C8.5875 4 8.44063 4.05 8.30938 4.15C8.17813 4.25 8.0875 4.375 8.0375 4.525L7.025 7.5625L6.36875 6.5875C6.30625 6.4875 6.21875 6.40625 6.10625 6.34375C5.99375 6.28125 5.875 6.25 5.75 6.25H0.66875C0.60625 6.0375 0.5625 5.82188 0.5375 5.60313C0.5125 5.38438 0.5 5.16875 0.5 4.95625C0.5 3.66875 0.91875 2.5625 1.75625 1.6375C2.59375 0.7125 3.6375 0.25 4.8875 0.25C5.4875 0.25 6.05312 0.36875 6.58438 0.60625C7.11563 0.84375 7.5875 1.175 8 1.6C8.4 1.175 8.86563 0.84375 9.39688 0.60625C9.92813 0.36875 10.4937 0.25 11.0938 0.25ZM8 13.75C7.775 13.75 7.55937 13.7094 7.35312 13.6281C7.14687 13.5469 6.9625 13.425 6.8 13.2625L1.775 8.21875C1.7 8.14375 1.63125 8.06875 1.56875 7.99375C1.50625 7.91875 1.44375 7.8375 1.38125 7.75H5.3375L6.6125 9.6625C6.675 9.7625 6.7625 9.84375 6.875 9.90625C6.9875 9.96875 7.10625 10 7.23125 10C7.39375 10 7.54375 9.95 7.68125 9.85C7.81875 9.75 7.9125 9.625 7.9625 9.475L8.975 6.4375L9.6125 7.4125C9.6875 7.5125 9.78125 7.59375 9.89375 7.65625C10.0063 7.71875 10.125 7.75 10.25 7.75H14.6L14.225 8.2L9.18125 13.2625C9.01875 13.425 8.8375 13.5469 8.6375 13.6281C8.4375 13.7094 8.225 13.75 8 13.75Z" fill="#BBBDDD"></path></svg>
                                    </div>
                                </div>
                                <GameStats
                                    accuracy={3}
                                    accuracyPercentage="60%"
                                    speed={21}
                                    speedPercentage="42%"
                                    lifelinesUsed={2}
                                    lifelinesUsedPercentage="50%"
                                />

                                {/* Skeleton */}
                                {/* <GameStateSkeleton />
                                <div className="flex flex-col gap-20 self-baseline">
                                    <div className="shimmer-animation rounded-6 h-32 w-32"></div>
                                    <div className="shimmer-animation rounded-6 h-32 w-32"></div>
                                    <div className="shimmer-animation rounded-6 h-32 w-32"></div>
                                </div>
                                <GameStateSkeleton />
                                 */}
                            </div>

                            <div className="mx-30 mb-20">
                                <button onClick={() => navigate('/')} className="inline-flex items-center justify-center whitespace-nowrap text-18 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary primary-button disabled:primary-button-disabled box-shadow text-primary-foreground hover:bg-primary/90 font-bold rounded-6 py-12 px-48 w-full uppercase shine-animation mb-14">
                                    PLAY AGAIN
                                </button>
                            </div>

                            <AdSlot
                                slotId="ad-slot-1"
                                adUnitPath="/123456/ad-unit"
                                sizes={[728, 80]}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizBattlesEndQuiz;