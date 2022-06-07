import React from 'react';
import { useAppSelector, useAppDispatch, useEventSelector } from '../../index';
import { selectSearch } from '../search/searchSlice';
import { useTranslation } from 'react-i18next';
import { selectClickCoordinates } from '../../MapCore/Events/getClickCoordinatesSlice';


const PointInfo = () => {
  const { t } = useTranslation();
  const clickCoordinates = useEventSelector(selectClickCoordinates);
  // const searchResult = useAppSelector(selectSearch);
  // console.log('Search result: ', searchResult);
  // const dispatch = useAppDispatch();

  // const toggleShowActiveProjectFromList = (): void => {
  //   dispatch(showActiveProjectFromList());
  // }

  return (
    <>
      <h4>PointInfo</h4>
      {clickCoordinates && clickCoordinates.coordinate ? 
        <div>Coordinates: {clickCoordinates?.coordinate[0]}, {clickCoordinates?.coordinate[1]} </div>
       : null}
    </>
  )
}

export default PointInfo;