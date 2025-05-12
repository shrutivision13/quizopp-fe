import React, { useEffect, useState } from "react";
import { ApiGetCategories } from "../../../api-wrapper/categories/ApiCategories";
import CategoryCard from "../../../components/CategoryCard/CategoryCard";
import { SectionHeading } from "../../../components/Ui/SectionHeading";
import {
  ApiDislikeCategory,
  ApiLikeCategory,
} from "../../../api-wrapper/user/ApiUser";

const TopQuiz = ({ removeHeader, quizBites, handleRemove, handleAdd }) => {
  const [categories, setCategories] = useState([]);

  const displayedCategories = !removeHeader
    ? categories
    : categories?.slice(0, 6) || [];

  const selectedCategoryIds = new Set(quizBites?.map((item) => item?._id));

  const fetchCategories = async () => {
    try {
      const res = await ApiGetCategories();
      if (res.isSuccess) {
        setCategories(res.data);
      } else {
        console.error("Error fetching categories:", res.message);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } 
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleLikeCategory = (categoryId) => {
    const payload = {
      categoryId: categoryId,
    };
    ApiLikeCategory(payload)
      .then((res) => {
        if (res.isSuccess) {
          fetchCategories();
        } else {
          console.error("Error liking category:", res.message);
        }
      })
      .catch((err) => {
      });
  };

  const handleDislikeCategory = (categoryId) => {
    const payload = {
      categoryId: categoryId,
    };
    ApiDislikeCategory(payload)
      .then((res) => {
        if (res.isSuccess) {
          fetchCategories();
        } else {
          console.error("Error disliking category:", res.message);
        }
      })
      .catch((err) => {
      });
  };
  return (
    <div className="px-20 mt-24">
      {removeHeader && (
        <SectionHeading
          title={"Top Quizzes"}
          button={"See all"}
          route="/category"
        />
      )}
      <div className="grid grid-cols-3 gap-14">
        {displayedCategories?.map((category) => (
          <CategoryCard
            removeHeader={removeHeader}
            key={category?._id}
            category={category}
            handleLikeCategory={handleLikeCategory}
            handleDislikeCategory={handleDislikeCategory}
            quizRoute="begin-quiz"
            isSelected={selectedCategoryIds.has(category?._id)}
            handleRemove={handleRemove}
            handleAdd={handleAdd}
          />
        ))}
      </div>
    </div>
  );
};

export default TopQuiz;
