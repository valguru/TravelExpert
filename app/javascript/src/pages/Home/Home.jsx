import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import classNames from 'classnames';
import { useAuthContext } from '../../hooks';
import ImageService from '../../services/image.service';
import ThemeService from '../../services/theme.service';
import ValueService from '../../services/value.service';
import './home.scss';
import { useTranslation } from 'react-i18next';

const srcImage = img => `../../assets/${img}`;

const DEFAULT_INPUT_VALUE = 0;

const Home = () => {
  const { t } = useTranslation();

  const user = useAuthContext().user;

  const [themes, setThemes] = useState([]);
  const [images, setImages] = useState([]);

  const [currentTheme, setCurrentTheme] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [currentValue, setCurrentValue] = useState(DEFAULT_INPUT_VALUE);

  const [userValue, setUserValue] = useState(null);
  const [averageValue, setAverageValue] = useState(null);

  useEffect(() => {
    ThemeService.getAll()
      .then(response => setThemes(response.data))
      .catch(console.log);
  }, []);

  useEffect(() => {
    setImages([]);
    setCurrentImage(null);
    setCurrentImageIndex(null);
    if (currentTheme) {
      ImageService.getByThemeId(currentTheme.id)
        .then(response => {
          setImages(response.data);
          setCurrentImage(response.data.length ? response.data[0] : null);
          setCurrentImageIndex(response.data.length ? 0 : null);
        })
        .catch(console.log);
    }
  }, [currentTheme]);

  useEffect(() => {
    loadImageValues();
  }, [currentImage]);

  useEffect(() => {
    if (currentImageIndex !== null) setCurrentImage(images[currentImageIndex]);
    else setCurrentImage(null);
  }, [currentImageIndex]);

  const loadImageValues = () => {
    if (!currentImage) return;

    ValueService.getByImage(currentImage.id)
      .then(response => {
        const sumValues = response.data.reduce((acc, value) => acc + value.value, 0);
        const aveValue = response.data.length ? sumValues / response.data.length : null;
        const valueOfUser = response.data.find(value => value.user_id === user.id);
        setAverageValue(aveValue ? parseFloat(aveValue.toFixed(2)) : null);
        setUserValue(valueOfUser ? valueOfUser : null);
        setCurrentValue(valueOfUser ? valueOfUser.value : DEFAULT_INPUT_VALUE);
      })
      .catch(console.log);
  };

  const canClickNext = () => currentImageIndex !== null && currentImageIndex < images.length - 1;
  const canClickPrev = () => currentImageIndex !== null && currentImageIndex > 0;
  const clickNext = () => canClickNext() && setCurrentImageIndex(currentImageIndex + 1);
  const clickPrev = () => canClickPrev() && setCurrentImageIndex(currentImageIndex - 1);

  const handleSubmit = () => {
    if (!user || !currentImage || !currentValue) return;

    if (userValue) {
      ValueService.update(userValue.id, user.id, currentImage.id, currentValue)
        .then(() => loadImageValues())
        .catch(console.log);
    } else {
      ValueService.create(user.id, currentImage.id, currentValue)
        .then(() => loadImageValues())
        .catch(console.log);
    }
  };

  return (
    <div className="home">
      <div className="left-block">
        <h2>{t('home.allThemes')}</h2>
        {themes.map(theme => (
          <div
            key={theme.id}
            className={classNames("option", currentTheme && theme.id === currentTheme.id && "selected")}
            onClick={() => setCurrentTheme(theme)}
          >
            {theme.name}
          </div>
        ))}

        <div className="info">{t('home.info')}</div>
      </div>

      <div className="content">
        {currentTheme ? (
          currentImage && (
            <>
              <div className="imageName">{currentImage.name}</div>
              <div className="images">
                <div className="arrow">
                  {canClickPrev() && <FaArrowLeft onClick={() => clickPrev()} />}
                </div>
                <div className="imageContainer">
                  <img src={srcImage(currentImage.file)} alt={currentImage.name} />
                </div>
                <div className="arrow">
                  {canClickNext() && <FaArrowRight onClick={() => clickNext()} />}
                </div>
              </div>
              <div className="grade">
                <div className="mark-block">
                  <input
                    type="range"
                    value={currentValue}
                    onChange={e => setCurrentValue(e.target.value)}
                    min={0}
                    max={100}
                  />
                  <button onClick={() => handleSubmit()}>{t('home.save')}</button>
                </div>

                <div className="metrics">
                  <div className="value">
                    {t('home.value')}:
                    <span>{currentValue}</span>
                  </div>
                  <div className="value">
                    {t('home.yourValue')}:
                    <span>{userValue?.value ?? '-'}</span>
                  </div>
                  <div className="value">
                    {t('home.averageValue')}:
                    <span>{averageValue ?? '-'}</span>
                  </div>
                </div>

              </div>
            </>
          )
        ) : (
          <>{t('home.noTheme')}</>
        )}
      </div>
    </div>
  );
};

export { Home };
