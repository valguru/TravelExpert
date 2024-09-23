import React, { Suspense } from 'react';
import { HashRouter } from 'react-router-dom';
import { Navigation } from './components';
import { AuthProvider } from './context';
import './index.scss';
import './config/i18n';

function Main() {
  return (
    <Suspense fallback=''>
      <AuthProvider>
        <HashRouter>
          <Navigation />
        </HashRouter>
      </AuthProvider>
    </Suspense>
  );
}

export { Main };
