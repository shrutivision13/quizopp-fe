import React from "react";
import { useNavigate } from "react-router-dom";

function ContestRules() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center">
      <div
        className="max-w-[500px] w-full h-dynamic-screen relative overflow-x-hidden overflow-ellipsis bg-CFFFFFF dark:bg-C191A32 hide-scroll-bar"
        id="shell"
      >
        <div className="flex flex-col pt-20 mb-40">
          <div className="px-20 flex-1">
            <div className="text-18 font-black dark:text-CFFFFFF">Rules</div>
            <ul className="list-disc mt-10 text-14 px-16">
              <li className="leading-normal text-C959595 mb-16 dark:text-C8789C3">
                Each Quiz Contest lasts for a total of 90 - 150 seconds. In the
                given time, you are given a total of 10-30 questions to answer.
                The amount of time and number of questions may vary for each
                contest.
              </li>
              <li className="leading-normal text-C959595 mb-16 dark:text-C8789C3">
                If you answer a question correctly, you get 20 points.
              </li>
              <li className="leading-normal text-C959595 mb-16 dark:text-C8789C3">
                If your answer for a question is wrong, you get (-) 10 points.
              </li>
              <li className="leading-normal text-C959595 mb-16 dark:text-C8789C3">
                On answering 3 questions correctly in a row, you get a bonus of
                10 points.
              </li>
              <li className="leading-normal text-C959595 mb-16 dark:text-C8789C3">
                Every Quiz Contest has a fixed start and end time. At the end of
                the Quiz Contest, every participant's score is put on a
                leaderboard and the winners are decided on the basis of their
                scores.
              </li>
              <li className="leading-normal text-C959595 mb-16 dark:text-C8789C3">
                Winners for each Quiz Contest are declared within 30 minutes of
                the end of the Quiz Contest.
              </li>
              <li className="leading-normal text-C959595 mb-16 dark:text-C8789C3">
                You can take help by using lifelines while playing the contest.
                <br />
                There are 4 different lifelines:
                <ul className="rule-lifeline-list">
                  <li className="mb-10">
                    <strong>50:50</strong> - Two incorrect options will be
                    removed from the questions.
                  </li>
                  <li className="mb-10">
                    <strong>Audience Poll</strong> - The smart audience will
                    help you to select the correct answer among the options
                    present.
                  </li>
                  <li className="mb-10">
                    <strong>Freeze Timer</strong> - The ongoing timer will be
                    paused for 30 seconds, giving the user more time to answer
                    the question.
                  </li>
                  <li className="mb-10">
                    <strong>Flip Question</strong> - The current question will
                    be interchanged by a new question.
                  </li>
                </ul>
              </li >
              <li className="leading-normal text-C959595 mb-16 dark:text-C8789C3">
                You will be able to use each lifeline only once in each contest.
              </li>
              <li className="leading-normal text-C959595 mb-16 dark:text-C8789C3">
                You'll be able to use the lifeline for free by watching an ad or
                by using a given amount of coins from your coin balance.
              </li>
            </ul>
          </div>
          <div className="min-h-56">
            <div
              data-testid="back-to-home-button"
              className="py-12 text-center inline-block uppercase font-bold text-16 text-CFFFFFF rounded-5 bg-C0DB25B defaultButton px-36 max-w-maxW mx-20 cursor-pointer flex items-center flex-col select-none opacity-100"
              onClick={() => navigate("/")} 
            >
              Back To Home
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContestRules;
