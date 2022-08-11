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
        <div className="expandContent container">
          <div className="row pt-0">
            <div className="col-13 pt-0">
              <div className="contact-info pt-0">
                {t('kontakt_oss_info')}
                <div className="contact-info-item">
                  Telefon:
                  <a className="button button__green--tertiary button--xs" href="tel:32118000">
                    32 11 80 00
                  </a>
                </div>
                <div className="contact-info-item">
                  E-Post:
                  <a className="button button__green--tertiary button--xs" href="mailto:post@kartverket.no">
                    post@kartverket.no
                  </a>
                </div>
                <div className="contact-info-item">
                  <a
                    className="button button__green--tertiary button--xs"
                    href="https://www.kartverket.no/om-kartverket"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Adresser og kontaktinformasjon
                  </a>
                </div>
                <div className="contact-info-item">
                  <a
                    className="button button__green--tertiary button--xs"
                    href="https://www.kartverket.no/om-kartverket/personvern"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Personvern og cookies
                  </a>
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
