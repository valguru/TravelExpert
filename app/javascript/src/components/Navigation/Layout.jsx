import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from '../';
import './layout.scss';

const layoutStyles = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
};

const mainStyles = {
  flex: '1',
  display: 'flex',
  overflowY: 'auto',
};

const Layout = () => {
  return (
    <div className="layout">
      <Header />

      <main className="main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
