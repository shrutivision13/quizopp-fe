import { useEffect, useState } from "react";
import Slider from "../../../components/Slider/Slider";
import { ApiGetTrendingArticles } from "../../../api-wrapper/article/ApiArticle";
import { Link } from "react-router-dom";
import nextYellow from "../../../assets/images/next-arrow-yellow.svg";
function TrendingArticles({ closeMenu }) {
  const IMAGEURL = import.meta.env.VITE_API_BASE_URL;
  const [trendingArticles, setTrendingArticles] = useState([]);

  useEffect(() => {
    ApiGetTrendingArticles().then((data) => {
      if (data?.isSuccess) {
        setTrendingArticles(data?.data);
      }
      else {
        setTrendingArticles([]);
      }
    }).catch((error) =>
      console.error("Error fetching get all treding Articles:", error)
    );
  }, [])

  return (
    <div
      style={{
        backgroundColor: "#20213F",
        margin: "5px",
        padding: "5px",
        borderRadius: "10px",
      }}
      id="S:4"
    >
      <div>
        <div className="flex justify-between items-center px-20 mb-14">
          <h2 className="text-14 font-bold text-CFAFAFA">Trending Articles</h2>
          <a href="/category">
            <div
              className="flex cursor-pointer items-center"
              data-testid="quiz-see-all-button"
            >
              <p className="text-10 uppercase font-bold text-CFFCC5B mr-4">
                See All
              </p>
              <img
                alt="arrow filled icon"
                fetchPriority="high"
                width="16"
                height="16"
                decoding="async"
                style={{ color: "transparent" }}
                src={nextYellow}
              />
            </div>
          </a>
        </div>
        {
          trendingArticles.length > 0 &&
          <Slider arrowSize={20}>
            <div className="relative">
              <div className="flex scroll snap-x snap-mandatory overflow-scroll px-14 hide-scroll-bar">
                {trendingArticles?.map((article) => (
                  <div
                    key={article._id}
                    className="snap-center relative rounded-20 mr-10 flex flex-col items-center justify-center min-w-[70px] first:ml-0 last:mr-0 pr-[0px]"
                    data-testid={`quiz-category-icon-${article._id}`}
                  >
                    <Link to={`/blogs/${article?.categorySlug}`} onClick={closeMenu} state={{ categoryId: article?._id }}>
                      <div
                        className="whitespace-nowrap text-18 font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-CFFDEE5 cursor-pointer relative flex justify-center items-center h-[70px] w-[70px] rounded-[12px]"
                        style={{ backgroundColor: article?.backgroundColor }}
                      >
                        <img
                          alt={article?.categoryName}
                          fetchPriority="high"
                          width="45"
                          height="45"
                          decoding="async"
                          style={{ color: "transparent" }}
                          src={`${IMAGEURL}/images/category/${article?.categoryIcon}`}
                        />
                      </div>
                      <div className="pt-6 text-10 text-CBBBDDD line-clamp-1">
                        <p className="text-center">{article?.categoryName}</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </Slider>
        }
      </div>
    </div>
  );
}

export default TrendingArticles;
