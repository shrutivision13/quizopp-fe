import React, { useEffect, useState } from "react";
import { ApiGetCategories } from "../../../api-wrapper/categories/ApiCategories";
import CategoryCard from "../../../components/CategoryCard/CategoryCard";
import { useLoader } from "../../../context/LoaderContext";
import { SectionHeading } from "../../../components/Ui/SectionHeading";
import { ApiDislikeCategory, ApiLikeCategory } from "../../../api-wrapper/user/ApiUser";

const TopQuiz = () => {
  const [categories, setCategories] = useState([]);
  const { setLoading } = useLoader();

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await ApiGetCategories();
      if (res.isSuccess) {
        setCategories(res.data);
          setLoading(false);
      } else {
        console.error("Error fetching categories:", res.message);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
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
          setLoading(false);
        } else {
          console.error("Error liking category:", res.message);
        }
      })
      .catch((err) => {
        setLoading(false);
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
          setLoading(false);
        } else {
          console.error("Error disliking category:", res.message);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  return (
    <div className="px-20 mt-24">
      <SectionHeading title={"Top Quizzes"} button={"See all"} />
      <div className="grid grid-cols-3 gap-14">
        {categories?.slice(0, 6).map((category) => (
          <CategoryCard
            key={category?._id}
            category={category}
            handleLikeCategory={handleLikeCategory}
            handleDislikeCategory={handleDislikeCategory}
          />
        ))}
      </div>
    </div>
  );
};

export default TopQuiz;
