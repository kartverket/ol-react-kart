import React, { useState } from 'react';

import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useTranslation } from 'react-i18next';

const ShareMap = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  const getUrl = () => {
    return location.href;
  };
  const getEncodedUrl = () => {
    return encodeURIComponent(getUrl());
  };
  const getTwitterUrl = () => {
    const url = 'https://twitter.com/share?url=' + getEncodedUrl();
    window.open(url, '_blank');
  };
  const getFacebookUrl = () => {
    const url = 'https://www.facebook.com/sharer.php?u=' + getEncodedUrl();
    window.open(url, '_blank');
  };
  const getMailUrl = () => {
    const url = 'mailto:?subject=norgeskart.no&body=' + getEncodedUrl();
    window.open(url, '_self');
  };
  const copyURL = () => {
    const textToCopy = getUrl();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        alert('Copied to clipboard');
      });
    } else {
      console.log('Browser Not compatible');
    }
  };
  return (
    <>
      <div
        className="d-flex expandBtn"
        onClick={() => {
          setShow(!show);
        }}
      >
        {t('dele_kartet')}
      </div>
      {show ? (
        <div className="expandContent container">
          <div className="pt-0">
            <form>
              <fieldset>
                <div onClick={() => getFacebookUrl()} className="pointer-cursor">
                  <FacebookIcon />
                  <span>{t('facebook_txt')}</span>
                </div>
                <div onClick={() => getTwitterUrl()} className="pointer-cursor">
                  <TwitterIcon />
                  <span>{t('twitter_txt')}</span>
                </div>
                <div onClick={() => getMailUrl()} className="pointer-cursor">
                  <EmailIcon />
                  <span>{t('email_txt')}</span>
                </div>
                <div className="mb-3">
                  <label htmlFor="copyUrlText" className="label label--sml">
                    {t('copyLink_txt')}
                  </label>
                  <input id="copyUrlText" type="text" className="inputField input__disabled" placeholder={getUrl()} />
                </div>
                <button className="button button__green--primary button--xs" onClick={() => copyURL()}>
                  {t('copy_txt')}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ShareMap;
