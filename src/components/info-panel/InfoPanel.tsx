import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useEventSelector } from '../../index';
import { selectClickCoordinates } from '../../MapCore/Events/getClickCoordinatesSlice';
import { selectSearch } from '../search/searchSlice';
import PointInfo from './PointInfo';
import SearchResultsList from './SearchResultsList';

const InfoPanel = () => {
  const { t } = useTranslation();

  const searchResult = useAppSelector(selectSearch);
  const clickCoordinates = useEventSelector(selectClickCoordinates);

  return (
    <>
      {(clickCoordinates && clickCoordinates?.coordinate) || (searchResult && searchResult.ssr?.navn) ? (
        <div style={{ width: '428px' }} className="border border-1 bg-white shadow rounded">
          <div className="m-2">
            {searchResult && searchResult.ssr?.navn ? <SearchResultsList /> : null}
            {clickCoordinates && clickCoordinates.coordinate ? <PointInfo /> : null}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default InfoPanel;
