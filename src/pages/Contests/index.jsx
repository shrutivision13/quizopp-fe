import React, { useEffect, useState } from "react";
import ContestsCard from "../../components/ContestsCard/ContestsCard";
import {
  ApiGetContests,
  ApiGetContestsById,
} from "../../api-wrapper/contest/ApiGetcontest";
import { ApiGetCategories } from "../../api-wrapper/categories/ApiCategories";
import { useLoader } from "../../context/LoaderContext";
import AdSlot from "../../components/AdSense/AdSlot";
import Slider from "../../components/Slider/Slider";

export const Contests = () => {
  const [contest, setContest] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { setLoading } = useLoader();

  const sliderImages = [
    {
      src: "https://www.quizzop.com/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2Fspin_wheel_card.png&w=256&q=75",
      alt: "Spin Wheel",
    },
    {
      src: "https://www.quizzop.com/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2Fnotifications_card.png&w=256&q=75",
      alt: "Notifications",
    },
    {
      src: "https://www.quizzop.com/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2Finstagram_card.png&w=256&q=75",
      alt: "Instagram",
    },
  ];

  const handleFetchContest = () => {
    ApiGetContests()
      .then((res) => {
        if (res?.isSuccess) {
          setContest(res?.data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    handleFetchContest();

    ApiGetCategories()
      .then((res) => {
        if (res?.isSuccess) {
          setCategories(res.data.slice(0, 5));
        }
      })
      .catch(() => {});
  }, []);

  const handleChangeCategory = (category) => {
    ApiGetContestsById(category?._id)
      .then((res) => {
        if (res?.isSuccess) {
          setContest(res?.data);
          setSelectedCategory(category);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  return (
    <>
      <AdSlot
        slotId="ad-slot-1"
        adUnitPath="/123456/ad-unit"
        sizes={[728, 5]}
      />
      <div className="flex ml-16 mt-30">
        <img
          src="https://static.quizzop.com/newton/assets/quiz_category_tab_dark.svg"
          alt="Category Icon"
          className="mr-12"
        />
        <div
          className="flex pl-12 border-l-2 border-CF1F1F1 dark:border-C404380 scroll-smooth scroll hide-scroll-bar"
          id="contest-tabs"
        >
          {categories?.map((category) => (
            <div
              key={category?._id}
              data-testid={`contest-topic-item-${category?._id}`}
              style={{
                backgroundColor: `${
                  selectedCategory.categoryName === category?.categoryName
                    ? "#3A56E1"
                    : "transparent"
                }`,
                cursor: "pointer",
              }}
              className={`${
                selectedCategory.categoryName === category?.categoryName
                  ? "selected-tab font-bold text-CFFFFFF bg-CFFFFFF"
                  : "font-medium text-CC7C7C7 dark:text-C6063AF bg-CFFFFFF"
              } border-CE0E0E0 dark:bg-C20213F dark:border-C404380 px-[17px] mx-4 rounded-[30px] text-12 flex items-center justify-center border border-solid whitespace-nowrap`}
              onClick={() => handleChangeCategory(category)}
            >
              {category?.categoryName}
            </div>
          ))}
        </div>
      </div>
      <section className="px-20">
        <div className="w-full max-w-maxW">
          {contest?.slice(0, 3)?.map((quizContest) => (
            <ContestsCard key={quizContest?._id} quizContest={quizContest} />
          ))}
        </div>
      </section>
      <Slider arrowSize={30}>
        <div className="flex px-10 my-20 gap-10">
          {sliderImages?.map((image, index) => (
            <img
              key={index}
              src={image?.src}
              alt={image?.alt}
              className="w-full mx-2 pr-12"
            />
          ))}
        </div>
      </Slider>
      <section className="px-20">
        {contest?.slice(3, 6)?.map((quizContest) => (
          <ContestsCard key={quizContest?._id} quizContest={quizContest} />
        ))}
      </section>
      <AdSlot
        slotId="ad-slot-2"
        adUnitPath="/123456/ad-unit"
        sizes={[728, 5]}
      />
      <section className="px-20">
        {contest?.slice(6)?.map((quizContest) => (
          <ContestsCard key={quizContest?._id} quizContest={quizContest} />
        ))}
      </section>
    </>
  );
};
