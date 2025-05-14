const GameStats = ({
    accuracy = 0,
    accuracyPercentage = "0%",
    speed = 0,
    speedPercentage = "0%",
    lifelinesUsed = 0,
    lifelinesUsedPercentage = "0%"
}) => {
    return (
        <div className="flex flex-col gap-20 w-full text-10 text-CBBBDDD uppercase pb-20">
            <div>
                <div className="mb-6 flex items-center justify-between">
                    <p>Accuracy</p>
                    <p>{accuracy}/5</p>
                </div>
                <div className="relative w-full h-10 rounded-3xl bg-C12132A">
                    <div className="absolute rounded-3xl inset-0 bg-C24A561 background-transition" style={{ width: `${accuracyPercentage}%` }}></div>
                </div>
            </div>
            <div>
                <div className="mb-6 flex items-center justify-between">
                    <p>speed</p>
                    <p>{speed}</p>
                </div>
                <div className="relative w-full h-10 rounded-3xl bg-C12132A">
                    <div className="absolute rounded-3xl inset-0 bg-CFFCC5B background-transition" style={{ width: `${speedPercentage}%` }}></div>
                </div>
            </div>
            <div>
                <div className="mb-6 flex items-center justify-between">
                    <p>lifelines used</p>
                    <p>{lifelinesUsed}/4</p>
                </div>
                <div className="relative w-full h-10 rounded-3xl bg-C12132A">
                    <div className="absolute rounded-3xl inset-0 bg-CE63737 background-transition" style={{ width: `${lifelinesUsedPercentage}%` }}></div>
                </div>
            </div>
        </div>
    )
}

export default GameStats