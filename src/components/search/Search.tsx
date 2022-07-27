// const { API_KEY } = process.env;
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useEventDispatch } from '../../index';
import { setClickCoordinates } from '../../MapCore/Events/getClickCoordinatesSlice';
import {
  generateAdresseSokUrl,
  generateSearchMatrikkelAdresseUrl,
  generateSearchStedsnavnUrl,
} from '../../utils/n3api';
import { setAdresseResult, setMatrikkelResult, setSsrResult } from '../search/searchSlice';
import { IAdresser, ISsr } from './search-model';

function Search() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const appDispatch = useAppDispatch();
  const eventDispatch = useEventDispatch();

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
      });
    }
  }, [query, appDispatch]);

  const handleInputChange = () => {
    console.log('SEARCH: ', search?.value);
    if (search?.value) {
      setQuery(search?.value);
      eventDispatch(setClickCoordinates({}));
    } else {
      // appDispatch(setResult({}));
      eventDispatch(setClickCoordinates({}));
    }
  };
  let search: HTMLInputElement | null;

  return (
    <>
      <div className="input-group mb-3 shadow bg-body rounded" style={{ height: '50px' }}>
        <button
          className="btn btn-outline-secondary border border-end-0 menu-icon"
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
        <input
          style={{ width: '350px' }}
          className="border border-start-0 border-end-0 ps-2"
          placeholder={t('search_text')}
          ref={input => (search = input)}
          onClick={() => {
            if (search?.value) setQuery('\t' + query);
            eventDispatch(setClickCoordinates({}));
          }}
          onChange={handleInputChange}
        />
        {/* <Suggestions results={this.state.results} /> */}
        <button
          className="input-group-text search-icon"
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
    </>
  );
}

export default Search;
