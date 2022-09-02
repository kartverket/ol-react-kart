import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

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
          <div className="row pt-0">TEST</div>
        </div>
      ) : null}
    </>
  );
};

export default PrintMap;
