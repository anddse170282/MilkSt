import React, { useState, useEffect } from 'react';
import './otp.css'; // Đảm bảo đường dẫn này chính xác

function OTPComponent() {
    const [otp, setOtp] = useState('');
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        const otpExpiryTime = new Date(new Date().getTime() + 15 * 60000); // 15 phút từ thời điểm hiện tại
        const interval = setInterval(() => {
            if (new Date() > otpExpiryTime) {
                alert('Mã OTP đã hết hạn. Bạn sẽ được chuyển về trang chủ.');
                setIsExpired(true);
            }
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (e) => {
        setOtp(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isExpired) {
            window.location.href = 'InputUserInformation.html'; // Thay đổi này để phù hợp với routing trong React
        }
    };

    return (
        <div className="login-container">
            <form id="login-form" onSubmit={handleSubmit}>
                <h2>OTP</h2>
                <p>Nhập mã otp tại đây</p>
                <div id="error-message" style={{ display: otp.length === 6 ? 'none' : 'block' }}>Vui lòng nhập mã otp</div>
                <input type="text" id="otp" name="otp" placeholder="Nhập mã otp" required pattern="\d{6}" title="vui lòng đúng mã otp" value={otp} onChange={handleChange} />
                <button type="submit" disabled={otp.length !== 6 || isExpired}>
                    Tiếp tục
                </button>
            </form>
        </div>
    );
}

export default OTPComponent;