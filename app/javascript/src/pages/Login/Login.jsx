import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../../hooks';
import './login.scss';

const Login = () => {
  const authContext = useAuthContext();
  const { t } = useTranslation();

  const [isSignIn, setIsSignIn] = useState(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const signIn = async () => {
    try {
      await authContext.handleSignIn(email, password);
    } catch (error) {
      setErrorMessage('login.errorSignIn');
    }
  };

  const signUp = async () => {
    if (password !== confirmPassword) {
      setErrorMessage('login.errorPassword');
      return;
    }

    try {
      await authContext.handleSignUp(name, email, password);
    } catch (error) {
      setErrorMessage('login.errorSignUp');
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    isSignIn ? signIn() : signUp();
  };

  const changeForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrorMessage('');

    setIsSignIn(prev => !prev);
  };

  return (
    <div className="login">
      <div className="main-login">
        {isSignIn ? (
          <>
            <div className="header-login">{t('login.authorization')}</div>
            <form onSubmit={handleSubmit}>
              <input
                type='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={t('login.email')}
                maxLength={50}
              />
              <input
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder={t('login.password')}
                minLength={6}
              />
              <button type='submit'>{t('login.signIn')}</button>
              <span onClick={() => changeForm()}>{t('login.create')}</span>
            </form>
          </>
        ) : (
          <>
            <div className="header-login">{t('login.registration')}</div>
            <form onSubmit={handleSubmit}>
              <input type='text' value={name} onChange={e => setName(e.target.value)} placeholder={t('login.name')} />
              <input
                type='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={t('login.email')}
                maxLength={50}
              />
              <input
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder={t('login.password')}
                minLength={6}
              />
              <input
                type='password'
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder={t('login.confirmPassword')}
                minLength={6}
              />
              <button type='submit'>{t('login.signUp')}</button>
              <span onClick={() => changeForm()}>{t('login.login')}</span>
            </form>
          </>
        )}
      </div>
      {!!errorMessage.length && <div className="error">{t(errorMessage)}</div>}
    </div>
  );
};

export { Login };
