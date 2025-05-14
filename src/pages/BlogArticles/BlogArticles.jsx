import { useLocation, useParams } from "react-router-dom";
import AdSlot from "../../components/AdSense/AdSlot";
import ArticlesCarousel from "../../components/ArticlesCarousel/ArticlesCarousel";
import { ApiGetArticleCategoryWise } from "../../api-wrapper/article/ApiArticle";
import { toast } from "react-toastify";
import { useEffect, useLayoutEffect, useState } from "react";
import AllArticlesCard from "../../components/AllArticlesCard/AllArticlesCard";
import CategoryNavbar from "../../components/CategoryNavbar/CategoryNavbar";

const BlogArticles = () => {
  const location = useLocation();
  const [articles, setArticles] = useState([]);
  const params = useParams();
  const categoryName = params.categoryName;

  useEffect(() => {
    fetchArticles();
  }, [params]);

  const fetchArticles = () => {
    if (categoryName) {
      ApiGetArticleCategoryWise(location?.state?.categoryId)
        .then((res) => {
          if (res?.isSuccess) {
            setArticles(res?.data);
          } else {
            setArticles([]);
            toast.error(res?.message);
          }
        })
        .catch((err) => {
          toast.error(err?.message);
        });
    } else {
      ApiGetArticleCategoryWise()
        .then((res) => {
          if (res?.isSuccess) {
            setArticles(res?.data);
          } else {
            setArticles([]);
            toast.error(res?.message);
          }
        })
        .catch((err) => {
          toast.error(err?.message);
        });
    }
  };

  const handleClick = () => {
    fetchArticles();
  };

  return (
    <div className="text-white">
      {!location?.state?.categoryId ? (
        <CategoryNavbar categories={articles} handleClick={handleClick} />
      ) : (
        <AdSlot
          slotId="ad-slot-1"
          adUnitPath="/123456/ad-unit"
          sizes={[728, 5]}
          marginTop="mt-20"
        />
      )}

      <div className="mt-14">
        {location?.state?.categoryId ? (
          <ArticlesCarousel
            isShowSectionHeader={false}
            isArticalContent
            articles={articles}
            isShowThreeArticles={false}
          />
        ) : (
          articles?.map((data) => (
            <AllArticlesCard
              key={data._id}
              isShowSectionHeader={false}
              isArticalContent
              articles={data}
              isShowThreeArticles={false}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default BlogArticles;
