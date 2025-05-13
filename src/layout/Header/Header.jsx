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

  const isBackHeader = useMemo(() => {
    const backPaths = [
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
    ];
    return (
      backPaths.includes(path) ||
      path.includes("/join-contest") ||
      path.includes("/contest-rank")
    );
  }, [path, categoryName]);

  const isHiddenHeader = useMemo(
    () => [`/${categoryName}/play-contest`],
    [categoryName]
  );

  const isHideFreeCoins = useMemo(() => [`/${categoryName}/begin-quiz`], [categoryName]);

  // Helper function to check if it's a main header
  const isMainHeader = useMemo(() => !isBackHeader && !isHiddenHeader.includes(path), [isBackHeader, isHiddenHeader, path]);

  const initHeader = useMemo(
    () => ["/get-started", "/start-quiz"].includes(path),
    [path]
  );

  useEffect(() => {
    const token = getCookie("authToken");
    const userData = localStorage.getItem("userData");
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

  const handleGoBack = () => navigate(-1);
  const handlePlayQuiz = () => navigate('/');

  if (isHiddenHeader.includes(path)) return null;

  if (isMenuVisible) {
    return <MenuPage closeMenu={() => setIsMenuVisible(false)} />;
  }

  if (isBackHeader) {
    return (
      <nav className="h-60 fixed z-99 top-0 max-w-maxW w-full duration-350 shadow-norma bg-C26284C">
        <div className="flex flex-row justify-between items-center h-full pr-20">
          <div className="flex flex-row items-center flex-1 pl-16">
            <div
              className="py-14 pr-4 flex justify-center cursor-pointer"
              onClick={handleGoBack}>
              <img src={sidearrow} alt="Back" />
            </div>
            <div className="py-10">
              <h1 className="text-14 font-bold dark:text-CFFFFFF">
                {path === "/contests" ||
                path.includes("/join-contest") ||
                path.includes("/contest-rank") ? (
                  <img src={logo} alt="Quizzop" width="100" height="18" />
                ) : path.includes("/category") && !categoryName ? (
                  "Quiz Topics"
                ) : path.includes("/category") && categoryName ? (
                  categoryName.replace(/-/g, " ")
                ) : path.includes("/mini-quiz-category-selection") ? (
                  "Quiz Bites"
                ) : path.includes("/order-history") ? (
                  "Coin History"
                ) : path.includes(`/${categoryName}/end-quiz`) ? (
                  "Quiz Battles"
                ) : path.includes(`/blogs/${categoryName}`) ? (
                  <span className="capitalize">{categoryName?.replace(/-/g, " ")} Articles</span>
                ) : path.includes(`/blogs-details/${articleId}`) ? (
                  <div className="mr-10 h-30 flex flex-auto items-center justify-start">
                    <img src={logo} alt="logo" className="h-30" />
                  </div>
                ) : path.includes("/login") ? (
                  ""
                ) : (
                  "Back"
                )}
              </h1>
            </div>
          </div>
          {userData?.isRegister && (
            <a className="link-anchor" href="/order-history">
              <div className="flex flex-row justify-center items-center border px-8 rounded-6 bg-C191A32 cursor-pointer border-C191A32">
                <img alt="coin" src={coin} className="h-14" />
                <span className="ml-8 uppercase">
                  <div className="text-10 relative top-2 font-medium text-C6063AF">
                    Coins
                  </div>
                  <div className="text-12 font-black text-CFFFFFF">
                    {wallet?.walletBalance}
                  </div>
                </span>
              </div>
            </a>
          )}
          {
            (path.includes(`/blogs/${categoryName}`) || path.includes(`/blogs-details/${articleId}`)) &&
            <button onClick={handlePlayQuiz} className="bg-C0DB25B  text-white rounded-3 py-5 px-20 text-14 font-bold text-CFFFFFF uppercase text-center inline-block   cursor-pointer flex items-center flex-col select-none opacity-100">Play Quiz</button>
          }
          {
            !path.includes(`/${categoryName}/end-quiz`) &&
            <div className="ml-20 cursor-pointer" data-testid="bell-icon">
              <img alt="bell" loading="lazy" width="32" height="32" src={bellGif} />
            </div>
          }
        </div>
      </nav>
    );
  }

  if (initHeader) {
    return (
      <header className="h-60 fixed z-99 max-w-maxW top-0 w-full duration-350 bg-C26284C !mt-0">
        <div className="flex flex-row justify-between items-center h-full px-20">
          <div className="mr-10 h-30 flex flex-auto items-center justify-center">
            <img src={logo} alt="Quizzop" width="100" height="18" />
          </div>
        </div>
      </header>
    );
  }

  if (isMainHeader) {
    return (
      <header className="h-60 fixed z-99 max-w-maxW top-0 w-full duration-350 bg-C26284C !mt-0">
        <div className="flex flex-row justify-between items-center h-full px-20">
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
          <div className="mr-10 h-30 flex flex-auto items-center justify-start">
            <img src={logo} alt="logo" className="h-30" />
          </div>
          <div className="flex items-center">
            {userData?.isRegister ? (
              <a className="link-anchor" href="/order-history">
                <div className="flex flex-row justify-center items-center border px-8 rounded-6 bg-C191A32 cursor-pointer border-C191A32">
                  <img alt="coin" src={coin} className="h-14" />
                  <span className="ml-8 uppercase">
                    <div className="text-10 relative top-2 font-medium text-C6063AF">
                      Coins
                    </div>
                    <div className="text-12 font-black text-CFFFFFF">
                      {wallet?.walletBalance}
                    </div>
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
            {
              !isHideFreeCoins &&
              <div className="ml-10 cursor-pointer" data-testid="free-coins-button">
                <img alt="free coins" loading="lazy" width="34" height="34" src={freeCoins} />
              </div>
            }
          </div>
        </div>
      </header>
    );
  }

  return null;
};

export default Header;
