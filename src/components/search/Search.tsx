// const { API_KEY } = process.env;
import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useEventDispatch } from '../../index';
import { setClickCoordinates } from '../../MapCore/Events/getClickCoordinatesSlice';
import { generateSearchStedsnavnUrl } from '../../utils/n3api';
import { setResult } from '../search/searchSlice';
import { IGeoNorge } from './search-model';

function Search() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const appDispatch = useAppDispatch();
  const eventDispatch = useEventDispatch();

  useEffect(() => {
    if (query) {
      const side = 1;
      const antall = 15;
      const searchUrl = generateSearchStedsnavnUrl(query, side, antall);
      axios.get(searchUrl).then(response => {
        const r: IGeoNorge = response.data;
        appDispatch(setResult(r));
        console.table(r.navn);
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
          className="btn btn-outline-secondary border border-end-0"
          onClick={() => {
            console.log('menu click');
            const mySidenav = document.getElementById('mySidenav');
            const sideMenuPosition = document.getElementById('sideMenuPosition');
            if (mySidenav !== null && sideMenuPosition != null) {
              mySidenav.style.width = '395px';
              sideMenuPosition.style.width = '395px';
              mySidenav.style.overflowY = 'auto';
            }
          }}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <input
          style={{ width: '350px' }}
          className="border border-start-0 border-end-0"
          placeholder={t('search_text')}
          ref={input => (search = input)}
          onClick={() => {
            if (search?.value) setQuery('\t' + query);
            eventDispatch(setClickCoordinates({}));
          }}
          onChange={handleInputChange}
        />
        {/* <Suggestions results={this.state.results} /> */}
        <span
          className="input-group-text border-start-0 bg-transparent border"
          onClick={() => {
            console.log('search click');
          }}
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            onClick={() => {
              console.log('menu click');
            }}
          />
        </span>
      </div>
    </>
  );
}

export default Search;
