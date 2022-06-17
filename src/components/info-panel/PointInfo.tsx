import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import * as fxparser from 'fast-xml-parser';
import { transform } from 'ol/proj';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IAdresser, ISsrPunkt, ITeigInfo } from '../../components/search/search-model';
import { useEventSelector } from '../../index';
import { selectClickCoordinates } from '../../MapCore/Events/getClickCoordinatesSlice';
import {
  generateAdressePunktsokUrl,
  generateEiendomAddressUrl,
  generateHoydedataPointUrl,
  generateMatrikkelInfoUrl,
  generatStedsnavnPunktsok,
} from '../../utils/n3api';
import style from './SearchBar.module.scss';
export interface IPunktInfo {
  datakilde: string;
  terreng: string;
  x: number;
  y: number;
  z: number;
}
export interface IHoydeResult {
  koordsys?: number;
  punkter?: IPunktInfo[];
}

const PointInfo = () => {
  const { t } = useTranslation();
  const clickCoordinates = useEventSelector(selectClickCoordinates);
  const [elevation, setElevation] = useState<IHoydeResult>({});
  const [address, setAddress] = useState<IAdresser>({});
  const [matrikkel, setMatrikkel] = useState<ITeigInfo>();
  const [eiendom, setEiendom] = useState<IHoydeResult>({});
  const [stedsnavn, setStedsnavn] = useState<ISsrPunkt>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [show, setShow] = useState(true);
  const [showAddress, setShowAddress] = useState(false);
  const [showMatrikkel, setShowMatrikkel] = useState(false);
  const [showEiendom, setShowEiendom] = useState(false);
  const [showStedsnavn, setShowStedsnavn] = useState(false);
  const [showElevation, setShowElevation] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (clickCoordinates && clickCoordinates.coordinate) {
      const elevationUrl = generateHoydedataPointUrl(
        clickCoordinates?.coordinate[0].toString(),
        clickCoordinates?.coordinate[1].toString(),
        '25833',
      );
      const ssrPointUrl = generatStedsnavnPunktsok(
        clickCoordinates?.coordinate[1].toString(),
        clickCoordinates?.coordinate[0].toString(),
        '25833',
      );
      const coordinates = transform(
        [clickCoordinates?.coordinate[0], clickCoordinates?.coordinate[1]],
        'EPSG:25833',
        'EPSG:4326',
      );
      const matrikkelInfoUrl = generateMatrikkelInfoUrl(coordinates[1], coordinates[0], coordinates[1], coordinates[0]);
      const adressePunktsokUrl = generateAdressePunktsokUrl(50, coordinates[1], coordinates[0]);
      const eiendomAddress = generateEiendomAddressUrl(
        clickCoordinates?.coordinate[0].toString(),
        clickCoordinates?.coordinate[1].toString(),
        '25833',
      );

      Promise.all([
        axios.get(elevationUrl),
        axios.get(ssrPointUrl),
        axios.get(matrikkelInfoUrl),
        axios.get(adressePunktsokUrl),
        //axios.get(eiendomAddress),
      ]).then(responses => {
        console.log(responses);
        const [elevationUrlResponse, ssrPointUrlResponse, matrikkelInfoUrlResponse, adressePunktsokUrlResponse] =
          responses;
        setElevation(elevationUrlResponse.data as IHoydeResult);
        setAddress(adressePunktsokUrlResponse.data as IAdresser);
        const parser = new fxparser.XMLParser({
          ignoreAttributes: true,
          ignorePiTags: true,
          removeNSPrefix: true,
        });
        const matrikkelInfo = parser.parse(matrikkelInfoUrlResponse.data);
        if (matrikkelInfo && matrikkelInfo.FeatureCollection && matrikkelInfo.FeatureCollection.featureMembers) {
          setMatrikkel(matrikkelInfo.FeatureCollection.featureMembers.TEIGWFS as ITeigInfo);
        } else {
          setMatrikkel(undefined);
        }
        //setEiendom(responses[2].data as IHoydeResult);
        if (ssrPointUrlResponse.data && ssrPointUrlResponse.data.navn && ssrPointUrlResponse.data.navn.length > 0) {
          setStedsnavn(ssrPointUrlResponse.data as ISsrPunkt);
        } else {
          setStedsnavn({});
        }
      });
    }
  }, [clickCoordinates]);
  return (
    <>
      <div className={show ? `${style.selected} ${style.open}` : style.selected}>
        {elevation && elevation.punkter && elevation.punkter.length > 0 && elevation.punkter[0].z ? (
          <>
            <span className="small">
              {t('HeightEstimatedByInterpolation_text')}
              {elevation.punkter[0].z} {t('MetersAboveSeaLevel')}
            </span>
            <span className="text-lowercase small">
              {' '}
              ({elevation.punkter[0]?.terreng?.replace(/(.+?)([A-Z])/g, '$1 $2')})
            </span>
          </>
        ) : null}
        {address && address.adresser && address.adresser?.length > 0 ? (
          <>
            <span className="small">
              {t('Address_text')}
              {address.adresser[0].adressetekst}
            </span>
            <span className="text-lowercase small"> ({address.adresser[0].kommunenavn})</span>
          </>
        ) : null}

        <p className="fs-5 mt-3 ms-2">{t('hva_vil_du_gjore')}</p>
        <div className="d-flex flex-column">
          <div className="p-2 bg-light w-100 mb-2">
            <div
              onClick={() => {
                setShowMatrikkel(!showMatrikkel);
                setShow(!show);
              }}
              className={style.expandBtn}
            >
              <span className={style.ellipsisToggle}>{t('seEiendom')}</span>
              <FontAwesomeIcon icon={showStedsnavn ? faAngleUp : faAngleDown} />
            </div>
          </div>
          <div className="p-2 bg-light w-100 mb-2">
            <div
              onClick={() => {
                setShowStedsnavn(!showStedsnavn);
                setShow(!show);
              }}
              className={style.expandBtn}
            >
              <span className={style.ellipsisToggle}>{t('ssrFakta')}</span>
              <FontAwesomeIcon icon={showStedsnavn ? faAngleUp : faAngleDown} />
            </div>
          </div>
          <div className="p-2 bg-light w-100 mb-2">
            <span>{t('koordTrans')}</span>
          </div>
          <div className="p-2 bg-light w-100 mb-2">
            <span>{t('lagTurkart')}</span>
          </div>
          <div className="p-2 bg-light w-100 mb-2">
            <span>{t('lagFargeleggingskart')}</span>
          </div>
          <div className="p-2 bg-light w-100 mb-2">
            <span>{t('lagNodplakat')}</span>
          </div>
        </div>
      </div>

      <div className={showMatrikkel ? `${style.selected} pointInfo` : style.selected}>
        <div className="p-2 bg-light w-100 mb-2">
          <div
            onClick={() => {
              setShowMatrikkel(!showMatrikkel);
              setShow(!show);
            }}
            className={style.expandBtn}
          >
            <span className={style.ellipsisToggle}>{t('seEiendom')}</span>
            <FontAwesomeIcon icon={showMatrikkel ? faAngleUp : faAngleDown} />
          </div>
        </div>
        {matrikkel && matrikkel.GARDSNR ? (
          <div>
            <dl className="margin-bottom">
              <dt>Kommunenr:</dt>
              <dd>{matrikkel.KOMMUNENR}</dd>
              <dt>Gårdsnr:</dt>
              <dd>{matrikkel.GARDSNR}</dd>
              <dt>Bruksnr:</dt>
              <dd>{matrikkel.BRUKSNR}</dd>
              <dt>Festenr:</dt>
              <dd>{matrikkel.FESTENR}</dd>
              <dt>Type:</dt>
              <dd>{matrikkel.EIENDOMSTYPE}</dd>
            </dl>
            <a
              href={`https://seeiendom.kartverket.no/eiendom/${matrikkel.KOMMUNENR}/${matrikkel.GARDSNR}/${matrikkel.BRUKSNR}/${matrikkel.FESTENR}/${matrikkel.SEKSJONSNR}`}
              target="_blank"
              rel="noreferrer"
            >
              {t('seeiedom')} link
            </a>
          </div>
        ) : (
          <div>{t('noMatrikkel')}</div>
        )}
      </div>

      <div className={showStedsnavn ? `${style.selected} pointInfo` : style.selected}>
        <div className="p-2 bg-light w-100 mb-2">
          <div
            onClick={() => {
              setShowStedsnavn(!showStedsnavn);
              setShow(!show);
            }}
            className={style.expandBtn}
          >
            <span className={style.ellipsisToggle}>{t('ssrFakta')}</span>
            <FontAwesomeIcon icon={showStedsnavn ? faAngleUp : faAngleDown} />
          </div>
        </div>
        {stedsnavn.navn ? (
          <ul className="list-group list-group-flush">
            {stedsnavn?.navn?.map((result, index) => (
              <li key={index} className="list-group-item pt-2 pb-2">
                <div className="">
                  <div>{result.stedsnavn && result.stedsnavn[0].skrivemåte}</div>
                  <div className="text-muted">
                    {t('Stedsnummer')}:{' '}
                    <a
                      href={'https://stadnamn.kartverket.no/fakta/' + result.stedsnummer}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {' '}
                      {result.stedsnummer}
                    </a>
                  </div>
                  <small className="text-muted">
                    {t('Navnobjekttype')}: {result.navneobjekttype}
                  </small>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div> {t('noStedsnavn')}</div>
        )}
      </div>
    </>
  );
};

export default PointInfo;
