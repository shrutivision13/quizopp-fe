import React, { useEffect, useState } from "react";
import TrendingQuizCard from "../../../components/TrendingQuizCard/TrendingQuizCard";
import { SectionHeading } from "../../../components/Ui/SectionHeading";
import { ApiGetCategories } from "../../../api-wrapper/categories/ApiCategories";

const TrendingQuiz = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await ApiGetCategories();
      if (res?.isSuccess) {
        setCategories(res?.data);
      } else {
        console.error("Error fetching categories:", res.message);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="mt-24 px-20">
      <SectionHeading title={"Trending Quiz Topics"} button={"See all"} route={"/category"} />
      <div className="flex scroll mx-1 snap-x snap-mandatory overflow-scroll hide-scroll-bar">
        {categories.slice(0, 9)?.map((category) => {
          return <TrendingQuizCard key={category?._id} category={category} />;
        })}
      </div>
    </div>
  );
};

export default TrendingQuiz;
