import React from 'react';
import { useAppSelector, useEventSelector } from '../../index';
import { selectSearch } from '../search/searchSlice';
import { useTranslation } from 'react-i18next';
import SearchResultsList from './SearchResultsList';
import PointInfo from './PointInfo';
import { selectClickCoordinates } from '../../MapCore/Events/getClickCoordinatesSlice';


const InfoPanel = () => {
  const { t } = useTranslation();

  const searchResult = useAppSelector(selectSearch);
  const clickCoordinates = useEventSelector(selectClickCoordinates);

  return (
    <>
      {clickCoordinates && clickCoordinates?.coordinate || searchResult && searchResult.geoNorge?.navn ? 
        <div style={{ width: '428px' }} className='border border-1 shadow rounded'>
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