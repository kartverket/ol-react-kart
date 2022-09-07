import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import Print from './info-panel/PrintComponent';

const PrintMap = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  return (
    <>
      <div
        className="d-flex expandBtn"
        onClick={() => {
          setShow(!show);
        }}
      >
        <span className="">{t('skriv_ut')}</span>
      </div>
      {show ? (
        <div className="expandContent container">
          <Print />
        </div>
      ) : null}
    </>
  );
};

export default PrintMap;
