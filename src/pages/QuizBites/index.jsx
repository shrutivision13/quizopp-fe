import React, { useEffect, useState } from "react";
import CategoriesPicker from "./CategoriesPicker";
import QuizTopics from "./QuizTopics";
import { toast } from "react-toastify";
import {
  ApiAddQuizBites,
  ApiGetQuizBites,
  ApiRemoveQuizBites,
} from "../../api-wrapper/categories/ApiCategories";

const QuizBites = () => {
  const [quizBites, setQuizBites] = useState([]);

  const fetchQuizBites = () => {
    ApiGetQuizBites()
      .then((res) => {
        if (res?.isSuccess) {
          setQuizBites(res?.data);
        }
      })
      .catch((err) => {
        toast.error(err.message, {
          className: "custom-error-toast",
          bodyClassName: "custom-error-toast-body",
          closeButton: false,
          progress: undefined,
        });
      });
  };

  useEffect(() => {
    fetchQuizBites();
  }, []);

  const handleRemove = (id) => {
    ApiRemoveQuizBites(id)
      .then((res) => {
        if (res?.isSuccess) {
          fetchQuizBites()
        }
      })
      .catch((err) => {
        toast.error(err?.message, {
          className: "custom-error-toast",
          bodyClassName: "custom-error-toast-body",
          closeButton: false,
          progress: undefined,
        });
      });
  };

  const handleAdd = (id) => {
      ApiAddQuizBites(id)
      .then((res) => {
        if (res?.isSuccess) {
          fetchQuizBites()
        }
      })
      .catch((err) => {
        toast.error(err.message, {
          className: "custom-error-toast",
          bodyClassName: "custom-error-toast-body",
          closeButton: false,
          progress: undefined,
        });
      }); 
  };

  return (
    <>
      <CategoriesPicker handleRemove={handleRemove} quizBites={quizBites} />;
      <QuizTopics
        handleRemove={handleRemove}
        handleAdd={handleAdd}
        quizBites={quizBites}
        removeHeader={false}
      />
    </>
  );
};

export default QuizBites;
