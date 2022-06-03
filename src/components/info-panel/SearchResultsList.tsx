import React from 'react';
import { useAppSelector, useAppDispatch } from '../../index';
import { selectSearch } from '../search/searchSlice';
import { useTranslation } from 'react-i18next';


const SearchResultsList = () => {
  const { t } = useTranslation();

  const searchResult = useAppSelector(selectSearch);
  console.log('Search result: ', searchResult);
  // const dispatch = useAppDispatch();

  // const toggleShowActiveProjectFromList = (): void => {
  //   dispatch(showActiveProjectFromList());
  // }

  return (
    <>
    {searchResult.geoNorge ?
      <ul className="list-group list-group-flush">
        {searchResult?.geoNorge?.navn?.map((result, index) => 
          <li key={index} className="list-group-item pt-2 pb-2 text-capitalize">
            <span>{result.skrivemåte}
            {/* , {result.kommuner[0]?.kommunenavn} */}
            </span>
          </li>
          )} 
      </ul>
    : null}
    </>
  )
}

export default SearchResultsList;