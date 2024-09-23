import React from 'react';
import { useTranslation } from 'react-i18next';
import './about.scss';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="about">
      <div className="about-content">
        <h1>{t('about.title')}</h1>
        <p>{t('about.text1')}</p>
        <h2>{t('about.text2')}</h2>
        <p>{t('about.text3')}</p>
        <h2>{t('about.text4')}</h2>
        <p>{t('about.text5')}</p>
      </div>
    </div>
  );
};

export { About };
