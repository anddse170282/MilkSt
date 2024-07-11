import React, { useState, useEffect } from "react";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import '../css/login.css';
import { getUserByFilter } from '../api/userService';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [otp, setOtp] = useState("");
    const [ph, setPh] = useState("");
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [termsAgreed, setTermsAgreed] = useState(false);
    const [step, setStep] = useState(1);
    const [isOtpValid, setIsOtpValid] = useState(false);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    async function checkPhoneExist(phone) {
        try {
            const response = await getUserByFilter(phone);
            if (response && response.length > 0) {
                toast.success("👍 Login Success");
                navigate('/');
            } else {
                toast.success("👍 Registering new user");
                navigate(`/customerform?phone=${phone}`);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    useEffect(() => {
        setIsOtpValid(otp.length === 6);
    }, [otp]);

    function onCaptchVerify() {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                "recaptcha-container",
                {
                    size: "invisible",
                    callback: () => {
                        onSignup();
                    },
                    "expired-callback": () => { },
                },
                auth
            );
        }
    }

    function onSignup() {
        setLoading(true);
        onCaptchVerify();

        const appVerifier = window.recaptchaVerifier;
        const formatPh = "+" + ph;

        signInWithPhoneNumber(auth, formatPh, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setLoading(false);
                setStep(2);
                toast.success("OTP sent successfully!");
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                toast.error("Gửi mã OTP thất bại. Vui lòng thử lại.");
            });
    }

    function onOTPVerify() {
        setLoading(true);
        window.confirmationResult
            .confirm(otp)
            .then(async (res) => {
                setUser(res.user);
                setLoading(false);
                checkPhoneExist(ph); // Call checkPhoneExist after successful OTP verification
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                toast.error("Sai mã OTP. Vui lòng thử lại.");
            });
    }

    const phoneValid = ph.length > 0 && /^\+\d{1,3}\d{10}$/.test("+" + ph);
    const canSubmit = phoneValid && termsAgreed;

    return (
        <div className="login-body">
            <section className="login-section">
                <div className="login-row">
                    <div className="logoLogin">
                        <header>
                            <a href="\">
                                <img src="https://firebasestorage.googleapis.com/v0/b/imageuploadv3.appspot.com/o/Logo%20Footer%2Fdep2.png?alt=media&token=08b080e1-c883-4c89-ba4f-76f8f0a57b00" width="150" height="150" alt="Logo" />
                            </a>
                        </header>
                    </div>
                    <div>
                        <Toaster toastOptions={{ duration: 4000 }} />
                        <div id="recaptcha-container"></div>
                        {step === 1 ? (
                            <div className="w-1 flex flex-col gap-4 rounded-lg p-4 bg-white">
                                <h1 className="text-center leading-normal text-black font-medium text-3xl mb-6">
                                    Hana Store
                                </h1>
                                <h1 className="text-center leading-normal text-black font-medium text-3x3 mb-1">
                                    Đăng nhập hoặc Đăng ký ngay tài khoản
                                </h1>
                                <PhoneInput
                                    country={"vn"}
                                    value={ph || "+84"}
                                    onChange={setPh}
                                    containerClass="phone-input-custom"
                                />
                                <div className="terms-container">
                                    <input
                                        style={{ marginBottom: '45px' }}
                                        type="checkbox"
                                        id="terms-of-service"
                                        name="terms-of-service"
                                        checked={termsAgreed}
                                        onChange={(e) => setTermsAgreed(e.target.checked)}

                                    />
                                    <label htmlFor="terms-of-service">
                                        Bằng cách nhấp vào Send Code, bạn đồng ý với <a href="#">Điều khoản dịch vụ</a> và <a href="#">Chính sách quyền riêng tư</a> của chúng tôi.
                                    </label>
                                </div>
                                <button
                                    onClick={onSignup}
                                    className={`btn-custom ${canSubmit ? 'accepted' : ''}`}
                                    disabled={!canSubmit}
                                >
                                    {loading && <CgSpinner size={20} className="loading-icon mt-1 animate-spin" />}
                                    <span>Send code via SMS</span>
                                </button>
                            </div>
                        ) : step === 2 ? (
                            <div className="w-2 flex flex-col gap-4 rounded-lg p-4 bg-white">
                                <label htmlFor="otp" className="font-bold text-xl text-dark text-center">
                                    Hãy nhập mã OTP đã được gửi qua tin nhắn
                                    <br />
                                </label>
                                <OtpInput
                                    value={otp}
                                    onChange={setOtp}
                                    OTPLength={6}
                                    otpType="number"
                                    disabled={false}
                                    autoFocus
                                    className="otp-input-custom"
                                />
                                <button
                                    onClick={onOTPVerify}
                                    className={`btn-custom ${isOtpValid ? 'accepted' : ''}`}
                                    disabled={!isOtpValid}
                                >
                                    {loading && <CgSpinner size={20} className="loading-icon mt-1 animate-spin" />}
                                    <span>Xác Nhận OTP</span>
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
