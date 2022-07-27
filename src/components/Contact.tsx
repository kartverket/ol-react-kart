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
          <span className="material-icons-outlined">feedback</span>
        </div>
        <div className="ps-2 pe-2">
          <span className="text-capitalize">{t('kontakt_oss')}</span>
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
                  <h4>{t('kontakt_oss_tittel')}</h4>
                  {t('kontakt_oss_info')}
                  <div className="contact-info-item">
                    <span className="material-icons-outlined">call</span> +47 32 11 80 00
                  </div>
                  <div className="contact-info-item">
                    <span className="material-icons-outlined">mail</span>{' '}
                    <a href="mailto:post@kartverket.no">post@kartverket.no</a>
                  </div>
                  <div className="contact-info-item">
                    <span className="material-icons-outlined">home</span>{' '}
                    <a href="https://kartverket.no/">kartverket.no</a>
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
