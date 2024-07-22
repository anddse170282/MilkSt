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
          src="https://cdn1.concung.com/img/adds/2024/03/1710145892-ICON(1).png"
          alt="Weekly ICON 22.07 19393"
        />
      </a>
    </div>
  );
};

export default AdBanner;
