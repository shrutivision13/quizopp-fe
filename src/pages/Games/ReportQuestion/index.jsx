import { useEffect, useState } from "react";
import CloseIcon from "../../../components/Icons/CloseIcon";
import '../../../styles/components/reportquestion/reportquestion.css';
import { toast } from "react-toastify";

const options = [
    "Factual Error",
    "Grammar / Spelling Error",
    "Vulgar or Obscene",
    "Wrong Category",
    "Question Unclear",
];


const successMessage = "Thanks for reporting the question. Our team will review it soon!";

const ReportQuestion = ({ onClose, questionId, dispatch }) => {
    const [animationClass, setAnimationClass] = useState("animate__slideInUp");

    const handleClose = () => {
        setAnimationClass("animate__slideOutDown");
    };

    // Wait for animation to finish before unmounting
    useEffect(() => {
        if (animationClass === "animate__slideOutDown") {
            const timeout = setTimeout(() => {
                onClose(); // Dispatch 'HIDE_REPORT'
            }, 300); // match --animate-duration: 0.3s

            return () => clearTimeout(timeout);
        }
    }, [animationClass, onClose]);

    //  Submit Report question
    const handleReportQuestion = () => {
        dispatch({ type: 'MARK_QUESTION_REPORTED', questionId });
        toast.success(successMessage);
        handleClose();
    };


    return (
        <div className="z-110 flex h-full w-full max-w-maxW flex-col-reverse fixed top-0 bottom-0 bg-C000000DE">
            <div className={`animate__animated bottomsheet_animated ${animationClass} w-full rounded-t-10 text-center py-20 px-20 transition-opacity h-min-360 max-w-maxW bg-C20213F border-C404380 border-1 z-100`}>
                {/* Close Button */}
                <div
                    onClick={handleClose}
                    data-testid="flag-close-sheet-button"
                    className="text-CFFFFFF flex flex-row-reverse cursor-pointer absolute top-15 right-15"
                >
                    <CloseIcon />
                </div>

                {/* Report Question Header */}
                <div className="flex pb-15">
                    <div className="mr-8 mb-3">
                        <div data-testid="flag-question-button" className="cursor-pointer">
                            <img
                                alt=""
                                width="30"
                                height="30"
                                src="https://static.quizzop.com/newton/assets/flag_active_dark.svg"
                                style={{ color: "transparent" }}
                            />
                        </div>
                    </div>
                    <div className="text-14 flex items-center font-medium text-CFAFAFA">
                        REPORT QUESTION
                    </div>
                </div>

                <hr className="h-1 w-500 translate-x-n20 text-C404380" />

                <div className="px-20 mt-8 font-bold text-18 text-C8789C3">
                    What do you wish to report about this question?
                </div>

                {/* Report Options */}
                <div className="my-28">
                    {options?.map((option, index) => (
                        <button
                            key={index}
                            onClick={handleReportQuestion}
                            className="inline-flex items-center justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-2 rounded-10 text-center text-14 font-medium border-C404380 bg-C20213F w-full mt-20 px-15 py-15 text-CFAFAFA hover:bg-CFFFFFF hover:text-C404380"
                            data-testid="flag-options"
                        >
                            <span className="font-bold">{option}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ReportQuestion;
