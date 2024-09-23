import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Link } from 'react-router-dom';
import { PATH_ABOUT, PATH_HOME, PATH_PROFILE } from '../Navigation/routes';
import { useAuthContext } from '../../hooks';
import './header.scss';
import { TbLogout } from 'react-icons/tb';

const setActive = ({ isActive }) => (isActive ? "linkActive" : '');

const Header = () => {
  const authContext = useAuthContext();
  const { t, i18n } = useTranslation();

  return (
    <header className="header">
      <div className="mainInfo">
        <div className="title">
          <div className="logo"></div>
          <span>Travel<br/>Expert</span>
        </div>
        <div className="languageSwitch">
          <span className={i18n.language === 'ru' ? "active" : ''} onClick={() => i18n.changeLanguage('ru')}>
            RU
          </span>
          |
          <span className={i18n.language === 'en' ? "active" : ''} onClick={() => i18n.changeLanguage('en')}>
            EN
          </span>
        </div>
      </div>

      {authContext.user && (
        <>
          <nav className="nav">
            <ul>
              <li>
                <NavLink to={PATH_HOME} className={setActive}>
                  {t('header.home')}
                </NavLink>
              </li>
              <li>
                <NavLink to={PATH_ABOUT} className={setActive}>
                  {t('header.about')}
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="userInfo">
            <Link to={PATH_PROFILE}>
              <img src={authContext.avatar ?? '../../assets/user.png'} />
              <span>{authContext.user.name}</span>
            </Link>
            <TbLogout onClick={() => authContext.handleSignOut()} />
          </div>
        </>
      )}
    </header>
  );
};

export { Header };
