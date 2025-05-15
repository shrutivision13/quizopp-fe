const GameCard = ({ game }) => {

  const handleClick = (game) => {
    window.location.replace(game.uri)
  };

    return (
      <div
        className="snap-center relative rounded-20 mr-10 last:mr-20 min-w-145 min-h-210 cursor-pointer"
        data-testid="game-card"
        onClick={() => handleClick(game)}
      >
        <div className="rounded-20 relative overflow-hidden h-full w-full">
          <img
            alt={`game cover image - ${game.name}`}
            loading="lazy"
            decoding="async"
            className="rounded-20 object-cover"
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              color: "transparent",
            }}
            src={game?.imageSrc}
          />
        </div>
        <div className="absolute inset-0 z-10 bg-gamezop-overlay rounded-20"></div>
        <div className="absolute bottom-20 w-full z-10 px-10">
          <p className="text-14 text-CFFFFFF text-center font-medium">
            {game?.name}
          </p>
        </div>
      </div>
    );
  };

  export default GameCard