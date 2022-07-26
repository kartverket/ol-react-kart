import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Policy = () => {
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
        <div className="ps-2 pe-2">
          <span className="material-icons-outlined">policy</span>
        </div>
        <div className="ps-2 pe-2">
          <span className="text-capitalize">{t('privacy_policy')}</span>
        </div>
        <div className="ms-auto ps-2 pe-2">
        <span className="material-icons-outlined">{show ? 'chevron_left' : 'chevron_right'}</span>
        </div>
      </div>
      {show ? (
        <div className="expandContent">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="contact-info">
                  <h4>{t('privacy_policy_title')}</h4>
                  {t('privacy_policy_info')} <a href="https://www.kartverket.no/om-kartverket/personvern">{t('privacy_policy_link')}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Policy;
