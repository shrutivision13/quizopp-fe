import React, { useState } from "react";
import PrimaryButton from "../../../components/Button/Button";
import VerifyOTP from "../VerifyOTP";
import { ApiRegisterWithPhone } from "../../../api-wrapper/Auth/ApiRegisterWithPhone"; // Adjust the import path as necessary
import useCookie from "../../../hooks/useCookie";

const PhoneLogin = () => {
  const [mobile, setMobile] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const { getCookie } = useCookie();
  const authToken = getCookie("authToken"); // Get the auth token from cookies

  const handleChange = (e) => setMobile(e.target.value);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
    setIsTouched(true);
  };

  const isValid = /^\+91[6-9]\d{9}$/.test(`+91${mobile}`);
  const showError = isTouched && !isValid;
  const labelFloating = isFocused || mobile.length > 0 || showError;

  const inputBorderClass = showError
    ? "border-CF85B6D"
    : isFocused
      ? "border-CFFCC5B"
      : "border-CC7C7C7 dark:border-C404380";

  const labelPositionClass = labelFloating
    ? "top-n14 text-12 left-0 text-C959595"
    : "top-8 text-16 left-36 text-CC7C7C7";

  const handleContinue = async () => {
    if (isValid) {
      ApiRegisterWithPhone("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MTRiNTgzMmNlYWU0MGVjNDVhNWNkNiIsImRldmljZUlkIjoiOGM3YWY4NGQtYTNkYi00ZDEzLWExMzYtMGYzZjcyYzJiMmVlIiwiaXNSZWdpc3RlciI6ZmFsc2UsImlhdCI6MTc0NjE4NzY1MSwiZXhwIjoxNzQ2NzkyNDUxfQ.Yfb_mHEbOyTyM9_1uo8N7b4CfplWArNE0TpXROwOqHg", { phoneNumber: `+91${mobile}` })
        .then((response) => {
          if (response?.isSuccess) {
            setShowOtpScreen(true);
          } else {
            console.error("Failed to register phone number:", response?.message);
          }
        })
        .catch((error) => {
          console.error("Error during phone registration:", error);
        });
    }
  };

  if (showOtpScreen) {
    return (
      <VerifyOTP
        phoneNumber={`+91${mobile}`}
        onChangeNumber={() => {
          setShowOtpScreen(false);
          setMobile("");
          setIsTouched(false);
        }}
      />
    );
  }

  return (
    <>
      <div>
        <div className="text-center">
          <div className="font-black text-18 mt-36 dark:text-CFFFFFF">
            Join Quizzop now! 👋
          </div>
          <div className="mt-4 text-12 text-C676767 dark:text-C8789C3">
            For users in India only
          </div>

          {/* Mobile Input Field */}
          <div
            data-testid="phone-login-number-input"
            className="my-60 mx-auto w-calc60 input"
          >
            <label
              htmlFor="mobileNumber"
              className={`border-b flex px-2 relative items-end cursor-text ${inputBorderClass}`}
            >
              <div className="font-medium text-16 pb-4 text-C959595 dark:text-CBAC8FF">
                +91
              </div>
              <input
                id="mobileNumber"
                type="tel"
                maxLength="10"
                value={mobile}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
                className="flex-1 ml-6 outline-none w-full text-24 font-medium dark:bg-C191A32 dark:text-CFFFFFF"
              />
              <div
                className={`absolute transition-all duration-350 pointer-events-none ${labelPositionClass} dark:text-C8789C3`}
              >
                Enter Mobile Number
              </div>
              {showError && (
                <div className="absolute text-CF85B6D top-36 py-2 font-medium">
                  Phone number must be in E.164 format, e.g., +918128141377
                </div>
              )}
            </label>
          </div>

          {/* Continue Button */}
          <PrimaryButton
            text="Continue"
            onClick={handleContinue}
            data-testid={
              isValid
                ? "phone-login-button-active"
                : "phone-login-button-inactive"
            }
            className={`w-calc60 m-auto max-w-360 py-12 text-center inline-block uppercase font-bold text-16 text-CFFFFFF rounded-5 bg-C0DB25B defaultButton px-36 cursor-pointer flex items-center flex-col select-none ${isTouched
                ? isValid
                  ? "opacity-100"
                  : "opacity-70"
                : isFocused
                  ? "opacity-70"
                  : "opacity-100"
              }`}
          />

          {/* Divider */}
          <div className="mt-40 w-3/5 h-1 mx-auto bg-gradient-to-r from-CFFFFFF via-CE0E0E0 to-CFFFFFF dark:from-C40438000 dark:via-C404380 dark:to-C40438000"></div>
        </div>

        {/* Benefits Section */}
        <div className="px-20 mt-30">
          <div className="text-18 font-black dark:text-CFFFFFF">
            Play Quiz and Win Coins!
          </div>
          <ul className="list-disc mt-10 text-14 px-16">
            {[
              "Play Quizzes in 25+ categories like GK, Sports, Bollywood, Business, Cricket & more!",
              "Compete with lakhs of other players!",
              "Win coins for every game",
              "Trusted by millions of other quiz enthusiasts like YOU!",
            ].map((benefit, idx) => (
              <li
                key={idx}
                className="leading-normal text-C959595 mb-16 dark:text-C8789C3"
              >
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default PhoneLogin;
