import React from 'react';
import { useTranslation } from 'react-i18next';

const TopLeftMenu = () => {
  // const { t, i18n } = useTranslation();
  const { t } = useTranslation();
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
    </>
  );
};

export default TopLeftMenu;
