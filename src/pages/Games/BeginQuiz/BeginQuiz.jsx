import { useEffect, useState } from 'react';
import { getCookie } from '../../../api-wrapper/categories/ApiCategories';
import AdSlot from '../../../components/AdSense/AdSlot';
import CategoryCard from '../../../components/CategoryCard/CategoryCard';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ApiGetOneCategory } from '../../../api-wrapper/games/ApiGames';
import { toast } from 'react-toastify';

const rules = [
    "5 questions, 50 seconds. ✅ answer +20, ❌ answer -10.",
    "10-seconds countdown for each question.",
    "Winner is announced at the end of the quiz.",
    "Winner gets - a free ride on the high horse"
]

const BeginQuiz = () => {
    const { state } = useLocation();
    const [userData, setUserData] = useState('');
    const { categoryName } = useParams();
    const [category, setCategory] = useState({})
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userData"));
        setUserData(user);
    }, [location.pathname]);

    // Fetch Category Data
    useEffect(() => {
        if (state?.categoryId) {
            ApiGetOneCategory(state?.categoryId).then((res) => {
                if (res?.isSuccess) {
                    setCategory(res?.data)
                }
                else {
                    setCategory([]);
                    toast.error(res?.message)
                }
            }).catch((err) => toast.error(err?.message))
        }
    }, [])

    // Navigate 
    const handleNavigate = (type) => {
        if (type === 'beginQuiz' || type === 'playAsGuest') {
            navigate(`/${categoryName}/join-quiz`, { state: { categoryId: state?.categoryId, categoryName: state?.categoryName } });
        }

        if (type === 'joinQuizzop') {
            navigate('/login');
        }
    }

    return (
        <div className="hide-scroll-bar">
            <div className="style_background__W3FcZ">
                <div className="style_foreground__jJqg2 hide-scroll-bar" id="shell">
                    <div className="h-screen">
                        <div className="bg-C20213F my-14 mx-20 border-1 border-C404380 flex flex-col py-24 px-20 items-center justify-center rounded-10">
                            <div className="flex flex-col items-center justify-center text-16 font-black text-CFFFFFF">
                                <p className="flex items-center justify-center uppercase">
                                    <img
                                        alt="swords icon"
                                        loading="lazy"
                                        width="16"
                                        height="16"
                                        className="mr-8"
                                        style={{ color: 'transparent' }}
                                        src="https://www.quizzop.com/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2Fbattles%2Fswords-icon.png&w=16&q=75"
                                    />
                                    Welcome
                                    <img
                                        alt="swords icon"
                                        loading="lazy"
                                        width="16"
                                        height="16"
                                        className="ml-8"
                                        style={{ color: 'transparent' }}
                                        src="https://www.quizzop.com/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2Fbattles%2Fswords-icon.png&w=16&q=75"
                                    />
                                </p>
                                <p className="font-bold mb-14">Noble Fighter In The Battle Of Wits!</p>
                            </div>
                            <div className='w-80 mb-20'>
                                <CategoryCard
                                    category={category}
                                    removeHeader={true}
                                    removeheart={true}
                                    height="h-100"
                                    imgHeight='60'
                                    imgWidth='60'
                                    captionFontSize='text-10'
                                    marignBottom='mb-5'
                                />
                            </div>
                            <div className="self-start text-white font-medium text-12">
                                <p className="mb-8 ml-8">Rules are Simple:</p>
                                <ul className="ml-20 flex flex-col gap-8 list-disc font-normal">
                                    {
                                        rules?.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>

                        <AdSlot
                            slotId="ad-slot-1"
                            adUnitPath="/123456/ad-unit"
                            sizes={[728, 80]}
                        />

                        <div className="fixed bottom-0 max-w-maxW w-full py-15 px-20 bg-C27294B z-50">
                            {
                                userData?.isRegister ?
                                    <button onClick={() => handleNavigate('beginQuiz')} className="inline-flex items-center justify-center whitespace-nowrap text-18 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary primary-button disabled:primary-button-disabled box-shadow text-primary-foreground hover:bg-primary/90 font-bold rounded-6 py-12 px-48 w-full">
                                        BEGIN QUIZ
                                    </button>
                                    :
                                    <div class="flex">
                                        <button onClick={() => handleNavigate('joinQuizzop')} className="inline-flex items-center justify-center whitespace-nowrap text-18 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary primary-button disabled:primary-button-disabled box-shadow text-primary-foreground hover:bg-primary/90 font-bold rounded-6 py-12 px-48 h-48 w-full shine-animation" data-testid="join-quizzop-button">
                                            <span className="mt-3">JOIN QUIZZOP</span>
                                        </button>
                                        <button onClick={() => handleNavigate('playAsGuest')} className="inline-flex text-white items-center justify-center whitespace-nowrap text-18 font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 py-12 ml-10 w-full h-53 border px-24 border-C8789C3 bg-C20213F hover:bg-C20213F" data-testid="play-as-guest-button">PLAY AS GUEST</button>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BeginQuiz;
