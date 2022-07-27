import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useEventDispatch } from '../../index';
import { setCenter } from '../../MapCore/Project/projectSlice';
import { selectSearch } from '../search/searchSlice';
import style from './SearchBar.module.scss';

const SearchResultsList = () => {
  const { t } = useTranslation();
  const searchResult = useAppSelector(selectSearch);
  const dispatch = useEventDispatch();
  const [expandedAdress, setStateAdress] = useState(false);
  const [expandedSsr, setStateSsr] = useState(false);
  const [expandedMatrikkel, setStateMatrikkel] = useState(false);

  return (
    <>
      <div id="ssrResult" className='search-result ps-2'>
        <div onClick={() => setStateSsr(!expandedSsr)} className={style.expandBtn}>
          <span className={style.ellipsisToggle}>{t('searchResult_placenames')}</span>
          <span className="badge text-bg-secondary">{ searchResult?.ssr?.metadata?.totaltAntallTreff || 0 }</span>
          <span className="ps-2 material-icons-outlined">{expandedSsr ? 'expand_less' : 'expand_more'}</span>
        </div>
        <div className={expandedSsr ? `${style.selected} ${style.open}` : style.selected}>
          {searchResult.ssr ? (
            <ul className="list-group list-group-flush search-result-list">
              {searchResult?.ssr?.navn?.map((result, index) => (
                <li
                  key={index}
                  className="list-group-item pt-2 pb-2 search-result-list-item"
                  onClick={() =>
                    dispatch(
                      setCenter({
                        lon: result.representasjonspunkt.øst,
                        lat: result.representasjonspunkt.nord,
                        epsg: result.representasjonspunkt.koordsys,
                      }),
                    )
                  }
                >
                  <span>
                    {result.skrivemåte}, {result.navneobjekttype}{' '}
                    {result.kommuner ? 'i ' + result.kommuner[0].kommunenavn : null}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <div id="addressREsult" className='search-result ps-2'>
        <div onClick={() => setStateAdress(!expandedAdress)} className={style.expandBtn}>
          <span className={style.ellipsisToggle}>{t('searchResult_addresses')}</span>
          <span className="badge text-bg-secondary">{ searchResult?.adresser?.metadata?.totaltAntallTreff || 0 }</span>
          <span className="material-icons-outlined">{expandedAdress ? 'expand_less' : 'expand_more'}</span>
        </div>
        <div className={expandedAdress ? `${style.selected} ${style.open}` : style.selected}>
          {searchResult.adresser ? (
            <ul className="list-group list-group-flush search-result-list">
              {searchResult?.adresser?.adresser?.map((result, index) => (
                <li
                  key={index}
                  className="list-group-item pt-2 pb-2 search-result-list-item"
                  onClick={() => dispatch(setCenter(result.representasjonspunkt))}
                >
                  <span>
                    Adresse {result.adressetekst}, {result.objtype}{' '}
                    {result.kommunenavn ? 'i ' + result.kommunenavn : null}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <div id="matrikkelResult" className='search-result ps-2'>
        <div onClick={() => setStateMatrikkel(!expandedMatrikkel)} className={style.expandBtn}>
          <span className={style.ellipsisToggle}>Eiendom</span>
          <span className="badge text-bg-secondary">{ searchResult?.matrikkel?.metadata?.totaltAntallTreff || 0 }</span>
          <span className="material-icons-outlined">{expandedMatrikkel ? 'expand_less' : 'expand_more'}</span>
        </div>
        <div className={expandedMatrikkel ? `${style.selected} ${style.open}` : style.selected}>
          {searchResult.matrikkel ? (
            <ul className="list-group list-group-flush search-result-list">
              {searchResult?.matrikkel?.adresser?.map((result, index) => (
                <li
                  key={index}
                  className="list-group-item pt-2 pb-2 search-result-list-item"
                  onClick={() => dispatch(setCenter(result.representasjonspunkt))}
                >
                  <span>
                    Adresse {result.adressetekst}, {result.objtype}{' '}
                    {result.kommunenavn ? 'i ' + result.kommunenavn : null}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default SearchResultsList;
