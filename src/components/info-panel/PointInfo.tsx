import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useEventSelector } from '../../index';
import { selectClickCoordinates } from '../../MapCore/Events/getClickCoordinatesSlice';
import { generateHoydedataPointUrl } from '../../utils/n3api';

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

  useEffect(() => {
    if (clickCoordinates && clickCoordinates.coordinate) {
      const elevationUrl = generateHoydedataPointUrl(
        clickCoordinates?.coordinate[0].toString(),
        clickCoordinates?.coordinate[1].toString(),
        '25833',
      );
      axios.get(elevationUrl).then(function (response) {
        console.log(response.data);
        setElevation(response.data as IHoydeResult);
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
