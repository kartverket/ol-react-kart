import React, { useEffect, useState } from 'react';
import { useEventSelector } from '../../index';
import { useTranslation } from 'react-i18next';
import { selectClickCoordinates } from '../../MapCore/Events/getClickCoordinatesSlice';
import { generateHoydedataPointUrl } from '../../utils/n3api';
import axios from 'axios';

export interface IPunktInfo {
  datakilde: string,
  terreng: string,
  x: number,
  y: number,
  z: number
}
export interface IHoydeResult {
  koordsys?: number,
  punkter?: IPunktInfo[]
}
const PointInfo = () => {
  const { t } = useTranslation();
  const clickCoordinates = useEventSelector(selectClickCoordinates);

  const [elevation, setElevation] = useState<IHoydeResult>({});

  useEffect(() => {
    if (clickCoordinates && clickCoordinates.coordinate) {
      const elevationUrl = generateHoydedataPointUrl(
        clickCoordinates?.coordinate[0].toString(), 
        clickCoordinates?.coordinate[1].toString(), '25833')
        axios.get(elevationUrl).then(function (response) {
          console.log(response.data);
          setElevation(response.data as IHoydeResult);
        });
    }
  },[clickCoordinates]);
  return (
    <>
      {elevation && elevation.punkter && elevation.punkter.length > 0 && elevation.punkter[0].z?
        <> 
          <span>{t('HeightEstimatedByInterpolation_text')}{elevation.punkter[0].z} {t('MetersAboveSeaLevel')}</span>
          <span className='text-lowercase'> ({elevation.punkter[0]?.terreng?.replace(/(.+?)([A-Z])/g,'$1 $2')})</span>
        </>
       : null}
      <p className='fs-5 text-uppercase'>{t('hva_vil_du_gjore')}</p>
    </>
  )
}

export default PointInfo;