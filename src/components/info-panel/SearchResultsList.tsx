import React from 'react';
import { useAppSelector, useEventDispatch } from '../../index';
import { setCenter } from '../../MapCore/Project/projectSlice';
import { selectSearch } from '../search/searchSlice';

const SearchResultsList = () => {
  const searchResult = useAppSelector(selectSearch);
  const dispatch = useEventDispatch();

  return (
    <>
      {searchResult.ssr ? (
        <ul className="list-group list-group-flush">
          {searchResult?.ssr?.navn?.map((result, index) => (
            <li
              key={index}
              className="list-group-item pt-2 pb-2"
              onClick={() => dispatch(setCenter(result.representasjonspunkt))}
            >
              <span>
                {result.skrivemåte}, {result.navneobjekttype}{' '}
                {result.kommuner ? 'i ' + result.kommuner[0].kommunenavn : null}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
      {searchResult.adresser ? (
        <ul className="list-group list-group-flush">
          {searchResult?.adresser?.adresser?.map((result, index) => (
            <li
              key={index}
              className="list-group-item pt-2 pb-2"
              onClick={() => dispatch(setCenter(result.representasjonspunkt))}
            >
              <span>
                Adresse {result.adressetekst}, {result.objtype} {result.kommunenavn ? 'i ' + result.kommunenavn : null}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};

export default SearchResultsList;
