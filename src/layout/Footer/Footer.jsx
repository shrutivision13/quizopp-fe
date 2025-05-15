import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom'; // Import useLocation
import '../../styles/components/footer/footer.css';
import arrow from '../../assets/images/arrow.svg';
import logo from '../../assets/images/quizzop-logo-dark.svg';

const Footer = ({ gameStarted }) => {
  const { categoryName } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Initialize useLocation

  const hiddenFooterPaths = ["/login", "/login/phone", "/category", "/contest-rules", "/spin-wheel", `/${categoryName}/begin-quiz`, '/mini-quiz-play', '/mini-quiz-over', "/play-quiz", "/download-app"]; // Paths where footer should be hidden
  const path = location.pathname;

  if (
    hiddenFooterPaths.includes(path) ||
    path.includes("/join-contest") ||
    path.includes("/play-contest") ||
    path.includes("/contest-rank") ||
    path.includes(`/${categoryName}/join-quiz`) ||
    path.includes(`/${categoryName}/play-quiz`)
  )
    return null; // Hide footer for specific paths

  const toggleFooter = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-skin-footer-dark footer-container">
      <div className="h-1 w-full bg-C404380"></div>
      <div
        className="px-20 py-12 text-10 font-medium flex justify-between items-center text-C8789C3 cursor-pointer"
        onClick={toggleFooter}
      >
        <div
          className={`mr-10 h-30 flex items-center gap-10 ${isOpen ? "justify-center flex-1" : ""
            }`}
        >
          <img
            alt="Quizzop"
            fetchPriority="high"
            width="100"
            height="21"
            decoding="async"
            style={{ color: "transparent" }}
            src={logo}
          />
          {!isOpen && (
            <p className="text-C8789C3 flex items-center">
              <span className="text-18 mx-10 text-C262749">|</span>
              <span className="text-12">Terms, Privacy, &amp; other links</span>
            </p>
          )}
        </div>
        <div
          className={`transform ${isOpen ? "rotate-180" : "rotate-0"
            } transition-transform`}
        >
          <img src={arrow} alt="arrow" />
        </div>
      </div>

      {isOpen && (
        <div className="block">
          <div className="mb-12 h-1 mx-auto bg-gradient-to-r from-C40438000 via-C404380 to-C40438000"></div>
          {!gameStarted ? (
            <div>
              <div className="transition px-20 flex gap-x-20 text-12 flex-wrap mx-auto w-250 justify-center">
                <a
                  target="_blank"
                  className="mb-20 text-12 text-CFFFFFF underline"
                  href="https://static.quizzop.com/legal/terms-of-use/?utm_source=qzp_footer"
                >
                  Terms of Use
                </a>
                <a
                  target="_blank"
                  className="mb-20 text-12 text-CFFFFFF underline"
                  href="https://static.quizzop.com/legal/privacy/?utm_source=qzp_footer"
                >
                  Privacy Policy
                </a>
                <a
                  target="_blank"
                  className="mb-20 text-12 text-CFFFFFF underline"
                  href="https://business.gamezop.com/about-us?utm_source=qzp_footer"
                >
                  About
                </a>
                <a
                  target="_blank"
                  className="mb-20 text-12 text-CFFFFFF underline"
                  href="https://careers.gamezop.com/?utm_source=qzp_footer"
                >
                  Jobs
                </a>
                <a
                  target="_blank"
                  className="mb-20 text-12 text-CFFFFFF underline"
                  href="https://business.gamezop.com/?utm_source=qzp_footer"
                >
                  Partner With Us
                </a>
              </div>
              <div className="text-center text-10 pb-20 text-C8789C3 mx-auto w-3/4 sm:w-p60">
                © 2025 Advergame Technologies Pvt. Ltd. ("ATPL"). Gamezop ®
                &amp; Quizzop ® are registered trademarks of ATPL.
              </div>
            </div>
          ) : (
            <>
              <div className="h-1 w-full bg-C404380"></div>
              <div className="px-20 pb-20 text-10 text-C8789C3 footer-about-text">
                <div style={{ marginTop: "20px" }}>
                  <p>
                    Quizzop is a plug-and-play quizzing platform that any app or
                    website can integrate to bring trivia for its users. Quizzop
                    is affiliated with Gamezop, a gaming platform that digital
                    products can add as a gaming section.
                  </p>
                </div>
                <div style={{ marginTop: "20px" }}>
                  <p>
                    Over 5,000 products from more than 70 countries have
                    integrated Quizzop and Gamezop. These include Amazon,
                    Samsung Internet, Snap, Tata Play, AccuWeather, Paytm, Gulf
                    News, and Branch. Trivia and games increase user engagement
                    significantly within all kinds of apps and websites, besides
                    opening a new stream of advertising revenue. Gamezop and
                    Quizzop take 30 minutes to integrate and can be used for
                    free: both by the products integrating them and end users.
                  </p>
                </div>
                <div style={{ marginTop: "20px" }}>
                  <p>
                    Increase ad revenue and engagement on your app / website
                    with games, quizzes, astrology, and cricket content. Visit:{" "}
                    <a href="https://business.gamezop.com">
                      business.gamezop.com
                    </a>
                  </p>
                </div>
              </div>
              <div className="h-1 w-full bg-C404380"></div>
              <p
                data-nosnippet="true"
                className="px-20 py-20 text-10 text-left text-C8789C3"
              >
                Property ID: 4239
              </p>
            </>
          )}

          <div className="h-1 w-full bg-C404380"></div>
          <div className="px-20 pb-20 text-10 text-C8789C3 footer-about-text">
            <div style={{ marginTop: "20px" }}>
              <p>
                {" "}
                Quizzop is a plug-and-play quizzing platform that any app or
                website can integrate to bring trivia for its users. Quizzop is
                affiliated with Gamezop, a gaming platform, that digital
                products can add as a gaming section.{" "}
              </p>{" "}
            </div>
            <div style={{ marginTop: "20px" }}>
              <p>
                Over 5,000 products from more than 70 countries have integrated
                Quizzop and Gamezop. These include Amazon, Samsung Internet,
                Snap, Tata Play, AccuWeather, Paytm, Gulf News, and Branch.
                Trivia and games increase user engagement significantly within
                all kinds of apps and websites, besides opening a new stream of
                advertising revenue. Gamezop and Quizzop take 30 minutes to
                integrate and can be used for free: both by the products
                integrating them and end users.
              </p>{" "}
            </div>
            <div style={{ marginTop: "20px" }}> </div>
            <div style={{ marginTop: "20px" }}>
              {" "}
              <p>
                {" "}
                Increase ad revenue and engagement on your app / website with
                games, quizzes, astrology, and cricket content. Visit:
                <a href="https://business.gamezop.com">
                  business.gamezop.com
                </a>{" "}
              </p>{" "}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
