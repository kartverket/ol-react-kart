import React, { useEffect, useRef, useState } from 'react';

import axios from 'axios';
import * as fxparser from 'fast-xml-parser';
import { useTranslation } from 'react-i18next';

import { Coordinate } from 'ol/coordinate';
import { transform } from 'ol/proj';

import { selectClickCoordinates } from '../../MapCore/Events/getClickCoordinatesSlice';
import { IAdresser, ISsrPunkt, ITeigInfo } from '../../components/search/search-model';
import { useEventSelector } from '../../index';
import { IProsjektion, getUTMZoneFromGeographicPoint } from '../../utils/mapUtil';
import {
  generatStedsnavnPunktsok,
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
  round,
  toDms,
} from '../../utils/n3api';
import style from './SearchBar.module.scss';
import Turkart from './Turkart';

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
  const [stedsnavn, setStedsnavn] = useState<ISsrPunkt>({});
  const [emergencyPointInfo, setEmergencyPointInfo] = useState<any>({});
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
  const [nodplakatVeg, setNodplakatVeg] = useState('');
  const [showCoordinates, setShowCoordinates] = useState(false);
  const [showGetFeatureInfo, setShowGetFeatureInfo] = useState(false);
  const [projeksjoner, setProjeksjoner] = useState<IProsjektion[]>([]);
  const [coordinates, setCoordinates] = useState<Coordinate>();
  const [projection, setProjection] = useState<string>('25833');
  const nodplakatNameRef = useRef<HTMLInputElement>(null);
  const nodplakatStedsnavnRef = useRef<HTMLSelectElement>(null);
  const nodplakatVegRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    axios
      .get(generateProjeksjonerUrl())
      .then(response => {
        setProjeksjoner(response.data);
      })
      .catch(error => {
        console.warn(error);
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
      ])
        .then(responses => {
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
          if (ssrPointUrlResponse.data && ssrPointUrlResponse.data.navn && ssrPointUrlResponse.data.navn.length > 0) {
            setStedsnavn(ssrPointUrlResponse.data as ISsrPunkt);
          } else {
            setStedsnavn({});
          }
        })
        .catch(error => {
          console.warn(error);
        });
      if (showNodplakat) {
        handleGetEmergencyPointInfo();
      }
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
      const coordinates = transform(
        [clickCoordinates?.coordinate[0], clickCoordinates?.coordinate[1]],
        'EPSG:25833',
        'EPSG:4326',
      );
      axios
        .get(generateEmergencyPosterPointUrl(coordinates[1], coordinates[0]))
        .then(response => {
          setEmergencyPointInfo(response.data);
        })
        .catch(error => {
          console.warn(error);
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

  const replaceNorwegianChars = (emergencyPosterServiceUrl: string) => {
    emergencyPosterServiceUrl = emergencyPosterServiceUrl.replace(/%C2%B0/g, '%B0'); // °
    emergencyPosterServiceUrl = emergencyPosterServiceUrl.replace(/%C3%A6/g, '%E6'); // æ
    emergencyPosterServiceUrl = emergencyPosterServiceUrl.replace(/%C3%B8/g, '%F8'); // ø
    emergencyPosterServiceUrl = emergencyPosterServiceUrl.replace(/%C3%A5/g, '%E5'); // å
    emergencyPosterServiceUrl = emergencyPosterServiceUrl.replace(/%C3%86/g, '%C6'); // Æ
    emergencyPosterServiceUrl = emergencyPosterServiceUrl.replace(/%C3%98/g, '%D8'); // Ø
    emergencyPosterServiceUrl = emergencyPosterServiceUrl.replace(/%C3%85/g, '%C5'); // Å
    emergencyPosterServiceUrl = emergencyPosterServiceUrl.replace(/%C3%A9/g, '%E9'); // é
    emergencyPosterServiceUrl = emergencyPosterServiceUrl.replace(/%C3%89/g, '%C9'); // É
    emergencyPosterServiceUrl = emergencyPosterServiceUrl.replace(/%C3%84/g, '%C4'); // Ä
    emergencyPosterServiceUrl = emergencyPosterServiceUrl.replace(/%C3%A4/g, '%E4'); // ä
    emergencyPosterServiceUrl = emergencyPosterServiceUrl.replace(/%C3%96/g, '%D6'); // Ö
    emergencyPosterServiceUrl = emergencyPosterServiceUrl.replace(/%C3%B6/g, '%F6'); // ö
    emergencyPosterServiceUrl = emergencyPosterServiceUrl.replace(/%C3%9C/g, '%DC'); // Ü
    emergencyPosterServiceUrl = emergencyPosterServiceUrl.replace(/%C3%BC/g, '%FC'); // ü
    return emergencyPosterServiceUrl;
  };

  const downloadEmergencyPoster = (e: React.FormEvent) => {
    e.preventDefault();
    if (clickCoordinates && clickCoordinates.coordinate && clickCoordinates.center && clickCoordinates.extent) {
      const googleCoordinates = transform(clickCoordinates.coordinate, clickCoordinates.epsg, 'EPSG:4326');
      const UTM = getUTMZoneFromGeographicPoint(googleCoordinates[0], googleCoordinates[1]);
      const localUTMPoint = transform(clickCoordinates.coordinate, clickCoordinates.epsg, UTM.epsg);
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
        locationName:
          nodplakatNameRef.current && nodplakatNameRef.current.value.length > 1
            ? nodplakatNameRef.current.value
            : nodplakatStedsnavnRef.current
            ? nodplakatStedsnavnRef.current.value
            : '',
        position1: geographicalText(googleCoordinates[1]) + ' nord',
        position2: geographicalText(googleCoordinates[0]) + ' øst',
        street: nodplakatVegRef.current ? nodplakatVegRef.current.value : '',
        place: nodplakatStedsnavnRef.current ? nodplakatStedsnavnRef.current.value : '',
        matrikkel: emergencyPointInfo.matrikkelnr + ' i ' + emergencyPointInfo.kommune,
        utm: 'Sone ' + UTM.sone + ' Ø ' + Math.round(localUTMPoint[0]) + ' N ' + Math.round(localUTMPoint[1]),
        posDez: 'N' + googleCoordinates[1].toPrecision(6) + '° - Ø' + googleCoordinates[0].toPrecision(6) + '°',
        map: generateMapLinkServiceUrl(emergencyMapConfig),
      };
      const url = replaceNorwegianChars(generateEmergencyPosterServiceUrl(emergencyPosterConfig));
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
          {/* Eiendomsinformasjon */}
          <div className="p-2 bg-light mb-2">
            <div
              onClick={() => {
                setShowMatrikkel(!showMatrikkel);
                setShow(!show);
              }}
              className={style.expandBtn}
            >
              <span className="material-icons-outlined me-1">home</span>
              <span className={style.ellipsisToggle}>{t('seEiendom')}</span>
              <span className="material-icons-outlined">{showStedsnavn ? 'expand_less' : 'expand_more'}</span>
            </div>
          </div>
          {/* Stedsnavn */}
          <div className="p-2 bg-light mb-2">
            <div
              onClick={() => {
                setShowStedsnavn(!showStedsnavn);
                setShow(!show);
              }}
              className={style.expandBtn}
            >
              <span className="material-icons-outlined me-1">flag</span>
              <span className={style.ellipsisToggle}>{t('ssrFakta')}</span>
              <span className="material-icons-outlined">{showStedsnavn ? 'expand_less' : 'expand_more'}</span>
            </div>
          </div>
          {/* Koordinater */}
          <div className="p-2 bg-light mb-2">
            <div
              onClick={() => {
                setShowCoordinates(!showCoordinates);
                setShow(!show);
              }}
              className={style.expandBtn}
            >
              <span className="material-icons-outlined me-1">place</span>
              <span className={style.ellipsisToggle}>{t('koordTrans')}</span>
              <span className="material-icons-outlined">{showCoordinates ? 'expand_less' : 'expand_more'}</span>
            </div>
          </div>
          {/* Turkart */}
          <div className="p-2 bg-light mb-2">
            <div
              onClick={() => {
                setShowTurkart(!showTurkart);
                setShow(!show);
              }}
              className={style.expandBtn}
            >
              <span className="material-icons-outlined me-1">blind</span>
              <span className={style.ellipsisToggle}>{t('lagTurkart')}</span>
              <span className="material-icons-outlined">{showTurkart ? 'expand_less' : 'expand_more'}</span>
            </div>
          </div>
          {/* Fargeleggingskart */}
          {/*
          <div className="p-2 bg-light mb-2">
            <div
              onClick={() => {
                setShowFargeleggingskart(!showFargeleggingskart);
                setShow(!show);
              }}
              className={style.expandBtn}
            >
              <span className="material-icons-outlined me-1">brush</span>
              <span className={style.ellipsisToggle}>{t('lagFargeleggingskart')}</span>
              <span className="material-icons-outlined">{showFargeleggingskart ? 'expand_less' : 'expand_more'}</span>
            </div>
          </div> */}
          {/* Nodplakat */}
          <div className="p-2 bg-light mb-2">
            <div
              onClick={() => {
                setShowNodplakat(!showNodplakat);
                setShow(!show);
                handleGetEmergencyPointInfo();
              }}
              className={style.expandBtn}
            >
              <span className="material-icons-outlined me-1">emergency</span>
              <span className={style.ellipsisToggle}>{t('lagNodplakat')}</span>
              <span className="material-icons-outlined">{showNodplakat ? 'expand_less' : 'expand_more'}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Koordinater open */}
      <div className={showCoordinates ? `${style.selected} ${style.open}` : style.selected}>
        <div className="p-2 bg-light mb-2">
          <div
            onClick={() => {
              setShowCoordinates(!showCoordinates);
              setShow(!show);
            }}
            className={style.expandBtn}
          >
            <span className="material-icons-outlined me-1">place</span>
            <span className={style.ellipsisToggle}>{t('koordTrans')}</span>
            <span className="material-icons-outlined">{showCoordinates ? 'expand_less' : 'expand_more'}</span>
          </div>
          {projeksjoner && coordinates ? (
            <div>
              <span className="small"> {t('koord_info')}</span>
              <select className="dropdown" onChange={e => handleTransform(e)} value={projection}>
                {projeksjoner.map((result, index) => (
                  <option value={result.epsg} key={index}>
                    EPSG:{result.epsg} - {result.name}
                  </option>
                ))}
              </select>
              <div className="container mt-3">
                <div className="row">
                  <div className="col-4">{t('koord_nord')}</div>
                  <div className="col-8">{round(coordinates[1], 2)}</div>
                </div>
                <div className="row">
                  <div className="col-4">{t('koord_ost')}:</div>
                  <div className="col-8">{round(coordinates[0], 2)}</div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {/* Turkart open */}
      <div className={showTurkart ? `${style.selected} ${style.open}` : style.selected}>
        <div className="p-2 bg-light mb-2">
          <div
            onClick={() => {
              setShowTurkart(!showTurkart);
              setShow(!show);
            }}
            className={style.expandBtn}
          >
            <span className="material-icons-outlined me-1">blind</span>
            <span className={style.ellipsisToggle}>{t('lagTurkart')}</span>
            <span className="material-icons-outlined">{showTurkart ? 'expand_less' : 'expand_more'}</span>
          </div>
        </div>
        {showTurkart ? <Turkart /> : null}
      </div>
      {/* Fargeleggingskart open */}
      {/*
      <div className={showFargeleggingskart ? `${style.selected} ${style.open}` : style.selected}>
        <div className="p-2 bg-light mb-2">
          <div
            onClick={() => {
              setShowFargeleggingskart(!showFargeleggingskart);
              setShow(!show);
            }}
            className={style.expandBtn}
          >
            <span className="material-icons-outlined me-1">brush</span>
            <span className={style.ellipsisToggle}>{t('lagFargeleggingskart')}</span>
            <span className="material-icons-outlined">{showFargeleggingskart ? 'expand_less' : 'expand_more'}</span>
          </div>
        </div>
      </div>
      */}
      {/* Nodplakat open */}
      <div className={showNodplakat ? `${style.selected} ${style.open}` : style.selected}>
        <div className="p-2 bg-light mb-2">
          <div
            onClick={() => {
              setShowNodplakat(!showNodplakat);
              setShow(!show);
            }}
            className={style.expandBtn}
          >
            <span className="material-icons-outlined me-1">emergency</span>
            <span className={style.ellipsisToggle}>{t('Nodplakat')}</span>
            <span className="material-icons-outlined">{showNodplakat ? 'expand_less' : 'expand_more'}</span>
          </div>
          <div className={showNodplakat1 ? `${style.selected} ${style.open}` : style.selected}>
            <h4 className=""> {t('Ansvar')}</h4>
            <p className="body-text body-text--xs text-wrap" style={{ width: '40rem' }}>
              {' '}
              {t('NodplakatText1')}
            </p>
            <p className="body-text body-text--xs text-wrap" style={{ width: '40rem' }}>
              {' '}
              {t('NodplakatText2')}
            </p>
            <p className="body-text body-text--xs text-wrap" style={{ width: '40rem' }}>
              {' '}
              {t('NodplakatText3')}
            </p>
            <button
              className="button button__green--primary button--xs"
              onClick={() => {
                setShowNodplakat1(false);
                setShowNodplakat2(true);
              }}
            >
              {t('AcceptAndContinue')}
            </button>
          </div>
          <div className={showNodplakat2 ? `${style.selected} ${style.open}` : style.selected}>
            <form id="form" onSubmit={downloadEmergencyPoster}>
              <div className="inputField__wrapper">
                <label className="label label--sml" htmlFor="nodplakatName">
                  {t('GiPunktetNavn')}
                </label>
                <input
                  id="nodplakatName"
                  type="text"
                  ref={nodplakatNameRef}
                  className="inputField"
                  value={nodplakatName}
                  onChange={e => setNodplakatName(e.target.value)}
                />
              </div>
              <div className="">
                <label className="label label--sml  label--dropdown" htmlFor="nodplakatStedsnavn">
                  {t('PlaceIs')}
                </label>
                {stedsnavn.navn ? (
                  <select
                    id="nodplakatStedsnavn"
                    ref={nodplakatStedsnavnRef}
                    className="dropdown"
                    onChange={e => setNodplakatStedsnavn(e.target.value)}
                    value={nodplakatStedsnavn}
                  >
                    {stedsnavn?.navn?.map((result, index) => (
                      <option value={result.stedsnavn && result.stedsnavn[0].skrivemåte} key={index}>
                        {result.stedsnavn && result.stedsnavn[0].skrivemåte}
                      </option>
                    ))}
                  </select>
                ) : null}
              </div>
              <div className="">
                <label className="label label--sml label--dropdown" htmlFor="nodplakatVeg">
                  {t('FoundRoadIs')}
                </label>
                {emergencyPointInfo ? (
                  <select
                    id="nodplakatVeg"
                    ref={nodplakatVegRef}
                    className="dropdown"
                    onChange={e => setNodplakatVeg(e.target.value)}
                    value={nodplakatVeg}
                  >
                    {emergencyPointInfo?.vegliste?.map((veg: string, index: number) => (
                      <option value={veg} key={index}>
                        {veg}
                      </option>
                    ))}
                  </select>
                ) : null}
              </div>
              <div className="mb-4">
                {t('In')} {emergencyPointInfo.kommune} {t('Municipality')}
              </div>
              <button className="button button__green--primary button--xs" type="submit">
                {t('downloadEmergencyPoster')}
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* GetFeatureInfo */}
      <div className={showGetFeatureInfo ? `${style.selected} ${style.open}` : style.selected}>
        <div className="p-2 bg-light mb-2">
          <div
            onClick={() => {
              setShowGetFeatureInfo(!showGetFeatureInfo);
              setShow(!show);
            }}
            className={style.expandBtn}
          >
            <span className={style.ellipsisToggle}>{t('koordTrans')}</span>
            <span className="material-icons-outlined">{showGetFeatureInfo ? 'expand_less' : 'expand_more'}</span>
          </div>
        </div>
      </div>
      {/* Eiendomsinformasjon open */}
      <div className={showMatrikkel ? `${style.selected} pointInfo` : style.selected}>
        <div className="p-2 bg-light mb-2">
          <div
            onClick={() => {
              setShowMatrikkel(!showMatrikkel);
              setShow(!show);
            }}
            className={style.expandBtn}
          >
            <span className="material-icons-outlined me-1">home</span>
            <span className={style.ellipsisToggle}>{t('seEiendom')}</span>
            <span className="material-icons-outlined">{showMatrikkel ? 'expand_less' : 'expand_more'}</span>
          </div>
        </div>
        {matrikkel && matrikkel.GARDSNR ? (
          <div>
            <div className="container margin-bottom">
              <div className="row bg-light">
                <div className="col-4">Kommunenr:</div>
                <div className="col-8">{matrikkel.KOMMUNENR}</div>
              </div>
              <div className="row">
                <div className="col-4">Gårdsnr:</div>
                <div className="col-8">{matrikkel.GARDSNR}</div>
              </div>
              <div className="row bg-light">
                <div className="col-4">Bruksnr:</div>
                <div className="col-8">{matrikkel.BRUKSNR}</div>
              </div>
              <div className="row">
                <div className="col-4">Festenr:</div>
                <div className="col-8">{matrikkel.FESTENR}</div>
              </div>
              <div className="row bg-light">
                <div className="col-4">Type:</div>
                <div className="col-8">{matrikkel.EIENDOMSTYPE}</div>
              </div>
              <div className="row mt-3">
                <a
                  className="button button__green--tertiary button--xs"
                  href={`https://seeiendom.kartverket.no/eiendom/${matrikkel.KOMMUNENR}/${matrikkel.GARDSNR}/${matrikkel.BRUKSNR}/${matrikkel.FESTENR}/${matrikkel.SEKSJONSNR}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t('showMoreInformation')}
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div>{t('seEiendom_no_results')}</div>
        )}
      </div>
      {/* Stedsnavn open */}
      <div className={showStedsnavn ? `${style.selected} pointInfo` : style.selected}>
        <div className="p-2 bg-light mb-2">
          <div
            onClick={() => {
              setShowStedsnavn(!showStedsnavn);
              setShow(!show);
            }}
            className={style.expandBtn}
          >
            <span className="material-icons-outlined me-1">flag</span>
            <span className={style.ellipsisToggle}>{t('ssrFakta')}</span>
            <span className="material-icons-outlined">{showStedsnavn ? 'expand_less' : 'expand_more'}</span>
          </div>
        </div>
        {stedsnavn.navn ? (
          <ul className="list-group list-group-flush">
            {stedsnavn?.navn?.map((result, index) => (
              <li key={index} className="list-group-item list-group-item-action pt-2 pb-2">
                <div className="">
                  <div>{result.stedsnavn && result.stedsnavn[0].skrivemåte}</div>
                  <div className="text-muted">
                    {t('Stedsnummer')}:{' '}
                    <a
                      className="button button__green--tertiary button--xs"
                      href={generateFaktaarkUrl(result.stedsnummer)}
                      target="_blank"
                      rel="noreferrer"
                    >
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
          <div> {t('ssrFakta_no_results')}</div>
        )}
      </div>
    </>
  );
};

export default PointInfo;
