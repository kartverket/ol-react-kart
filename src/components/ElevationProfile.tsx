import React, { useRef, useState } from 'react';

import { useTranslation } from 'react-i18next';

const ElevationProfile = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [drawProfile, setDrawProfile] = useState(true);
  const [isDrawActive, setIsDrawActive] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [elevationProfileActive, setElevationProfileActive] = useState(false);
  const [isElevationProfileActive, setIsElevationProfileActive] = useState(false);
  const [name, setName] = useState('');
  const inputRef = useRef(null);

  const handleClick = (event: any) => {
    console.log('handleClick', event);
    //inputRef.current.click();
  };
  const fileread = (e: any) => {
    console.log('fileread', e);
    //setFile([...file, e.target.files[0]]);
  };
  const removeGeometry = () => {
    console.log('removeGeometry');
  };
  const drawLineElevation = () => {
    console.log('drawLineElevation');
  };
  const calculateElevationProfile = () => {
    console.log('calculateElevationProfile');
  };
  const closeOverlay = () => {
    console.log('closeOverlay');
  };
  return (
    <>
      <div
        className="d-flex expandBtn"
        onClick={() => {
          setShow(!show);
        }}
      >
        {t('lag_hoydeprofil')}
      </div>
      {show ? (
        <div className="expandContent container">
          {showSpinner ? (
            <div id="spinner2" className="search-loading-overlay">
              <div className="spinner-loader">
                <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
              </div>
            </div>
          ) : null}
          <div className="panel-body">
            <ul className="nav nav-tabs" role="tablist" id="myElevationTabs">
              <li role="presentation" className="active">
                <a href="" data-target="#drawProfile" aria-controls="drawProfile" role="tab" data-toggle="tab">
                  {t('drawInMap_txt')}
                </a>
              </li>
              <li role="presentation">
                <a href="" data-target="#uploadFile" aria-controls="uploadFile" role="tab" data-toggle="tab">
                  {t('uploadFile_txt')}
                </a>
              </li>
            </ul>
            <div className="tab-content search-content">
              <div role="tabpanel" className="tab-pane active" id="drawProfile">
                <span>{t('profileInfo_txt')}</span>
                <div className="new-section navigation-button">
                  <button
                    className="btn btn-default btn-ordinary"
                    onClick={removeGeometry}
                    disabled={!elevationProfileActive}
                  >
                    {t('remove_txt')}
                  </button>
                  <button
                    type="button"
                    className={`btn btn-default ${isDrawActive ? 'activeBtn' : 'btn-toggle'}`}
                    onClick={drawLineElevation}
                  >
                    {t('drawProfile_txt')}
                  </button>
                </div>
              </div>
              <div role="tabpanel" className="tab-pane" id="uploadFile">
                <div className="new-section">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control btn-group"
                      aria-label="..."
                      data-ng-disabled="true"
                      value={name}
                    ></input>
                    <div className="input-group-btn">
                      <input
                        className="no-display btn-group"
                        type="file"
                        id="files"
                        accept=".gpx"
                        onChange={fileread}
                        ref={inputRef}
                      ></input>
                      <button
                        type="button"
                        id="clickInput"
                        className="btn btn-default btn-important"
                        onClick={handleClick}
                      >
                        {t('chooseFile_txt')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <div className="navigation-button pull-right">
                  <button className="btn btn-default btn-ordinary" onClick={closeOverlay}>
                    {t('Cancel_txt')}
                  </button>
                  <button
                    disabled={!isElevationProfileActive}
                    className="btn btn-default btn-important"
                    onClick={calculateElevationProfile}
                  >
                    {t('showElevationProfile_txt')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ElevationProfile;
