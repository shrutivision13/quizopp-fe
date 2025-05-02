import React from "react";
import { SectionHeading } from "../../../components/Ui/SectionHeading";
import BlogCarousel from "../../../components/BlogCarousel/BlogCarousel";

const TrendingArticles = () => {
  return (
    <section className=" mt-24">
      <div className="px-20">
        <SectionHeading title={"Trending Articles"} />
      </div>
      <div className="w-full max-w-maxW">
        <BlogCarousel />
      </div>
    </section>
  );
};

export default TrendingArticles;
