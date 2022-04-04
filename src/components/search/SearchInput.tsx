import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
const SearchInput = () => {
  return (
    <>
      <button
        onClick={() => {
          console.log('menu click');
        }}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <input
        type="text"
        onChange={() => {
          console.log('searchbox type');
        }}
        alt="Søkeboks"
        placeholder="Søk i Norgeskart"
      />
      <button
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
      </button>
    </>
  );
};

export default SearchInput;
