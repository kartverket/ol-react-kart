const { API_KEY } = process.env;
const API_URL = 'https://ws.geonorge.no/stedsnavn/v1/navn?sok=';
import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { Component } from 'react';
class Search extends Component {
  state = {
    query: '',
    results: {},
  };

  getInfo = () => {
    axios.get(`${API_URL}${this.state.query}*&treffPerSide=15&side=1`).then(({ data }) => {
      this.setState({
        results: data.navn,
      });
    });
  };

  handleInputChange = () => {
    this.setState(
      {
        query: this.search.value,
      },
      () => {
        if (this.state.query && this.state.query.length > 1) {
          this.getInfo();
          const stedsNavnArray: any = this.state.results;
          // const stedsNavn = stedsNavnArray.forEach((element: { skrivemåte: any; }) => {
          //     return element.skrivemåte;
          // });
          console.table(stedsNavnArray);
        }
      },
    );
  };
  search: any;

  render() {
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
          placeholder="Søk på stedsnavn..."
          ref={input => (this.search = input)}
          onChange={this.handleInputChange}
        />
        {/* <Suggestions results={this.state.results} /> */}
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
  }
}

export default Search;
