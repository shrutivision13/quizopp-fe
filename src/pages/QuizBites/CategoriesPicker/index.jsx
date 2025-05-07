import React from "react";
import PickCategories from "../../../components/PickCategories/PickCategories";

const CategoriesPicker = () => {
  return (
    <section className="px-20 mt-20">
      <div className="mb-14">
        <div className="items-center justify-between mb-4">
          <h2 className="text-CFFFFFF text-18 font-bold text-center">
            Pick Upto 3 Categories
          </h2>
        </div>
      </div>
      <PickCategories quizBites={true} button={{ name: "Play" }}  />
    </section>
  );
};

export default CategoriesPicker;
