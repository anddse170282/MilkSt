import React, { useState, useEffect } from 'react';
import './Header.css'; // Tạo file này cho CSS cụ thể của header
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [string, setString] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập khi component được mount
    const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    if (loggedIn) {
      const storedUser = JSON.parse(sessionStorage.getItem('user'));
      setUser(storedUser);
    }
  }, []);

  const handleLoginClick = () => {
    sessionStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
    navigate("/login");
  };

  const handleLogoutClick = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('user');
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    setUser(null);
    navigate("/");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSubmitClick = (event) => {
    event.preventDefault();
    const encodedString = encodeURIComponent(string);
    navigate(`/search-page?search=${encodedString}`);
  };
  const handleMilkTypeClick = (milkTypeId) => {
    navigate(`/search-page?milkTypeId=${milkTypeId}`);
  };
  return (
    <header className="header">
      <div className="logo-container">
        <a href="/">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/imageuploadv3.appspot.com/o/Logo%20Footer%2Fdep2.png?alt=media&token=08b080e1-c883-4c89-ba4f-76f8f0a57b00"
            width="150"
            height="150"
            alt="Logo"
          />
        </a>
      </div>
      <div className="header-content">
        <div className="contact-info">
          <div className="phone">
            <span>
              Mua hàng và CSKH: <span className="phone-color">0986777514</span>
            </span>
          </div>
          <div className="cam-on">
            <span>Cảm ơn ba mẹ đã tin dùng HanaStore</span>
          </div>
          <div className="email">
            <span>
              Email: <span className="email-color">nhanltse170178@fpt.edu.vn</span>
            </span>
          </div>
          <div className="dropdown">
            {isLoggedIn ? (
              <>
                <img src={user?.profilePicture} width="25" height="25" className="avatar" onClick={toggleDropdown} />
                <span>{user?.userName}</span>
                {isDropdownOpen && (
                  <div className="dropdown-content">
                    <a href="/userInformation">Tài Khoản Của Tôi</a>
                    <a href="#" onClick={handleLogoutClick}>
                      Đăng Xuất
                    </a>
                  </div>
                )}
              </>
            ) : (
              <button onClick={handleLoginClick}>Đăng Nhập</button>
            )}
          </div>
        </div>
        <div className="header-content-row2">
          <div className="search-bar-container">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              name="string"
              value={string}
              onChange={(e) => setString(e.target.value)}
            />
            <button type="submit" onClick={handleSubmitClick}>
              <i className="bi-search icon-small"></i>
            </button>
          </div>
          <div className="user-cart-container">
            <a href="/cart">
              <i className="bi bi-cart icon-small"></i>
            </a>
          </div>
          <div className="notification-container2">
            <a href="/orderhistory">
              <svg xmlns="http://www.w3.org/2000/svg" width="35px" height="35px" viewBox="0 0 24 24" fill="none">
                <path d="M12 8V12L14.5 14.5" stroke="#989898" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M5.60423 5.60423L5.0739 5.0739V5.0739L5.60423 5.60423ZM4.33785 6.87061L3.58786 6.87438C3.58992 7.28564 3.92281 7.61853 4.33408 7.6206L4.33785 6.87061ZM6.87963 7.63339C7.29384 7.63547 7.63131 7.30138 7.63339 6.88717C7.63547 6.47296 7.30138 6.13549 6.88717 6.13341L6.87963 7.63339ZM5.07505 4.32129C5.07296 3.90708 4.7355 3.57298 4.32129 3.57506C3.90708 3.57715 3.57298 3.91462 3.57507 4.32882L5.07505 4.32129ZM3.75 12C3.75 11.5858 3.41421 11.25 3 11.25C2.58579 11.25 2.25 11.5858 2.25 12H3.75ZM16.8755 20.4452C17.2341 20.2378 17.3566 19.779 17.1492 19.4204C16.9418 19.0619 16.483 18.9393 16.1245 19.1468L16.8755 20.4452ZM19.1468 16.1245C18.9393 16.483 19.0619 16.9418 19.4204 17.1492C19.779 17.3566 20.2378 17.2341 20.4452 16.8755L19.1468 16.1245ZM5.14033 5.07126C4.84598 5.36269 4.84361 5.83756 5.13505 6.13191C5.42648 6.42626 5.90134 6.42862 6.19569 6.13719L5.14033 5.07126ZM18.8623 5.13786C15.0421 1.31766 8.86882 1.27898 5.0739 5.0739L6.13456 6.13456C9.33366 2.93545 14.5572 2.95404 17.8017 6.19852L18.8623 5.13786ZM5.0739 5.0739L3.80752 6.34028L4.86818 7.40094L6.13456 6.13456L5.0739 5.0739ZM4.33408 7.6206L6.87963 7.63339L6.88717 6.13341L4.34162 6.12062L4.33408 7.6206ZM5.08784 6.86684L5.07505 4.32129L3.57507 4.32882L3.58786 6.87438L5.08784 6.86684ZM12 3.75C16.5563 3.75 20.25 7.44365 20.25 12H21.75C21.75 6.61522 17.3848 2.25 12 2.25V3.75ZM12 20.25C7.44365 20.25 3.75 16.5563 3.75 12H2.25C2.25 17.3848 6.61522 21.75 12 21.75V20.25ZM16.1245 19.1468C14.9118 19.8483 13.5039 20.25 12 20.25V21.75C13.7747 21.75 15.4407 21.2752 16.8755 20.4452L16.1245 19.1468ZM20.25 12C20.25 13.5039 19.8483 14.9118 19.1468 16.1245L20.4452 16.8755C21.2752 15.4407 21.75 13.7747 21.75 12H20.25ZM6.19569 6.13719C7.68707 4.66059 9.73646 3.75 12 3.75V2.25C9.32542 2.25 6.90113 3.32791 5.14033 5.07126L6.19569 6.13719Z" fill="#989898" />
              </svg>
            </a>
          </div>
        </div>
        <nav className="navigation-menu">
          <ul>
            <li>
              <a href="/">Trang chủ</a>
            </li>
            <li>
              <a href="#" onClick={() => handleMilkTypeClick(1)}>Sữa bột</a>
            </li>
            <li>
              <a href="#" onClick={() => handleMilkTypeClick(2)}>Sữa tươi</a>
            </li>
            <li>
              <a href="#" onClick={() => handleMilkTypeClick(3)}>Sữa chua</a>
            </li>
            <li>
              <a href="/">Sữa hạt dinh dưỡng</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
