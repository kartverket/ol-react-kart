import axios from 'axios';
import { transform } from 'ol/proj';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IAdresser, ISsrPunkt } from '../../components/search/search-model';
import { useEventSelector } from '../../index';
import { selectClickCoordinates } from '../../MapCore/Events/getClickCoordinatesSlice';
import {
  generateAdressePunktsokUrl,
  generateHoydedataPointUrl,
  generateMatrikkelInfoUrl,
  generatStedsnavnPunktsok,
} from '../../utils/n3api';
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
  const [matrikkel, setMatrikkel] = useState<IHoydeResult>({});
  const [eiendom, setEiendom] = useState<IHoydeResult>({});
  const [stedsnavn, setStedsnavn] = useState<ISsrPunkt>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);
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
      //const eiendomAddress = generateEiendomAddress(clickCoordinates?.coordinate[0].toString(), clickCoordinates?.coordinate[1].toString(), '25833')

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
        setMatrikkel(matrikkelInfoUrlResponse.data as IHoydeResult);
        //setEiendom(responses[2].data as IHoydeResult);
        setStedsnavn(ssrPointUrlResponse.data as ISsrPunkt);
      });
    }
  }, [clickCoordinates]);
  return (
    <>
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
      {matrikkel && matrikkel.punkter && matrikkel.punkter.length > 0 ? (
        <>
          <span className="small">
            {t('Matrikkel_text')}
            {matrikkel.punkter[0].datakilde}
          </span>
          <span className="text-lowercase small">
            {' '}
            ({matrikkel.punkter[0]?.terreng?.replace(/(.+?)([A-Z])/g, '$1 $2')})
          </span>
        </>
      ) : null}
      {stedsnavn && stedsnavn.navn && stedsnavn.navn.length > 0 ? (
        <>
          <span className="small">
            {t('Stedsnavn_text')}
            {stedsnavn.navn[0].stedsnavn ? stedsnavn.navn[0].stedsnavn[0].skrivemåte : null}
          </span>
          <span className="text-lowercase small">
            {' '}
            <a href={'https://stadnamn.kartverket.no/fakta/' + stedsnavn.navn[0].stedsnummer} target="_blank" rel="noreferrer" >  {stedsnavn.navn[0].stedsnummer}</a>
          </span>
        </>
      ) : null}
      {/* {eiendom && eiendom.punkter && eiendom.punkter.length > 0 ? (
        <>
          <span className="small">
            {t('Eiendom_text')}
            {eiendom.punkter[0].datakilde}
          </span>
          <span className="text-lowercase small">
            {' '}
            ({eiendom.punkter[0]?.terreng?.replace(/(.+?)([A-Z])/g, '$1 $2')})
          </span>
        </>
      ) : null} */}
      <p className="fs-5 mt-3 ms-2">{t('hva_vil_du_gjore')}</p>
      <div className="d-flex flex-column">
        <div className="p-2 bg-light w-100 mb-2">
          <span>{t('seEiendom')}</span>
        </div>
        <div className="p-2 bg-light w-100 mb-2">
          <span>{t('ssrFakta')}</span>
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
    </>
  );
};

export default PointInfo;
