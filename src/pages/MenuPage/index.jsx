import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import PopularQuizTopics from "./popularQuizTopic";
import TrendingArticles from "./TrendingArticles";
import useCookie from "../../hooks/useCookie"; // Import useCookie hook
import { ApiGetTrendingArticles } from "../../api-wrapper/article/ApiArticle";

function MenuPage({ closeMenu }) {
  const { getCookie, deleteCookie } = useCookie(); // Use deleteCookie
  const navigate = useNavigate(); // Initialize navigate
  const [isVisible, setIsVisible] = useState(false);
  const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false);
  const [isOtherProductsOpen, setIsOtherProductsOpen] = useState(false);
  const [isBackHeader, setIsBackHeader] = useState(false);

  const authToken = getCookie("authToken"); // Check for auth token

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setIsBackHeader(true); // Set isBackHeader to true when closing the menu
    setTimeout(() => {
      closeMenu();
    }, 250);
  };

  const toggleMoreOptions = () => setIsMoreOptionsOpen(!isMoreOptionsOpen);
  const toggleOtherProducts = () =>
    setIsOtherProductsOpen(!isOtherProductsOpen);

  const handleLogout = () => {
    deleteCookie("authToken");
    navigate("/");
    handleClose();
  };

  return (
    <aside
      className="absolute w-full h-full top-0 z-120"
      style={{
        pointerEvents: isVisible ? "auto" : "none",
        transform: isBackHeader
          ? "translate3d(0%, 0, 0)"
          : "translate3d(-250, 0, 0)",
        zIndex: 120,
      }}
    >
      <div
        id="sidebar-brackdrop"
        className={`absolute left-0 top-0 transition-all duration-250 transform-gpu h-full w-full bg-C000000DE ${isVisible ? "opacity-100" : "opacity-0"
          }`}
        style={{ pointerEvents: isVisible ? "auto" : "none" }}
        onClick={handleClose}
      ></div>
      <div
        id="sidebar"
        className="h-full w-full hide-scroll-bar transform-gpu z-100 transition-all duration-250 flex flex-col max-w-maxW overflow-y-scroll overflow-x-hidden fixed"
        style={{
          visibility: isVisible ? "visible" : "hidden",
          transform: isVisible
            ? "translate3d(0, 0, 0)"
            : "translate3d(-250%, 0, 0)",
        }}
      >
        <div className="py-4 px-20 flex items-center justify-between custom-shadow-sidemenu bg-C26284C">
          <div className="flex flex-row">
            <div
              className="py-14 pr-4 flex justify-center cursor-pointer"
              data-testid="top-back-sidemenu-nav-button"
              onClick={handleClose}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-current text-C676767 dark:text-CBBBDDD"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.11977 11.9416L12.4675 5.59392C12.6081 5.45327 12.6871 5.2625 12.6871 5.06359C12.6871 4.86468 12.6081 4.67391 12.4675 4.53326C12.3268 4.39261 12.136 4.31359 11.9371 4.31359C11.7382 4.31359 11.5475 4.39261 11.4068 4.53326L4.52948 11.4106C4.38926 11.5512 4.31052 11.7416 4.31052 11.9402C4.31052 12.1388 4.38926 12.3292 4.52948 12.4698L11.4068 19.3471C11.5475 19.4878 11.7382 19.5668 11.9371 19.5668C12.136 19.5668 12.3268 19.4878 12.4675 19.3471C12.6081 19.2065 12.6871 19.0157 12.6871 18.8168C12.6871 18.6179 12.6081 18.4271 12.4675 18.2865L6.11977 11.9416Z"
                ></path>
              </svg>
            </div>
            <div className="text-14 font-bold py-10 text-CFAFAFA flex items-center">
              Menu
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: "#191A32" }}>
          <PopularQuizTopics />
          <TrendingArticles closeMenu={closeMenu} />
        </div>
        <div className="flex h-full justify-between flex-col bg-C191A32">
          <div className="bg-C191A32">
            {/* More Options Section */}
            <div className="mx-10 my-14 bg-C20213F rounded-10 cursor-pointer">
              <div
                className="flex items-center justify-between p-14 font-bold text-14 text-CFAFAFA"
                onClick={toggleMoreOptions}
              >
                <div data-testid="more-options">More Options</div>
                <div className="cursor-pointer">
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`fill-current text-C8789C3 transform transition-transform ${isMoreOptionsOpen ? "rotate-180" : ""
                      }`}
                  >
                    <path d="M10.8461 13.827L15.6741 9C15.7849 8.88852 15.8471 8.7377 15.8471 8.5805C15.8471 8.4233 15.7849 8.27248 15.6741 8.161L15.3191 7.805C15.2077 7.69392 15.0569 7.63154 14.8996 7.63154C14.7423 7.63154 14.5914 7.69392 14.4801 7.805L10.4251 11.859L6.36707 7.8C6.25559 7.68917 6.10477 7.62695 5.94757 7.62695C5.79037 7.62695 5.63955 7.68917 5.52807 7.8L5.17207 8.156C5.06124 8.26748 4.99902 8.4183 4.99902 8.5755C4.99902 8.7327 5.06124 8.88352 5.17207 8.995L10.0041 13.827C10.1163 13.9375 10.2675 13.9995 10.4251 13.9995C10.5826 13.9995 10.7338 13.9375 10.8461 13.827Z"></path>
                  </svg>
                </div>
              </div>
              <div
                className="text-14 text-CFAFAFA transition-all duration-350 overflow-hidden"
                style={{ height: isMoreOptionsOpen ? "auto" : "0px" }}
              >
                <a target="_self" href="/spin-wheel">
                  <div className="text-12 font-medium text-CBBBDDD text-left p-14 pl-28 flex items-center gap-10">
                    <img
                      alt="drawer icon"
                      loading="lazy"
                      width="32"
                      height="32"
                      decoding="async"
                      data-nimg="1"
                      style={{ color: "transparent" }}
                      src="https://static.quizzop.com/newton/assets/ic_spin wheel_dark.svg"
                    />
                    <span className="text-12">Spin Wheel</span>
                  </div>
                  <hr className="mx-14 border-C404380" />
                </a>
                {authToken && (
                  <a target="_self" href="/order-history">
                    <div class="text-12 font-medium text-CBBBDDD text-left p-14 pl-28 flex items-center gap-10">
                      <img
                        alt="drawer icon"
                        loading="lazy"
                        width="32"
                        height="32"
                        decoding="async"
                        data-nimg="1"
                        style={{ color: "transparent" }}
                        src="https://static.quizzop.com/newton/assets/icons/ic_order_history_dark.svg"
                      />
                      <span class="text-12">Coin History</span>
                    </div>
                    <hr class="mx-14 border-C404380" />
                  </a>
                )}

                <a target="_self" href="/contest-rules">
                  <div className="text-12 font-medium text-CBBBDDD text-left p-14 pl-28 flex items-center gap-10">
                    <img
                      alt="drawer icon"
                      loading="lazy"
                      width="32"
                      height="32"
                      decoding="async"
                      data-nimg="1"
                      style={{ color: "transparent" }}
                      src="https://static.quizzop.com/newton/assets/ic_contest_rules_dark.svg"
                    />
                    <span className="text-12">Quiz Contest Rules</span>
                  </div>
                  <hr className="mx-14 border-C404380" />
                </a>
                <div>
                  <div className="text=[12px] font-medium text-CBBBDDD text-left">
                    <div className="flex items-center gap-10 p-14 pl-28">
                      <img
                        alt="drawer_icon"
                        loading="lazy"
                        width="32"
                        height="32"
                        decoding="async"
                        data-nimg="1"
                        style={{ color: "transparent" }}
                        src="https://static.quizzop.com/newton/assets/ic_partner_with_us_dark.svg"
                      />
                      <span className="text-12">Partner With Us</span>
                    </div>
                    <hr className="mx-14 border-C404380" />
                  </div>
                </div>
                <div>
                  <div className="text=[12px] font-medium text-CBBBDDD text-left">
                    <div className="flex items-center gap-10 p-14 pl-28">
                      <img
                        alt="drawer_icon"
                        loading="lazy"
                        width="32"
                        height="32"
                        decoding="async"
                        data-nimg="1"
                        style={{ color: "transparent" }}
                        src="https://static.quizzop.com/newton/assets/ic_issue_dark.svg"
                      />
                      <span className="text-12">Report An Issue</span>
                    </div>
                    <hr className="mx-14 border-C404380" />
                  </div>
                </div>
                {!authToken && (
                  <a target="_self" href="/login">
                    <div className="text-12 font-medium text-CBBBDDD text-left p-14 pl-28 flex items-center gap-10">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M29.4603 2.94603C29.4603 1.31746 28.1405 0 26.5143 0H14.7301H2.94603C1.31982 0 0 1.31746 0 2.94603V26.5143C0 28.1428 1.31982 29.4603 2.94603 29.4603H14.7301H26.5143C28.1405 29.4603 29.4603 28.1428 29.4603 26.5143V2.94603Z"
                          fill="#FEDE34"
                        ></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M18.2135 15.5149L18.2041 15.6068C18.1192 16.328 17.9495 17.0068 17.6974 17.6408L17.6549 17.7421L17.9001 17.9401L19.2458 15.6705H18.8121C18.5977 15.6728 18.3926 15.6163 18.2135 15.5149ZM10.4548 6.25732C12.6396 6.25732 14.5133 6.98794 15.8732 8.36904C16.4624 8.96767 16.9314 9.66529 17.2731 10.443C17.431 10.7235 17.5725 11.0181 17.6927 11.3245C17.9118 10.9215 18.3361 10.641 18.8121 10.641H25.1661C25.654 10.641 26.0853 10.8861 26.3233 11.2986C26.5567 11.7134 26.552 12.2201 26.3116 12.6302L24.3318 16.0216H25.1237C25.8473 16.0216 26.4129 16.5826 26.4129 17.2967V19.7195C26.4129 20.4053 25.8614 20.9663 25.1756 20.9922L25.1237 20.9945H18.4256C18.3125 20.9969 18.1994 20.9828 18.0933 20.9568L16.1631 22.8706L16.1042 22.9153C15.8096 23.1369 15.5244 23.1934 15.3264 23.1982H15.291C15.0719 23.1982 14.6524 23.1369 14.2941 22.7174L14.2776 22.6962L13.4268 21.6497C12.6538 21.9043 11.8195 22.0386 10.9427 22.0551L10.7777 22.0575C8.59532 22.0575 6.72164 21.3292 5.36176 19.9505C4.76784 19.3495 4.29647 18.6495 3.95238 17.867C3.30425 16.7169 2.96722 15.3594 2.96722 13.8534C2.96722 11.6403 3.6837 9.74307 5.04123 8.36432C6.3964 6.98794 8.27007 6.25732 10.4548 6.25732Z"
                          fill="#8848ED"
                        ></path>
                        <path
                          d="M10.4571 7.32263C14.3129 7.32263 16.8842 9.92928 16.8842 13.8581C16.8842 15.324 16.5213 16.6109 15.8519 17.6597L17.3367 18.8546C17.4993 18.9818 17.4993 19.1091 17.3721 19.2175L15.1449 21.4259C15.0011 21.5343 14.8903 21.5154 14.7819 21.3905L13.4432 19.7431C12.5736 20.1414 11.5601 20.3582 10.4571 20.3582C6.60138 20.3582 4.03009 17.7516 4.03009 13.8581C4.03009 9.93164 6.60138 7.32263 10.4571 7.32263ZM24.9987 11.2821C25.1119 11.2821 25.2179 11.3434 25.2745 11.4424C25.3311 11.5413 25.3311 11.6615 25.2745 11.7605L22.7645 16.1513C22.7079 16.2503 22.7079 16.3705 22.7645 16.4695C22.821 16.5684 22.9271 16.6297 23.0402 16.6297H24.8762C25.053 16.6297 25.1967 16.7735 25.1967 16.9503V19.2434C25.1967 19.4202 25.053 19.564 24.8762 19.564H18.4091C18.2959 19.564 18.1899 19.5027 18.1333 19.4061C18.0768 19.3071 18.0744 19.1869 18.131 19.0879L20.5585 14.789C20.6151 14.6901 20.6127 14.5699 20.5561 14.4709C20.4996 14.3719 20.3935 14.313 20.2804 14.313H18.7649C18.5882 14.313 18.4468 14.1716 18.4444 13.9948L18.4373 11.605C18.4373 11.5201 18.4703 11.4376 18.5316 11.3787C18.5905 11.3198 18.673 11.2845 18.7579 11.2845H24.9987V11.2821ZM10.4571 10.872C8.89929 10.872 7.86936 12.0669 7.86936 13.8581C7.86936 15.6493 8.90164 16.8442 10.4571 16.8442C10.6457 16.8442 10.8342 16.8277 11.0181 16.79L10.476 16.1206C10.3676 15.9934 10.3676 15.885 10.4949 15.7577L11.6709 14.5981C11.7982 14.4709 11.8877 14.4355 12.015 14.5439L12.8116 15.1968C12.9742 14.7985 13.0473 14.346 13.0473 13.8581C13.0449 12.0669 12.0126 10.872 10.4571 10.872ZM11.4093 13.3113C11.4588 13.349 11.4894 13.4079 11.4918 13.4692C11.4941 13.5305 11.4706 13.5918 11.4258 13.6342L9.70061 15.2863C9.65583 15.3288 9.59455 15.35 9.53091 15.3453C9.46964 15.3382 9.41307 15.3075 9.37772 15.2557C8.94171 14.6453 8.9747 13.8298 9.48849 13.3372C9.99992 12.847 10.8177 12.8494 11.4093 13.3113Z"
                          fill="white"
                        ></path>
                      </svg>
                      <span className="text-12">Join QUIZZOP</span>
                    </div>
                  </a>
                )}
                {authToken && (
                  <div
                    className="text-12 font-medium text-CBBBDDD text-left p-14 pl-28 flex items-center gap-10 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <img
                      alt="drawer icon"
                      loading="lazy"
                      width="32"
                      height="32"
                      decoding="async"
                      data-nimg="1"
                      style={{ color: "transparent" }}
                      src="https://static.quizzop.com/newton/assets/ic_logout_dark.svg"
                    />
                    <span className="text-12">Logout</span>
                  </div>
                )}
              </div>
            </div>

            {/* Other Products Section */}
            <div className="mx-10 my-14 bg-C20213F rounded-10 cursor-pointer">
              <div
                className="flex items-center justify-between p-14 font-bold text-14 text-CFAFAFA"
                onClick={toggleOtherProducts}
              >
                <div data-testid="other-products-from-us">
                  Other Products From Us
                </div>
                <div className="cursor-pointer">
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`fill-current text-C8789C3 transform transition-transform ${isOtherProductsOpen ? "rotate-180" : ""
                      }`}
                  >
                    <path d="M10.8461 13.827L15.6741 9C15.7849 8.88852 15.8471 8.7377 15.8471 8.5805C15.8471 8.4233 15.7849 8.27248 15.6741 8.161L15.3191 7.805C15.2077 7.69392 15.0569 7.63154 14.8996 7.63154C14.7423 7.63154 14.5914 7.69392 14.4801 7.805L10.4251 11.859L6.36707 7.8C6.25559 7.68917 6.10477 7.62695 5.94757 7.62695C5.79037 7.62695 5.63955 7.68917 5.52807 7.8L5.17207 8.156C5.06124 8.26748 4.99902 8.4183 4.99902 8.5755C4.99902 8.7327 5.06124 8.88352 5.17207 8.995L10.0041 13.827C10.1163 13.9375 10.2675 13.9995 10.4251 13.9995C10.5826 13.9995 10.7338 13.9375 10.8461 13.827Z"></path>
                  </svg>
                </div>
              </div>
              <div
                className="text-14 text-CFAFAFA transition-all duration-350 overflow-hidden"
                style={{ height: isOtherProductsOpen ? "auto" : "0px" }}
              >
                <a target="_blank" href="https://cfuucl7YgA.play.gamezop.com">
                  <div className="text-12 font-medium text-CBBBDDD text-left p-14 pl-28 flex items-center gap-10">
                    <img
                      alt="drawer icon"
                      loading="lazy"
                      width="32"
                      height="32"
                      decoding="async"
                      data-nimg="1"
                      style={{ color: "transparent" }}
                      src="/src/assets/images/gamezop_icon.webp"
                    />
                    <span className="text-12">
                      <strong>Gamezop -</strong> Play Free Games Online!
                    </span>
                  </div>
                  <hr className="mx-14 border-C404380" />
                </a>
                <a target="_blank" href="https://6302.read.astrozop.com">
                  <div className="text-12 font-medium text-CBBBDDD text-left p-14 pl-28 flex items-center gap-10">
                    <img
                      alt="drawer icon"
                      loading="lazy"
                      width="32"
                      height="32"
                      decoding="async"
                      data-nimg="1"
                      style={{ color: "transparent" }}
                      src="/src/assets/images/astrozop_icon.webp"
                    />
                    <span className="text-12">
                      <strong>Astrozop -</strong> Daily Horoscope For Your Sun
                      Sign
                    </span>
                  </div>
                  <hr className="mx-14 border-C404380" />
                </a>
                <a target="_blank" href="https://5571.read.newszop.com">
                  <div className="text-12 font-medium text-CBBBDDD text-left p-14 pl-28 flex items-center gap-10">
                    <img
                      alt="drawer icon"
                      loading="lazy"
                      width="32"
                      height="32"
                      decoding="async"
                      data-nimg="1"
                      style={{ color: "transparent" }}
                      src="/src/assets/images/newszop_icon.webp"
                    />
                    <span className="text-12">
                      <strong>Newszop -</strong> Get The Latest News Updates!
                    </span>
                  </div>
                  <hr className="mx-14 border-C404380" />
                </a>
                <a target="_blank" href="https://6508.read.criczop.com">
                  <div className="text-12 font-medium text-CBBBDDD text-left p-14 pl-28 flex items-center gap-10">
                    <img
                      alt="drawer icon"
                      loading="lazy"
                      width="32"
                      height="32"
                      decoding="async"
                      data-nimg="1"
                      style={{ color: "transparent" }}
                      src="/src/assets/images/criczop.webp"
                    />
                    <span className="text-12">
                      <strong>Criczop -</strong> Never Miss Any LIVE Cricket
                      Update!
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div>
            <div className="relative flex py-5 items-center bg-C191A32">
              <div className="grow border-t border-C26284C"></div>
              <span className="shrink mx-10 text-12 text-C8789C3 font-bold">
                FOLLOW US ON:
              </span>
              <div className="grow border-t border-C26284C"></div>
            </div>
            <div className="flex justify-center items-center bg-C191A32">
              <div
                data-testid="instagram-logo"
                className="flex items-center flex-col py-20 mx-15 cursor-pointer"
              >
                <img
                  alt="drawer icon"
                  loading="lazy"
                  width="32"
                  height="32"
                  decoding="async"
                  data-nimg="1"
                  style={{ color: "transparent" }}
                  src="/src/assets/images/instagram.webp"
                />
              </div>
              <div
                data-testid="facebook-logo"
                className="flex items-center flex-col py-20 mx-15 cursor-pointer"
              >
                <img
                  alt="drawer icon"
                  loading="lazy"
                  width="32"
                  height="32"
                  decoding="async"
                  data-nimg="1"
                  style={{ color: "transparent" }}
                  src="/src/assets/images/facebook.webp"
                />
              </div>
              <div
                data-testid="x-logo"
                className="flex items-center flex-col py-20 mx-15 cursor-pointer"
              >
                <img
                  alt="drawer icon"
                  loading="lazy"
                  width="32"
                  height="32"
                  decoding="async"
                  data-nimg="1"
                  style={{ color: "transparent" }}
                  src="/src/assets/images/x.webp"
                />
              </div>
              <div
                data-testid="whatsapp-logo"
                className="flex items-center flex-col py-20 mx-15 cursor-pointer"
              >
                <img
                  alt="drawer icon"
                  loading="lazy"
                  width="32"
                  height="32"
                  decoding="async"
                  data-nimg="1"
                  style={{ color: "transparent" }}
                  src="https://static.quizzop.com/newton/assets/icons/whatsapp-channel-icon.svg"
                />
              </div>
              <div
                data-testid="youtube-logo"
                className="flex items-center flex-col py-20 mx-15 cursor-pointer"
              >
                <img
                  alt="drawer icon"
                  loading="lazy"
                  width="32"
                  height="32"
                  decoding="async"
                  data-nimg="1"
                  style={{ color: "transparent" }}
                  src="https://static.quizzop.com/newton/assets/icons/youtube_icon.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default MenuPage;
