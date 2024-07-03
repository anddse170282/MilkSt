// src/components/Footer.jsx
import React from 'react';
import './Footer.css'; // Create this file for the specific CSS of the footer

const Footer = () => {
  return (
    <footer>
     <div className="footer-top">
          <div className="container">
            <div className="footer-column">
              <h2>Về chúng tôi</h2>
              <p>Website hoạt động dưới sự cho phép của:</p>
              <p>Công ty TNHH Dịch Vụ Hana</p>
              <p>Địa chỉ : 120 Trần Hưng Đạo, P. 1, Q. 10, Tp. HCM</p>
              <p>Hana Store - NGƯỜI VIỆT SẢN PHẨM VIỆT</p>
              <p>Hotline: 0359475331</p>
              <p>Bán sỉ: 0819711117</p>
            </div>
            <div className="footer-column">
              <h2>Chấp nhận thanh toán</h2>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/imageuploadv3.appspot.com/o/Logo%20Footer%2Fmomo.png?alt=media&token=2dd2f91c-582c-4cf7-93b5-1026a1324667"
                width="23%"
                alt="Momo"
                style={{ paddingLeft: '73px' }}
              />
              <h2>Phương tiện vận chuyển</h2>
              <div className="flex-container">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/imageuploadv3.appspot.com/o/Logo%20Footer%2F65fddafcf36551945213fe85_After_kime.jpg?alt=media&token=60a23ba7-35c7-4c95-bc94-5e8c9763860c"
                  width="15%"
                  alt="GH TK"
                  style={{ paddingLeft: '23px' }}
                />
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/imageuploadv3.appspot.com/o/Logo%20Footer%2Fimagelogo3s.png?alt=media&token=a7ccdd8a-ff4d-4cee-afd9-008e2efb5249"
                  width="15%"
                  alt="Truck"
                />
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/imageuploadv3.appspot.com/o/Logo%20Footer%2Fvn-11134207-7r98o-lkw7rpgp10ila2_tn.jpg?alt=media&token=e9dc4fbc-059a-4cc3-814b-bbc1e2326589"
                  width="15%"
                  alt="Grab"
                />
              </div>
            </div>
            <div className="footer-column">
              <div className="flex-item">
                <i className="bi bi-house-heart" style={{ paddingRight: '19px' }}></i>
                <div>
                  <h2>Bán lẻ, sỉ và đa kênh bán</h2>
                  <p>Có bảng giá cho khách lẻ và khách sỉ riêng biệt đảm bảo quyền lợi cao nhất của khách hàng</p>
                </div>
              </div>
              <div className="flex-item">
                <i className="bi bi-hourglass" style={{ paddingRight: '19px' }}></i>
                <div>
                  <h2>Ship nhanh trong ngày TP.HCM</h2>
                  <p>Ship nhanh ngay đến khách hàng ở nội thành TP.HCM</p>
                </div>
              </div>
              <div className="flex-item">
                <i className="bi bi-rocket-takeoff-fill" style={{ paddingRight: '19px' }}></i>
                <div>
                  <h2>Bán lẻ, sỉ và đa kênh bán</h2>
                  <p>Có bảng giá cho khách lẻ và khách sỉ riêng biệt, đảm bảo quyền lợi cao nhất của khách hàng</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/imageuploadv3.appspot.com/o/Logo%20Footer%2Fdep2.png?alt=media&token=08b080e1-c883-4c89-ba4f-76f8f0a57b00"
            width="2%"
            alt="Logo"
          />
          <p>Copyright © 2024 HanaVN Store. Powered by Group 4</p>
        </div>
    </footer>
  );
};

export default Footer;
