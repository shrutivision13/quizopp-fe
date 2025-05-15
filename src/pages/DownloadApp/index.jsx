import React, { useEffect, useState } from "react";
import SlickSliderComponent from "../../components/SlickSliderComponent/SlickSliderComponent";
import HeroSlider from "../../components/HeroSlider/HeroSlider";
import { useNavigate } from "react-router-dom";

const DownloadApp = () => {
  const navigate = useNavigate();
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const hanldeDownload = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        navigate("/");
        setDeferredPrompt(null);
      }
    }
  };

  return (
    <div className="gradientBG" style={{ marginTop: "-60px" }}>
      <div className="flex pl-20 pr-28 pt-10 mb-14 justify-between">
        <div className="flex flex-col relative pt-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="210"
            height="150"
            viewBox="0 0 210 160"
            fill="none"
            className="absolute"
          >
            <path
              d="M73.4921 0H210L136.508 160H0L73.4921 0Z"
              fill="url(#paint0_linear_15138_13672)"
            ></path>
            <defs>
              <linearGradient
                id="paint0_linear_15138_13672"
                x1="129.801"
                y1="-9.73958"
                x2="129.801"
                y2="185.625"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#1D0346"></stop>
                <stop offset="1" stopColor="#661DD8"></stop>
              </linearGradient>
            </defs>
          </svg>
          <div className="mb-14 z-10">
            <img
              alt="Quizzop"
              fetchpriority="high"
              width="150"
              height="40"
              decoding="async"
              style={{ color: "transparent" }}
              src="https://static.quizzop.com/newton/assets/quizzop-logo-dark.svg"
            />
          </div>
          <div className="dark:text-CFFFFFF text-CFAFAFA font-semibold text-12 mb-26 italic relative">
            Where Knowledge Meets Fun!
            <svg
              width="43"
              height="12"
              viewBox="0 0 43 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute -right-[5%] bottom-[-45%]"
            >
              <path
                d="M2 9.69776C8 6.19776 24.1 -0.102241 40.5 2.69776"
                stroke="#8848ED"
                strokeWidth="4"
                strokeLinecap="round"
              ></path>
            </svg>
            <svg
              width="20"
              height="10"
              viewBox="0 0 20 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute -right-[7%] top-[-32%]"
            >
              <path
                d="M14.6484 9.00003C15.2759 7.98043 16.9543 5.80005 18.6484 5.23535"
                stroke="#FEDE34"
                strokeLinecap="round"
              ></path>
              <path
                d="M9.57723 6.31065C9.57041 5.11348 9.84153 2.3753 10.9806 0.999979"
                stroke="#FEDE34"
                strokeLinecap="round"
              ></path>
              <path
                d="M5 9.00003C4.37255 7.98043 2.69413 5.80005 1.00003 5.23535"
                stroke="#FEDE34"
                strokeLinecap="round"
              ></path>
            </svg>
          </div>
          <button
            onClick={() => hanldeDownload()}
            type="button"
            data-testid="download-page-downlaod-button-top"
            className="py-12 text-center inline-block uppercase font-bold text-16 text-CFFFFFF rounded-5 bg-C0DB25B defaultButton px-36 !py-10 !px-0 text-16 uppercase z-10 mb-10 cursor-pointer flex items-center flex-col select-none opacity-100"
          >
            DOWNLOAD NOW
          </button>
          <a
            data-testid="download-page-homepage-button"
            rel=""
            className="py-10 text-16 text-center uppercase border border-CFFFFFF bg-CFFFFFF text-CFFFFFF font-bold cursor-pointer rounded-4 bg-transparent"
            href="/"
          >
            go to homepage
          </a>
        </div>
        <div className="relative">
          <img
            alt="mobile banner BG"
            loading="lazy"
            decoding="async"
            style={{ color: "transparent", width: "100%", height: "207px" }}
            sizes="100vw"
            src="https://www.quizzop.com/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2Fdownload-page%2Fmobile-bg.png&w=1920&q=75"
          />
        </div>
      </div>
      <div className="relative h-165 freeToPlayBG flex items-center justify-center text-[36px] font-black dark:text-CFEDE34 mb-14">
        <img
          alt="free to play background"
          loading="lazy"
          width="0"
          height="0"
          decoding="async"
          data-nimg="1"
          className="absolute"
          style={{ color: "transparent", width: "100%", height: "auto" }}
          sizes="100vw"
          src="https://www.quizzop.com/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2Fdownload-page%2FfreeToPlayBG.png&w=1920&q=75"
        />
        <span className="relative uppercase">
          <svg
            width="280"
            height="4"
            viewBox="0 0 280 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-[-55%]"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M280 0H0V2H251L250 4H278L279 2L280 0Z"
              fill="white"
            />
          </svg>
          free to play
          <svg
            width="280"
            height="4"
            viewBox="0 0 280 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-[36%] rotate-180"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M280 0H0V2H251L250 4H278L279 2L280 0Z"
              fill="white"
            />
          </svg>
        </span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <svg
          width="492"
          height="20"
          viewBox="0 0 492 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mb-10"
        >
          <g style={{ mixBlendMode: "overlay" }}>
            {[...Array(41)].map((_, i) => {
              const x = 12 * i;
              return (
                <path
                  key={i}
                  d={`M${x + 9} 0H${x + 13}L${x + 4} 20H${x}L${x + 9} 0Z`}
                  fill="#D9D9D9"
                />
              );
            })}
          </g>
        </svg>

        <div className="mb-10 flex justify-center w-full relative">
          <img
            alt="multiple emoji background"
            loading="lazy"
            width="0"
            height="0"
            decoding="async"
            data-nimg="1"
            className="absolute w-full bg-contain top-0 -left-[5%] mix-blend-luminosity"
            style={{ color: "transparent", width: "35%", height: "135px" }}
            sizes="100vw"
            src="https://www.quizzop.com/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2Fdownload-page%2FmultipleEmojiBG.png&w=1920&q=75"
          />
          <img
            alt="multiple emoji background"
            loading="lazy"
            width="0"
            height="0"
            decoding="async"
            data-nimg="1"
            className="absolute w-full bg-contain top-0 -right-[5%] mix-blend-luminosity rotate-180 scale-x-[1] -scale-y-[1]"
            style={{ color: "transparent", width: "35%", height: "135px" }}
            sizes="100vw"
            src="https://www.quizzop.com/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2Fdownload-page%2FmultipleEmojiBG.png&w=1920&q=75"
          />
          <div className="text-[32px] text-center font-black italic dark:text-CFFFFFF uppercase pb-36">
            mind bl
            <img
              alt="emoji image"
              loading="lazy"
              width="24"
              height="36"
              decoding="async"
              data-nimg="1"
              className="inline-block mb-12"
              style={{ color: "transparent" }}
              src="https://www.quizzop.com/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2Fdownload-page%2Femoji.png&w=32&q=75"
            />
            wing
            <div className="relative dark:text-CFEDE34 uppercase">
              <svg
                width="20"
                height="10"
                viewBox="0 0 20 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-[22%] top-[10%] rotate-45"
              >
                <path
                  d="M14.6484 9.00003C15.2759 7.98043 16.9543 5.80005 18.6484 5.23535"
                  stroke="#FEDE34"
                  strokeLinecap="round"
                />
                <path
                  d="M9.57723 6.31065C9.57041 5.11348 9.84153 2.3753 10.9806 0.999979"
                  stroke="#FEDE34"
                  strokeLinecap="round"
                />
                <path
                  d="M5 9.00003C4.37255 7.98043 2.69413 5.80005 1.00003 5.23535"
                  stroke="#FEDE34"
                  strokeLinecap="round"
                />
              </svg>
              facts
              <svg
                width="78"
                height="21"
                viewBox="0 0 78 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-[33%] bottom-[-11%]"
              >
                <path
                  d="M2.00161 13.9053C13.8523 8.49249 45.2006 -0.446995 75.7878 7.09728"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <g style={{ mixBlendMode: "overlay" }}>
                  <path
                    d="M32.4768 12.1622C39.7657 10.1458 58.7188 7.70283 76.2199 14.0623"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>

        <svg
          width="492"
          height="20"
          viewBox="0 0 492 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mb-14"
        >
          <g style={{ mixBlendMode: "overlay" }}>
            {[...Array(41)].map((_, i) => {
              const x = 12 * i;
              return (
                <path
                  key={i}
                  d={`M${x + 9} 0H${x + 13}L${x + 4} 20H${x}L${x + 9} 0Z`}
                  fill="#D9D9D9"
                />
              );
            })}
          </g>
        </svg>
      </div>
      <SlickSliderComponent />
      <div className="relative mt-[52px] mb-27 flex flex-col items-center justify-center">
        <img
          alt="single emoji background"
          loading="lazy"
          width="50"
          height="50"
          decoding="async"
          data-nimg="1"
          className="absolute left-1 mix-blend-luminosity -top-[10%]"
          style={{ color: "transparent" }}
          src="https://www.quizzop.com/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2Fdownload-page%2FsingleEmojiBG.png&w=64&q=75"
        />

        <img
          alt="single emoji background"
          loading="lazy"
          width="100"
          height="100"
          decoding="async"
          data-nimg="1"
          className="absolute -right-[3.5%] mix-blend-luminosity -top-[16%]"
          style={{ color: "transparent" }}
          src="https://www.quizzop.com/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2Fdownload-page%2FcontrollerBG.png&amp;w=256&amp;q=75"
        />

        <img
          alt="daily users wallpaper"
          loading="lazy"
          width="270"
          height="120"
          decoding="async"
          data-nimg="1"
          style={{ color: "transparent" }}
          src="https://www.quizzop.com/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2Fdownload-page%2Fdaily-user-wallpaper.png&amp;w=640&amp;q=75"
        />

        <img
          alt="daily users border"
          loading="lazy"
          width="0"
          height="0"
          decoding="async"
          data-nimg="1"
          style={{ color: "transparent", width: "110%", height: "auto" }}
          sizes="100vw"
          src="https://www.quizzop.com/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2Fdownload-page%2Fdaily-user-wallpaper-border.png&amp;w=3840&amp;q=75"
        />

        <span className="absolute right-[2%] xss:right-[8%] opacity-30 top-[35%] w-128 text-[9px] dark:text-CFFFFFF font-semibold">
          Take on the quiz challenges, stand apart from the crowd!
        </span>
      </div>
      <HeroSlider
        heading={"Game On...Score Big! TOP THE"}
        subTitle={"Sports Quiz!"}
        images={["sachin.png", "dhoni.png", "cr7.png"]}
      />
      <HeroSlider
        heading={"Guess The Plot Twists Ace The"}
        subTitle={"TV Quiz!"}
        images={["moneyHeist.png", "witcher.png", "GoT.png"]}
      />
      <HeroSlider
        heading={"Quiz Jutsu! Master the"}
        subTitle={"Anime Quiz!"}
        images={["naruto.png", "jujutsuKaisen.png", "ryuk.png"]}
      />
      <HeroSlider
        heading={"Lights! Camera! Quizzaction! the Ultimate"}
        subTitle={"Movie Quiz!"}
        images={["ironMan.png", "batman.png", "harryPotter.png"]}
      />

      <div class="flex items-center justify-between" style={{marginBottom: '100px'}}>
        <svg
          width="93"
          height="20"
          viewBox="0 0 93 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="mix-blend-overlay"
        >
          <path d="M4 0L13 10L4 20H0L9 10L0 0H4Z" fill="white"></path>
          <path d="M12 0L21 10L12 20H8L17 10L8 0H12Z" fill="white"></path>
          <path d="M20 0L29 10L20 20H16L25 10L16 0H20Z" fill="white"></path>
          <path d="M28 0L37 10L28 20H24L33 10L24 0H28Z" fill="white"></path>
          <path d="M36 0L45 10L36 20H32L41 10L32 0H36Z" fill="white"></path>
          <path d="M44 0L53 10L44 20H40L49 10L40 0H44Z" fill="white"></path>
          <path d="M52 0L61 10L52 20H48L57 10L48 0H52Z" fill="white"></path>
          <path d="M60 0L69 10L60 20H56L65 10L56 0H60Z" fill="white"></path>
          <path d="M68 0L77 10L68 20H64L73 10L64 0H68Z" fill="white"></path>
          <path d="M76 0L85 10L76 20H72L81 10L72 0H76Z" fill="white"></path>
          <path d="M84 0L93 10L84 20H80L89 10L80 0H84Z" fill="white"></path>
        </svg>
        <svg
          width="93"
          height="20"
          viewBox="0 0 93 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="mix-blend-overlay rotate-180"
        >
          <path d="M4 0L13 10L4 20H0L9 10L0 0H4Z" fill="white"></path>
          <path d="M12 0L21 10L12 20H8L17 10L8 0H12Z" fill="white"></path>
          <path d="M20 0L29 10L20 20H16L25 10L16 0H20Z" fill="white"></path>
          <path d="M28 0L37 10L28 20H24L33 10L24 0H28Z" fill="white"></path>
          <path d="M36 0L45 10L36 20H32L41 10L32 0H36Z" fill="white"></path>
          <path d="M44 0L53 10L44 20H40L49 10L40 0H44Z" fill="white"></path>
          <path d="M52 0L61 10L52 20H48L57 10L48 0H52Z" fill="white"></path>
          <path d="M60 0L69 10L60 20H56L65 10L56 0H60Z" fill="white"></path>
          <path d="M68 0L77 10L68 20H64L73 10L64 0H68Z" fill="white"></path>
          <path d="M76 0L85 10L76 20H72L81 10L72 0H76Z" fill="white"></path>
          <path d="M84 0L93 10L84 20H80L89 10L80 0H84Z" fill="white"></path>
        </svg>
      </div>

      <div class="fixed py-15 bottom-0 h-80 w-full px-20 max-w-maxW items-center bg-CFAFAFA dark:bg-C27294B">
        <button
          onClick={() => hanldeDownload()}
          data-testid="download-page-download-button-bottom"
          className="w-full py-12 text-center inline-block uppercase font-bold text-16 text-CFFFFFF rounded-5 bg-C0DB25B defaultButton px-36 mx-auto flex-row  cursor-pointer flex items-center flex-col select-none opacity-100"
        >
          <p className="text-2xl">DOWNLOAD NOW</p>
        </button>
      </div>
    </div>
  );
};

export default DownloadApp;
