import { Fragment } from "react"

const QuizBattlesOpponentStat = ({
    score = 0,
    isWinner = false,
    opponentImage = "",
    opponentName = "",
    statColor = "text-CFFCC5B",
    isLoading = false
}) => {
    return (
        <div className="flex flex-col mb-10">
            <div className="relative">
                {
                    (isWinner && !isLoading) && <Fragment>
                        <img
                            alt="crown"
                            loading="lazy"
                            width="42"
                            height="24"
                            decoding="async"
                            data-nimg="1"
                            className="absolute z-10 -top-[22px] left-[22%] style_winner__FpHzL"
                            src={"https://www.quizzop.com/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2Fbattles%2Fcrown.png&w=48&q=75"}
                        />

                        <img
                            alt="leaves"
                            loading="lazy"
                            width="40"
                            height="70"
                            decoding="async"
                            data-nimg="1"
                            className="absolute z-10 -left-12 top-[10px] bottom-10 style_winner__FpHzL"
                            src="https://www.quizzop.com/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2Fbattles%2Fleaves.png&w=48&q=75"
                            style={{ color: "transparent" }}
                        />
                        <img
                            alt="leaves"
                            loading="lazy"
                            width="40"
                            height="70"
                            decoding="async"
                            data-nimg="1"
                            className="absolute z-10 -right-12 bottom-10 style_winner__FpHzL"
                            src="https://www.quizzop.com/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2Fbattles%2FflippedLeaves.png&w=48&q=75"
                            style={{ color: "transparent" }}
                        />
                        <img
                            alt="ribbon"
                            loading="lazy"
                            width="84"
                            height="28"
                            decoding="async"
                            data-nimg="1"
                            className="absolute z-10 bottom-0 style_winner__FpHzL"
                            src="https://www.quizzop.com/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2Fbattles%2Fribbon.png&w=96&q=75"
                            style={{ color: "transparent" }}
                        />
                    </Fragment>
                }
                <div className={`relative flex items-center justify-center mb-10 ${isLoading && 'opacity-60'}`}>
                    <img
                        alt="player image"
                        loading="lazy"
                        width="80"
                        height="80"
                        decoding="async"
                        data-nimg="1"
                        className="rounded-[50%]"

                        src={opponentImage}
                        style={{ color: "transparent" }}
                    />
                    {isLoading && <div className="absolute loader z-10"></div>}
                    <div id="emoji-animation" className="relative">
                    </div>
                </div>
            </div>
            <p className={`text-center text-14 ${statColor}`}>{opponentName} <br />
                <span className="font-bold">{isLoading ? '--' : score} / 100</span>
            </p>
        </div>
    )
}

export default QuizBattlesOpponentStat