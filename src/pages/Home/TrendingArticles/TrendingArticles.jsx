import React, { use, useEffect, useState } from "react";
import { SectionHeading } from "../../../components/Ui/SectionHeading";
import BlogCarousel from "../../../components/BlogCarousel/BlogCarousel";
import ArticleCard from "../../../components/ArticleCard/ArticleCard";
import { ApiGetArticle } from "../../../api-wrapper/article/ApiArticle";
import { useLoader } from "../../../context/LoaderContext";

const TrendingArticles = () => {
  const [articles, setArticle] = useState([]);
  const { setLoading } = useLoader();

  useEffect(() => {
    setLoading(true);
    ApiGetArticle()
      .then((res) => {
        if (res.isSuccess) {
          setArticle(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  return (
    <section className=" mt-24">
      <div className="px-20">
        <SectionHeading title={"Trending Articles"} button={"See all"} />
      </div>
      <div className="w-full max-w-maxW">
        <BlogCarousel />
      </div>
      <div>
        {articles?.slice(0, 3)?.map((article, index) => (
          <div key={article.id || index}>
            <ArticleCard article={article} />
            {index < 2 && <hr className="h-2 border-C404380" />}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingArticles;
