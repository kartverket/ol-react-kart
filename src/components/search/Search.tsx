const { API_KEY } = process.env;
const API_URL = 'https://ws.geonorge.no/stedsnavn/v1/navn?sok=';
import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { Component } from 'react';

type RepresentasjonsPunkt = {
  koordsys: number;
  nord: number;
  øst: number;
};

type Fylke = { fylkesnavn: string; fylkesnummer: string };
type Kommune = { kommunenummer: string; kommunenavn: string };
interface StedsNavn {
  skrivemåte: string;
  skrivemåtestatus: string;
  navnestatus: string;
  språk: string;
  navneobjekttype: string;
  stedsnummer: number;
  stedstatus: string;
  representasjonspunkt: RepresentasjonsPunkt;
  fylker: Fylke;
  kommuner: Kommune;
}

interface Metadata {
  treffPerSide: number;
  side: number;
  totaltAntallTreff: number;
  viserFra: number;
  viserTil: number;
  sokeStreng: string;
}

type GeoNorge = {
  metadata: Metadata;
  navn: StedsNavn[];
};

class Search extends Component {
  state = {
    query: '',
    results: {},
  };

  getInfo = async () => {
    try {
      await axios.get(`${API_URL}${this.state.query}*&treffPerSide=15&side=1`).then(({ data }) => {
        this.setState({
          results: data.navn,
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  handleInputChange = () => {
    this.setState(
      {
        query: this.search.value,
      },
      () => {
        if (this.state.query && this.state.query.length > 1) {
          this.getInfo();
          const data: any = this.state.results;

          console.table(data);
          const geoNorgeResult: StedsNavn[] = data;
          console.log('her kommer stedsnavn: ', geoNorgeResult);
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
          // onChange={(s) => this.setState({ selected: s })}
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
