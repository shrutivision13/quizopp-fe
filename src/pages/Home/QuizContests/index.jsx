import React, { useEffect, useState } from "react";
import ContestsCard from "../../../components/ContestsCard/ContestsCard";
import { ApiGetContests } from "../../../api-wrapper/contest/ApiGetcontest";
import { useLoader } from "../../../context/LoaderContext";
import { SectionHeading } from "../../../components/Ui/SectionHeading";

export const QuizContests = () => {
  const [contest, setContest] = useState([]);
  console.log("🚀 ~ QuizContests ~ contest:", contest);
  const { setLoading } = useLoader();

  useEffect(() => {
    setLoading(true);
    ApiGetContests()
      .then((res) => {
        if (res.isSuccess) {
          setContest(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="px-20 mt-24">
      <SectionHeading title={"Quiz Contests For You"} />
      <div className="w-full max-w-maxW">
        {contest?.slice(0, 5)?.map((quizContest) => (
          <ContestsCard key={quizContest?._id} quizContest={quizContest} />
        ))}
      </div>
    </section>
  );
};
