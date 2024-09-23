import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import imageService from '../../services/image.service';
import valueService from '../../services/value.service';
import { useAuthContext } from '../../hooks';
import './profile.scss';
import ValueService from '../../services/value.service';

const srcImage = img => `../../assets/${img}`;

export const Profile = () => {
  const { t } = useTranslation();

  const { user, avatar } = useAuthContext();

  const [itemsValue, setItemsValue] = useState([]);
  const [itemsWithRightMark, setItemsWithRightMark] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const values = (await valueService.getByUser(user.id)).data;
      const itemsWithAverage = [];

      const items = [];
      for (const value of values) {
        const image = (await imageService.getById(value.image_id)).data;
        const average = (await getAverageValue(image.id));
        console.log(value.value, Number(average), Math.abs(value.value - average));
        if (Math.abs(value.value - average) <= 25) {

          itemsWithAverage.push(
            <div key={value.id} className="item">
              <img src={srcImage(image.file)} alt={image.name} />
              <div className="item-content">
                <span className="name">{image.name}</span>
                <span className="mark">{value.value} / 100</span>
                <span className="mark">{t('home.averageValue')}: {average}</span>
              </div>
            </div>);
        }

        items.push(
          <div key={value.id} className="item">
            <img src={srcImage(image.file)} alt={image.name} />
            <div className="item-content">
              <span className="name">{image.name}</span>
              <span className="mark">{value.value} / 100</span>
              <span className="mark">{t('home.averageValue')}: {average}</span>
            </div>
          </div>,
        );
      }
      console.log(itemsWithAverage);

      setItemsValue(items);
      setItemsWithRightMark(itemsWithAverage);
    }

    fetchData();
  }, []);

  const getAverageValue = (imageId) => {
    return ValueService.getByImage(imageId)
      .then(response => {
        const sumValues = response.data.reduce((acc, value) => acc + value.value, 0);
        const aveValue = response.data.length ? sumValues / response.data.length : null;
        return aveValue ? parseFloat(aveValue.toFixed(2)) : null;
      })
      .catch(console.log);
  };

  return (
    <div className="profile">
      <div className="user-info">
        <img src={avatar ?? '../../assets/user.png'} />

        <div className="info">
          <div>
            <b>{t('profile.name')}:</b> {user.name}
          </div>
          <div>
            <b>{t('profile.email')}:</b> {user.email}
          </div>
        </div>
      </div>

      <div className="user-raitings">
        <div className="user-values">
          <div className="header-profile">{t('profile.rating')}</div>

          {itemsValue?.length > 0 ? itemsValue.map(item => item) : <div className="empty-list">
            {t('profile.emptyRating')}
          </div>}
        </div>

        <div className="user-values">
          <div className="header-profile">{t('profile.averageRating')}</div>

          {itemsWithRightMark?.length > 0 ? itemsWithRightMark.map(item => item) : <div className="empty-list">
            {t('profile.emptyRating')}
          </div>}
        </div>
      </div>

    </div>
  );
};
