import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';

const Layout = ({ children }) => {
  const location = useLocation();
  const noHeaderRoutes = ['/login']; // Add paths that do not require header

  const shouldRenderHeader = !noHeaderRoutes.includes(location.pathname);

  return (
    <>
      {shouldRenderHeader && <Header />}
      {children}
      <Footer />
    </>
  );
};

export default Layout;
