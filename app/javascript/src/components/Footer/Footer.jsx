import React from 'react';
import './footer.scss';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <span>
        {t('footer.rights')}
      </span>
      <span>
        {/*{t('footer.stack')}: <i>Ruby on Rails</i> & <i>ReactJS</i>*/}
      </span>
    </footer>);
};

export { Footer };
