import React from 'react';
import { useAppSelector, useEventDispatch } from '../../index';
import { selectSearch } from '../search/searchSlice';
import { setCenter } from '../../MapCore/Project/projectSlice';

const SearchResultsList = () => {

  const searchResult = useAppSelector(selectSearch);
  const dispatch = useEventDispatch();

  return (
    <>
    {searchResult.geoNorge ?
      <ul className="list-group list-group-flush">
        {searchResult?.geoNorge?.navn?.map((result, index) =>
          <li key={index} className="list-group-item pt-2 pb-2" 
          onClick={() => dispatch(setCenter([result.representasjonspunkt.øst,result.representasjonspunkt.nord]))}>
            <span>{result.skrivemåte}, {result.navneobjekttype} {result.kommuner ? 'i ' + result.kommuner[0].kommunenavn : null}
            </span>
          </li>
          )} 
      </ul>
    : null}
    </>
  )
}

export default SearchResultsList;