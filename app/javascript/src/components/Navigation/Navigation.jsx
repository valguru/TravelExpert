import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks';
import { Home, About, Login, Profile } from '../../pages';
import { PATH_HOME, PATH_ABOUT, PATH_LOGIN, PATH_PROFILE } from './routes';
import Layout from './Layout';

const Navigation = () => {
  const user = useAuthContext().user;

  const AuthRoutes = (
    <Routes>
      <Route path={PATH_HOME} element={<Layout />}>
        <Route index={true} element={<Home />} />
        <Route path={PATH_ABOUT} element={<About />} />
        <Route path={PATH_PROFILE} element={<Profile />} />
      </Route>
      <Route path='*' element={<Navigate to={PATH_HOME} replace />} />
    </Routes>
  );

  const PublicRoutes = (
    <Routes>
      <Route path={PATH_LOGIN} element={<Layout />}>
        <Route index={true} element={<Login />} />
      </Route>
      <Route path='*' element={<Navigate to={PATH_LOGIN} replace />} />
    </Routes>
  );

  return user ? AuthRoutes : PublicRoutes;
};

export { Navigation };
