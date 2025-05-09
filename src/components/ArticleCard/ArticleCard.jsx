import React from "react";

const ArticleCard = ({
  article,
  imagePath = 'category',
  isShowCategoryName = true
}) => {
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  }

  const IMAGEURL = import.meta.env.VITE_API_BASE_URL;

  return (
    <div key={article?._id}>
      <a
        className="link-anchor"
        href="/blogs/general-knowledge/girl-scout-cookie-season-2025-history-and-innovation-677e713dbdccdd0001d36464"
      >
        <div className="bg-C191A32 w-full px-20 pt-14 pb-20 text-14 flex cursor-pointer justify-between">
          <div className="max-w-4/5 mr-20 flex flex-col align-center justify-center">
            <h3
              className="font-medium text-16 leading-24 mb-12 text-CFAFAFA"
              data-testid="article-card-title"
            >
              {article?.title}
            </h3>
            <p
              className="text-10 text-C8789C3 leading-14"
              data-testid="article-card-meta"
            >
              {
                isShowCategoryName &&
                <span className="whitespace-nowrap">
                  {article?.categoryId?.categoryName} •{" "}
                </span>
              }
              <span> {formatDate(article?.publishedAt)} • </span>
              <span className="whitespace-nowrap">{article?.views} Views</span>
            </p>
          </div>
          <div className="wrapper-image">
            <img
              alt="Girl Scout Cookies"
              loading="lazy"
              width="80"
              height="80"
              decoding="async"
              data-nimg="1"
              className="scaled-image shimmer-dark"
              style={{ color: "transparent" }}
              src={`${IMAGEURL}/images/${imagePath}/${article?.thumbnail}`}
            />
          </div>
        </div>
      </a>
    </div>
  );
};

export default ArticleCard;
