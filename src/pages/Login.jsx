import React, { useState } from 'react';
import '../css/login.css'; 

function LoginComponent() {
    const [phone, setPhone] = useState('');
    const [termsAgreed, setTermsAgreed] = useState(false);

    const phoneValid = phone.length === 10 && /^\d{10}$/.test(phone);
    const canSubmit = phoneValid && termsAgreed;

    return (
        <div>
            <header className="header">
                <div className="logo-container">
                    <a href="HomePage.html"><img src="img/Hanalogo.jpg" width="150" height="150" alt="Logo" /></a>
                </div>
            </header>
            <form id="login-form" action="OTP.jsx" method="post">
                <h2>Đăng nhập</h2>
                <p>Đăng nhập hoặc Đăng ký ngay tài khoản</p>
                <div id="error-message" style={{ display: phoneValid ? 'none' : 'block' }}>
                    Vui lòng nhập đúng số điện thoại
                </div>
                <input type="text" id="phone" name="phone" placeholder="Nhập vào số điện thoại" required
                    value={phone} onChange={e => setPhone(e.target.value)} />
                <input type="checkbox" id="terms-of-service" name="terms-of-service"
                    checked={termsAgreed} onChange={e => setTermsAgreed(e.target.checked)} />
                <label htmlFor="terms-of-service">Bằng cách nhấp vào tiếp tục, bạn đồng ý với <a href="#">Điều khoản dịch vụ</a> và <a href="#">Chính sách quyền riêng tư</a> của chúng tôi.</label><br />
                <button type="submit" id="submit-btn" disabled={!canSubmit}>Tiếp tục</button>
            </form>
            <footer>
                <img className="center" src="https://firebasestorage.googleapis.com/v0/b/imageuploadv3.appspot.com/o/Footer%2FGroup%20832.png?alt=media&token=d4cc4101-d6c8-409f-84cd-d45dda9e712c" />
            </footer>
        </div>
    );
}

export default LoginComponent;