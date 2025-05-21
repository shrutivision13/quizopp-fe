import React, { useEffect, useState } from "react";
import PickCategories from "../../../components/PickCategories/PickCategories";
import { useLoader } from "../../../context/LoaderContext";
import { ApiGetQuizBites } from "../../../api-wrapper/categories/ApiCategories";

const QuizBites = () => {
  const [quizBites, setQuizBites] = useState([]);
  const { setLoading } = useLoader();

  useEffect(() => {
    setLoading(true);
    ApiGetQuizBites()
      .then((res) => {
        if (res?.isSuccess) {
          setQuizBites(res?.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="px-20 mt-24">
      <div className="mb-14">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-CFFFFFF text-18 font-bold">Quiz Bites</h2>
        </div>
        <p className="text-12 text-C8789C3">
          Short, quick quizzes from topics you ❤️ love!
        </p>
      </div>

      <PickCategories
        title={"Pick Upto 3 Categories"}
        button={{ name: "CREATE QUIZ" }}
        quizBites={false}
        quizBitesData={quizBites?.slice(0, 3)}
      />
    </section>
  );
};

export default QuizBites;
