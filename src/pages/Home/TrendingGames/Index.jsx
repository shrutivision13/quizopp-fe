import React, { useState } from "react";
import { SectionHeading } from "../../../components/Ui/SectionHeading";
import GameCard from "../../../components/GameCard/GameCard";
import { useLoader } from "../../../context/LoaderContext";

const TrendingGames = () => {
  const [game, setGames] = useState([]);
  const { setLoading } = useLoader();

  // useEffect(() => {
  //   setLoading(true);
  //   ApiGetCategories()
  //     .then((res) => {
  //       if (res.isSuccess) {
  //         setCategories(res.data);
  //         setLoading(false);
  //       }
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //     });
  // }, []);
  return (
    <div className="px-20 mt-24">
      <SectionHeading title={"Play Games"} button={"More Games"} powerdBy />
      <div className="grid gap-14">
        {/* {categories?.slice(0, 6).map((category) => (
          <CategoryCard key={category?._id} category={category} />
        ))} */}
        <GameCard />
      </div>
    </div>
  );
};

export default TrendingGames;
