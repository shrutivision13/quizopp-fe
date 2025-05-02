import React, { useEffect, useState } from "react";
import { ApiGetCategories } from "../../../api-wrapper/categories/ApiCategories";
import CategoryCard from "../../../components/CategoryCard/CategoryCard";
import arrow from "../../../assets/images/next-arrow-yellow.svg";

const TopQuiz = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    ApiGetCategories()
      .then((res) => {
        if (res.isSuccess) {
          setCategories(res.data);
          //   dispatch(handleLoader(false));
        }
      })
      .catch((err) => {
        // dispatch(handleLoader(false));
        // Toast.error(err);
      });
  }, []);
  return (
    <section className="px-20 mt-24">
      <div className="flex justify-between items-center mb-14">
        <h2 className="text-18 font-black text-CFFFFFF">Top Quizzes</h2>
        <a href="/category">
          <div className="w-full flex cursor-pointer items-center">
            <p
              className="text-10 font-bold uppercase text-CFFCC5B mr-4"
              data-testid="contest-see-all-button"
            >
              See All
            </p>
            <img
              alt="arrow filled icon"
              fetchPriority="high"
              width="16"
              height="16"
              decoding="async"
              data-nimg="1"
              style={{ color: "transparent" }}
              src={arrow}
            />
          </div>
        </a>
      </div>
      <div className="grid grid-cols-3 gap-14">
        {categories?.slice(0, 6).map((category) => (
          <CategoryCard key={category?._id} category={category} />
        ))}
      </div>
    </section>
  );
};

export default TopQuiz;
