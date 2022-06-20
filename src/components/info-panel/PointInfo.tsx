import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import * as fxparser from 'fast-xml-parser';
import { Coordinate } from 'ol/coordinate';
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
  generateKoordTransUrl,
  generateMatrikkelInfoUrl,
  generateProjeksjonerUrl,
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
export interface IProsjektion {
  epsg: number;
  info: string;
  name: string;
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
  const [show, setShow] = useState(true);
  const [showTurkart, setShowTurkart] = useState(false);
  const [showMatrikkel, setShowMatrikkel] = useState(false);
  const [showFargeleggingskart, setShowFargeleggingskart] = useState(false);
  const [showStedsnavn, setShowStedsnavn] = useState(false);
  const [showNodplakat, setShowNodplakat] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showCoordinates, setShowCoordinates] = useState(false);
  const [showGetFeatureInfo, setShowGetFeatureInfo] = useState(false);
  const [projeksjoner, setProjeksjoner] = useState<IProsjektion[]>([]);
  const [coordinates, setCoordinates] = useState<Coordinate>();
  const [projection, setProjection] = useState<string>('25833');

  useEffect(() => {
    axios
      .get(generateProjeksjonerUrl())
      .then(response => {
        setProjeksjoner(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    if (clickCoordinates && clickCoordinates.coordinate) {
      setCoordinates(clickCoordinates.coordinate);
      setProjection('25833');
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

  const handleTransform = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (coordinates) {
      axios.get(generateKoordTransUrl(coordinates[0], coordinates[1], value, projection)).then(response => {
        setCoordinates([response.data.x, response.data.y]);
        setProjection(value);
      });
    }
  };
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
            <div
              onClick={() => {
                setShowCoordinates(!showCoordinates);
                setShow(!show);
              }}
              className={style.expandBtn}
            >
              <span className={style.ellipsisToggle}>{t('koordTrans')}</span>
              <FontAwesomeIcon icon={showCoordinates ? faAngleUp : faAngleDown} />
            </div>
          </div>
          <div className="p-2 bg-light w-100 mb-2">
            <div
              onClick={() => {
                setShowTurkart(!showTurkart);
                setShow(!show);
              }}
              className={style.expandBtn}
            >
              <span className={style.ellipsisToggle}>{t('lagTurkart')}</span>
              <FontAwesomeIcon icon={showTurkart ? faAngleUp : faAngleDown} />
            </div>
          </div>
          <div className="p-2 bg-light w-100 mb-2">
            <div
              onClick={() => {
                setShowFargeleggingskart(!showFargeleggingskart);
                setShow(!show);
              }}
              className={style.expandBtn}
            >
              <span className={style.ellipsisToggle}>{t('lagFargeleggingskart')}</span>
              <FontAwesomeIcon icon={showFargeleggingskart ? faAngleUp : faAngleDown} />
            </div>
          </div>
          <div className="p-2 bg-light w-100 mb-2">
            <div
              onClick={() => {
                setShowNodplakat(!showNodplakat);
                setShow(!show);
              }}
              className={style.expandBtn}
            >
              <span className={style.ellipsisToggle}>{t('lagNodplakat')}</span>
              <FontAwesomeIcon icon={showNodplakat ? faAngleUp : faAngleDown} />
            </div>
          </div>
        </div>
      </div>
      {/* Koordinater */}
      <div className={showCoordinates ? `${style.selected} ${style.open}` : style.selected}>
        <div className="p-2 bg-light w-100 mb-2">
          <div
            onClick={() => {
              setShowCoordinates(!showCoordinates);
              setShow(!show);
            }}
            className={style.expandBtn}
          >
            <span className={style.ellipsisToggle}>{t('koordTrans')}</span>
            <FontAwesomeIcon icon={showCoordinates ? faAngleUp : faAngleDown} />
          </div>
          {projeksjoner && coordinates ? (
            <div>
              <span className="small"> {t('koord_info')}</span>
              <select className="form-select" onChange={e => handleTransform(e)} value={projection}>
                {projeksjoner.map((result, index) => (
                  <option value={result.epsg} key={index}>
                    {result.name}
                  </option>
                ))}
              </select>
              <dl className="">
                <dt>{t('koord_nord')}</dt>
                <dd>{coordinates[1]}</dd>
                <dt>{t('koord_ost')}:</dt>
                <dd>{coordinates[0]}</dd>
              </dl>
            </div>
          ) : null}
        </div>
      </div>
      {/* Turkart */}
      <div className={showTurkart ? `${style.selected} ${style.open}` : style.selected}>
        <div className="p-2 bg-light w-100 mb-2">
          <div
            onClick={() => {
              setShowTurkart(!showTurkart);
              setShow(!show);
            }}
            className={style.expandBtn}
          >
            <span className={style.ellipsisToggle}>{t('koordTrans')}</span>
            <FontAwesomeIcon icon={showTurkart ? faAngleUp : faAngleDown} />
          </div>
        </div>
      </div>
      {/* Fargeleggingskart */}
      <div className={showFargeleggingskart ? `${style.selected} ${style.open}` : style.selected}>
        <div className="p-2 bg-light w-100 mb-2">
          <div
            onClick={() => {
              setShowFargeleggingskart(!showFargeleggingskart);
              setShow(!show);
            }}
            className={style.expandBtn}
          >
            <span className={style.ellipsisToggle}>{t('koordTrans')}</span>
            <FontAwesomeIcon icon={showFargeleggingskart ? faAngleUp : faAngleDown} />
          </div>
        </div>
      </div>
      {/* Nodplakat */}
      <div className={showNodplakat ? `${style.selected} ${style.open}` : style.selected}>
        <div className="p-2 bg-light w-100 mb-2">
          <div
            onClick={() => {
              setShowNodplakat(!showNodplakat);
              setShow(!show);
            }}
            className={style.expandBtn}
          >
            <span className={style.ellipsisToggle}>{t('koordTrans')}</span>
            <FontAwesomeIcon icon={showNodplakat ? faAngleUp : faAngleDown} />
          </div>
        </div>
      </div>
      {/* GetFeatureInfo */}
      <div className={showGetFeatureInfo ? `${style.selected} ${style.open}` : style.selected}>
        <div className="p-2 bg-light w-100 mb-2">
          <div
            onClick={() => {
              setShowGetFeatureInfo(!showGetFeatureInfo);
              setShow(!show);
            }}
            className={style.expandBtn}
          >
            <span className={style.ellipsisToggle}>{t('koordTrans')}</span>
            <FontAwesomeIcon icon={showGetFeatureInfo ? faAngleUp : faAngleDown} />
          </div>
        </div>
      </div>
      {/* Eiendomsinformasjon */}
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
              {t('showMoreInformation')}
            </a>
          </div>
        ) : (
          <div>{t('noMatrikkel')}</div>
        )}
      </div>
      {/* Stedsnavn */}
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
