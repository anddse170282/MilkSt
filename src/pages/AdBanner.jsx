import React, { useState } from 'react';
import '../css/adBanner.css'; // Đảm bảo bạn đã tạo file CSS này

const AdBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = (event) => {
    event.stopPropagation();
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="ad-banner" onClick={() => console.log('Ad clicked')}>
      <img
        className="close-button"
        src="https://cdn1.concung.com/themes/desktop4.1/image/icon/close.svg"
        alt="Close"
        onClick={handleClose}
      />
      <a
        title="Weekly ICON 22.07"
        href="http://localhost:5173/search-page?milkTypeId=2#"
        onClick={() => console.log('Ad link clicked')}
      >
        <img
          className="ad-image"
          src="https://firebasestorage.googleapis.com/v0/b/imageuploadv3.appspot.com/o/QuangCaoImage%2FadQuangCao.png?alt=media&token=5ac8e818-64b4-4d28-afde-48c9e78cad42"
          alt="Weekly ICON 22.07 19393"
        />
      </a>
    </div>
  );
};

export default AdBanner;
