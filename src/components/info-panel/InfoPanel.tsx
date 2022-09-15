import React from 'react';

import { useTranslation } from 'react-i18next';

import { selectClickCoordinates } from '../../MapCore/Events/getClickCoordinatesSlice';
import { useAppSelector, useEventSelector } from '../../index';
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
        <div className="infopanel border border-1 bg-white shadow rounded mt-4">
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
