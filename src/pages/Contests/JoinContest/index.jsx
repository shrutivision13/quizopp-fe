import React, { useState } from "react";
import AdSlot from "../../../components/AdSense/AdSlot";
import { useLocation, useNavigate } from "react-router-dom";
import useCookie from "../../../hooks/useCookie";
import { ApiPlayContest } from "../../../api-wrapper/contest/ApiGetcontest";
import { toast } from "react-toastify";

function JoinContest() {
  const [expanded, setExpanded] = useState(false);
  const [showPrizes, setShowPrizes] = useState(false); // State to toggle prize table
  const location = useLocation();
  const quizContest = location.state?.quizContest;
  const participantId = location.state?.participant?._id;
  const { getCookie } = useCookie();
  const authToken = getCookie("authToken"); // Get the auth token from cookies
  const navigate = useNavigate();

  const handlePlayContest = () => {
    ApiPlayContest(participantId, authToken).then((res) => {
      if (res?.isSuccess) {
        navigate(
          `/${quizContest?.categoryId?.categoryName
            .toLowerCase()
            .replace(/\s+/g, "-")}/play-contest?contestId=${quizContest?._id
          }`,
          { state: { participantId, categoryName: quizContest?.categoryId?.categoryName, categoryId: quizContest?.categoryId?._id } } // Pass categoryName in state
        );
      }
      else {
        toast.error(res.message);
      }
    }).catch((error) => {
      toast.error(error?.message);
    });
  };

  return (
    <>
      <div className="py-20 h-dynamic-screen hide-scroll-bar">
        <div className="px-20">
          <div className="relative border mb-24 border-CE0E0E0 bg-CFAFAFA rounded-10 py-16 dark:bg-C20213F dark:border-C404380">
            <div className="px-20 py-14 flex">
              <div className="min-w-60 min-h-60">
                <div
                  className="rounded-12 bg-CFFDEE5 cursor-pointer relative flex justify-center items-center h-[70px] w-[70px]"
                  style={{ background: quizContest?.categoryId?.background }}
                >
                  <div className="w-full flex justify-center px-12">
                    <img
                      alt="Hindi English"
                      loading="lazy"
                      width="60"
                      height="60"
                      decoding="async"
                      data-nimg="1"
                      className=""
                      src={`http://132.148.0.110:3000/images/category/${quizContest?.categoryId?.categoryIcon}`}
                      style={{ color: "transparent" }}
                    />
                  </div>
                </div>
              </div>
              <div className="ml-10 my-auto">
                <div className="uppercase font-bold text-C868686 dark:text-C6063AF">
                  {quizContest?.categoryId?.categoryName}
                </div>
                <div>
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
                    {quizContest?.prize}
                  </div>
                </div>
              </div>
            </div>
            <ul className="list-disc mt-10 text-14 px-36 dark:text-C8789C3">
              <li className="mb-20">
                You've got 90 - 150 seconds to answer all questions.
              </li>
              <li className="mb-20">Answer as many questions as you can.</li>
            </ul>
            {expanded && (
              <ul className="list-disc mt-10 text-14 px-36 dark:text-C8789C3">
                <li className="mb-20">
                  You can take help by using the lifelines present in the
                  contest.
                </li>
                <li className="mb-20">
                  Lifelines can be used for free or by using a given amount of
                  coins for each lifeline.
                </li>
                <li className="mb-20">
                  Entry fee coin {quizContest?.entryFee}.
                </li>
              </ul>
            )}
            <div className="flex justify-center">
              <button
                data-testid="more-details-button flex justify-center items-center"
                className="absolute inset-x-0 bottom-0 translate-y-2/4 py-4 px-12 text-10 flex items-center border border-CE0E0E0 rounded-20 bg-CFAFAFA dark:text-C8789C3 dark:border-C404380 dark:bg-C20213F"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded
                  ? "Tap to hide more details"
                  : "Tap to view more details"}
                <div className="transform rotate-0">
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-current text-C959595 dark:text-C8789C3"
                  >
                    <path d="M10.8461 13.827L15.6741 9C15.7849 8.88852 15.8471 8.7377 15.8471 8.5805C15.8471 8.4233 15.7849 8.27248 15.6741 8.161L15.3191 7.805C15.2077 7.69392 15.0569 7.63154 14.8996 7.63154C14.7423 7.63154 14.5914 7.69392 14.4801 7.805L10.4251 11.859L6.36707 7.8C6.25559 7.68917 6.10477 7.62695 5.94757 7.62695C5.79037 7.62695 5.63955 7.68917 5.52807 7.8L5.17207 8.156C5.06124 8.26748 4.99902 8.4183 4.99902 8.5755C4.99902 8.7327 5.06124 8.88352 5.17207 8.995L10.0041 13.827C10.1163 13.9375 10.2675 13.9995 10.4251 13.9995C10.5826 13.9995 10.7338 13.9375 10.8461 13.827Z" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>

        <AdSlot
          slotId="ad-slot-2"
          adUnitPath="/123456/ad-unit"
          sizes={[728, 80]}
        />

        <div className="mt-20 w-3/5 h-1 mx-auto bg-gradient-to-r from-CFFFFFF via-CE0E0E0 to-CFFFFFF dark:from-C40438000 dark:via-C404380 dark:to-C40438000"></div>

        <div className="text-C3E51B5 text-16 font-bold text-center p-20 dark:text-CFFCC5B">
          <span
            className="mr-8 cursor-pointer"
            data-testid="view-prizes"
            onClick={() => setShowPrizes(!showPrizes)}
          >
            View Prizes
          </span>
          ·
          <a
            rel="noopener noreferrer"
            className="link-anchor"
            href="/contest-rules"
          >
            <span className="ml-8 cursor-pointer" data-testid="rules">
              Rules
            </span>
          </a>
        </div>

        {showPrizes && (
          <div>
            <div className="relative">
              <div
                className="absolute h-14 w-14 bg-CFFFFFF border-b-10 border-CE0E0E0 border z-0 border-r-0 border-b-0 top-n6 transform rotate-45 dark:bg-C272D52 dark:border-C404380"
                style={{ left: "calc(50% - 60px)" }}
              ></div>
              <div className="overflow-hidden border border-CE0E0E0 rounded-5 mb-36 dark:bg-C272D52 dark:border-C404380">
                <table className="table-auto w-full">
                  <tbody>
                    {[
                      { rank: "Rank 1", prize: 100 },
                      { rank: "Ranks: 2 - 5", prize: 50 },
                      { rank: "Ranks: 6 - 10", prize: 10 },
                      { rank: "Ranks: 11 - 50", prize: 5 },
                    ]?.map((item, index) => (
                      <tr
                        key={index}
                        className={`text-12 tr flex ${index % 2 === 0
                          ? "bg-CFFFFFF dark:bg-C272D52"
                          : "bg-C20213F dark:bg-C20213F"
                          }`}
                      >
                        <td className="px-20 py-10 flex-1 dark:text-CFFFFFF">
                          {item.rank}
                        </td>
                        <td
                          className="font-bold px-20 py-10 flex items-center dark:text-CFFFFFF"
                          style={{ width: "79.5px" }}
                        >
                          <span className="mr-4" style={{ height: "14px" }}>
                            <img
                              alt="coin"
                              loading="lazy"
                              width="14"
                              height="12.55"
                              decoding="async"
                              src="https://static.quizzop.com/newton/assets/coin.png"
                              style={{ color: "transparent" }}
                            />
                          </span>
                          <span>{item.prize}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="fixed py-15 bottom-0 h-80 w-full px-20 max-w-maxW items-center bg-CFAFAFA dark:bg-C27294B">
        {authToken ? (
          <div
            onClick={handlePlayContest}
            className="py-12 text-center inline-block uppercase font-bold text-16 text-CFFFFFF rounded-5 bg-C0DB25B defaultButton px-36 w-full animate__flipInX shine cursor-pointer flex items-center flex-col select-none opacity-100"
          >
            Play Now
          </div>
        ) : (
          <div
            onClick={() => navigate("/login")}
            className="py-12 text-center inline-block uppercase font-bold text-16 text-CFFFFFF rounded-5 bg-CFF0000 defaultButton px-36 w-full animate__flipInX shine cursor-pointer flex items-center flex-col select-none opacity-100"
          >
            Login to Play
          </div>
        )}
      </div>
    </>
  );
}

export default JoinContest;
