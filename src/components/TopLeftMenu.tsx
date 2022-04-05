import React from 'react';
import { useTranslation } from 'react-i18next';
import SearchInput from './search/SearchInput';

const TopLeftMenu = () => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <h1>{t('title')}</h1>
      {/* <Trans i18nKey="description.part1" />  */}
      <SearchInput />     
    </>
  );
};

export default TopLeftMenu;
