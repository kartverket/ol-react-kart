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
      <div>
        <div onClick={() => setStateSsr(!expandedSsr)} className={style.expandBtn}>
          <span className={style.ellipsisToggle}>{t('searchResult_placenames')}</span>
          <span className="material-icons-outlined">{expandedSsr ? 'expand_less' : 'expand_more'}</span>
        </div>
        <div className={expandedSsr ? `${style.selected} ${style.open}` : style.selected}>
          {searchResult.ssr ? (
            <ul className="list-group list-group-flush">
              {searchResult?.ssr?.navn?.map((result, index) => (
                <li
                  key={index}
                  className="list-group-item pt-2 pb-2"
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

      <div>
        <div onClick={() => setStateAdress(!expandedAdress)} className={style.expandBtn}>
          <span className={style.ellipsisToggle}>{t('searchResult_addresses')}</span>
          <span className="material-icons-outlined">{expandedAdress ? 'expand_less' : 'expand_more'}</span>
        </div>
        <div className={expandedAdress ? `${style.selected} ${style.open}` : style.selected}>
          {searchResult.adresser ? (
            <ul className="list-group list-group-flush scrollarea">
              {searchResult?.adresser?.adresser?.map((result, index) => (
                <li
                  key={index}
                  className="list-group-item pt-2 pb-2"
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

      <div>
        <div onClick={() => setStateMatrikkel(!expandedMatrikkel)} className={style.expandBtn}>
          <span className={style.ellipsisToggle}>Eiendom</span>
          <span className="material-icons-outlined">{expandedMatrikkel ? 'expand_less' : 'expand_more'}</span>
        </div>
        <div className={expandedMatrikkel ? `${style.selected} ${style.open}` : style.selected}>
          {searchResult.matrikkel ? (
            <ul className="list-group list-group-flush scrollarea">
              {searchResult?.matrikkel?.adresser?.map((result, index) => (
                <li
                  key={index}
                  className="list-group-item pt-2 pb-2"
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
