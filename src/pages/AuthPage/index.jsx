import React from 'react';
import logo from '../../assets/images/quizzop-logo-dark.svg';
import { NavLink } from 'react-router-dom';
import GoogleSignIn from './GoogleSignIn/index';

const AuthPage = () => {

  return (
    <main className="jsx-3226730067 __variable_d4952a font-sans">
      <div className="flex justify-center">
        <div
          className="max-w-[500px] w-full h-dynamic-screen relative overflow-x-hidden overflow-ellipsis bg-CFFFFFF dark:bg-C191A32 hide-scroll-bar border-x-4 border-C282A4F"
          id="shell"
        >
          <div className="h-dynamic-screen overflow">
            <div className="text-center">
              <div className="my-30 flex justify-center">
                <img
                  alt="Quizzop"
                  width="100"
                  height="21"
                  src={logo}
                />
              </div>
              <div className="mx-20 py-24 px-20 bg-C20213F rounded-10">
                <div className="font-black text-18 dark:text-CFAFAFA">
                  Sign in to Quizzop👋
                </div>
                <div className="mt-4 text-12 text-C676767 dark:text-C8789C3">
                  Grow your knowledge with Quizzop's quizzes
                </div>

                {/* --- Google Sign-In Button --- */}
                <GoogleSignIn />

                {/* --- OR Divider --- */}
                <div className="uppercase text-C676767 dark:text-CFAFAFA font-bold text-14 mt-24">
                  OR
                </div>

                {/* --- Phone Sign-In Button --- */}
                <div className='mt-16'>
                  <NavLink
                    to="/login/phone"
                    data-testid="login-number-button"
                    className="text-C2C2C2C dark:text-CFAFAFA font-medium text-16 cursor-pointer"
                  >
                    Sign in with Phone number
                  </NavLink>
                </div>
              </div>

              {/* --- Terms & Privacy --- */}
              <div className="my-40 w-3/5 h-1 mx-auto bg-gradient-to-r from-CFFFFFF via-CE0E0E0 to-CFFFFFF dark:from-C40438000 dark:via-C404380 dark:to-C40438000"></div>
              <div className="px-20">
                <p className="leading-normal text-12 text-C959595 mb-16 dark:text-C8789C3">
                  By signing in, you agree to our{' '}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-C959595 dark:text-C8789C3 font-bold"
                    href="https://static.quizzop.com/legal/terms-of-use/?utm_source=login"
                  >
                    Terms of Use
                  </a>
                  ,{' '}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-C959595 dark:text-C8789C3 font-bold"
                    href="https://static.quizzop.com/legal/privacy/?utm_source=login"
                  >
                    Privacy Policy
                  </a>
                  , and that you are above 18 years of age.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthPage;
