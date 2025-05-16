import { toast } from "react-toastify";
import {
  ApiGetQuizBitesQuestions,
  ApiUpdatePrize,
} from "../../../api-wrapper/quizbites/ApiQuizbites";
import AdSlot from "../../../components/AdSense/AdSlot";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLoader } from "../../../context/LoaderContext";

const MiniQuizPlay = () => {
  const IMAGEURL = import.meta.env.VITE_API_BASE_URL;
  const { state } = useLocation();
  const [questions, setQuestions] = useState([]);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [shakeOptionIndex, setShakeOptionIndex] = useState(null);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();
  const { setLoading } = useLoader();

  useEffect(() => {
    if (state) setLoading(true);
    ApiGetQuizBitesQuestions({ categoryId: state?.categoryIds })
      .then((res) => {
        if (res?.isSuccess) {
          if (res?.data?.length) {
            setQuestions(res?.data);
          } else {
            setTimeout(() => {
              navigate("/");
            }, 2000);
          }
          setLoading(false);
        } else {
          toast.error(res?.response?.data?.message, {
            className: "custom-error-toast",
            bodyClassName: "custom-error-toast-body",
            closeButton: false,
            progress: undefined,
          });
          setLoading(false);
        }
      })
      .catch((err) => toast.error(err.message));
  }, [state]);

  useEffect(() => {
    if (questions.length > 0) {
      const currentQuestion = questions[currentQuestionIndex];
      const options = [...currentQuestion.options];
      setShuffledOptions(options.sort(() => Math.random() - 0.5));
      setSelectedOption(null);
      setShakeOptionIndex(null);
    }
  }, [questions, currentQuestionIndex]);

  const handleAnswer = (selectedOption, index) => {
    setSelectedOption(selectedOption);
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion?.options[0];

    const isCorrect = selectedOption === correctAnswer;

    // Create updated answers array immediately
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = {
      selected: selectedOption,
      correct: isCorrect,
    };
    setAnswers(updatedAnswers);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      } else {
        const totalCorrect = updatedAnswers.filter(
          (ans) => ans?.correct
        ).length;
        const payload = {
          correctAnswer: totalCorrect,
        };
        ApiUpdatePrize(payload)
          .then((res) => {
            if (res?.isSuccess) {
              navigate("/mini-quiz-over", {
                state: {
                  totalCorrect,
                  totalQuestion: questions.length,
                  prize: res,
                },
              });
            } else {
              toast.error(res?.message);
            }
          })
          .catch((err) => toast.error(err?.message));
      }
    }, 1000);

    if (!isCorrect) {
      setShakeOptionIndex(index);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return questions.length ? (
    <div>
      <article className="p-20">
        <div>
          <div className="rounded-10 px-20 py-20 shadow-contestCard bg-CFFFFFF dark:bg-C20213F mb-8">
            <div className="flex justify-between mb-20">
              <div>
                <p className="text-10 font-semibold text-C959595 dark:text-C8789C3 mb-8">
                  {currentQuestion?.categoryName}
                </p>
                <p className="text-14 font-semibold text-CFFFFFF">
                  {currentQuestion?.question}
                </p>
              </div>
              {currentQuestion?.questionImage && (
                <div className="ml-10 flex relative h-full w-70 min-w-70">
                  <img
                    alt={currentQuestion?.categoryName}
                    className="w-full h-full min-h-70 rounded-10 object-cover"
                    src={`${IMAGEURL}/images/${currentQuestion?.categoryName}/${currentQuestion?.questionImage}`}
                  />
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-x-20 gap-y-10">
              {shuffledOptions?.map((option, index) => (
                <div
                  key={index}
                  className={`justify-center py-10 text-14 shadow-quizCard border-1 font-medium rounded-10 bg-CFFFFFF border-CF1F1F1 dark:text-CFFFFFF dark:border-C26284C dark:bg-C26284C px-22 answer-input cursor-pointer flex items-center flex-col select-none opacity-100 ${
                    shakeOptionIndex === index ? "animate-shake" : ""
                  }`}
                  style={{
                    backgroundColor: selectedOption
                      ? option === questions[currentQuestionIndex]?.options[0]
                        ? "#74C465"
                        : option === selectedOption
                        ? "#EF353D"
                        : ""
                      : "",
                  }}
                  onClick={() => !selectedOption && handleAnswer(option, index)}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            {questions.map((_, index) => {
              const answer = answers[index];
              const baseClass = "inline-block rounded-full";
              const borderClass =
                currentQuestionIndex === index
                  ? "h-8 w-8 border border-C4782F4"
                  : "h-4 w-4";
              let bgClass = currentQuestionIndex !== index ? "bg-CE0E0E0" : ""; // default: unanswered
              if (answer) {
                bgClass = answer.correct ? "bg-C0DB25B" : "bg-CE63737";
              }

              return (
                <span
                  key={index}
                  className={`${baseClass} ${bgClass} ${borderClass}`}
                ></span>
              );
            })}
          </div>
        </div>
      </article>
      <AdSlot
        slotId="ad-slot-1"
        adUnitPath="/123456/ad-unit"
        sizes={[728, 80]}
        marginTop="mt-0"
      />
    </div>
  ) : (
    <div className="mb-20 text-20 leading-26 font-black text-CFFFFFF h-full flex justify-center items-center">
      No Quizzes Found!!
    </div>
  );
};

export default MiniQuizPlay;
