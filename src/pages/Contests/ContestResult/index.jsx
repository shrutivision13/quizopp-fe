import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import { ApiGetActiveContent } from "../../../api-wrapper/categories/ApiCategories";
import ContestsCard from "../../../components/ContestsCard/ContestsCard";
import AdSlot from "../../../components/AdSense/AdSlot";
import { ApiGetScore } from "../../../api-wrapper/contest/ApiGetcontest";
import { formattedTime } from "../../../utils/formateDate";
import { toast } from "react-toastify";

function ContestResult() {
  const location = useLocation(); // Use useLocation to access state
  const [contests, setContests] = useState([]);
  const [contenstDetails, setContenstDetails] = useState([])

  useEffect(() => {
    ApiGetActiveContent(location.state?.categoryId)
      .then((data) => {
        if (data?.isSuccess) {
          setContests(data?.data);
        }
      })
      .catch((error) =>
        toast?.error(error?.message)
      );

    ApiGetScore(location?.state?.participantId).then((res) => {
      if (res?.isSuccess) {
        setContenstDetails(res?.data);
      }
      else {
        setContenstDetails([]);
      }
    }).catch((error) => toast?.error(error?.message))
  }, []);

  return (
    <>
      <div className="pt-30 pb-30 h-full flex flex-col">
        <div className="text-center">
          <div className="flex-1">
            <div className="px-20 mb-30">
              <div className="uppercase font-bold text-C959595 dark:text-C6063AF">
                {contenstDetails?.categoryName}
              </div>
              <div className="font-black text-18 dark:text-CFFFFFF">
                Play & Win{" "}
                <img
                  alt="coin"
                  src="https://static.quizzop.com/newton/assets/coin.png"
                  style={{
                    width: "20.5px",
                    height: "18px",
                    display: "inline-block",
                  }}
                />{" "}
                {contenstDetails?.prize}
              </div>
            </div>
            <div className="w-3/5 h-1 mx-auto bg-gradient-to-r from-CFFFFFF via-CE0E0E0 to-CFFFFFF dark:from-C40438000 dark:via-C404380 dark:to-C40438000"></div>
            <div className="mt-20 font-black text-18 dark:text-CFFFFFF">
              Well Played! 👍
            </div>
            <div className="mt-8 text-C676767 text-12 dark:text-C8789C3">
              Winners will be announced @ {formattedTime(contenstDetails?.endTime)}
            </div>
            <div className="grid grid-cols-2 gap-20 mx-20 mt-30">
              <div className="p-20 py-16 bg-CFAFAFA border border-CE0E0E0 rounded-10 dark:border-C404380 dark:bg-C20213F">
                <div>
                  <div className="font-black text-24 dark:text-CFFCC5B">
                    {contenstDetails?.score || 0} {/* Display score from result */}
                  </div>
                  <div className="font-medium text-14 dark:text-C8789C3">
                    Your Score
                  </div>
                </div>
              </div>
              <div className="px-20 py-16 bg-CFAFAFA border border-CE0E0E0 rounded-10 dark:border-C404380 dark:bg-C20213F">
                <div>
                  <div className="font-black text-24 dark:text-CFFCC5B">
                    {contenstDetails?.rank || "N/A"} {/* Display rank from result */}
                  </div>
                  <div className="font-medium text-14 dark:text-C8789C3">
                    Current Rank
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pb-30 mt-14">
          <div>
            <div className="h-8 w-full bg-CF1F1F1 dark:bg-C26284C"></div>
            <div className="text-18 font-black mx-20 mt-30 dark:text-CFFFFFF">
              Play More Quizzes
            </div>
            <div>
              {contests?.slice(0, 3)?.map((contest) => (
                <ContestsCard key={contest?._id} quizContest={contest} />
              ))}
            </div>
          </div>
        </div>
        <AdSlot
          slotId="ad-slot-2"
          adUnitPath="/123456/ad-unit"
          sizes={[78, 80]}
        />
      </div>
    </>
  );
}

export default ContestResult;
