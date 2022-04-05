import React from 'react';
import { useTranslation } from 'react-i18next';
import SearchInput from './search/SearchInput';

interface Lng {
  nativeName: string;
}
interface Lngs {
  en: Lng;
  no: Lng;
  nn: Lng;
}
const lngs: { [index: string]: Lng } = {
  en: { nativeName: 'English' },
  no: { nativeName: 'Norsk' },
  nn: { nativeName: 'Nynorsk' },
};

const TopLeftMenu = () => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <h1>{t('title')}</h1>
      {/* <Trans i18nKey="description.part1" />  */}
      <SearchInput />
      <header className="App-header">
        <div>
          {Object.keys(lngs).map(lng => (
            <button
              key={lng}
              style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }}
              type="submit"
              onClick={() => i18n.changeLanguage(lng)}
            >
              {lngs[lng].nativeName}
            </button>
          ))}
        </div>
      </header>
    </>
  );
};

export default TopLeftMenu;
