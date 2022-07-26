import { faAngleLeft, faAngleRight, faComment, faEnvelope, faHome, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Contact = () => {
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
          <FontAwesomeIcon icon={faComment} />{' '}
        </div>
        <div className="ps-2 pe-2">
          <span className="text-capitalize">{t('kontakt_oss')}</span>
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
                  <h4>{t('kontakt_oss_tittel')}</h4>
                  {t('kontakt_oss_info')}
                  <div className="contact-info-item">
                    <span>
                      <FontAwesomeIcon icon={faPhone} /> +47 32 11 80 00
                    </span>
                  </div>
                  <div className="contact-info-item">
                    <span>
                      <FontAwesomeIcon icon={faEnvelope} /> <a href="mailto:post@kartverket.no">post@kartverket.no</a>
                    </span>
                  </div>
                  <div className="contact-info-item">
                    <span>
                      <FontAwesomeIcon icon={faHome} /> <a href="https://kartverket.no/">kartverket.no</a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Contact;
