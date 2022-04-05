import React from 'react';
import MainMap from './components/MainMap';
import SearchInput from './components/search/SearchInput';
import { useTranslation, Trans } from 'react-i18next';

interface Lng {
  nativeName: string;
}
const lngs:{[index: string]:Lng} = {
  en: { nativeName: 'English' },
  no: { nativeName: 'Norsk' },
  nn: { nativeName: 'Nynorsk' },
};
function App() {
  const { t, i18n } = useTranslation();
  return (
    <div className="App">
      <h1>{t('title')}</h1>
      {/* <Trans i18nKey="description.part1" />  */}
      <SearchInput />
      <header className="App-header">
        <div>
          {Object.keys(lngs).map((lng) => (
            <button key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
              {lngs[lng].nativeName}
            </button>
          ))}
        </div>
      </header>
      <MainMap />

    </div>
  );
}

export default App;
