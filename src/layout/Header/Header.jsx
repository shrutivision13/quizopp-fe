import React, { useEffect, useState, useMemo, Fragment } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MenuPage from "../../pages/MenuPage";
import "../../styles/components/header/header.css";
import coin from "../../assets/images/coin.png";
import logo from "../../assets/images/quizzop-logo-dark.svg";
import sidearrow from "../../assets/images/side-arrow.svg";
import bellGif from "../../assets/images/bell-new.gif";
import menuIcon from "../../assets/images/icons8-menu.svg";
import freeCoins from "../../assets/images/free-coins.gif";
import useCookie from "../../hooks/useCookie";
import { ApiGetWalletBalance } from "../../api-wrapper/user/ApiUser";
import { useLoader } from "../../context/LoaderContext";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { categoryName, articleId } = useParams();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [wallet, setWallet] = useState({});
  const { setLoading } = useLoader();
  const { getCookie } = useCookie();
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);

  const path = location.pathname;

  // Utility to handle dynamic paths configuration
  const getDynamicPaths = () => ({
    backPaths: [
      "/login",
      "/login/phone",
      "/category",
      `/${categoryName}/category`,
      "/contests",
      "/mini-quiz-category-selection",
      "/order-history",
      `/${categoryName}/end-quiz`,
      `/blogs/${categoryName}`,
      `/blogs-details/${articleId}`,
      "/mini-quiz-play",
      "/mini-quiz-over",
    ],
    hiddenPaths: [`/${categoryName}/play-contest`],
    freeCoinsPaths: [`/${categoryName}/begin-quiz`, '/'],
    initHeaderPaths: ["/get-started", "/start-quiz"],
  });

  const { backPaths, hiddenPaths, freeCoinsPaths, initHeaderPaths } = useMemo(getDynamicPaths, [categoryName, articleId]);

  const isBackHeader = useMemo(() => backPaths.includes(path) || path.includes("/join-contest") || path.includes("/contest-rank"), [path, backPaths]);
  const isHiddenHeader = useMemo(() => hiddenPaths.includes(path), [path, hiddenPaths]);
  const isHideFreeCoins = useMemo(() => freeCoinsPaths.includes(path), [path, freeCoinsPaths]);
  const isMainHeader = useMemo(() => !isBackHeader && !isHiddenHeader, [isBackHeader, isHiddenHeader]);
  const initHeader = useMemo(() => initHeaderPaths.includes(path), [path, initHeaderPaths]);

  useEffect(() => {
    const token = getCookie("authToken");
    const userData = JSON.parse(localStorage.getItem("userData"));
    setUserToken(token);
    setUserData(userData);

    if (token) {
      setLoading(true);
      ApiGetWalletBalance()
        .then((res) => {
          if (res.isSuccess) {
            setWallet(res.data);
          }
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [getCookie, setLoading]);

  const handleGoBack = () => {
    if (path.includes('/mini-quiz-over')) {
      navigate('/');
    } else {
      navigate(-1)
    }
  };

  const handlePlayQuiz = () => navigate("/");

  if (isHiddenHeader) return null;

  if (isMenuVisible) {
    return <MenuPage closeMenu={() => setIsMenuVisible(false)} />;
  }

  const BackHeader = () => (
    <nav className="h-60 fixed z-99 top-0 max-w-maxW w-full duration-350 shadow-norma bg-C26284C">
      <div className="flex flex-row justify-between items-center h-full pr-20">
        <div className="flex flex-row items-center flex-1 pl-16">
          <div className="py-14 pr-4 flex justify-center cursor-pointer" onClick={handleGoBack}>
            <img src={sidearrow} alt="Back" />
          </div>
          <div className="py-10">
            <h1 className="text-14 font-bold dark:text-CFFFFFF">{renderBackHeaderTitle(path)}</h1>
          </div>
        </div>
        {userData?.isRegister ? (
          <a className="link-anchor" href="/order-history">
            <div className="flex flex-row justify-center items-center border px-8 rounded-6 bg-C191A32 cursor-pointer border-C191A32">
              <img alt="coin" src={coin} className="h-14" />
              <span className="ml-8 uppercase">
                <div className="text-10 relative top-2 font-medium text-C6063AF">Coins</div>
                <div className="text-12 font-black text-CFFFFFF">{wallet?.walletBalance}</div>
              </span>
            </div>
          </a>
        )
          :
          (path.includes("/mini-quiz-play") || path.includes("/mini-quiz-over") || path.includes("/mini-quiz-category-selection")) &&
          <button button
            onClick={() => navigate("/login")}
            className="items-center justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-3 font-bold text-CFFFFFF uppercase text-center inline-block py-5 px-20 rounded-3 text-14 bg-C0DB25B"
          >
            LOGIN
          </button>
        }
        {(path.includes(`/blogs/${categoryName}`) || path.includes(`/blogs-details/${articleId}`)) && (
          <button
            onClick={handlePlayQuiz}
            className="bg-C0DB25B text-white rounded-3 py-5 px-20 text-14 font-bold text-CFFFFFF uppercase text-center inline-block cursor-pointer flex items-center flex-col select-none opacity-100"
          >
            Play Quiz
          </button>
        )}
        {!(path.includes(`/${categoryName}/end-quiz`) || path.includes("/mini-quiz-play") || path.includes("/mini-quiz-over") || path.includes("/mini-quiz-category-selection")) && (
          <div className="ml-20 cursor-pointer" data-testid="bell-icon">
            <img alt="bell" loading="lazy" width="32" height="32" src={bellGif} />
          </div>
        )}
      </div>
    </nav>
  );

  const renderBackHeaderTitle = (path) => {
    if (path === "/contests" || path.includes("/join-contest") || path.includes("/contest-rank")) {
      return <img src={logo} alt="Quizzop" width="100" height="18" />;
    } else if (path.includes("/category") && !categoryName) {
      return "Quiz Topics";
    } else if (path.includes("/category") && categoryName) {
      return categoryName.replace(/-/g, " ");
    } else if (path.includes("/mini-quiz-category-selection") || path.includes("/mini-quiz-play") || path.includes("/mini-quiz-over")) {
      return "Quiz Bites";
    } else if (path.includes("/order-history")) {
      return "Coin History";
    } else if (path.includes(`/${categoryName}/end-quiz`)) {
      return "Quiz Battles";
    } else if (path.includes(`/blogs/${categoryName}`)) {
      return <span className="capitalize">{categoryName?.replace(/-/g, " ")} Articles</span>;
    } else if (path.includes(`/blogs-details/${articleId}`)) {
      return <div className="mr-10 h-30 flex flex-auto items-center justify-start"><img src={logo} alt="logo" className="h-30" /></div>;
    }
    return "Back";
  };

  const MainHeader = () => (
    <header className="h-60 fixed z-99 max-w-maxW top-0 w-full duration-350 bg-C26284C !mt-0">
      <div className="flex flex-row justify-between items-center h-full px-20">
        {
          path.includes(`/${categoryName}/begin-quiz`) ?
            <div
              className="py-14 pr-4 flex justify-center cursor-pointer"
              onClick={handleGoBack}>
              <img src={sidearrow} alt="Back" />
            </div>
            :
            <div
              data-testid="side-menu-button"
              className="py-14 pr-8 flex justify-center cursor-pointer"
              onClick={() => setIsMenuVisible(true)}
            >
              <img
                alt="menu"
                loading="lazy"
                width="20"
                height="20"
                src={menuIcon}
              />
            </div>
        }
        <div className="mr-10 h-30 flex flex-auto items-center justify-start">
          <img src={logo} alt="logo" className="h-30" />
        </div>
        <div className="flex items-center">
          {userData?.isRegister ? (
            <a className="link-anchor" href="/order-history">
              <div className="flex flex-row justify-center items-center border px-8 rounded-6 bg-C191A32 cursor-pointer border-C191A32">
                <img alt="coin" src={coin} className="h-14" />
                <span className="ml-8 uppercase">
                  <div className="text-10 relative top-2 font-medium text-C6063AF">Coins</div>
                  <div className="text-12 font-black text-CFFFFFF">{wallet?.walletBalance}</div>
                </span>
              </div>
            </a>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="items-center justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-3 font-bold text-CFFFFFF uppercase text-center inline-block py-5 px-20 rounded-3 text-14 bg-C0DB25B"
            >
              LOGIN
            </button>
          )}
          {isHideFreeCoins && (
            <div className="ml-10 cursor-pointer" data-testid="free-coins-button">
              <img alt="free coins" loading="lazy" width="34" height="34" src={freeCoins} />
            </div>
          )}
        </div>
      </div>
    </header>
  );

  const InitHeader = () => (
    <header className="h-60 fixed z-99 max-w-maxW top-0 w-full duration-350 bg-C26284C !mt-0">
      <div className="flex flex-row justify-between items-center h-full px-20">
        <div className="mr-10 h-30 flex flex-auto items-center justify-center">
          <img src={logo} alt="Quizzop" width="100" height="18" />
        </div>
      </div>
    </header>
  );

  if (isBackHeader) return <BackHeader />;
  if (initHeader) return <InitHeader />;
  if (isMainHeader) return <MainHeader />;

  return null;
};

export default Header;
