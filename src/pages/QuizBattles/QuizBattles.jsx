// import React from 'react'

// const QuizBattles = () => {
//     return (
//         <div class="hide-scroll-bar">
//             <div class="style_background__W3FcZ">
//                 <div class="style_foreground__jJqg2 hide-scroll-bar" id="shell">
//                     <main>
//                         <header class="h-60 fixed z-99 max-w-maxW top-0 w-full duration-350 bg-C26284C !mt-0">
//                             <div class="flex flex-row justify-between items-center h-full px-20">
//                                 <div class="flex items-center justify-center text-14 text-CFAFAFA font-bold">
//                                     <div data-testid="top-back-nav-button" class="py-14 pr-4 flex justify-center cursor-pointer">
//                                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="fill-current text-C676767 dark:text-CBBBDDD">
//                                             <path fill-rule="evenodd" clip-rule="evenodd" d="M6.11977 11.9416L12.4675 5.59392C12.6081 5.45327 12.6871 5.2625 12.6871 5.06359C12.6871 4.86468 12.6081 4.67391 12.4675 4.53326C12.3268 4.39261 12.136 4.31359 11.9371 4.31359C11.7382 4.31359 11.5475 4.39261 11.4068 4.53326L4.52948 11.4106C4.38926 11.5512 4.31052 11.7416 4.31052 11.9402C4.31052 12.1388 4.38926 12.3292 4.52948 12.4698L11.4068 19.3471C11.5475 19.4878 11.7382 19.5668 11.9371 19.5668C12.136 19.5668 12.3268 19.4878 12.4675 19.3471C12.6081 19.2065 12.6871 19.0157 12.6871 18.8168C12.6871 18.6179 12.6081 18.4271 12.4675 18.2865L6.11977 11.9416Z"></path>
//                                         </svg>
//                                     </div>
//                                     Quiz Battles
//                                 </div>
//                                 <template id="B:1"></template>
//                                 <div class="h-32 w-128 rounded-6 shimmer-animation"></div>
//                             </div>
//                         </header>
//                         <div class="mb-14 mt-80">
//                             <div class="px-20 font-black mt-24 flex flex-col items-center justify-center text-CE63737">
//                                 <p class="text-[18px] mb-4 text-C8789C3 uppercase font-bold">Brain Teasers</p>
//                                 <p class="text-10 text-C8789C3">Calculating Result...</p>
//                             </div>
//                             <div class="flex flex-col item-center justify-center">
//                                 <div class="mt-14 px-20 w-full flex items-center justify-between">
//                                     <div class="flex flex-col mb-10">
//                                         <div class="relative">
//                                             <div class="relative flex items-center justify-center mb-10 opacity-60">
//                                                 <img alt="player image" loading="lazy" width="80" height="80" decoding="async" data-nimg="1" class="rounded-[50%]" style="color:transparent" srcSet="/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2Fbattles%2Fplayer-0.png&amp;w=96&amp;q=75 1x, /_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2Fbattles%2Fplayer-0.png&amp;w=256&amp;q=75 2x" src="/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2Fbattles%2Fplayer-0.png&amp;w=256&amp;q=75" />
//                                                 <div class="absolute loader z-10"></div>
//                                                 <div id="emoji-animation" class="relative"></div>
//                                             </div>
//                                         </div>
//                                         <p class="text-center text-14 text-CFFCC5B">
//                                             You
//                                             <br />
//                                             <span class="font-bold">--
//                                                 /
//                                                 0</span>
//                                         </p>
//                                     </div>
//                                     <div>
//                                         <img alt="versus" loading="lazy" width="35" height="50" decoding="async" data-nimg="1" style="color:transparent" srcSet="/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2FVersus.png&amp;w=48&amp;q=75 1x, /_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2FVersus.png&amp;w=96&amp;q=75 2x" src="/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2FVersus.png&amp;w=96&amp;q=75" />
//                                     </div>
//                                 </div>
//                             </div>
//                             <div class="relative bg-C20213F flex items-center justify-between px-20 w-full gap-18 pt-36 mb-18 mt-14 animate__animated animate__slideInUp">
//                                 <div class="absolute bg-C20213F rounded-full py-4 px-16 mb-4 top-[-6%] left-p35 button-shadow">
//                                     <p class="text-14 text-center text-CFFCC5B uppercase font-black">・Game Stats・</p>
//                                 </div>
//                                 <div class="flex flex-col gap-20 w-full pb-20">
//                                     <div class="shimmer-animation rounded-6 h-31 w-full"></div>
//                                     <div class="shimmer-animation rounded-6 h-31 w-full"></div>
//                                     <div class="shimmer-animation rounded-6 h-31 w-full"></div>
//                                 </div>
//                                 <div class="flex flex-col gap-20 self-baseline">
//                                     <div class="shimmer-animation rounded-6 h-32 w-32"></div>
//                                     <div class="shimmer-animation rounded-6 h-32 w-32"></div>
//                                     <div class="shimmer-animation rounded-6 h-32 w-32"></div>
//                                 </div>
//                                 <div class="flex flex-col gap-20 w-full pb-20">
//                                     <div class="shimmer-animation rounded-6 h-31 w-full"></div>
//                                     <div class="shimmer-animation rounded-6 h-31 w-full"></div>
//                                     <div class="shimmer-animation rounded-6 h-31 w-full"></div>
//                                 </div>
//                             </div>
//                             <div class="mx-30 mb-20">
//                                 <button class="inline-flex items-center justify-center whitespace-nowrap text-18 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary primary-button disabled:primary-button-disabled box-shadow text-primary-foreground hover:bg-primary/90 font-bold rounded-6 py-12 px-48 w-full uppercase shine-animation mb-14">PLAY AGAIN</button>
//                             </div>
//                             <template data-dgst="BAILOUT_TO_CLIENT_SIDE_RENDERING"></template>
//                             <div class="flex justify-center border-y border-y-C8789C3 py-8 bg-C0C0D26 displayad-wrapper">
//                                 <template id="B:2"></template>
//                                 <div style="width:300px;height:250px" class="style-module_shimmer_placeholder__OPdgP"></div>
//                             </div>
//                         </div>
//                         <div class="bg-skin-footer-dark footer-container" data-testid="footer-text">
//                             <div class="h-1 w-full bg-C404380"></div>
//                             <div class="px-20 py-12 text-10 font-medium flex justify-between items-center text-C8789C3 cursor-pointer">
//                                 <div class="mr-10 h-30 flex items-center gap-10">
//                                     <img alt="Quizzop" fetchPriority="high" width="100" height="21" decoding="async" data-nimg="1" style="color:transparent" src="https://static.quizzop.com/newton/assets/quizzop-logo-dark.svg" />
//                                     <p class="text-C8789C3 flex items-center">
//                                         <span class="text-18 mx-10 text-C262749">|</span>
//                                         <span class="text-12">Terms, Privacy, &amp;other links</span>
//                                     </p>
//                                 </div>
//                                 <div class="transform rotate-0">
//                                     <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" class="fill-current text-C8789C3">
//                                         <path d="M10.8461 13.827L15.6741 9C15.7849 8.88852 15.8471 8.7377 15.8471 8.5805C15.8471 8.4233 15.7849 8.27248 15.6741 8.161L15.3191 7.805C15.2077 7.69392 15.0569 7.63154 14.8996 7.63154C14.7423 7.63154 14.5914 7.69392 14.4801 7.805L10.4251 11.859L6.36707 7.8C6.25559 7.68917 6.10477 7.62695 5.94757 7.62695C5.79037 7.62695 5.63955 7.68917 5.52807 7.8L5.17207 8.156C5.06124 8.26748 4.99902 8.4183 4.99902 8.5755C4.99902 8.7327 5.06124 8.88352 5.17207 8.995L10.0041 13.827C10.1163 13.9375 10.2675 13.9995 10.4251 13.9995C10.5826 13.9995 10.7338 13.9375 10.8461 13.827Z"></path>
//                                     </svg>
//                                 </div>
//                             </div>
//                             <div class="hidden">
//                                 <div class="mb-12 h-1 mx-auto bg-gradient-to-r from-C40438000 via-C404380 to-C40438000"></div>
//                                 <div>
//                                     <div class="transition px-20 flex gap-x-20 text-12 flex-wrap mx-auto w-250 justify-center">
//                                         <a target="_blank" class="mb-20 text-12 text-CFFFFFF underline" href="https://static.quizzop.com/legal/terms-of-use/?utm_source=qzp_footer">Terms of Use</a>
//                                         <a target="_blank" class="mb-20 text-12 text-CFFFFFF underline" href="https://static.quizzop.com/legal/privacy/?utm_source=qzp_footer">Privacy Policy</a>
//                                         <a target="_blank" class="mb-20 text-12 text-CFFFFFF underline" href="https://business.gamezop.com/about-us?utm_source=qzp_footer">About</a>
//                                         <a target="_blank" class="mb-20 text-12 text-CFFFFFF underline" href="https://careers.gamezop.com/?utm_source=qzp_footer">Jobs</a>
//                                         <a target="_blank" class="mb-20 text-12 text-CFFFFFF underline" href="https://business.gamezop.com/?utm_source=qzp_footer">Partner With Us</a>
//                                     </div>
//                                     <div class="text-center text-10 pb-20 text-C8789C3 mx-auto w-3/4 sm:w-p60">© 2025 Advergame Technologies Pvt. Ltd. ("ATPL"). Gamezop ® & Quizzop ® are registered trademarks of ATPL.</div>
//                                 </div>
//                             </div>
//                             <div class="hidden">
//                                 <div class="h-1 w-full bg-C404380"></div>
//                                 <div class="px-20 pb-20 text-10 text-C8789C3 footer-about-text">
//                                     <div style="margin-top:20px;">
//                                         <p>Quizzop is a plug-and-play quizzing platform that any app or website can integrate to bring trivia for its users. Quizzop is affiliated with Gamezop, a gaming platform, that digital products can add as a gaming section. </p>
//                                     </div>
//                                     <div style="margin-top:20px;">
//                                         <p>Over 5,000 products from more than 70 countries have integrated Quizzop and Gamezop. These include Amazon, Samsung Internet, Snap, Tata Play, AccuWeather, Paytm, Gulf News, and Branch. Trivia and games increase user engagement significantly within all kinds of apps and websites, besides opening a new stream of advertising revenue. Gamezop and Quizzop take 30 minutes to integrate and can be used for free: both by the products integrating them and end users.</p>
//                                     </div>
//                                     <div style="margin-top:20px;"></div>
//                                     <div style="margin-top:20px;">
//                                         <p>
//                                             Increase ad revenue and engagement on your app / website with games, quizzes, astrology, and cricket content. Visit: <a href="https://business.gamezop.com">business.gamezop.com</a>
//                                         </p>
//                                     </div>
//                                 </div>
//                                 <div class="h-1 w-full bg-C404380"></div>
//                                 <p data-nosnippet="true" class="px-20 py-20 text-10 text-left text-C8789C3">Property ID:
//                                     4239</p>
//                             </div>
//                         </div>
//                     </main>
//                 </div>
//             </div>

//             <div hidden id="S:0"></div>
//             <div hidden id="S:2">
//                 <div class="style-module_gam_container__9KUaZ" style="min-height:250px;width:300px">
//                     <div class="text-10 font-medium text-center uppercase text-C6063AF pb-8">Advertisement</div>
//                     <div style="min-height:250px;width:300px" class="style-module_gam_ad__AjmDM">
//                         <div id="quizzopBattlesEndQuiz" style="min-height:250px;width:300px" class="style-module_gam_inner_ad__gg6Nt style-module_ad_loader__vmANM"></div>
//                     </div>
//                 </div>
//             </div>

//             <div hidden id="S:1">
//                 <div class="flex items-center">
//                     <a class="link-anchor" href="/order-history">
//                         <div data-testid="top-bar-coin-balance" class="flex flex-row justify-center items-center border px-8 rounded-6 bg-C191A32 cursor-pointer border-C191A32">
//                             <span class="h-14">
//                                 <img alt="coin" src="https://static.quizzop.com/newton/assets/coin.png" style="width:14px; height:14px; display:inline-block; margin-bottom:2px;" />
//                             </span>
//                             <span class="ml-8 uppercase">
//                                 <div class="text-10 relative top-2 font-medium text-C6063AF">Coins</div>
//                                 <div class="text-12 font-black text-CFFFFFF">3,950</div>
//                             </span>
//                         </div>
//                     </a>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default QuizBattles

import React from 'react';

const QuizBattlesEndQuiz = () => {
    return (
        <div className="hide-scroll-bar">
            <div className="style_background__W3FcZ">
                <div className="style_foreground__jJqg2 hide-scroll-bar" id="shell">
                    <main>
                        <header className="h-60 fixed z-99 max-w-maxW top-0 w-full duration-350 bg-C26284C !mt-0">
                            <div className="flex flex-row justify-between items-center h-full px-20">
                                <div className="flex items-center justify-center text-14 text-CFAFAFA font-bold">
                                    <div data-testid="top-back-nav-button" className="py-14 pr-4 flex justify-center cursor-pointer">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-current text-C676767 dark:text-CBBBDDD">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M6.11977 11.9416L12.4675 5.59392C12.6081 5.45327 12.6871 5.2625 12.6871 5.06359C12.6871 4.86468 12.6081 4.67391 12.4675 4.53326C12.3268 4.39261 12.136 4.31359 11.9371 4.31359C11.7382 4.31359 11.5475 4.39261 11.4068 4.53326L4.52948 11.4106C4.38926 11.5512 4.31052 11.7416 4.31052 11.9402C4.31052 12.1388 4.38926 12.3292 4.52948 12.4698L11.4068 19.3471C11.5475 19.4878 11.7382 19.5668 11.9371 19.5668C12.136 19.5668 12.3268 19.4878 12.4675 19.3471C12.6081 19.2065 12.6871 19.0157 12.6871 18.8168C12.6871 18.6179 12.6081 18.4271 12.4675 18.2865L6.11977 11.9416Z"></path>
                                        </svg>
                                    </div>
                                    Quiz Battles
                                </div>
                                <div className="flex items-center">
                                    <a className="link-anchor" href="/order-history">
                                        <div data-testid="top-bar-coin-balance" className="flex flex-row justify-center items-center border px-8 rounded-6 bg-C191A32 cursor-pointer border-C191A32">
                                            <span className="h-14">
                                                <img alt="coin" src="https://static.quizzop.com/newton/assets/coin.png" style={{ width: '14px', height: '14px', display: 'inline-block', marginBottom: '2px' }} />
                                            </span>
                                            <span className="ml-8 uppercase">
                                                <div className="text-10 relative top-2 font-medium text-C6063AF">Coins</div>
                                                <div className="text-12 font-black text-CFFFFFF">3,950</div>
                                            </span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </header>

                        <div className="mb-14">
                            <div className="px-20 font-black mt-24 flex flex-col items-center justify-center text-CE63737">
                                <p className="text-[18px] mb-4 text-C8789C3 uppercase font-bold">Brain Teasers</p>
                                <p className="text-10 text-C8789C3">Calculating Result...</p>
                            </div>

                            <div className="flex flex-col item-center justify-center">
                                <div className="mt-14 px-20 w-full flex items-center justify-between">
                                    <div className="flex flex-col mb-10">
                                        <div className="relative">
                                            <div className="relative flex items-center justify-center mb-10 opacity-60">
                                                <img
                                                    alt="player image"
                                                    loading="lazy"
                                                    width="80"
                                                    height="80"
                                                    decoding="async"
                                                    className="rounded-[50%]"
                                                    style={{ color: 'transparent' }}
                                                    src="https://www.quizzop.com/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2Fbattles%2Fplayer-0.png&w=96&q=75"
                                                />
                                                <div className="absolute loader z-10"></div>
                                                <div id="emoji-animation" className="relative"></div>
                                            </div>
                                        </div>
                                        <p className="text-center text-14 text-CFFCC5B">
                                            You
                                            <br />
                                            <span className="font-bold">-- / 0</span>
                                        </p>
                                    </div>

                                    <div>
                                        <img
                                            alt="versus"
                                            loading="lazy"
                                            width="35"
                                            height="50"
                                            decoding="async"
                                            style={{ color: 'transparent' }}
                                            src="http://quizzop.com/_next/image?url=https%3A%2F%2Fstatic.quizzop.com%2Fnewton%2Fassets%2FVersus.png&w=48&q=75"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="relative bg-C20213F flex items-center justify-between px-20 w-full gap-18 pt-36 mb-18 mt-14 animate__animated animate__slideInUp">
                                <div className="absolute bg-C20213F rounded-full py-4 px-16 mb-4 top-[-6%] left-p35 button-shadow">
                                    <p className="text-14 text-center text-CFFCC5B uppercase font-black">・Game Stats・</p>
                                </div>
                                <div className="flex flex-col gap-20 w-full pb-20">
                                    <div className="shimmer-animation rounded-6 h-31 w-full"></div>
                                    <div className="shimmer-animation rounded-6 h-31 w-full"></div>
                                    <div className="shimmer-animation rounded-6 h-31 w-full"></div>
                                </div>
                                <div className="flex flex-col gap-20 self-baseline">
                                    <div className="shimmer-animation rounded-6 h-32 w-32"></div>
                                    <div className="shimmer-animation rounded-6 h-32 w-32"></div>
                                    <div className="shimmer-animation rounded-6 h-32 w-32"></div>
                                </div>
                                <div className="flex flex-col gap-20 w-full pb-20">
                                    <div className="shimmer-animation rounded-6 h-31 w-full"></div>
                                    <div className="shimmer-animation rounded-6 h-31 w-full"></div>
                                    <div className="shimmer-animation rounded-6 h-31 w-full"></div>
                                </div>
                            </div>

                            <div className="mx-30 mb-20">
                                <button className="inline-flex items-center justify-center whitespace-nowrap text-18 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary primary-button disabled:primary-button-disabled box-shadow text-primary-foreground hover:bg-primary/90 font-bold rounded-6 py-12 px-48 w-full uppercase shine-animation mb-14">
                                    PLAY AGAIN
                                </button>
                            </div>

                            <div className="flex justify-center border-y border-y-C8789C3 py-8 bg-C0C0D26 displayad-wrapper">
                                <div className="style-module_gam_container__9KUaZ" style={{ minHeight: '250px', width: '300px' }}>
                                    <div className="text-10 font-medium text-center uppercase text-C6063AF pb-8">Advertisement</div>
                                    <div style={{ minHeight: '250px', width: '300px' }} className="style-module_gam_ad__AjmDM">
                                        <div id="quizzopBattlesEndQuiz" style={{ minHeight: '250px', width: '300px' }} className="style-module_gam_inner_ad__gg6Nt style-module_ad_loader__vmANM"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default QuizBattlesEndQuiz;