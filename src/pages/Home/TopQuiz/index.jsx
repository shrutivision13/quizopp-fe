import React, { useEffect, useState } from "react";
import { ApiGetCategories } from "../../../api-wrapper/categories/ApiCategories";
import CategoryCard from "../../../components/CategoryCard/CategoryCard";
import { useLoader } from "../../../context/LoaderContext";
import { SectionHeading } from "../../../components/Ui/SectionHeading";

const TopQuiz = () => {
  const [categories, setCategories] = useState([]);
  const { setLoading } = useLoader();

  useEffect(() => {
    setLoading(true);
    ApiGetCategories()
      .then((res) => {
        if (res.isSuccess) {
          setCategories(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);
  return (
    <div className="px-20 mt-24">
      <SectionHeading title={"Top Quizzes"} route="/category" />
      <div className="grid grid-cols-3 gap-14">
        {categories?.slice(0, 6).map((category) => (
          <CategoryCard key={category?._id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default TopQuiz;
