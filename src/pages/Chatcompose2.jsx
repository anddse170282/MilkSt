import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import '../css/chatcompose.css';

const Chatcompose = () => {
  useEffect(() => {
    const resizeChatcompose = () => {
      const chatcomposeIframe = document.querySelector('#chatcompose-container iframe');
      if (chatcomposeIframe) {
        chatcomposeIframe.style.width = '300px'; // Điều chỉnh chiều rộng theo ý muốn
        chatcomposeIframe.style.height = '500px'; // Điều chỉnh chiều cao theo ý muốn
      }
    };

    resizeChatcompose();
    window.addEventListener('resize', resizeChatcompose);

    return () => {
      window.removeEventListener('resize', resizeChatcompose);
    };
  }, []);

  return (
    <>
      <Helmet>
        <link
          href="https://trial.chatcompose.com/static/trial/all/global/export/css/main.5b1bd1fd.css"
          rel="stylesheet"
          className="chatcompose-css"
        />
        <script
          async
          type="text/javascript"
          src="https://trial.chatcompose.com/static/trial/all/global/export/js/main.a7059cb5.js?user=trial_DuongGia&lang=VI"
          user="trial_DuongGia"
          lang="VI"
          className="chatcompose-js"
        />
      </Helmet>
      <div
        id="chatcompose-container"
        className="chatcompose-container"
      >
        {/* Chatcompose content will be here */}
        <div className="khukyN">
          {/* Your chat content */}
        </div>
      </div>
    </>
  );
};

export default Chatcompose;
