import { faAngleLeft, faAngleRight, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
          <FontAwesomeIcon icon={faUserSecret} />{' '}
        </div>
        <div className="ps-2 pe-2">
          <span className="text-capitalize">{t('privacy_policy')}</span>
        </div>
        <div className="ms-auto ps-2 pe-2">
          <FontAwesomeIcon icon={show ? faAngleLeft : faAngleRight} />
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
