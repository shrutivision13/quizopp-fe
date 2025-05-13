import { useEffect, useState } from "react";
import { SectionHeading } from "../../../components/Ui/SectionHeading";
import { ApiGetGames } from "../../../api-wrapper/games/ApiGames";
import { toast } from "react-toastify";
import GameCard from "../../../components/GameCard/GameCard";

const TrendingGames = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    ApiGetGames()
      .then((res) => {
        if (res.isSuccess) {
          setGames(res.data);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, []);

  return (
    <div className="px-20 mt-24">
      <SectionHeading title={"Play Games"} button={"More Games"} powerdBy />
      <div className="grid gap-14">
        <div className="flex scroll mx-[1px] snap-x snap-mandatory overflow-scroll hide-scroll-bar">
          {games.map((game) => (
            <GameCard key={game._id} game={game} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingGames;
