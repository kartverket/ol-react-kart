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
  generateEmergencyPosterPointUrl,
  generateEmergencyPosterServiceUrl,
  generateFaktaarkUrl,
  generateHoydedataPointUrl,
  generateKoordTransUrl,
  generateMapLinkServiceUrl,
  generateMatrikkelInfoUrl,
  generateProjeksjonerUrl,
  generatStedsnavnPunktsok,
  toDms,
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
  const [emergencyPointInfo, setEmergencyPointInfo] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(true);
  const [showTurkart, setShowTurkart] = useState(false);
  const [showMatrikkel, setShowMatrikkel] = useState(false);
  const [showFargeleggingskart, setShowFargeleggingskart] = useState(false);
  const [showStedsnavn, setShowStedsnavn] = useState(false);
  const [showNodplakat, setShowNodplakat] = useState(false);
  const [showNodplakat1, setShowNodplakat1] = useState(true);
  const [showNodplakat2, setShowNodplakat2] = useState(false);
  const [nodplakatName, setNodplakatName] = useState('');
  const [nodplakatStedsnavn, setNodplakatStedsnavn] = useState('');
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
  const handleGetEmergencyPointInfo = () => {
    if (clickCoordinates && clickCoordinates.coordinate) {
      setLoading(true);
      const coordinates = transform(
        [clickCoordinates?.coordinate[0], clickCoordinates?.coordinate[1]],
        'EPSG:25833',
        'EPSG:4326',
      );
      axios
        .get(generateEmergencyPosterPointUrl(coordinates[1], coordinates[0]))
        .then(response => {
          setLoading(false);
          setEmergencyPointInfo(response.data);
        })
        .catch(error => {
          setLoading(false);
          setShowError(true);
          console.log(error);
        });
    }
  };
  const geographicalText = (geographicOrdinal: number) => {
    const geographicDegreesSecondsMinutes = toDms(geographicOrdinal.toString());
    return (
      geographicDegreesSecondsMinutes.degrees +
      ' grader ' +
      geographicDegreesSecondsMinutes.minutes +
      ' minutter ' +
      geographicDegreesSecondsMinutes.seconds +
      ' sekunder'
    );
  };
  const _getUTMZoneFromGeographicPoint = (lon: number, lat: number) => {
    let sone = '32V',
      localProj = 'EPSG:32632';
    if (lat > 72) {
      if (lon < 21) {
        sone = '33X';
        localProj = 'EPSG:32633';
      } else {
        sone = '35X';
        localProj = 'EPSG:32635';
      }
    } else if (lat > 64) {
      if (lon < 6) {
        sone = '31W';
        localProj = 'EPSG:32631';
      } else if (lon < 12) {
        sone = '32W';
        localProj = 'EPSG:32632';
      } else if (lon < 18) {
        sone = '33W';
        localProj = 'EPSG:32633';
      } else if (lon < 24) {
        sone = '34W';
        localProj = 'EPSG:32634';
      } else if (lon < 30) {
        sone = '35W';
        localProj = 'EPSG:32635';
      } else {
        sone = '36W';
        localProj = 'EPSG:32636';
      }
    } else {
      if (lon < 3) {
        sone = '31V';
        localProj = 'EPSG:32631';
      } else if (lon >= 12) {
        sone = '33V';
        localProj = 'EPSG:32633';
      }
    }
    return {
      sone: sone,
      localProj: localProj,
    };
  };
  const downloadEmergencyPoster = () => {
    if (clickCoordinates && clickCoordinates.coordinate && clickCoordinates.center && clickCoordinates.extent) {
      const UTM = _getUTMZoneFromGeographicPoint(clickCoordinates.coordinate[0], clickCoordinates.coordinate[1]);
      const localUTMPoint = transform(clickCoordinates.coordinate, 'EPSG:4326', UTM.localProj);
      const pixels = {
        width: 1145,
        height: 660,
      };
      const meterWidth = clickCoordinates.extent[2] - clickCoordinates.extent[0];
      const pixelWidthPerHeight = pixels.width / pixels.height;
      const meterHeight = meterWidth / pixelWidthPerHeight;
      const minx = clickCoordinates.center[0] - meterWidth / 2;
      const miny = clickCoordinates.center[1] - meterHeight / 2;
      const maxx = clickCoordinates.center[0] + meterWidth / 2;
      const maxy = clickCoordinates.center[1] + meterHeight / 2;
      const emergencyMapConfig = {
        service: 'WMS',
        request: 'GetMap',
        CRS: 'EPSG:25833',
        FORMAT: 'image/jpeg',
        BGCOLOR: '0xFFFFFF',
        TRANSPARENT: 'false',
        LAYERS: 'topo4_WMS',
        VERSION: '1.3.0',
        WIDTH: pixels.width,
        HEIGHT: pixels.height,
        BBOX: minx + ',' + miny + ',' + maxx + ',' + maxy,
      };
      const emergencyPosterConfig = {
        locationName: nodplakatName,
        position1: geographicalText(clickCoordinates.coordinate[1]) + ' nord',
        position2: geographicalText(clickCoordinates.coordinate[0]) + ' øst',
        street: '',
        place: nodplakatStedsnavn,
        matrikkel: '',
        utm: 'Sone ' + UTM.sone + ' Ø ' + localUTMPoint[0] + ' N ' + localUTMPoint[1],
        posDez: 'N' + clickCoordinates.coordinate[1] + '° - Ø' + clickCoordinates.coordinate[0] + '°',
        map: generateMapLinkServiceUrl(emergencyMapConfig),
      };
      const url = generateEmergencyPosterServiceUrl(emergencyPosterConfig);
      console.log(url);
      window.open(url, '_blank');
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
              handleGetEmergencyPointInfo();
            }}
            className={style.expandBtn}
          >
            <span className={style.ellipsisToggle}>{t('Nodplakat')}</span>
            <FontAwesomeIcon icon={showNodplakat ? faAngleUp : faAngleDown} />
          </div>
          <div className={showNodplakat1 ? `${style.selected} ${style.open}` : style.selected}>
            <h4 className=""> {t('Ansvar')}</h4>
            <div className="small"> {t('NodplakatText1')}</div>
            <div className="small"> {t('NodplakatText2')}</div>
            <div className="small"> {t('NodplakatText3')}</div>
            <button
              className="btn btn-primary"
              onClick={() => {
                setShowNodplakat1(false);
                setShowNodplakat2(true);
              }}
            >
              {t('AcceptAndContinue')}
            </button>
          </div>
          <div className={showNodplakat2 ? `${style.selected} ${style.open}` : style.selected}>
            <div className="small"> {t('GiPunktetNavn')}</div>
            <input
              type="text"
              className="form-control"
              value={nodplakatName}
              onChange={e => setNodplakatName(e.target.value)}
            />
            <div className="small"> {t('PlaceIs')}</div>
            <div>
              {stedsnavn.navn ? (
                <select
                  className="form-select"
                  onChange={e => setNodplakatStedsnavn(e.target.value)}
                  value={nodplakatStedsnavn}
                >
                  {stedsnavn?.navn?.map((result, index) => (
                    <option value={result.stedsnavn && result.stedsnavn[0].skrivemåte} key={index}>
                      {result.stedsnavn && result.stedsnavn[0].skrivemåte}
                    </option>
                  ))}
                </select>
              ) : (
                <div>{t('NoPlace')}</div>
              )}
            </div>
            <div className="small"> {t('FoundRoadIs')}</div>
            <div>
              {emergencyPointInfo ? (
                <select
                  className="form-select"
                  onChange={e => setNodplakatStedsnavn(e.target.value)}
                  value={nodplakatStedsnavn}
                >
                  {emergencyPointInfo?.vegliste?.map((veg: string, index: number) => (
                    <option value={veg} key={index}>
                      {veg}
                    </option>
                  ))}
                </select>
              ) : (
                <div>{t('NoPlace')}</div>
              )}
            </div>

            <div className="small">
              {t('In')} {emergencyPointInfo.kommune} {t('Municipality')}
            </div>
            <button
              className="btn btn-primary"
              onClick={() => {
                downloadEmergencyPoster();
              }}
            >
              {t('downloadEmergencyPoster')}
            </button>
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
                    <a href={generateFaktaarkUrl(result.stedsnummer)} target="_blank" rel="noreferrer">
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
