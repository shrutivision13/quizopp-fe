import { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ApiGetArticleContent } from "../../api-wrapper/article/ApiArticle";
import HomeIcon from "../../components/Icons/HomeIcon";
import RightArrowIcon from "../../components/Icons/RightArrowIcon";
import AdSlot from "../../components/AdSense/AdSlot";
import Divided from "../../components/Divided/Divided";
import { formatDate } from "../../utils/formateDate";
import '../../styles/components/blogarticlessetails/blogarticlessetails.css'
import RatingStar from "../../components/Icons/RatingStar";
import RatingComponent from "../../components/RatingComponent/RatingComponent";

const shareOptions = [
    {
        id: 'whatsapp',
        href: `https://api.whatsapp.com/send?&text=Unmissable%20Black%20Friday%202024%20Deals%20in%20India%20%E2%80%93%20Discounts%20on%20Top%20Brands%0ahttps%3A%2F%2Fwww.quizzop.com%2Fblogs%2Fgeneral-knowledge%2Funmissable-black-friday-2024-deals-in-india-discounts-on-top-brands-6748212dbdccdd0001d340e3%3Futm-source%3D4239%26utm-campaign%3Dblog-share%26utm-medium%3Dwhatsapp`,
        imgSrc: 'https://static.quizzop.com/newton/assets/icons/whatsapp.png',
        alt: 'whatsapp',
        isButton: false,
    },
    {
        id: 'x',
        href: `https://x.com/intent/tweet?url=https%3A%2F%2Fwww.quizzop.com%2Fblogs%2Fgeneral-knowledge%2Funmissable-black-friday-2024-deals-in-india-discounts-on-top-brands-6748212dbdccdd0001d340e3%3Futm-source%3D4239%26utm-campaign%3Dblog-share%26utm-medium%3Dx&text=Unmissable%20Black%20Friday%202024%20Deals%20in%20India%20%E2%80%93%20Discounts%20on%20Top%20Brands`,
        imgSrc: 'https://static.quizzop.com/newton/assets/icons/x.png',
        alt: 'x',
        isButton: false,
    },
    {
        id: 'copy',
        imgSrc: 'https://static.quizzop.com/newton/assets/icons/share.png',
        alt: 'link',
        isButton: true,
    },
];

const BlogArticlesDetails = () => {
    const IMAGEURL = import.meta.env.VITE_API_BASE_URL;
    const { articleId } = useParams();
    const [articleContents, setArticleContents] = useState([]);
    console.log("🚀 ~ BlogArticlesDetails ~ articleContents:", articleContents)

    const breadcrumbItems = [
        { href: '/', icon: HomeIcon, state: null },
        { href: '/blogs', label: 'Blogs', state: null },
        { href: `/blogs/${articleContents?.categoryId?.categorySlug}`, state: { categoryId: articleContents?.categoryId?._id }, label: articleContents?.categoryId?.categoryName },
        { label: articleContents?.slug, state: null },
    ];

    useEffect(() => {
        if (articleId) {
            ApiGetArticleContent(articleId).then((res) => {
                if (res?.isSuccess) {
                    setArticleContents(res?.data)
                }
                else {
                    setArticleContents([]);
                    toast.error(res?.message);
                }
            }).catch((err) => {
                toast.error(err?.message);
            })
        }
    }, [articleId])

    const [rating, setRating] = useState(0);

    const handleRatingChange = (value) => {
        setRating(value);
        console.log('Rated:', value);
    };

    return (
        <div>
            <div class="flex flex-col w-full"><div class="w-full h-2 z-50"><div class="h-full bg-CFEDE34" style={{width:"10.14%"}}></div></div></div>
            <ul className="flex justify-center item-center gap-5 py-5 px-10 bg-C20213F">
                {breadcrumbItems?.map((item, index) => (
                    <Fragment key={index}>
                        <li className="flex items-center">
                            {item.href ? (
                                <Link className="text-[12px] line-clamp-1 text-C8789C3" to={item?.href} state={item?.state}>
                                    {item?.icon ? <item.icon /> : item?.label}
                                </Link>
                            ) : (
                                <span className="text-[12px] line-clamp-1 text-C8789C3">{item.label}</span>
                            )}
                        </li>
                        {index < breadcrumbItems?.length - 1 && <RightArrowIcon />}
                    </Fragment>
                ))}
            </ul>
            <AdSlot
                slotId="ad-slot-1"
                adUnitPath="/123456/ad-unit"
                sizes={[728, 80]}
                marginTop="mt-0"
            />
            <div className="px-20 mt-24">
                <h1
                    className="font-medium text-[22px] text-CFAFAFA mb-14"
                    data-testid="article-title"
                >
                    {articleContents?.title}
                </h1>
                <Divided />
                <p
                    className="text-C8789C3 text-[12px]"
                    data-testid="article-meta"
                >
                    <span className="whitespace-nowrap">{articleContents?.categoryId?.categoryName}&nbsp;&nbsp;•&nbsp;&nbsp;</span>
                    <span>{formatDate(articleContents?.publishedAt)}&nbsp;&nbsp;•&nbsp;&nbsp;</span>
                    <span className="whitespace-nowrap">{articleContents?.views} Views</span>
                    <span>&nbsp;&nbsp;•&nbsp;&nbsp;⭐ {articleContents?.rating?.average}</span>
                </p>
                <div
                    data-testid="article-author"
                    className="mt-4 mb-14 text-[12px] text-C8789C3 flex leading-[14px]"
                >
                    <p>
                        Written by <span className="font-bold">{articleContents?.writtenBy}</span>
                    </p>
                </div>
                <Divided />
            </div>
            <div className="mt-14 mb-10 pl-20 flex flex-col justify-center">
                <div>
                    <p className="text-12 text-C676767 mb-8 dark:text-C8789C3 leading-14">Share this article</p>
                </div>
                <div className="flex gap-10">
                    {shareOptions.map((item) =>
                        item.isButton ? (
                            <button
                                key={item.id}
                                data-testid="article-copy-link-button"
                            >
                                <img
                                    alt={item.alt}
                                    width="32"
                                    height="32"
                                    src={item.imgSrc}
                                    style={{ color: 'transparent' }}
                                />
                            </button>
                        ) : (
                            <a
                                key={item.id}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-testid={`article-${item.id}-button`}
                                href={item.href}
                            >
                                <img
                                    alt={item.alt}
                                    width="32"
                                    height="32"
                                    src={item.imgSrc}
                                    style={{ color: 'transparent' }}
                                />
                            </a>
                        )
                    )}
                </div>
                <Divided className={"mt-14 mr-20 mb-0"} />
            </div>
            <div className="pb-14">
                <img
                    alt={'Blog Post'}
                    loading="lazy"
                    width={500}
                    height={300}
                    decoding="async"
                    src={`${IMAGEURL}/images/article/${articleContents?.thumbnail}`}
                    style={{ color: 'transparent' }}
                />
            </div>
            <div className="relative text-CFAFAFA">
                <div className="text-16 text-CFAFAFA blog-render leading-27 blog-full-content">
                    <div className="text-16 text-CFAFAFA blog-render leading-27">
                        <div
                            dangerouslySetInnerHTML={{ __html: articleContents?.description }}
                        />

                        <div
                            data-testid="notification-carousel-card"
                            className="border-y border-C8789C3 py-14 bg-C26284C px-20 max-w-maxW my-24"
                        >
                            <div className="relative cursor-pointer">
                                <img
                                    alt="allow notification card"
                                    loading="lazy"
                                    width="0"
                                    height="0"
                                    decoding="async"
                                    src="https://www.quizzop.com/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2Fcards%2Fallow_notification_blog.png&w=1920&q=75"
                                    style={{ color: 'transparent', width: '100%', height: 'auto' }}
                                />
                                <div className="absolute top-[50%] translate-y-[-50%] left-20 w-[210px] z-10 text-16 font-black text-CFAFAFA">
                                    <p className="mb-10">Never Miss An Update From Quizzop!</p>
                                    <p className="text-14 text-CFFCC5B">TURN ON NOTIFICATIONS</p>
                                </div>
                            </div>
                        </div>
                        {
                            articleContents?.articleContent?.map((item, index) => {
                                return (
                                    <div>
                                        <div class="blog-content my-10"><h2>{item?.title}</h2></div>
                                        <img src={`${IMAGEURL}/images/article/${item?.image}`} alt={item?.title} className="mb-20" />
                                        <div key={index} dangerouslySetInnerHTML={{ __html: item?.description }}>

                                        </div>
                                    </div>
                                )
                            })
                        }
                        <AdSlot
                            slotId="ad-slot-1"
                            adUnitPath="/123456/ad-unit"
                            sizes={[728, 80]}
                        />
                        <div class="blog-content mt-20"><h2>Conclusion</h2></div>
                        <div
                            dangerouslySetInnerHTML={{ __html: articleContents?.conclusion }}
                        />
                        <AdSlot
                            slotId="ad-slot-1"
                            adUnitPath="/123456/ad-unit"
                            sizes={[728, 80]}
                        />
                        <div className="mt-14 px-20 flex flex-col justify-center">
                            <Divided />
                            <div>
                                <p
                                    data-testid="read-more-text"
                                    className="text-[12px] mb-14 font-bold text-C8789C3  leading-[14px]"
                                >
                                    READ MORE ARTICLES IN
                                </p>
                            </div>
                            <div className="pr-20 flex flex-wrap mb-24 gap-4">
                                {
                                    articleContents?.relatedArticles?.map((item) => (
                                        <Link
                                            to={`/blogs/${item?.categorySlug}`}
                                            state={{ categoryId: item?._id }}
                                            className="font-medium w-auto inline-block cursor-pointer text-[#C7C7C7] bg-[#FFFFFF] dark:bg-[#20213F] border-[#E0E0E0] border-[#FFFFFF] py-[6px] px-[14px] rounded-[30px] text-[12px] border border-solid whitespace-nowrap"
                                        >
                                            {item?.categoryName}
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                        <div class="h-10 w-full dark:bg-C262749"></div>
                        {/* <div className="mt-24 flex items-center justify-center flex-col">
                            <div className="font-black text-C676767 dark:text-CFAFAFA text-18 mb-14">
                                <p data-testid="rate-this-article">Rate this article</p>
                            </div>
                            <div className="flex items-center justify-center mb-24">
                                <div className="flex">
                                    <input type="radio" name="rating" id="rating-1" className="ratingInput ratingInput1" value="1" />
                                    <input type="radio" name="rating" id="rating-2" className="ratingInput ratingInput2" value="2" />
                                    <input type="radio" name="rating" id="rating-3" className="ratingInput ratingInput3" value="3" />
                                    <input type="radio" name="rating" id="rating-4" className="ratingInput ratingInput4" value="4" />
                                    <input type="radio" name="rating" id="rating-5" className="ratingInput ratingInput5" value="5" />

                                    <label htmlFor="rating-1" className="ratingLabel mr-30 last:mr-0" data-testid="rate-article-star-1">
                                        <RatingStar />
                                    </label>

                                    <label htmlFor="rating-2" className="ratingLabel mr-30 last:mr-0" data-testid="rate-article-star-2">
                                        <RatingStar />
                                    </label>

                                    <label htmlFor="rating-3" className="ratingLabel mr-30 last:mr-0" data-testid="rate-article-star-3">
                                        <RatingStar />
                                    </label>

                                    <label htmlFor="rating-4" className="ratingLabel mr-30 last:mr-0" data-testid="rate-article-star-4">
                                        <RatingStar />
                                    </label>

                                    <label htmlFor="rating-5" className="ratingLabel mr-30 last:mr-0" data-testid="rate-article-star-5">
                                        <RatingStar />
                                    </label>
                                </div>
                            </div>
                        </div> */}
                        <RatingComponent rating={rating} onChange={handleRatingChange} />
                        <div class="h-10 w-full dark:bg-C262749"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogArticlesDetails;
