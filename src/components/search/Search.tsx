// const { API_KEY } = process.env;
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useEventDispatch } from '../../index';
import { setClickCoordinates } from '../../MapCore/Events/getClickCoordinatesSlice';
import {
  generateAdresseSokUrl,
  generateSearchMatrikkelAdresseUrl,
  generateSearchStedsnavnUrl,
} from '../../utils/n3api';
import { useGlobalStore } from '../../app/globalStore';
import { setAdresseResult, setMatrikkelResult, setSsrResult } from '../search/searchSlice';
import { IAdresser, ISsr } from './search-model';

const Search = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState(useGlobalStore(state => state.sok));
  const appDispatch = useAppDispatch();
  const eventDispatch = useEventDispatch();
  const [reset, setReset] = useState(false);
  const searchInput = useRef<HTMLInputElement>(null);
  const setSok = useGlobalStore(state => state.setSok);

  useEffect(() => {
    if (query) {
      const side = 1;
      const antall = 15;
      const searchStedsnavnUrl = generateSearchStedsnavnUrl(query, side, antall);
      const searchAdresseUrl = generateAdresseSokUrl(query);
      const searchMatrikkelAdresseUrl = generateSearchMatrikkelAdresseUrl(query);

      Promise.all([
        axios.get(searchStedsnavnUrl),
        axios.get(searchAdresseUrl),
        axios.get(searchMatrikkelAdresseUrl),
      ]).then(responses => {
        const [url1rest, url2resp, url3resp] = responses;
        const s: ISsr = url1rest.data;
        const a: IAdresser = url2resp.data;
        const m: IAdresser = url3resp.data;
        appDispatch(setSsrResult(s));
        appDispatch(setAdresseResult(a));
        appDispatch(setMatrikkelResult(m));
        setSok(query);
      });
    }
  }, [query, appDispatch]);

  const handleInputChange = (value: string) => {
    setReset(true);
    if (value) {
      setQuery(value);
      eventDispatch(setClickCoordinates({}));
    } else {
      appDispatch(setSsrResult({}));
      appDispatch(setAdresseResult({}));
      appDispatch(setMatrikkelResult({}));
      eventDispatch(setClickCoordinates({}));
    }
  };
  const resetHandler = () => {
    setReset(false);
    setQuery('');
    setSok('');
    appDispatch(setSsrResult({}));
    appDispatch(setAdresseResult({}));
    appDispatch(setMatrikkelResult({}));
    eventDispatch(setClickCoordinates({}));
  };

  return (
    <div className="container container-md" style={{ width: '250rem' }}>
      <div className="searchbar__wrapper">
        <button
          className="button button__menu"
          onClick={() => {
            const mySidenav = document.getElementById('mySidenav');
            const sideMenuPosition = document.getElementById('sideMenuPosition');
            if (mySidenav !== null && sideMenuPosition != null) {
              mySidenav.style.width = '395px';
              sideMenuPosition.style.width = '395px';
              mySidenav.style.overflowY = 'auto';
            }
          }}
        >
          <span className="material-icons-outlined">menu</span>
        </button>
        <div className="inputField__wrapper">
          <input
            type="text"
            className="inputField"
            placeholder={t('search_text')}
            ref={searchInput}
            value={query}
            onClick={() => {
              eventDispatch(setClickCoordinates({}));
            }}
            onChange={e => handleInputChange(e.target.value)}
          />
        </div>
        {reset && (
          <button
            className="btn btn-outline-secondary border border-start-0 menu-icon"
            onClick={() => {
              resetHandler();
            }}
          >
            <span className="material-icons">close</span>
          </button>
        )}
        {/* <Suggestions results={this.state.results} /> */}
        <button
          className="button button__searchbar"
          onClick={() => {
            console.log('search click');
          }}
        >
          <span
            className="material-icons-outlined"
            onClick={() => {
              console.log('menu click');
            }}
          >
            search
          </span>
        </button>
      </div>
    </div>
  );
};

export default Search;
