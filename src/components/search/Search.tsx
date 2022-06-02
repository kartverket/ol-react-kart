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
            placeholder="Søk på stedsnavn..."
            ref={input => (this.search = input)}
            onChange={this.handleInputChange}
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
}

export default Search;