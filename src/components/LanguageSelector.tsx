import React from 'react';
import { useTranslation } from 'react-i18next';

interface Lng {
  nativeName: string;
}

const lngs: { [index: string]: Lng } = {
  en: { nativeName: 'English' },
  no: { nativeName: 'Norsk' },
  nn: { nativeName: 'Nynorsk' },
};

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  return (
    <>
      <div>
        {Object.keys(lngs).map((lng, index) => (
          <>
            <a
              key={lng}
              style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }}
              onClick={() => i18n.changeLanguage(lng)}
            >
              {lngs[lng].nativeName}
            </a>
            <span> {index < 2 ? ' | ' : ''}</span>
          </>
        ))}
      </div>
    </>
  );
};

export default LanguageSelector;
