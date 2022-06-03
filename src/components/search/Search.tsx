// const { API_KEY } = process.env;
const API_URL = 'https://ws.geonorge.no/stedsnavn/v1/navn?sok=';
import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IGeoNorge } from './search-model';
import { useAppDispatch, useEventDispatch } from '../../index';
import { setResult } from '../search/searchSlice';
import { setClickCoordinates } from '../../MapCore/Events/getClickCoordinatesSlice';

function Search() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const appDispatch = useAppDispatch();
  const eventDispatch = useEventDispatch();

  useEffect(() => {
    if (query) {
      axios.get(`${API_URL}${query}*&treffPerSide=15&side=1`).then((response) => {
        const r:IGeoNorge = response.data; 
        appDispatch(setResult(r));
        console.table(r.navn);
      });
    }
    },[query, appDispatch]);

  const handleInputChange = () => {
    console.log('SEARCH: ', search?.value);
    if (search?.value) {
      setQuery(search?.value)
      eventDispatch(setClickCoordinates({}));
    } else {
      appDispatch(setResult({}));
      eventDispatch(setClickCoordinates({}));
    }
  };
  let search:HTMLInputElement|null;

    return (
      <>
        <div className="input-group mb-3 shadow bg-body rounded" style={{height: '50px'}}>
          <button className='btn btn-outline-secondary border border-end-0'
            onClick={() => {
              console.log('menu click');
              const mySidenav = document.getElementById("mySidenav");
              const sideMenuPosition = document.getElementById("sideMenuPosition");
              if (mySidenav !== null && sideMenuPosition != null) {
                  mySidenav.style.width = "395px";
                  sideMenuPosition.style.width = "395px";
        
                  mySidenav.style.overflowY = "auto";
              }
            }}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          <input style={{ width: '350px' }} className="border border-start-0 border-end-0"
            placeholder={t('search_text')}
            ref={input => (search = input)}
            onChange={handleInputChange}
          />
          {/* <Suggestions results={this.state.results} /> */}
          <span className='input-group-text border-start-0 bg-transparent border'
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