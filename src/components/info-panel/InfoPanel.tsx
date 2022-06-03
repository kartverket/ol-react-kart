import React from 'react';
import { useAppSelector, useAppDispatch, useEventSelector } from '../../index';
import { selectSearch } from '../search/searchSlice';
import { useTranslation } from 'react-i18next';
import SearchResultsList from './SearchResultsList';
import PointInfo from './PointInfo';
import { selectClickCoordinates } from '../../MapCore/Events/getClickCoordinatesSlice';


const InfoPanel = () => {
  const { t } = useTranslation();

  const searchResult = useAppSelector(selectSearch);
  const clickCoordinates = useEventSelector(selectClickCoordinates);
  console.log('clickCoordinates', clickCoordinates);
  // const dispatch = useAppDispatch();

  // const toggleShowActiveProjectFromList = (): void => {
  //   dispatch(showActiveProjectFromList());
  // }

  return (
    <>
      {clickCoordinates && clickCoordinates?.coordinate || searchResult && searchResult.geoNorge?.navn ? 
        <div className='border border-1 shadow rounded'>
          <div className='m-2'>
            {searchResult && searchResult.geoNorge?.navn ? 
              <SearchResultsList /> : null
            }
            {clickCoordinates && clickCoordinates.coordinate ?
              <PointInfo /> : null  
            }
          
          </div>
        </div>
      :null}
      
    </>
  )
}

export default InfoPanel;