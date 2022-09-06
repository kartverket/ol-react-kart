import React, { useEffect, useRef, useState } from 'react';

import axios from 'axios';
import * as fxparser from 'fast-xml-parser';
import { useTranslation } from 'react-i18next';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import GPX from 'ol/format/GPX';
import { Circle as CircleStyle, Fill, Stroke } from 'ol/style';
import OlStyleCircle from 'ol/style/Circle';
import OlStyleFill from 'ol/style/Fill';
import OlStyleStroke from 'ol/style/Stroke';
import OlStyle, { StyleLike } from 'ol/style/Style';
import OlStyleText from 'ol/style/Text';
import OlCollection from 'ol/Collection';
import OlFeature from 'ol/Feature';

import useMap from '../app/useMap';
import { generateElevationChartServiceUrl, uploadGpxFileService } from '../utils/n3api';

const ElevationProfile = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [drawProfile, setDrawProfile] = useState(true);
  const [isDrawActive, setIsDrawActive] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [elevationProfileActive, setElevationProfileActive] = useState(false);
  const [isElevationProfileActive, setIsElevationProfileActive] = useState(false);
  const [gpx, setGpx] = useState<string>();
  const [name, setName] = useState('');
  const [elevationImage, setElevationImage] = useState<string | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);
  const map = useMap();

  const _uploadGpxFile = (gpx: string) => {
    if (!gpx) return;
    const upload = new URL(uploadGpxFileService());
    fetch(upload, {
      method: 'POST',
      body: gpx,
      mode: 'cors',
    })
      .then(response => response.text())
      .then(data => {
        setElevationImage(undefined);
        console.error('data: ', data);
        _generateElevationChart(data as string);
      })
      .catch((error: any) => {
        console.error('_uploadGpxFile error: ', error);
      });
    return;
  };
  const generateElevationProfile = (gpx: string) => {
    return _uploadGpxFile(gpx);
  };
  const _generateElevationChart = (gpxUrl: string) => {
    axios
      .get(generateElevationChartServiceUrl(gpxUrl))
      .then(result => {
        const parser = new fxparser.XMLParser({
          ignoreAttributes: true,
          ignorePiTags: true,
          removeNSPrefix: true,
        });
        const dataXml = parser.parse(result.data);
        if (dataXml.ExecuteResponse.Status.ProcessFailed) {
          console.warn(
            'ERROR: Exception from WPS-server "' +
            dataXml.ExecuteResponse.Status.ProcessFailed.ExceptionReport.Exception['@exceptionCode'] +
            '"',
          );
          return;
        }
        setElevationImage(dataXml.ExecuteResponse.ProcessOutputs.Output.Data.ComplexData);
      })
      .catch((error: any) => {
        console.error('_generateElevationChart error: ', error);
      });
  };

  const fileread = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
      setName(selectedFile?.name as string);
      const reader = new FileReader();
      reader.onload = loadEvent => {
        if (loadEvent && loadEvent.target) {
          console.log('', loadEvent.target.result);
          setGpx(loadEvent.target.result as string);
        }
      };
      if (selectedFile) {
        reader.readAsText(selectedFile as File);
      }
    }
  };
  const showDrawing = (gpx:string) => {
    if (!map) return;
    const format = new GPX({
      //dataProjection: 'EPSG:4326',
      //featureProjection: map.getView().getProjection()
    });
    const newFeatures = format.readFeatures(gpx);
    newFeatures.forEach(function (feature) {
      feature.getGeometry()?.transform('EPSG:4326', map.getView().getProjection());
    });
    const featureCollection = new OlCollection(newFeatures);
    const source = new VectorSource({
      features: featureCollection
    });
    const vector = new VectorLayer({
      source: source,
      style: new OlStyle({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new Stroke({
          color: '#ffcc33',
          width: 2,
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: '#ffcc33',
          }),
        }),
      }),
    });
    map.addLayer(vector)
  }

  useEffect(() => {
    showDrawing(gpx as string)
    generateElevationProfile(gpx as string);
    /*.then(function () {
      document.getElementById('spinner2').style.backgroundColor = 'transparent';
      document.getElementById('spinner2').style.transition = '0.8s';
      showSpinner = false;
      imageExists = true;
      showElevationProfilePage2();
    });*/
  }, [gpx]);

  useEffect(() => {
    console.log('Image is set', elevationImage);
  }, [elevationImage]);

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
              <div role="tabpanel" className="tab-pane" id="drawProfile">
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
              <div role="tabpanel" className="tab-pane active" id="uploadFile">
                <div className="">
                  <div className="">
                    <input
                      type="text"
                      className="inputField input__disabled"
                      aria-label="..."
                      disabled={true}
                      value={name}
                    ></input>
                    <input
                      className="no-display"
                      type="file"
                      id="files"
                      accept=".gpx"
                      onChange={fileread}
                      ref={inputRef}
                    ></input>
                    <button
                      type="button"
                      id="clickInput"
                      className="button button__green--primary button--xs"
                      onClick={() => inputRef.current?.click()}
                    >
                      {t('chooseFile_txt')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <div className="navigation-button pull-right">
                  <button className="button button__blue--secondary button--xs" onClick={closeOverlay}>
                    {t('Cancel_txt')}
                  </button>
                  <button
                    disabled={!isElevationProfileActive}
                    className="button button__green--primary button--xs"
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
