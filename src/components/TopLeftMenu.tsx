import React from 'react';
import { useTranslation } from 'react-i18next';
import SearchInput from './search/SearchInput';

const TopLeftMenu = () => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <div className="norgeskart-logo">
        <h1>
          <a>
            <span className="norgeskart-logo-image"></span>
            {t('title')}
          </a>
        </h1>
      </div>
      {/* <Trans i18nKey="description.part1" />  */}
      <SearchInput />
    </>
  );
};

export default TopLeftMenu;
