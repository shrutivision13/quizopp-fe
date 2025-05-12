import { useLocation } from "react-router-dom";
import AdSlot from "../../components/AdSense/AdSlot";
import ArticlesCarousel from "../../components/ArticlesCarousel/ArticlesCarousel";
import { ApiGetArticleCategoryWise } from "../../api-wrapper/article/ApiArticle";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const BlogArticles = () => {
    const location = useLocation();
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        if (location?.state?.categoryId) {
            ApiGetArticleCategoryWise(location?.state?.categoryId).then((res) => {
                if (res?.isSuccess) {
                    setArticles(res?.data);
                }
                else {
                    setArticles([]);
                    toast.error(res?.message);
                }
            }).catch((err) => {
                toast.error(err?.message);
            })
        }
    }, [location])

    return (
        <div className="text-white">
            <AdSlot
                slotId="ad-slot-1"
                adUnitPath="/123456/ad-unit"
                sizes={[728, 80]}
                marginTop="mt-0"
            />
            <div className="mt-14">
                <ArticlesCarousel
                    isShowSectionHeader={false}
                    isArticalContent
                    articles={articles}
                    isShowThreeArticles={false}
                />
            </div>
        </div>
    )
}

export default BlogArticles;
