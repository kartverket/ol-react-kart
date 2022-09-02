import React from 'react';

import { useTranslation } from 'react-i18next';

interface Lng {
  nativeName: string;
}

const lngs: { [index: string]: Lng } = {
  no: { nativeName: 'Bokmål' },
  nn: { nativeName: 'Nynorsk' },
  en: { nativeName: 'English' },
};

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  return (
    <>
      <div className="expandBtn">
        {Object.keys(lngs).map((lng, index) => (
          <span key={lng}>
            <a
              style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }}
              onClick={() => i18n.changeLanguage(lng)}
            >
              {lngs[lng].nativeName}
            </a>
            <span className="m-2"> {index < 2 ? '|' : ''}</span>
          </span>
        ))}
      </div>
    </>
  );
};

export default LanguageSelector;
