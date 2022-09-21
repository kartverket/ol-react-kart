import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IProject, IProjectList } from '../../../MapCore/Models/config-model';
import { RootState } from '../../../app/store';

const initialState: IProjectList = {
  projects: [],
  status: 'loading',
  showActiveProject: false,
  activeProject: {
    SiteTitle: 'friluftsliv',
    ProjectName: 'friluftsliv',
    HeaderIcon: '',
    HeaderTitle: 'friluftsliv',
    Config: {
      name: 'norgeskart',
      layer: [
        {
          distributionProtocol: 'WMS',
          type: 'overlay',
          gatekeeper: true,
          name: 'fotruter',
          url: 'https://wms.geonorge.no/skwms1/wms.friluftsruter2?',
          legendurl: 'https://wms.geonorge.no/skwms1/wms.friluftsruter2?',
          groupid: 5,
          params: {
            layers: 'Fotrute',
            format: 'image/png',
          },
          guid: '5.Fotrute',
          options: {
            isbaselayer: false,
            singletile: true,
            visibility: false,
          },
          includedfields: {
            capitalize: true,
            field: [
              {
                name: 'belysning',
              },
              {
                name: 'rutenavn',
              },
              {
                name: 'rutenummer',
              },
              {
                name: 'vedlikeholdsansvarlig',
              },
              {
                name: 'merking_d',
                alias: 'Merking',
              },
              {
                name: 'spesialrutetype_d',
                alias: 'Spesialrutetype',
              },
              {
                name: 'gradering_d',
                alias: 'Vanskelig',
              },
            ],
          },
        },
        {
          distributionProtocol: 'WMS',
          type: 'overlay',
          gatekeeper: true,
          name: 'Ruteinfopunkt',
          url: 'https://wms.geonorge.no/skwms1/wms.friluftsruter2?',
          legendurl: 'https://wms.geonorge.no/skwms1/wms.friluftsruter2?',
          groupid: 5,
          params: {
            layers: 'Ruteinfopunkt',
            format: 'image/png',
          },
          guid: '5.Fotrute',
          options: {
            isbaselayer: false,
            singletile: true,
            visibility: false,
          },
          includedfields: {
            capitalize: true,
            field: [
              {
                name: 'objtype',
                alias: 'Rutetype',
              },
              {
                name: 'informasjon',
              },
              {
                name: 'vedlikeholdsansvarlig',
              },
              {
                name: 'ruteinfoid',
                alias: 'Rutenummer',
              },
              {
                name: 'description',
                alias: 'tilrettelegging',
              },
            ],
          },
        },
        {
          distributionProtocol: 'WMS',
          type: 'overlay',
          gatekeeper: true,
          name: 'skiloyper',
          url: 'https://wms.geonorge.no/skwms1/wms.friluftsruter2?',
          legendurl: 'https://wms.geonorge.no/skwms1/wms.friluftsruter2?',
          groupid: 5,
          params: {
            layers: 'Skiloype',
            format: 'image/png',
          },
          guid: '5.Skiloype',
          options: {
            isbaselayer: false,
            singletile: true,
            visibility: false,
          },
          includedfields: {
            capitalize: true,
            field: [
              {
                name: 'belysning',
              },
              {
                name: 'rutenavn',
              },
              {
                name: 'rutenummer',
              },
              {
                name: 'vedlikeholdsansvarlig',
              },
              {
                name: 'merking_d',
                alias: 'Merking',
              },
              {
                name: 'spesialrutetype_d',
                alias: 'Spesialrutetype',
              },
              {
                name: 'gradering_d',
                alias: 'Vanskelig',
              },
            ],
          },
        },
        {
          distributionProtocol: 'WMS',
          type: 'overlay',
          gatekeeper: true,
          name: 'sykkelruter',
          url: 'https://wms.geonorge.no/skwms1/wms.friluftsruter2?',
          legendurl: 'https://wms.geonorge.no/skwms1/wms.friluftsruter2?',
          groupid: 5,
          params: {
            layers: 'Sykkelrute',
            format: 'image/png',
          },
          guid: '5.Sykkelrute',
          options: {
            isbaselayer: false,
            singletile: true,
            visibility: false,
          },
          includedfields: {
            capitalize: true,
            field: [
              {
                name: 'belysning',
              },
              {
                name: 'rutenavn',
              },
              {
                name: 'rutenummer',
              },
              {
                name: 'vedlikeholdsansvarlig',
              },
              {
                name: 'merking_d',
                alias: 'Merking',
              },
              {
                name: 'spesialrutetype_d',
                alias: 'Spesialrutetype',
              },
              {
                name: 'gradering_d',
                alias: 'Vanskelig',
              },
            ],
          },
        },
        {
          distributionProtocol: 'WMS',
          type: 'overlay',
          gatekeeper: true,
          name: 'annenruter',
          url: 'https://wms.geonorge.no/skwms1/wms.friluftsruter2?',
          legendurl: 'https://wms.geonorge.no/skwms1/wms.friluftsruter2?',
          groupid: 5,
          params: {
            layers: 'AnnenRute',
            format: 'image/png',
          },
          guid: '5.AnnenRute',
          options: {
            isbaselayer: false,
            singletile: true,
            visibility: false,
          },
          includedfields: {
            capitalize: true,
            field: [
              {
                name: 'belysning',
              },
              {
                name: 'rutenavn',
              },
              {
                name: 'rutenummer',
              },
              {
                name: 'vedlikeholdsansvarlig',
              },
              {
                name: 'merking_d',
                alias: 'Merking',
              },
              {
                name: 'spesialrutetype_d',
                alias: 'Spesialrutetype',
              },
              {
                name: 'gradering_d',
                alias: 'Vanskelig',
              },
            ],
          },
        },
        {
          distributionProtocol: 'WMS',
          type: 'overlay',
          gatekeeper: true,
          name: 'historisk_ferdselsrute',
          url: 'https://wms.geonorge.no/skwms1/wms.friluftsruter2?',
          legendurl: 'https://wms.geonorge.no/skwms1/wms.friluftsruter2?',
          groupid: 6,
          params: {
            layers: 'Historisk',
            format: 'image/png',
          },
          guid: '6.Historisk',
          options: {
            isbaselayer: false,
            singletile: true,
            visibility: false,
          },
          includedfields: {
            capitalize: true,
            field: [
              {
                name: 'belysning',
              },
              {
                name: 'rutenavn',
              },
              {
                name: 'rutenummer',
              },
              {
                name: 'vedlikeholdsansvarlig',
              },
              {
                name: 'merking_d',
                alias: 'Merking',
              },
              {
                name: 'spesialrutetype_d',
                alias: 'Spesialrutetype',
              },
              {
                name: 'gradering_d',
                alias: 'Vanskelig',
              },
            ],
          },
        },
        {
          distributionProtocol: 'WMS',
          type: 'overlay',
          gatekeeper: true,
          name: 'kyststi',
          url: 'https://wms.geonorge.no/skwms1/wms.friluftsruter2?',
          legendurl: 'https://wms.geonorge.no/skwms1/wms.friluftsruter2?',
          groupid: 6,
          params: {
            layers: 'Kyststi',
            format: 'image/png',
          },
          guid: '6.Kyststi',
          options: {
            isbaselayer: false,
            singletile: true,
            visibility: false,
          },
          includedfields: {
            capitalize: true,
            field: [
              {
                name: 'belysning',
              },
              {
                name: 'rutenavn',
              },
              {
                name: 'rutenummer',
              },
              {
                name: 'vedlikeholdsansvarlig',
              },
              {
                name: 'merking_d',
                alias: 'Merking',
              },
              {
                name: 'spesialrutetype_d',
                alias: 'Spesialrutetype',
              },
              {
                name: 'gradering_d',
                alias: 'Vanskelig',
              },
            ],
          },
        },
        {
          distributionProtocol: 'WMS',
          type: 'overlay',
          gatekeeper: true,
          name: 'kultursti',
          url: 'https://wms.geonorge.no/skwms1/wms.friluftsruter2?',
          legendurl: 'https://wms.geonorge.no/skwms1/wms.friluftsruter2?',
          groupid: 6,
          params: {
            layers: 'Kultursti',
            format: 'image/png',
          },
          guid: '6.Kultursti',
          options: {
            isbaselayer: false,
            singletile: true,
            visibility: false,
          },
          includedfields: {
            capitalize: true,
            field: [
              {
                name: 'belysning',
              },
              {
                name: 'rutenavn',
              },
              {
                name: 'rutenummer',
              },
              {
                name: 'vedlikeholdsansvarlig',
              },
              {
                name: 'merking_d',
                alias: 'Merking',
              },
              {
                name: 'spesialrutetype_d',
                alias: 'Spesialrutetype',
              },
              {
                name: 'gradering_d',
                alias: 'Vanskelig',
              },
            ],
          },
        },
        {
          distributionProtocol: 'WMS',
          type: 'overlay',
          gatekeeper: true,
          name: 'natursti',
          url: 'https://wms.geonorge.no/skwms1/wms.friluftsruter2?',
          legendurl: 'https://wms.geonorge.no/skwms1/wms.friluftsruter2?',
          groupid: 6,
          params: {
            layers: 'Natursti',
            format: 'image/png',
          },
          guid: '6.Natursti',
          options: {
            isbaselayer: false,
            singletile: true,
            visibility: false,
          },
          includedfields: {
            capitalize: true,
            field: [
              {
                name: 'belysning',
              },
              {
                name: 'rutenavn',
              },
              {
                name: 'rutenummer',
              },
              {
                name: 'vedlikeholdsansvarlig',
              },
              {
                name: 'merking_d',
                alias: 'Merking',
              },
              {
                name: 'spesialrutetype_d',
                alias: 'Spesialrutetype',
              },
              {
                name: 'gradering_d',
                alias: 'Vanskelig',
              },
            ],
          },
        },
        {
          distributionProtocol: 'WMS',
          type: 'overlay',
          gatekeeper: true,
          name: 'trimloype',
          url: 'https://wms.geonorge.no/skwms1/wms.friluftsruter2?',
          legendurl: 'https://wms.geonorge.no/skwms1/wms.friluftsruter2?',
          groupid: 6,
          params: {
            layers: 'Trimloype',
            format: 'image/png',
          },
          guid: '6.Trimloype',
          options: {
            isbaselayer: false,
            singletile: true,
            visibility: false,
          },
          includedfields: {
            capitalize: true,
            field: [
              {
                name: 'belysning',
              },
              {
                name: 'rutenavn',
              },
              {
                name: 'rutenummer',
              },
              {
                name: 'vedlikeholdsansvarlig',
              },
              {
                name: 'merking_d',
                alias: 'Merking',
              },
              {
                name: 'spesialrutetype_d',
                alias: 'Spesialrutetype',
              },
              {
                name: 'gradering_d',
                alias: 'Vanskelig',
              },
            ],
          },
        },
        {
          distributionProtocol: 'WMS',
          type: 'overlay',
          gatekeeper: true,
          name: 'fotrute_type_ikke_angitt',
          url: 'https://wms.geonorge.no/skwms1/wms.friluftsruter2?',
          legendurl: 'https://wms.geonorge.no/skwms1/wms.friluftsruter2?',
          groupid: 6,
          params: {
            layers: 'Fotrutetypeikkeangitt',
            format: 'image/png',
          },
          guid: '6.Fotrutetypeikkeangitt',
          options: {
            isbaselayer: false,
            singletile: true,
            visibility: false,
          },
          includedfields: {
            capitalize: true,
            field: [
              {
                name: 'belysning',
              },
              {
                name: 'rutenavn',
              },
              {
                name: 'rutenummer',
              },
              {
                name: 'vedlikeholdsansvarlig',
              },
              {
                name: 'merking_d',
                alias: 'Merking',
              },
              {
                name: 'spesialrutetype_d',
                alias: 'Spesialrutetype',
              },
              {
                name: 'gradering_d',
                alias: 'Vanskelig',
              },
            ],
          },
        },
        {
          distributionProtocol: 'WMS',
          type: 'overlay',
          gatekeeper: true,
          name: 'Maskinpreparert',
          url: 'https://wms.geonorge.no/skwms1/wms.friluftsruter2?',
          legendurl: 'https://wms.geonorge.no/skwms1/wms.friluftsruter2?',
          groupid: 7,
          params: {
            layers: 'Maskinpreparert',
            format: 'image/png',
          },
          guid: '7.Maskinpreparert',
          options: {
            isbaselayer: false,
            singletile: true,
            visibility: false,
          },
          includedfields: {
            capitalize: true,
            field: [
              {
                name: 'merking_d',
                alias: 'Merking',
              },
              {
                name: 'rutenavn',
              },
              {
                name: 'rutenummer',
              },
              {
                name: 'vedlikeholdsansvarlig',
              },
              {
                name: 'belysning',
              },
              {
                name: 'spesialrutetype_d',
                alias: 'Spesialrutetype',
              },
              {
                name: 'gradering_d',
                alias: 'Vanskelig',
              },
              {
                name: 'antallskispor',
              },
              {
                name: 'tilpasning_d',
                alias: 'tilpassing',
              },
              {
                name: 'preparering_d',
                alias: 'preparering',
              },
            ],
          },
        },
        {
          distributionProtocol: 'WMS',
          type: 'overlay',
          gatekeeper: true,
          name: 'Snøskuter',
          url: 'https://wms.geonorge.no/skwms1/wms.friluftsruter2?',
          legendurl: 'https://wms.geonorge.no/skwms1/wms.friluftsruter2?',
          groupid: 7,
          params: {
            layers: 'Snoskuter',
            format: 'image/png',
          },
          guid: '7.Snøskuter',
          options: {
            isbaselayer: false,
            singletile: true,
            visibility: false,
          },
          includedfields: {
            capitalize: true,
            field: [
              {
                name: 'merking_d',
                alias: 'Merking',
              },
              {
                name: 'rutenavn',
              },
              {
                name: 'rutenummer',
              },
              {
                name: 'vedlikeholdsansvarlig',
              },
              {
                name: 'belysning',
              },
              {
                name: 'spesialrutetype_d',
                alias: 'Spesialrutetype',
              },
              {
                name: 'gradering_d',
                alias: 'Vanskelig',
              },
              {
                name: 'antallskispor',
              },
              {
                name: 'tilpasning_d',
                alias: 'tilpassing',
              },
              {
                name: 'preparering_d',
                alias: 'preparering',
              },
            ],
          },
        },
        {
          distributionProtocol: 'WMS',
          type: 'overlay',
          gatekeeper: true,
          name: 'Upreparert',
          url: 'https://wms.geonorge.no/skwms1/wms.friluftsruter2?',
          legendurl: 'https://wms.geonorge.no/skwms1/wms.friluftsruter2?',
          groupid: 7,
          params: {
            layers: 'Upreparert',
            format: 'image/png',
          },
          guid: '7.Upreparert',
          options: {
            isbaselayer: false,
            singletile: true,
            visibility: false,
          },
          includedfields: {
            capitalize: true,
            field: [
              {
                name: 'merking_d',
                alias: 'Merking',
              },
              {
                name: 'rutenavn',
              },
              {
                name: 'rutenummer',
              },
              {
                name: 'vedlikeholdsansvarlig',
              },
              {
                name: 'belysning',
              },
              {
                name: 'spesialrutetype_d',
                alias: 'Spesialrutetype',
              },
              {
                name: 'gradering_d',
                alias: 'Vanskelig',
              },
              {
                name: 'antallskispor',
              },
              {
                name: 'tilpasning_d',
                alias: 'tilpassing',
              },
              {
                name: 'preparering_d',
                alias: 'preparering',
              },
            ],
          },
        },
        {
          distributionProtocol: 'WMS',
          type: 'overlay',
          gatekeeper: true,
          name: 'Preparering ikke angitt',
          url: 'https://wms.geonorge.no/skwms1/wms.friluftsruter2?',
          legendurl: 'https://wms.geonorge.no/skwms1/wms.friluftsruter2?',
          groupid: 7,
          params: {
            layers: 'Ingen_info',
            format: 'image/png',
          },
          guid: '7.Preparering ikke angitt',
          options: {
            isbaselayer: false,
            singletile: true,
            visibility: false,
          },
          includedfields: {
            capitalize: true,
            field: [
              {
                name: 'merking_d',
                alias: 'Merking',
              },
              {
                name: 'rutenavn',
              },
              {
                name: 'rutenummer',
              },
              {
                name: 'vedlikeholdsansvarlig',
              },
              {
                name: 'belysning',
              },
              {
                name: 'spesialrutetype_d',
                alias: 'Spesialrutetype',
              },
              {
                name: 'gradering_d',
                alias: 'Vanskelig',
              },
              {
                name: 'antallskispor',
              },
              {
                name: 'tilpasning_d',
                alias: 'tilpassing',
              },
              {
                name: 'preparering_d',
                alias: 'preparering',
              },
            ],
          },
        },
        {
          distributionProtocol: 'GEOJSON',
          type: 'overlay',
          name: 'kommunenes_fjelltopper',
          url: 'https://www.norgeskart.no/json/tema/kommunefjell/Kommunefjell2018.geojson',
          epsg: 'EPSG:25833',
          groupid: 3,
          params: {
            format: 'application/json',
          },
          guid: '3.Kommunenes fjelltopper',
          options: {
            visibility: false,
          },
          style: {
            regularshape: {
              fill: {
                color: '#000000',
              },
              points: 3,
              radius: 9,
            },
          },
        },
      ],
      maplayer: [
        {
          index: 3,
          name: 'fakta',
          groupid: 3,
        },
        {
          index: 5,
          name: 'tur_og_friluftsruter',
          groupid: 5,
        },
        {
          index: 6,
          name: 'fotrutetype',
          groupid: 6,
        },
        {
          index: 7,
          name: 'Skiløypepreparering',
          groupid: 7,
        },
      ],
    },
  },
  setToggleLayer: [],
  setToggleGroup: [],
  setActiveProject: [],
  showActiveProjectFromList: [],
  toggleTileLayer: [],
};

export const projectsListSlice = createSlice({
  name: 'projectsList',
  initialState,
  reducers: {
    addProjectList: (state, action: PayloadAction<IProject>) => {
      if (state.status === 'loading') {
        state.projects.push(action.payload);
      }
    },
    setStatusDone: state => {
      state.status = 'done';
    },
    showActiveProjectFromList: state => {
      state.showActiveProject = !state.showActiveProject;
    },
    setActiveProject: (state, action: PayloadAction<IProject>) => {
      state.activeProject = action.payload;
    },
  },
});

export const { addProjectList, setStatusDone, showActiveProjectFromList, setActiveProject } = projectsListSlice.actions;

//selectors
export const selectProjectsList = (state: RootState) => {
  return state.projectsList.projects;
};

export const selectShowActiveProject = (state: RootState) => {
  return state.projectsList.showActiveProject;
};

export const selectActiveProject = (state: RootState) => {
  return state.projectsList.activeProject;
};
