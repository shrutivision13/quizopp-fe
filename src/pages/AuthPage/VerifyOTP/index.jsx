import React, { useState, useRef, useEffect } from 'react';
import { ApiResendOTP, ApiVerifyOtp } from '../../../api-wrapper/Auth/ApiRegisterWithPhone'; // Adjust the import path as necessary
import useCookie from '../../../hooks/useCookie';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../../api-wrapper/categories/ApiCategories';

const VerifyOTP = ({ phoneNumber, onChangeNumber }) => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
    const [showResendButton, setShowResendButton] = useState(false);
    const [timer, setTimer] = useState(20);
    const authToken = getCookie("authToken");
    const inputRefs = useRef([]);
    const { setCookie } = useCookie();
    const navigate = useNavigate();

    const handleChange = (e, index) => {
        const value = e.target.value.replace(/\D/, '')

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 3) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const newOtp = [...otp];
            newOtp[index - 1] = '';
            setOtp(newOtp);
            inputRefs.current[index - 1].focus();
        }
    };

    useEffect(() => {
        setIsSubmitEnabled(otp.every(d => d !== ''));
    }, [otp]);

    useEffect(() => {
        if (timer <= 0) {
            setShowResendButton(true);
            return;
        }
        const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const handleSubmit = () => {
        const enteredOtp = otp.join('');
        const payload = {
            phoneNumber,
            otp: enteredOtp,
        };

        ApiVerifyOtp(authToken, payload)
            .then((response) => {
                if (response?.isSuccess) {
                    setCookie('authToken', response.data.authToken);
                    navigate('/');
                } else {
                    toast.error(response?.message, {
                        className: "custom-error-toast",
                        bodyClassName: "custom-error-toast-body",
                        closeButton: false,
                        progress: undefined,
                    });
                    console.error('Failed to verify OTP:', response?.message);
                }
            })
            .catch((error) => {
                console.error('Error during OTP verification:', error);
            });
    };

    const handleResend = () => {
        setOtp(['', '', '', '']);
        setTimer(20);
        setShowResendButton(false);
        inputRefs.current[0].focus();

        const payload = { phoneNumber };

        ApiResendOTP(payload)
            .then((response) => {
                if (response?.isSuccess) {
                    console.log('OTP resent successfully:', response?.data);
                } else {
                    console.error('Failed to resend OTP:', response?.message);
                }
            })
            .catch((error) => {
                console.error('Error during OTP resend:', error);
            });
    };


    return (
        <div className="flex flex-col h-dynamic-screen flex flex-col justify-between pb-20">
            <div className="px-30 text-center flex-1">
                <div className="mt-80 text-18 font-black dark:text-CFFFFFF">Enter OTP</div>
                <div className="flex items-center justify-center mt-4 text-12">
                    <div className="text-C676767 dark:text-C8789C3">Sent on {phoneNumber}</div>
                    <div className="px-6 text-C676767 font-bold">·</div>
                    <div className="font-bold text-C3E51B5 cursor-pointer dark:text-CFFCC5B" onClick={onChangeNumber}>Change Number</div>
                </div>
                <div data-testid="phone-login-otp-input" className="mt-30 flex justify-between relative">
                    {otp.map((digit, i) => (
                        <input
                            key={i}
                            autoComplete="off"
                            type="tel"
                            id={`otpInput${i}`}
                            className="bg-CFAFAFA border-CE0E0E0 h-50 w-50 border rounded-5 text-18 font-medium text-center outline-none focus:border-C3957EA dark:border-C404380 dark:bg-C20213F dark:text-CFFFFFF"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(e, i)}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                            ref={el => (inputRefs.current[i] = el)}
                        />
                    ))}
                </div>
                <button
                    data-testid="phone-login-otp-button-inactive"
                    disabled={!isSubmitEnabled}
                    onClick={handleSubmit}
                    className={`py-12 text-center inline-block uppercase font-bold text-16 text-CFFFFFF rounded-5 bg-C0DB25B primary-button px-36 w-full mt-36 cursor-pointer flex items-center flex-col select-none ${isSubmitEnabled ? 'opacity-100' : 'opacity-70'
                        }`}
                >
                    Submit OTP
                </button>
                <div className="mt-20 text-center text-C2C2C2C dark:text-CFFFFFF text-12 uppercase">
                    {showResendButton ? (
                        <span
                            className="cursor-pointer font-bold"
                            onClick={handleResend}
                            data-testid="phone-login-otp-resend-button"
                        >
                            Resend OTP
                        </span>
                    ) : (
                        <span data-testid="phone-login-otp-resend-timer">
                            Resend OTP in {timer} seconds
                        </span>
                    )}
                </div>
            </div>
            <div className="w-screen text-center max-w-maxW">
                <div className="text-14 font-bold mb-8 mt-28 dark:text-CFFCC5B">
                    Complete sign up & start winning coins
                </div>
                <div className="flex justify-center">
                    <img
                        alt="treasure"
                        loading="lazy"
                        width={131}
                        height={120}
                        decoding="async"
                        src="https://static.quizzop.com/newton/assets/treasure.svg"
                        style={{ color: 'transparent' }}
                    />
                </div>
            </div>
        </div>

    );
};

export default VerifyOTP;
