// src/components/Footer.jsx
import React from 'react';
import './Footer.css'; // Create this file for the specific CSS of the footer
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


const Footer = () => {
  return (
    <footer>
      <div className="footer-top">
        <div className="container">
          <div className="footer-column col-md-4">
            <h2>Về chúng tôi</h2>
            <p>Website hoạt động dưới sự cho phép của:</p>
            <p>Công ty TNHH Dịch Vụ Hana</p>
            <p>Địa chỉ : 120 Trần Hưng Đạo, P. 1, Q. 10, Tp. HCM</p>
            <p>Hana Store - NGƯỜI VIỆT SẢN PHẨM VIỆT</p>
            <p>Hotline: 0359475331</p>
            <p>Bán sỉ: 0819711117</p>
          </div>
          <div className="col-md-4">
            <h2>Chấp nhận thanh toán</h2>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/imageuploadv3.appspot.com/o/Logo%20Footer%2Fmomo.png?alt=media&token=2dd2f91c-582c-4cf7-93b5-1026a1324667"
              width="30%"
              alt="Momo"
            />
            <h2 className='text'>Phương tiện vận chuyển</h2>
            <div className="flex-container">
              <div className='col-md-1'></div>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/imageuploadv3.appspot.com/o/Logo%20Footer%2F1.png?alt=media&token=771726e5-7189-4dad-ac24-ddf3efcd13ac"
                alt="GH TK"
                className='col-md-3'
              />
              <img
                src="https://firebasestorage.googleapis.com/v0/b/imageuploadv3.appspot.com/o/Logo%20Footer%2F2.png?alt=media&token=ddd5a417-ffa4-4339-9200-213d1bb33581"
                alt="Truck"
                className='col-md-3'
              />
              <img
                src="https://firebasestorage.googleapis.com/v0/b/imageuploadv3.appspot.com/o/Logo%20Footer%2F3.png?alt=media&token=93b8fa78-d152-4efa-b34a-73501bf87c99"
                alt="Grab"
                className='col-md-3'
              />
              <div className='col-md-1'></div>
            </div>
          </div>
          <div className="footer-column col-md-4">
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
