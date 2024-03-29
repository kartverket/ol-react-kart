import React from 'react';

import { selectClickCoordinates } from '../../MapCore/Events/getClickCoordinatesSlice';
import { useAppSelector, useEventSelector } from '../../index';
import { selectSearch } from '../search/searchSlice';
import PointInfo from './PointInfo';
import SearchResultsList from './SearchResultsList';

const InfoPanel = () => {
  const searchResult = useAppSelector(selectSearch);
  const clickCoordinates = useEventSelector(selectClickCoordinates);

  return (
    <>
      {(clickCoordinates && clickCoordinates?.coordinate) || (searchResult && searchResult.ssr?.navn) ? (
        <div className="infopanel bg-white shadow rounded">
          <div className="m-1">
            {searchResult && searchResult.ssr?.navn ? <SearchResultsList /> : null}
            {clickCoordinates && clickCoordinates.coordinate ? <PointInfo /> : null}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default InfoPanel;
