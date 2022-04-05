import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const SearchInput = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const response = await axios.get('https://reqres.in/api/users');
      console.log(response.data.data);
      setUsers(response.data.data);
    };
    loadUsers();
  }, []);

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
        placeholder={t('search_text')}
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
