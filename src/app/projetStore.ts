import create from 'zustand';

import { IProjectList } from '../MapCore/Models/config-model';

export const useProjectStore = create<IProjectList>((set) => ({
  projects: [
    {
      SiteTitle: 'eiendom',
      ProjectName: 'eiendom',
      HeaderIcon: 'home',
      HeaderTitle: 'eiendom',
      Config: {
        name: 'eiendom',
        layer: [
          {
            distributionProtocol: 'WMS',
            gatekeeper: true,
            name: 'adresser',
            url: '//wms.geonorge.no/skwms1/wms.matrikkel.seeiendom2',
            groupid: 1,
            maxResolution: 2,
            params: {
              layers: 'matrikkel:MATRIKKELADRESSEWFS,matrikkel:VEGADRESSEWFS',
              format: 'image/png',
            },
            guid: '1.matrikkeladresse',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: true,
            },
          },
          {
            distributionProtocol: 'WMS',
            gatekeeper: true,
            name: 'bygninger',
            url: '//wms.geonorge.no/skwms1/wms.matrikkel.seeiendom2/?CQL_FILTER=BYGNINGSTATUS<9 OR BYGNINGSTATUS=13',
            groupid: 1,
            maxResolution: 2,
            params: {
              layers: 'matrikkel:BYGNINGWFS',
              format: 'image/png',
            },
            guid: '1.bygning',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: true,
            },
          },
          {
            distributionProtocol: 'WMS',
            gatekeeper: true,
            name: 'teiger_og_grenser',
            url: '//wms.geonorge.no/skwms1/wms.matrikkel.seeiendom2',
            groupid: 1,
            maxResolution: 2,
            params: {
              layers: 'matrikkel:TEIGGRENSEWFS,matrikkel:TEIGWFS',
              format: 'image/png',
              styles: ',Matrikkelnummer',
            },
            guid: '1.teiggrense',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: true,
            },
          },
        ],
        maplayer: [
          {
            index: 1,
            name: 'matrikkel_data',
            groupid: 1,
          },
        ],
      },
    },
    {
      SiteTitle: 'friluftsliv',
      ProjectName: 'friluftsliv',
      HeaderIcon: 'park',
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
    {
      SiteTitle: 'ssr',
      ProjectName: 'ssr',
      HeaderIcon: 'signpost',
      HeaderTitle: 'ssr',
      Config: {
        name: 'ssr',
        layer: [
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'amts­kart',
            url: 'https://wms.geonorge.no/skwms1/wms.historiskekart',
            groupid: 9,
            params: {
              layers: 'amt1',
              format: 'image/png',
            },
            guid: '9.amt1',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'norsk',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 8,
            params: {
              layers: 'norsk',
              format: 'image/png',
            },
            guid: '8.norsk',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'lulesamisk',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 8,
            params: {
              layers: 'lulesamisk',
              format: 'image/png',
            },
            guid: '8.lulesamisk',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'nordsamisk',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 8,
            params: {
              layers: 'nordsamisk',
              format: 'image/png',
            },
            guid: '8.nordsamisk',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'skoltesamisk',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 8,
            params: {
              layers: 'skoltesamisk',
              format: 'image/png',
            },
            guid: '8.skoltesamisk',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'sorsamisk',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 8,
            params: {
              layers: 'sorsamisk',
              format: 'image/png',
            },
            guid: '8.sorsamisk',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'kvensk',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 8,
            params: {
              layers: 'kvensk',
              format: 'image/png',
            },
            guid: '8.kvensk',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'andre',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 8,
            params: {
              layers: 'andre',
              format: 'image/png',
            },
            guid: '8.andre',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'administrative_omrader',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 3,
            params: {
              layers: 'offentlig_administrasjon',
              format: 'image/png',
            },
            guid: '3.offentlig_administrasjon',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'bosetning_eiendom',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 3,
            params: {
              layers: 'bebyggelse',
              format: 'image/png',
            },
            guid: '3.bebyggelse',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'samferdsel',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 3,
            params: {
              layers: 'infrastruktur',
              format: 'image/png',
            },
            guid: '3.infrastruktur',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'sjo',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 3,
            params: {
              layers: 'sjo',
              format: 'image/png',
            },
            guid: '3.sjo',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'markslag',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 3,
            params: {
              layers: 'markslag',
              format: 'image/png',
            },
            guid: '3.markslag',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'ferskvann',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 3,
            params: {
              layers: 'ferskvann',
              format: 'image/png',
            },
            guid: '3.ferskvann',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'terrengformer',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 3,
            params: {
              layers: 'terreng',
              format: 'image/png',
            },
            guid: '3.terreng',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'kultur',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 3,
            params: {
              layers: 'kultur',
              format: 'image/png',
            },
            guid: '3.kultur',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'vedtak_siste_24_mnd',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 10,
            params: {
              layers: 'vedtak_24',
              format: 'image/png',
            },
            guid: '10.vedtak_24',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'vedtak_siste_12_mnd',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 10,
            params: {
              layers: 'vedtak_12',
              format: 'image/png',
            },
            guid: '10.vedtak_12',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'vedtak_siste_6_mnd',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 10,
            params: {
              layers: 'vedtak_6',
              format: 'image/png',
            },
            guid: '10.vedtak_6',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'vedtak_siste_3_mnd',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 10,
            params: {
              layers: 'vedtak_3',
              format: 'image/png',
            },
            guid: '10.vedtak_3',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'vedtak_siste_mnd',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 10,
            params: {
              layers: 'vedtak_1',
              format: 'image/png',
            },
            guid: '10.vedtak_1',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'samlevedtak_siste_24_mnd',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 10,
            params: {
              layers: 'samlevedtak24',
              format: 'image/png',
            },
            guid: '10.samlevedtak24',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'samlevedtak_siste_12_mnd',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 10,
            params: {
              layers: 'samlevedtak12',
              format: 'image/png',
            },
            guid: '10.samlevedtak12',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'samlevedtak_siste_6_mnd',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 10,
            params: {
              layers: 'samlevedtak6',
              format: 'image/png',
            },
            guid: '10.samlevedtak6',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'samlevedtak_siste_3_mnd',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 10,
            params: {
              layers: 'samlevedtak3',
              format: 'image/png',
            },
            guid: '10.samlevedtak3',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'samlevedtak_siste_mnd',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 10,
            params: {
              layers: 'samlevedtak1',
              format: 'image/png',
            },
            guid: '10.samlevedtak1',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'vedtatt',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 4,
            order: 10,
            params: {
              layers: 'vedtatt',
              format: 'image/png',
            },
            guid: '4.vedtatt',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'vedtatt_navneledd',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 4,
            order: 9,
            params: {
              layers: 'vedtatt_navneledd',
              format: 'image/png',
            },
            guid: '4.vedtatt_navneledd',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'godkjent',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 4,
            order: 8,
            params: {
              layers: 'godkjent',
              format: 'image/png',
            },
            guid: '4.godkjent',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'internasjonalt',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 4,
            order: 7,
            params: {
              layers: 'internasjonalt',
              format: 'image/png',
            },
            guid: '4.internasjonalt',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'privat',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 4,
            order: 6,
            params: {
              layers: 'privat',
              format: 'image/png',
            },
            guid: '4.privat',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'historisk',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 4,
            order: 5,
            params: {
              layers: 'historisk',
              format: 'image/png',
            },
            guid: '4.historisk',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'foreslatt',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 4,
            order: 4,
            params: {
              layers: 'foreslatt',
              format: 'image/png',
            },
            guid: '4.foreslatt',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'uvurdert',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 4,
            order: 3,
            params: {
              layers: 'uvurdert',
              format: 'image/png',
            },
            guid: '4.uvurdert',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'Avslege namneledd',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 4,
            order: 2,
            params: {
              layers: 'avslatt_navneledd',
              format: 'image/png',
            },
            guid: '4.avslatt_navneledd',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'avslatt',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 4,
            order: 1,
            params: {
              layers: 'avslatt',
              format: 'image/png',
            },
            guid: '4.avslatt',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'navnesakstatus_ubehandlet',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 2,
            params: {
              layers: 'navnesakstatus_ubehandlet',
              format: 'image/png',
            },
            guid: '2.navnesakstatus_ubehandlet',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'skal_ikke_behandles_etter_loven',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 2,
            params: {
              layers: 'skalikkebehandles',
              format: 'image/png',
            },
            guid: '2.skalikkebehandles',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'vedtatt_av_navnemyndighet',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 2,
            params: {
              layers: 'navnemyndighet',
              format: 'image/png',
            },
            guid: '2.navnemyndighet',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'samlevedtak',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 2,
            params: {
              layers: 'samlevedtak',
              format: 'image/png',
            },
            guid: '2.samlevedtak',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'samlevedtak_trukket_tilbake',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 2,
            params: {
              layers: 'samlevedtak_tilbake',
              format: 'image/png',
            },
            guid: '2.samlevedtak_tilbake',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'navnesak_reist',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 2,
            params: {
              layers: 'reist',
              format: 'image/png',
            },
            guid: '2.reist',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'navnesak_vedtak',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 2,
            params: {
              layers: 'navnesak_vedtak',
              format: 'image/png',
            },
            guid: '2.navnesak_vedtak',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'vedtak_utsatt',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 2,
            params: {
              layers: 'vedtakutsatt',
              format: 'image/png',
            },
            guid: '2.vedtakutsatt',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'klage_vedtak_ikke_trukket_tilbake',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 2,
            params: {
              layers: 'klage_ikke_trukket',
              format: 'image/png',
            },
            guid: '2.klage_ikke_trukket',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'klage_vedtak_trukket_tilbake',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 2,
            params: {
              layers: 'klage_trukket',
              format: 'image/png',
            },
            guid: '2.klage_trukket',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'klage_vedtak_utsatt',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 2,
            params: {
              layers: 'klagevedtakutsatt',
              format: 'image/png',
            },
            guid: '2.klagevedtakutsatt',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'forenklet_vedtak',
            url: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.ssr2?',
            groupid: 2,
            params: {
              layers: 'forenkletvedtak',
              format: 'image/png',
            },
            guid: '2.forenkletvedtak',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stedsnavn',
                  name: 'stedsnavn',
                },
                {
                  alias: 'Stedsnummer',
                  name: 'stedsnummer',
                  type: 'link',
                  baseurl: 'https://stadnamn.kartverket.no/fakta/',
                },
              ],
            },
          },
        ],
        maplayer: [
          {
            index: 9,
            name: 'historikk',
            groupid: 9,
          },
          {
            index: 8,
            name: 'sprak',
            groupid: 8,
          },
          {
            index: 3,
            name: 'navnetype',
            groupid: 3,
          },
          {
            index: 10,
            name: 'vedtak',
            groupid: 10,
          },
          {
            index: 4,
            name: 'skrivematestatus',
            groupid: 4,
          },
          {
            index: 2,
            name: 'navnesakstatus',
            groupid: 2,
          },
        ],
      },
    },
    {
      SiteTitle: 'tilgjengelighet',
      ProjectName: 'Tilgjengelighet_title',
      HeaderIcon: 'accessible',
      HeaderTitle: 'tilgjengelighet',
      Config: {
        name: 'tilgjengelighet',
        layer: [
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: true,
              },
            },
            gatekeeper: true,
            name: 'parkerings_omrade',
            url: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            groupid: 6,
            params: {
              layers: 't_parkeringsomrade_r',
              format: 'image/png',
            },
            guid: '6.t_parkeringsomrade_r',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  name: 'tilgjengvurderingrulleauto',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol/',
                  filetype: 'png',
                },
                {
                  alias: 'Registrert',
                  name: 'forstedatafangstdato',
                },
                {
                  alias: 'Oppdatert',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Kapasitet personbiler',
                  name: 'kapasitetpersonbiler',
                },
                {
                  alias: 'Dekke materiale',
                  name: 'dekkemateriale',
                },
                {
                  alias: 'Dekke tilstand',
                  name: 'dekketilstand',
                },
                {
                  alias: 'Dekke fasthet',
                  name: 'dekkefasthet',
                },
                {
                  alias: 'Kapasitet HC',
                  name: 'antalluu',
                },
                {
                  alias: 'Kommentar',
                  name: 'kommentar',
                },
                {
                  alias: 'Bildefil 1',
                  name: 'bildefil1',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 2',
                  name: 'bildefil2',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 3',
                  name: 'bildefil3',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Objekt ID',
                  name: 'objektnr',
                },
                {
                  alias: 'Lokal ID',
                  name: 'lokalid',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: true,
              },
            },
            gatekeeper: true,
            name: 'vei',
            url: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            groupid: 6,
            params: {
              layers: 't_vei_r',
              format: 'image/png',
            },
            guid: '6.t_vei_r',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  name: 'tilgjengvurderingrulleauto',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol/',
                  filetype: 'png',
                },
                {
                  name: 'tilgjengvurderingelrull',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol_el/',
                  filetype: 'png',
                },
                {
                  name: 'tilgjengvurderingsyn',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/syn/',
                  filetype: 'png',
                },
                {
                  alias: 'Registrert',
                  name: 'forstedatafangstdato',
                },
                {
                  alias: 'Oppdatert',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Gatetype',
                  name: 'gatetype',
                },
                {
                  alias: 'Dekke materiale',
                  name: 'dekkemateriale',
                },
                {
                  alias: 'Dekke tilstand',
                  name: 'dekketilstand',
                },
                {
                  alias: 'Dekke fasthet',
                  name: 'dekkefasthet',
                },
                {
                  alias: 'Bredde',
                  name: 'bredde',
                  unit: 'cm',
                },
                {
                  alias: 'Nedsenk 1',
                  name: 'nedsenk1',
                  unit: 'cm',
                },
                {
                  alias: 'Nedsenk 2',
                  name: 'nedsenk2',
                  unit: 'cm',
                },
                {
                  alias: 'Stigning',
                  name: 'stigning',
                  unit: '°',
                },
                {
                  alias: 'Tverrfall',
                  name: 'tverrfall',
                  unit: '°',
                },
                {
                  alias: 'Trapp',
                  name: 'trapp',
                },
                {
                  alias: 'Rekkverk',
                  name: 'rekkverk',
                },
                {
                  alias: 'Trapp kontrast',
                  name: 'trappkontrast',
                },
                {
                  alias: 'Ledelinje',
                  name: 'ledelinje',
                },
                {
                  alias: 'Kommentar',
                  name: 'kommentar',
                },
                {
                  alias: 'Bildefil 1',
                  name: 'bildefil1',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 2',
                  name: 'bildefil2',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 3',
                  name: 'bildefil3',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Objekt ID',
                  name: 'objektnr',
                },
                {
                  alias: 'Lokal ID',
                  name: 'lokalid',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: true,
              },
            },
            gatekeeper: true,
            name: 'hc_parkering',
            url: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            groupid: 6,
            params: {
              layers: 't_HC_parkering_r',
              format: 'image/png',
            },
            guid: '6.t_HC_parkering_r',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  name: 'tilgjengvurderingrulleauto',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol/',
                  filetype: 'png',
                },
                {
                  name: 'tilgjengvurderingelrullestol',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol_el/',
                  filetype: 'png',
                },
                {
                  alias: 'Registrert',
                  name: 'forstedatafangstdato',
                },
                {
                  alias: 'Oppdatert',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Avstand servicebygg',
                  name: 'avstandservicebygg',
                  unit: 'm',
                },
                {
                  alias: 'Skiltet',
                  name: 'skiltet',
                },
                {
                  alias: 'Merket',
                  name: 'merket',
                },
                {
                  alias: 'Bredde',
                  name: 'bredde',
                  unit: 'cm',
                },
                {
                  alias: 'Lengde',
                  name: 'lengde',
                  unit: 'cm',
                },
                {
                  alias: 'Gatelangs parkering',
                  name: 'gatelangsparkering',
                },
                {
                  alias: 'Trygg overgang',
                  name: 'tryggovergang',
                },
                {
                  alias: 'Brukbart betjeningsareal',
                  name: 'brukbartbetjeningsareal',
                },
                {
                  alias: 'Stigning',
                  name: 'stigning',
                  unit: '°',
                },
                {
                  alias: 'Avgift',
                  name: 'avgift',
                },
                {
                  alias: 'Automat høyde',
                  name: 'automathoyde',
                  unit: 'cm',
                },
                {
                  alias: 'Automat tilgjengelig',
                  name: 'tilgjengeligautomat',
                },
                {
                  alias: 'Kommentar',
                  name: 'kommentar',
                },
                {
                  alias: 'Bildefil 1',
                  name: 'bildefil1',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 2',
                  name: 'bildefil2',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 3',
                  name: 'bildefil3',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Objekt ID',
                  name: 'objektnr',
                },
                {
                  alias: 'Lokal ID',
                  name: 'lokalid',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: true,
              },
            },
            gatekeeper: true,
            name: 'inngang_bygg',
            url: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            groupid: 6,
            params: {
              layers: 't_inngangbygg_r_01',
              format: 'image/png',
            },
            guid: '6.t_inngangbygg_r_01',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  name: 'tilgjengvurderingrulleauto',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol/',
                  filetype: 'png',
                },
                {
                  name: 'tilgjengvurderingelrull',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol_el/',
                  filetype: 'png',
                },
                {
                  name: 'tilgjengvurderingsyn',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/syn/',
                  filetype: 'png',
                },
                {
                  alias: 'Registrert',
                  name: 'forstedatafangstdato',
                },
                {
                  alias: 'Oppdatert',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Bygg funksjon',
                  name: 'byggningsfunksjon',
                },
                {
                  alias: 'Avstand til HC-parkering',
                  name: 'avstandhc',
                  unit: 'm',
                },
                {
                  alias: 'Stigning ankomstvei',
                  name: 'stigningadkomstvei',
                  unit: '°',
                },
                {
                  alias: 'Rampe bredde',
                  name: 'rampebredde',
                  unit: 'cm',
                },
                {
                  alias: 'Rampe stigning',
                  name: 'rampestigning',
                  unit: '°',
                },
                {
                  alias: 'Rampe terskel',
                  name: 'rampeterskel',
                  unit: 'cm',
                },
                {
                  alias: 'Håndlist',
                  name: 'handlist',
                },
                {
                  alias: 'Håndlist høyde øvre',
                  name: 'handlisthoydeovre',
                  unit: 'cm',
                },
                {
                  alias: 'Håndlist høyde nedre',
                  name: 'handlisthoydenedre',
                  unit: 'cm',
                },
                {
                  alias: 'Rampe tilgjengelig',
                  name: 'rampetilgjengelig',
                },
                {
                  alias: 'Trapp',
                  name: 'trapp',
                },
                {
                  alias: 'Rekkverk',
                  name: 'rekkverk',
                },
                {
                  alias: 'Trapp kontrast',
                  name: 'trappkontrast',
                },
                {
                  alias: 'Horisontalt felt',
                  name: 'horisontalfelt',
                  unit: 'cm',
                },
                {
                  alias: 'Dørtype',
                  name: 'dortype',
                },
                {
                  alias: 'Døråpner',
                  name: 'dorapner',
                },
                {
                  alias: 'Manøverknapp høyde',
                  name: 'manoverknapphoyde',
                  unit: 'cm',
                },
                {
                  alias: 'Inngang bredde',
                  name: 'breddeinngang',
                  unit: 'cm',
                },
                {
                  alias: 'Terskel høyde',
                  name: 'terskelhoyde',
                },
                {
                  alias: 'Inngang kontrast',
                  name: 'kontrastinngang',
                },
                {
                  alias: 'Kommentar',
                  name: 'kommentar',
                },
                {
                  alias: 'Bildefil 1',
                  name: 'bildefil1',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 2',
                  name: 'bildefil2',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 3',
                  name: 'bildefil3',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Objekt ID',
                  name: 'objektnr',
                },
                {
                  alias: 'Lokal ID',
                  name: 'lokalid',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: true,
              },
            },
            gatekeeper: true,
            name: 'parkerings_omrade',
            url: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            groupid: 9,
            params: {
              layers: 't_parkeringsomrade_el',
              format: 'image/png',
            },
            guid: '9.t_parkeringsomrade_el',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  name: 'tilgjengvurderingrulleauto',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol/',
                  filetype: 'png',
                },
                {
                  alias: 'Registrert',
                  name: 'forstedatafangstdato',
                },
                {
                  alias: 'Oppdatert',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Kapasitet personbiler',
                  name: 'kapasitetpersonbiler',
                },
                {
                  alias: 'Dekke materiale',
                  name: 'dekkemateriale',
                },
                {
                  alias: 'Dekke tilstand',
                  name: 'dekketilstand',
                },
                {
                  alias: 'Dekke fasthet',
                  name: 'dekkefasthet',
                },
                {
                  alias: 'Kapasitet HC',
                  name: 'antalluu',
                },
                {
                  alias: 'Kommentar',
                  name: 'kommentar',
                },
                {
                  alias: 'Bildefil 1',
                  name: 'bildefil1',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 2',
                  name: 'bildefil2',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 3',
                  name: 'bildefil3',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Objekt ID',
                  name: 'objektnr',
                },
                {
                  alias: 'Lokal ID',
                  name: 'lokalid',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: true,
              },
            },
            gatekeeper: true,
            name: 'vei',
            url: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            groupid: 9,
            params: {
              layers: 't_vei_el',
              format: 'image/png',
            },
            guid: '9.t_vei_el',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  name: 'tilgjengvurderingrulleauto',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol/',
                  filetype: 'png',
                },
                {
                  name: 'tilgjengvurderingelrull',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol_el/',
                  filetype: 'png',
                },
                {
                  name: 'tilgjengvurderingsyn',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/syn/',
                  filetype: 'png',
                },
                {
                  alias: 'Registrert',
                  name: 'forstedatafangstdato',
                },
                {
                  alias: 'Oppdatert',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Gatetype',
                  name: 'gatetype',
                },
                {
                  alias: 'Dekke materiale',
                  name: 'dekkemateriale',
                },
                {
                  alias: 'Dekke tilstand',
                  name: 'dekketilstand',
                },
                {
                  alias: 'Dekke fasthet',
                  name: 'dekkefasthet',
                },
                {
                  alias: 'Bredde',
                  name: 'bredde',
                  unit: 'cm',
                },
                {
                  alias: 'Nedsenk 1',
                  name: 'nedsenk1',
                  unit: 'cm',
                },
                {
                  alias: 'Nedsenk 2',
                  name: 'nedsenk2',
                  unit: 'cm',
                },
                {
                  alias: 'Stigning',
                  name: 'stigning',
                  unit: '°',
                },
                {
                  alias: 'Tverrfall',
                  name: 'tverrfall',
                  unit: '°',
                },
                {
                  alias: 'Trapp',
                  name: 'trapp',
                },
                {
                  alias: 'Rekkverk',
                  name: 'rekkverk',
                },
                {
                  alias: 'Trapp kontrast',
                  name: 'trappkontrast',
                },
                {
                  alias: 'Ledelinje',
                  name: 'ledelinje',
                },
                {
                  alias: 'Kommentar',
                  name: 'kommentar',
                },
                {
                  alias: 'Bildefil 1',
                  name: 'bildefil1',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 2',
                  name: 'bildefil2',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 3',
                  name: 'bildefil3',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Objekt ID',
                  name: 'objektnr',
                },
                {
                  alias: 'Lokal ID',
                  name: 'lokalid',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: true,
              },
            },
            gatekeeper: true,
            name: 'hc_parkering',
            url: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            groupid: 9,
            params: {
              layers: 't_HC_parkering_el',
              format: 'image/png',
            },
            guid: '9.t_HC_parkering_el',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  name: 'tilgjengvurderingrulleauto',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol/',
                  filetype: 'png',
                },
                {
                  name: 'tilgjengvurderingelrullestol',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol_el/',
                  filetype: 'png',
                },
                {
                  alias: 'Registrert',
                  name: 'forstedatafangstdato',
                },
                {
                  alias: 'Oppdatert',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Avstand servicebygg',
                  name: 'avstandservicebygg',
                  unit: 'm',
                },
                {
                  alias: 'Skiltet',
                  name: 'skiltet',
                },
                {
                  alias: 'Merket',
                  name: 'merket',
                },
                {
                  alias: 'Bredde',
                  name: 'bredde',
                  unit: 'cm',
                },
                {
                  alias: 'Lengde',
                  name: 'lengde',
                  unit: 'cm',
                },
                {
                  alias: 'Gatelangs parkering',
                  name: 'gatelangsparkering',
                },
                {
                  alias: 'Trygg overgang',
                  name: 'tryggovergang',
                },
                {
                  alias: 'Brukbart betjeningsareal',
                  name: 'brukbartbetjeningsareal',
                },
                {
                  alias: 'Stigning',
                  name: 'stigning',
                  unit: '°',
                },
                {
                  alias: 'Avgift',
                  name: 'avgift',
                },
                {
                  alias: 'Automat høyde',
                  name: 'automathoyde',
                  unit: 'cm',
                },
                {
                  alias: 'Automat tilgjengelig',
                  name: 'tilgjengeligautomat',
                },
                {
                  alias: 'Kommentar',
                  name: 'kommentar',
                },
                {
                  alias: 'Bildefil 1',
                  name: 'bildefil1',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 2',
                  name: 'bildefil2',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 3',
                  name: 'bildefil3',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Objekt ID',
                  name: 'objektnr',
                },
                {
                  alias: 'Lokal ID',
                  name: 'lokalid',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: true,
              },
            },
            gatekeeper: true,
            name: 'inngang_bygg',
            url: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            groupid: 9,
            params: {
              layers: 't_inngangbygg_r_02',
              format: 'image/png',
            },
            guid: '9.t_inngangbygg_r_02',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  name: 'tilgjengvurderingrulleauto',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol/',
                  filetype: 'png',
                },
                {
                  name: 'tilgjengvurderingelrull',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol_el/',
                  filetype: 'png',
                },
                {
                  name: 'tilgjengvurderingsyn',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/syn/',
                  filetype: 'png',
                },
                {
                  alias: 'Registrert',
                  name: 'forstedatafangstdato',
                },
                {
                  alias: 'Oppdatert',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Bygg funksjon',
                  name: 'byggningsfunksjon',
                },
                {
                  alias: 'Avstand til HC-parkering',
                  name: 'avstandhc',
                  unit: 'm',
                },
                {
                  alias: 'Stigning ankomstvei',
                  name: 'stigningadkomstvei',
                  unit: '°',
                },
                {
                  alias: 'Rampe bredde',
                  name: 'rampebredde',
                  unit: 'cm',
                },
                {
                  alias: 'Rampe stigning',
                  name: 'rampestigning',
                  unit: '°',
                },
                {
                  alias: 'Rampe terskel',
                  name: 'rampeterskel',
                  unit: 'cm',
                },
                {
                  alias: 'Håndlist',
                  name: 'handlist',
                },
                {
                  alias: 'Håndlist høyde øvre',
                  name: 'handlisthoydeovre',
                  unit: 'cm',
                },
                {
                  alias: 'Håndlist høyde nedre',
                  name: 'handlisthoydenedre',
                  unit: 'cm',
                },
                {
                  alias: 'Rampe tilgjengelig',
                  name: 'rampetilgjengelig',
                },
                {
                  alias: 'Trapp',
                  name: 'trapp',
                },
                {
                  alias: 'Rekkverk',
                  name: 'rekkverk',
                },
                {
                  alias: 'Trapp kontrast',
                  name: 'trappkontrast',
                },
                {
                  alias: 'Horisontalt felt',
                  name: 'horisontalfelt',
                  unit: 'cm',
                },
                {
                  alias: 'Dørtype',
                  name: 'dortype',
                },
                {
                  alias: 'Døråpner',
                  name: 'dorapner',
                },
                {
                  alias: 'Manøverknapp høyde',
                  name: 'manoverknapphoyde',
                  unit: 'cm',
                },
                {
                  alias: 'Inngang bredde',
                  name: 'breddeinngang',
                  unit: 'cm',
                },
                {
                  alias: 'Terskel høyde',
                  name: 'terskelhoyde',
                },
                {
                  alias: 'Inngang kontrast',
                  name: 'kontrastinngang',
                },
                {
                  alias: 'Kommentar',
                  name: 'kommentar',
                },
                {
                  alias: 'Bildefil 1',
                  name: 'bildefil1',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 2',
                  name: 'bildefil2',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 3',
                  name: 'bildefil3',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Objekt ID',
                  name: 'objektnr',
                },
                {
                  alias: 'Lokal ID',
                  name: 'lokalid',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: true,
              },
            },
            gatekeeper: true,
            name: 'parkerings_omrade',
            url: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            groupid: 8,
            params: {
              layers: 't_parkeringsomrade',
              format: 'image/png',
            },
            guid: '8.t_parkeringsomrade',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  name: 'tilgjengvurderingrulleauto',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol/',
                  filetype: 'png',
                },
                {
                  alias: 'Registrert',
                  name: 'forstedatafangstdato',
                },
                {
                  alias: 'Oppdatert',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Kapasitet personbiler',
                  name: 'kapasitetpersonbiler',
                },
                {
                  alias: 'Dekke materiale',
                  name: 'dekkemateriale',
                },
                {
                  alias: 'Dekke tilstand',
                  name: 'dekketilstand',
                },
                {
                  alias: 'Dekke fasthet',
                  name: 'dekkefasthet',
                },
                {
                  alias: 'Kapasitet HC',
                  name: 'antalluu',
                },
                {
                  alias: 'Kommentar',
                  name: 'kommentar',
                },
                {
                  alias: 'Bildefil 1',
                  name: 'bildefil1',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 2',
                  name: 'bildefil2',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 3',
                  name: 'bildefil3',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Objekt ID',
                  name: 'objektnr',
                },
                {
                  alias: 'Lokal ID',
                  name: 'lokalid',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: true,
              },
            },
            gatekeeper: true,
            name: 'vei',
            url: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            groupid: 8,
            params: {
              layers: 't_vei',
              format: 'image/png',
            },
            guid: '8.t_vei',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  name: 'tilgjengvurderingrulleauto',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol/',
                  filetype: 'png',
                },
                {
                  name: 'tilgjengvurderingelrull',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol_el/',
                  filetype: 'png',
                },
                {
                  name: 'tilgjengvurderingsyn',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/syn/',
                  filetype: 'png',
                },
                {
                  alias: 'Registrert',
                  name: 'forstedatafangstdato',
                },
                {
                  alias: 'Oppdatert',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Gatetype',
                  name: 'gatetype',
                },
                {
                  alias: 'Dekke materiale',
                  name: 'dekkemateriale',
                },
                {
                  alias: 'Dekke tilstand',
                  name: 'dekketilstand',
                },
                {
                  alias: 'Dekke fasthet',
                  name: 'dekkefasthet',
                },
                {
                  alias: 'Bredde',
                  name: 'bredde',
                  unit: 'cm',
                },
                {
                  alias: 'Nedsenk 1',
                  name: 'nedsenk1',
                  unit: 'cm',
                },
                {
                  alias: 'Nedsenk 2',
                  name: 'nedsenk2',
                  unit: 'cm',
                },
                {
                  alias: 'Stigning',
                  name: 'stigning',
                  unit: '°',
                },
                {
                  alias: 'Tverrfall',
                  name: 'tverrfall',
                  unit: '°',
                },
                {
                  alias: 'Trapp',
                  name: 'trapp',
                },
                {
                  alias: 'Rekkverk',
                  name: 'rekkverk',
                },
                {
                  alias: 'Trapp kontrast',
                  name: 'trappkontrast',
                },
                {
                  alias: 'Ledelinje',
                  name: 'ledelinje',
                },
                {
                  alias: 'Kommentar',
                  name: 'kommentar',
                },
                {
                  alias: 'Objekt ID',
                  name: 'objektnr',
                },
                {
                  alias: 'Lokal ID',
                  name: 'lokalid',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: true,
              },
            },
            gatekeeper: true,
            name: 'hc_parkering',
            url: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            groupid: 8,
            params: {
              layers: 't_HC_parkering',
              format: 'image/png',
            },
            guid: '8.t_HC_parkering',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  name: 'tilgjengvurderingrulleauto',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol/',
                  filetype: 'png',
                },
                {
                  name: 'tilgjengvurderingelrullestol',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol_el/',
                  filetype: 'png',
                },
                {
                  alias: 'Registrert',
                  name: 'forstedatafangstdato',
                },
                {
                  alias: 'Oppdatert',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Avstand servicebygg',
                  name: 'avstandservicebygg',
                  unit: 'm',
                },
                {
                  alias: 'Skiltet',
                  name: 'skiltet',
                },
                {
                  alias: 'Merket',
                  name: 'merket',
                },
                {
                  alias: 'Bredde',
                  name: 'bredde',
                  unit: 'cm',
                },
                {
                  alias: 'Lengde',
                  name: 'lengde',
                  unit: 'cm',
                },
                {
                  alias: 'Gatelangs parkering',
                  name: 'gatelangsparkering',
                },
                {
                  alias: 'Trygg overgang',
                  name: 'tryggovergang',
                },
                {
                  alias: 'Brukbart betjeningsareal',
                  name: 'brukbartbetjeningsareal',
                },
                {
                  alias: 'Stigning',
                  name: 'stigning',
                  unit: '°',
                },
                {
                  alias: 'Avgift',
                  name: 'avgift',
                },
                {
                  alias: 'Automat høyde',
                  name: 'automathoyde',
                  unit: 'cm',
                },
                {
                  alias: 'Automat tilgjengelig',
                  name: 'tilgjengeligautomat',
                },
                {
                  alias: 'Kommentar',
                  name: 'kommentar',
                },
                {
                  alias: 'Bildefil 1',
                  name: 'bildefil1',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 2',
                  name: 'bildefil2',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 3',
                  name: 'bildefil3',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Objekt ID',
                  name: 'objektnr',
                },
                {
                  alias: 'Lokal ID',
                  name: 'lokalid',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: true,
              },
            },
            gatekeeper: true,
            name: 'inngang_bygg',
            url: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            groupid: 8,
            params: {
              layers: 't_inngangbygg',
              format: 'image/png',
            },
            guid: '8.t_inngangbygg',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  name: 'tilgjengvurderingrulleauto',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol/',
                  filetype: 'png',
                },
                {
                  name: 'tilgjengvurderingelrull',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol_el/',
                  filetype: 'png',
                },
                {
                  name: 'tilgjengvurderingsyn',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/syn/',
                  filetype: 'png',
                },
                {
                  alias: 'Registrert',
                  name: 'forstedatafangstdato',
                },
                {
                  alias: 'Oppdatert',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Bygg funksjon',
                  name: 'byggningsfunksjon',
                },
                {
                  alias: 'Avstand til HC-parkering',
                  name: 'avstandhc',
                  unit: 'm',
                },
                {
                  alias: 'Stigning ankomstvei',
                  name: 'stigningadkomstvei',
                  unit: '°',
                },
                {
                  alias: 'Rampe bredde',
                  name: 'rampebredde',
                  unit: 'cm',
                },
                {
                  alias: 'Rampe stigning',
                  name: 'rampestigning',
                  unit: '°',
                },
                {
                  alias: 'Rampe terskel',
                  name: 'rampeterskel',
                  unit: 'cm',
                },
                {
                  alias: 'Håndlist',
                  name: 'handlist',
                },
                {
                  alias: 'Håndlist høyde øvre',
                  name: 'handlisthoydeovre',
                  unit: 'cm',
                },
                {
                  alias: 'Håndlist høyde nedre',
                  name: 'handlisthoydenedre',
                  unit: 'cm',
                },
                {
                  alias: 'Rampe tilgjengelig',
                  name: 'rampetilgjengelig',
                },
                {
                  alias: 'Trapp',
                  name: 'trapp',
                },
                {
                  alias: 'Rekkverk',
                  name: 'rekkverk',
                },
                {
                  alias: 'Trapp kontrast',
                  name: 'trappkontrast',
                },
                {
                  alias: 'Horisontalt felt',
                  name: 'horisontalfelt',
                  unit: 'cm',
                },
                {
                  alias: 'Dørtype',
                  name: 'dortype',
                },
                {
                  alias: 'Døråpner',
                  name: 'dorapner',
                },
                {
                  alias: 'Manøverknapp høyde',
                  name: 'manoverknapphoyde',
                  unit: 'cm',
                },
                {
                  alias: 'Inngang bredde',
                  name: 'breddeinngang',
                  unit: 'cm',
                },
                {
                  alias: 'Terskel høyde',
                  name: 'terskelhoyde',
                },
                {
                  alias: 'Inngang kontrast',
                  name: 'kontrastinngang',
                },
                {
                  alias: 'Kommentar',
                  name: 'kommentar',
                },
                {
                  alias: 'Bildefil 1',
                  name: 'bildefil1',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 2',
                  name: 'bildefil2',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 3',
                  name: 'bildefil3',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Objekt ID',
                  name: 'objektnr',
                },
                {
                  alias: 'Lokal ID',
                  name: 'lokalid',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: true,
              },
            },
            gatekeeper: true,
            name: 'statlig_sikret',
            url: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            groupid: 5,
            order: 1,
            params: {
              layers: 'statlig_sikra_polygon_01',
              format: 'image/png',
            },
            guid: '5.statlig_sikra_polygon_01',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Navn',
                  name: 'navn',
                },
                {
                  alias: 'Registrert',
                  name: 'forstedatafangstdato',
                },
                {
                  alias: 'Oppdatert',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Objekt ID',
                  name: 'objektnr',
                },
                {
                  alias: 'Lokal ID',
                  name: 'lokalid',
                },
                {
                  alias: 'Link til informasjonsark',
                  name: 'linkskjema',
                  type: 'link',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/friluft-skjema-FRL-2012/',
                },
                {
                  alias: 'Link til bildeark',
                  name: 'linkbilde',
                  type: 'link',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/friluft-skjema-FRL-2012/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: true,
              },
            },
            gatekeeper: true,
            name: 'friluftsomrade',
            url: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            groupid: 5,
            order: 1,
            params: {
              layers: 'friluftsomrade_01',
              format: 'image/png',
            },
            guid: '5.friluftsomrade_01',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  name: 'forstedatafangstdato',
                  alias: 'Registrert',
                },
                {
                  name: 'datafangstdato',
                  alias: 'Oppdatert',
                },
                {
                  name: 'navn',
                  alias: 'Navn',
                },
                {
                  alias: 'Naturbasenummer',
                  name: 'naturbaseid',
                },
                {
                  alias: 'HC-parkering',
                  name: 'hcparkeringsplass',
                },
                {
                  alias: 'Toalett',
                  name: 'toalett',
                },
                {
                  alias: 'Turvei',
                  name: 'turvei',
                },
                {
                  alias: 'Baderampe',
                  name: 'baderampe',
                },
                {
                  alias: 'Fiskeplass',
                  name: 'fiskeplass',
                },
                {
                  alias: 'Grillbålplass',
                  name: 'grillbalplass',
                },
                {
                  alias: 'Sittegruppe',
                  name: 'sittegruppe',
                },
                {
                  alias: 'Gapahuk',
                  name: 'gapahuk',
                },
                {
                  alias: 'Informasjon',
                  name: 'informasjon',
                },
                {
                  alias: 'Kommentar',
                  name: 'kommentar',
                },
                {
                  alias: 'Bildefil 1',
                  name: 'bildefil1',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 2',
                  name: 'bildefil2',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 3',
                  name: 'bildefil3',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Objekt ID',
                  name: 'objektnr',
                },
                {
                  alias: 'Lokal ID',
                  name: 'lokalid',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: true,
              },
            },
            gatekeeper: true,
            name: 'parkeringsomrader',
            url: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            groupid: 5,
            order: 1,
            params: {
              layers: 'parkeringsomrader_friluft_01',
              format: 'image/png',
            },
            guid: '5.parkeringsomrader_friluft_01',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  name: 'tilgjengvurderingrulleauto',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol/',
                  filetype: 'png',
                },
                {
                  alias: 'Registrert',
                  name: 'forstedatafangstdato',
                },
                {
                  alias: 'Oppdatert',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Kapasitet personbiler',
                  name: 'kapasitetpersonbiler',
                },
                {
                  alias: 'Kapasitet HC',
                  name: 'antalluu',
                },
                {
                  alias: 'Dekke materiale',
                  name: 'dekkemateriale',
                },
                {
                  alias: 'Dekke tilstand',
                  name: 'dekketilstand',
                },
                {
                  alias: 'Dekke fasthet',
                  name: 'dekkefasthet',
                },
                {
                  alias: 'Kommentar',
                  name: 'kommentar',
                },
                {
                  alias: 'Bildefil 1',
                  name: 'bildefil1',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 2',
                  name: 'bildefil2',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 3',
                  name: 'bildefil3',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Objekt ID',
                  name: 'objektnr',
                },
                {
                  alias: 'Lokal ID',
                  name: 'lokalid',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: true,
              },
            },
            gatekeeper: true,
            name: 'turvei',
            url: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            groupid: 5,
            order: 2,
            params: {
              layers: 'turvei_01',
              format: 'image/png',
            },
            guid: '5.turvei_01',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  name: 'tilgjengvurderingrulleauto',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol/',
                  filetype: 'png',
                },
                {
                  name: 'tilgjengvurderingelrullestol',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol_el/',
                  filetype: 'png',
                },
                {
                  name: 'tilgjengvurderingsyn',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/syn/',
                  filetype: 'png',
                },
                {
                  alias: 'Registrert',
                  name: 'forstedatafangstdato',
                },
                {
                  alias: 'Oppdatert',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Veitype',
                  name: 'veitype',
                },
                {
                  alias: 'Spesial fottyperute',
                  name: 'spesialfotrutetype',
                },
                {
                  alias: 'Dekke materiale',
                  name: 'dekkemateriale',
                },
                {
                  alias: 'Plankeavstand',
                  name: 'plankeavstand',
                  unit: 'cm',
                },
                {
                  alias: 'Dekke tilstand',
                  name: 'dekketilstand',
                },
                {
                  alias: 'Dekke fasthet',
                  name: 'dekkefasthet',
                },
                {
                  alias: 'Bredde',
                  name: 'bredde',
                  unit: 'cm',
                },
                {
                  alias: 'Stigning',
                  name: 'stigning',
                  unit: '°',
                },
                {
                  alias: 'Tverrfall',
                  name: 'tverrfall',
                  unit: '°',
                },
                {
                  alias: 'Belysning',
                  name: 'belysning',
                },
                {
                  alias: 'Fri høyde',
                  name: 'frihoyde',
                },
                {
                  alias: 'Ledelinje ',
                  name: 'ledelinje',
                },
                {
                  alias: 'Kommentar',
                  name: 'kommentar',
                },
                {
                  alias: 'Bildefil 1',
                  name: 'bildefil1',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 2',
                  name: 'bildefil2',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 3',
                  name: 'bildefil3',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Objekt ID',
                  name: 'objektnr',
                },
                {
                  alias: 'Lokal ID',
                  name: 'lokalid',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: true,
              },
            },
            gatekeeper: true,
            name: 'turisthytte',
            url: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            groupid: 5,
            order: 3,
            params: {
              layers: 'turisthytte_01',
              format: 'image/png',
            },
            guid: '5.turisthytte_01',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Registrert',
                  name: 'forstedatafangstdato',
                },
                {
                  alias: 'Oppdatert',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Navn',
                  name: 'navn',
                },
                {
                  alias: 'Eier',
                  name: 'eier',
                },
                {
                  alias: 'Kommentar',
                  name: 'kommentar',
                },
                {
                  alias: 'Objekt ID',
                  name: 'objektnr',
                },
                {
                  alias: 'Lokal ID',
                  name: 'lokalid',
                },
                {
                  alias: 'Lenke',
                  name: 'lenke',
                  type: 'link',
                  baseurl: ' ',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: true,
              },
            },
            gatekeeper: true,
            name: 'gapahukhytte',
            url: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            groupid: 5,
            order: 3,
            params: {
              layers: 'gapahukhytte_01',
              format: 'image/png',
            },
            guid: '5.gapahukhytte_01',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  name: 'tilgjengvurderingrulleauto',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol/',
                  filetype: 'png',
                },
                {
                  name: 'tilgjengvurderingelrullestol',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol_el/',
                  filetype: 'png',
                },
                {
                  name: 'tilgjengvurderingsyn',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/syn/',
                  filetype: 'png',
                },
                {
                  alias: 'Registrert',
                  name: 'forstedatafangstdato',
                },
                {
                  alias: 'Oppdatert',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Rampe bredde',
                  name: 'rampebredde',
                  unit: 'cm',
                },
                {
                  alias: 'Rampelengde',
                  name: 'rampelengde',
                  unit: 'cm',
                },
                {
                  alias: 'Rampe stigning',
                  name: 'rampestigning',
                  unit: '°',
                },
                {
                  alias: 'Rampe terskel',
                  name: 'rampeterskel',
                  unit: 'cm',
                },
                {
                  alias: 'Rampe tilgjengelig',
                  name: 'rampetilgjengelig',
                },
                {
                  alias: 'Håndlist',
                  name: 'handlist',
                },
                {
                  alias: 'Håndlist høyde øvre',
                  name: 'handlisthoydeovre',
                  unit: 'cm',
                },
                {
                  alias: 'Håndlist høyde nedre',
                  name: 'handlisthoydenedre',
                  unit: 'cm',
                },
                {
                  alias: 'Diameter',
                  name: 'diameter',
                  unit: 'cm',
                },
                {
                  alias: 'Inngang bredde',
                  name: 'breddeinngang',
                  unit: 'cm',
                },
                {
                  alias: 'Inngang høyde',
                  name: 'hoydeinngang',
                  unit: 'cm',
                },
                {
                  alias: 'Terskel høyde',
                  name: 'terskelhoyde',
                  unit: 'cm',
                },
                {
                  alias: 'Kommentar',
                  name: 'kommentar',
                },
                {
                  alias: 'Bildefil 1',
                  name: 'bildefil1',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 2',
                  name: 'bildefil2',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 3',
                  name: 'bildefil3',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Objekt ID',
                  name: 'objektnr',
                },
                {
                  alias: 'Lokal ID',
                  name: 'lokalid',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: true,
              },
            },
            gatekeeper: true,
            name: 'fiskeplass',
            url: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            groupid: 5,
            order: 3,
            params: {
              layers: 'fiskeplass_01',
              format: 'image/png',
            },
            guid: '5.fiskeplass_01',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  name: 'tilgjengvurderingrulleauto',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol/',
                  filetype: 'png',
                },
                {
                  name: 'tilgjengvurderingelrullestol',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol_el/',
                  filetype: 'png',
                },
                {
                  name: 'tilgjengvurderingsyn',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/syn/',
                  filetype: 'png',
                },
                {
                  alias: 'Registrert',
                  name: 'forstedatafangstdato',
                },
                {
                  alias: 'Oppdatert',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Flytebrygge',
                  name: 'flytebrygge',
                },
                {
                  alias: 'Rampe bredde',
                  name: 'rampebredde',
                  unit: 'cm',
                },
                {
                  alias: 'Rampe stigning',
                  name: 'rampestigning',
                  unit: '°',
                },
                {
                  alias: 'Rampe terskel',
                  name: 'rampeterskel',
                  unit: 'cm',
                },
                {
                  alias: 'Rampe tilgjengelig',
                  name: 'rampetilgjengelig',
                },
                {
                  alias: 'Håndlist',
                  name: 'handlist',
                },
                {
                  alias: 'Håndlist høyde øvre',
                  name: 'handlisthoydeovre',
                  unit: 'cm',
                },
                {
                  alias: 'Håndlist høyde nedre',
                  name: 'handlisthoydenedre',
                  unit: 'cm',
                },
                {
                  alias: 'Dekke materiale',
                  name: 'dekkemateriale',
                },
                {
                  alias: 'Planke avstand',
                  name: 'plankeavstand',
                  unit: 'cm',
                },
                {
                  alias: 'Diameter',
                  name: 'diameter',
                  unit: 'cm',
                },
                {
                  alias: 'Rekkverk',
                  name: 'rekkverk',
                },
                {
                  alias: 'Stoppkant',
                  name: 'stoppkant',
                },
                {
                  alias: 'Stoppkant høyde',
                  name: 'stoppkanthoyde',
                  unit: 'cm',
                },
                {
                  alias: 'Kommentar',
                  name: 'kommentar',
                },
                {
                  alias: 'Bildefil 1',
                  name: 'bildefil1',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 2',
                  name: 'bildefil2',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 3',
                  name: 'bildefil3',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Objekt ID',
                  name: 'objektnr',
                },
                {
                  alias: 'Lokal ID',
                  name: 'lokalid',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: true,
              },
            },
            gatekeeper: true,
            name: 'grillbalplass',
            url: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            groupid: 5,
            order: 3,
            params: {
              layers: 'grillbalplass_01',
              format: 'image/png',
            },
            guid: '5.grillbalplass_01',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  name: 'tilgjengvurderingrulleauto',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol/',
                  filetype: 'png',
                },
                {
                  alias: 'Registrert',
                  name: 'forstedatafangstdato',
                },
                {
                  alias: 'Oppdatert',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Type',
                  name: 'plasstype',
                },
                {
                  alias: 'Dekke materiale',
                  name: 'dekkemateriale',
                },
                {
                  alias: 'Dekke tilstand',
                  name: 'dekketilstand',
                },
                {
                  alias: 'Dekke fasthet',
                  name: 'dekkefasthet',
                },
                {
                  alias: 'Helning',
                  name: 'helning',
                  unit: '°',
                },
                {
                  alias: 'Kommentar',
                  name: 'kommentar',
                },
                {
                  alias: 'Bildefil 1',
                  name: 'bildefil1',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 2',
                  name: 'bildefil2',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 3',
                  name: 'bildefil3',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Objekt ID',
                  name: 'objektnr',
                },
                {
                  alias: 'Lokal ID',
                  name: 'lokalid',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: true,
              },
            },
            gatekeeper: true,
            name: 'baderampe',
            url: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            groupid: 5,
            order: 3,
            params: {
              layers: 'baderampe_01',
              format: 'image/png',
            },
            guid: '5.baderampe_01',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  name: 'tilgjengvurderingrulleauto',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol/',
                  filetype: 'png',
                },
                {
                  name: 'tilgjengvurderingsyn',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/syn/',
                  filetype: 'png',
                },
                {
                  alias: 'Registrert',
                  name: 'forstedatafangstdato',
                },
                {
                  alias: 'Oppdatert',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Rampe bredde',
                  name: 'rampebredde',
                  unit: 'cm',
                },
                {
                  alias: 'Rampelengde',
                  name: 'rampelengde',
                  unit: 'cm',
                },
                {
                  alias: 'Rampe stigning',
                  name: 'rampestigning',
                  unit: '°',
                },
                {
                  alias: 'Rampe terskel',
                  name: 'rampeterskel',
                  unit: 'cm',
                },
                {
                  alias: 'Rampe tilgjengelig',
                  name: 'rampetilgjengelig',
                },
                {
                  alias: 'Håndlist',
                  name: 'handlist',
                },
                {
                  alias: 'Håndlist høyde øvre',
                  name: 'handlisthoydeovre',
                  unit: 'cm',
                },
                {
                  alias: 'Håndlist høyde nedre',
                  name: 'handlisthoydenedre',
                  unit: 'cm',
                },
                {
                  alias: 'Kommentar',
                  name: 'kommentar',
                },
                {
                  alias: 'Bildefil 1',
                  name: 'bildefil1',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 2',
                  name: 'bildefil2',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 3',
                  name: 'bildefil3',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Objekt ID',
                  name: 'objektnr',
                },
                {
                  alias: 'Lokal ID',
                  name: 'lokalid',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: true,
              },
            },
            gatekeeper: true,
            name: 'hc_parkering',
            url: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            groupid: 5,
            order: 3,
            params: {
              layers: 'hc_parkering_friluft_01',
              format: 'image/png',
            },
            guid: '5.hc_parkering_friluft_01',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  name: 'tilgjengvurderingrulleauto',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol/',
                  filetype: 'png',
                },
                {
                  alias: 'Registrert',
                  name: 'forstedatafangstdato',
                },
                {
                  alias: 'Oppdatert',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Skiltet',
                  name: 'skiltet',
                },
                {
                  alias: 'Merket',
                  name: 'merket',
                },
                {
                  alias: 'Avstand fasilitet',
                  name: 'avstandfasilitet',
                  unit: 'm',
                },
                {
                  alias: 'Bredde',
                  name: 'bredde',
                  unit: 'cm',
                },
                {
                  alias: 'Lengde',
                  name: 'lengde',
                  unit: 'cm',
                },
                {
                  alias: 'Avgift',
                  name: 'avgift',
                },
                {
                  alias: 'Automat høyde',
                  name: 'automathoyde',
                  unit: 'cm',
                },
                {
                  alias: 'Automat tilgjengelig',
                  name: 'tilgjengeligautomat',
                },
                {
                  alias: 'Kommentar',
                  name: 'kommentar',
                },
                {
                  alias: 'Bildefil 1',
                  name: 'bildefil1',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 2',
                  name: 'bildefil2',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 3',
                  name: 'bildefil3',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Objekt ID',
                  name: 'objektnr',
                },
                {
                  alias: 'Lokal ID',
                  name: 'lokalid',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: true,
              },
            },
            gatekeeper: true,
            name: 'Skiløype',
            url: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            groupid: 5,
            order: 3,
            params: {
              layers: 'skiloype_01',
              format: 'image/png',
            },
            guid: '5.skiloype_01',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  name: 'tilgjengvurderingrulleman',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol/',
                  filetype: 'png',
                },
                {
                  name: 'tilgjengvurderingsyn',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/syn/',
                  filetype: 'png',
                },
                {
                  alias: 'Registrert',
                  name: 'forstedatafangstdato',
                },
                {
                  alias: 'Oppdatert',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Avstand HC',
                  name: 'avstandhc',
                  unit: 'cm',
                },
                {
                  alias: 'Tverrfall',
                  name: 'tverrfall',
                  unit: '°',
                },
                {
                  alias: 'Sperrebom',
                  name: 'sperrebom',
                },
                {
                  alias: 'Sperrebom tilgjengelig',
                  name: 'sperrebomtilgjengelig',
                },
                {
                  alias: 'Stigning',
                  name: 'stigning',
                  unit: '°',
                },
                {
                  alias: 'Bredde',
                  name: 'bredde',
                  unit: 'cm',
                },
                {
                  alias: 'Dobbelspor',
                  name: 'dobbelspor',
                },
                {
                  alias: 'Frihoyde',
                  name: 'frihoyde',
                },
                {
                  alias: 'Belysning',
                  name: 'belysning',
                },
                {
                  alias: 'Kommentar',
                  name: 'kommentar',
                },
                {
                  alias: 'Forbedringsforslag',
                  name: 'forbedringsforslag',
                },
                {
                  alias: 'Bildefil 1',
                  name: 'bildefil1',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 2',
                  name: 'bildefil2',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 3',
                  name: 'bildefil3',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Objekt ID',
                  name: 'objektnr',
                },
                {
                  alias: 'Lokal ID',
                  name: 'lokalid',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: true,
              },
            },
            gatekeeper: true,
            name: 'statlig_sikret',
            url: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            groupid: 7,
            order: 1,
            params: {
              layers: 'statlig_sikra_polygon_02',
              format: 'image/png',
            },
            guid: '7.statlig_sikra_polygon_02',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Navn',
                  name: 'navn',
                },
                {
                  alias: 'Registrert',
                  name: 'forstedatafangstdato',
                },
                {
                  alias: 'Oppdatert',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Objekt ID',
                  name: 'objektnr',
                },
                {
                  alias: 'Lokal ID',
                  name: 'lokalid',
                },
                {
                  alias: 'Link til informasjonsark',
                  name: 'linkskjema',
                  type: 'link',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/friluft-skjema-FRL-2012/',
                },
                {
                  alias: 'Link til bildeark',
                  name: 'linkbilde',
                  type: 'link',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/friluft-skjema-FRL-2012/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: true,
              },
            },
            gatekeeper: true,
            name: 'friluftsomrade',
            url: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            groupid: 7,
            order: 1,
            params: {
              layers: 'friluftsomrade_02',
              format: 'image/png',
            },
            guid: '7.friluftsomrade_02',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  name: 'forstedatafangstdato',
                  alias: 'Registrert',
                },
                {
                  name: 'datafangstdato',
                  alias: 'Oppdatert',
                },
                {
                  name: 'navn',
                  alias: 'Navn',
                },
                {
                  alias: 'Naturbasenummer',
                  name: 'naturbaseid',
                },
                {
                  alias: 'HC-parkering',
                  name: 'hcparkeringsplass',
                },
                {
                  alias: 'Toalett',
                  name: 'toalett',
                },
                {
                  alias: 'Turvei',
                  name: 'turvei',
                },
                {
                  alias: 'Baderampe',
                  name: 'baderampe',
                },
                {
                  alias: 'Fiskeplass',
                  name: 'fiskeplass',
                },
                {
                  alias: 'Grillbålplass',
                  name: 'grillbalplass',
                },
                {
                  alias: 'Sittegruppe',
                  name: 'sittegruppe',
                },
                {
                  alias: 'Gapahuk',
                  name: 'gapahuk',
                },
                {
                  alias: 'Informasjon',
                  name: 'informasjon',
                },
                {
                  alias: 'Kommentar',
                  name: 'kommentar',
                },
                {
                  alias: 'Bildefil 1',
                  name: 'bildefil1',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 2',
                  name: 'bildefil2',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 3',
                  name: 'bildefil3',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Objekt ID',
                  name: 'objektnr',
                },
                {
                  alias: 'Lokal ID',
                  name: 'lokalid',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: true,
              },
            },
            gatekeeper: true,
            name: 'parkeringsomrader',
            url: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            groupid: 7,
            order: 1,
            params: {
              layers: 'parkeringsomrader_friluft_02',
              format: 'image/png',
            },
            guid: '7.parkeringsomrader_friluft_02',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  name: 'tilgjengvurderingrulleauto',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol/',
                  filetype: 'png',
                },
                {
                  alias: 'Registrert',
                  name: 'forstedatafangstdato',
                },
                {
                  alias: 'Oppdatert',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Kapasitet personbiler',
                  name: 'kapasitetpersonbiler',
                },
                {
                  alias: 'Kapasitet HC',
                  name: 'antalluu',
                },
                {
                  alias: 'Dekke materiale',
                  name: 'dekkemateriale',
                },
                {
                  alias: 'Dekke tilstand',
                  name: 'dekketilstand',
                },
                {
                  alias: 'Dekke fasthet',
                  name: 'dekkefasthet',
                },
                {
                  alias: 'Kommentar',
                  name: 'kommentar',
                },
                {
                  alias: 'Bildefil 1',
                  name: 'bildefil1',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 2',
                  name: 'bildefil2',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 3',
                  name: 'bildefil3',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Objekt ID',
                  name: 'objektnr',
                },
                {
                  alias: 'Lokal ID',
                  name: 'lokalid',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: true,
              },
            },
            gatekeeper: true,
            name: 'turvei',
            url: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            groupid: 7,
            order: 2,
            params: {
              layers: 'turvei_02',
              format: 'image/png',
            },
            guid: '7.turvei_02',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  name: 'tilgjengvurderingrulleauto',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol/',
                  filetype: 'png',
                },
                {
                  name: 'tilgjengvurderingelrullestol',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol_el/',
                  filetype: 'png',
                },
                {
                  name: 'tilgjengvurderingsyn',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/syn/',
                  filetype: 'png',
                },
                {
                  alias: 'Registrert',
                  name: 'forstedatafangstdato',
                },
                {
                  alias: 'Oppdatert',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Veitype',
                  name: 'veitype',
                },
                {
                  alias: 'Spesial fottyperute',
                  name: 'spesialfotrutetype',
                },
                {
                  alias: 'Dekke materiale',
                  name: 'dekkemateriale',
                },
                {
                  alias: 'Plankeavstand',
                  name: 'plankeavstand',
                  unit: 'cm',
                },
                {
                  alias: 'Dekke tilstand',
                  name: 'dekketilstand',
                },
                {
                  alias: 'Dekke fasthet',
                  name: 'dekkefasthet',
                },
                {
                  alias: 'Bredde',
                  name: 'bredde',
                  unit: 'cm',
                },
                {
                  alias: 'Stigning',
                  name: 'stigning',
                  unit: '°',
                },
                {
                  alias: 'Tverrfall',
                  name: 'tverrfall',
                  unit: '°',
                },
                {
                  alias: 'Belysning',
                  name: 'belysning',
                },
                {
                  alias: 'Fri høyde',
                  name: 'frihoyde',
                },
                {
                  alias: 'Ledelinje ',
                  name: 'ledelinje',
                },
                {
                  alias: 'Kommentar',
                  name: 'kommentar',
                },
                {
                  alias: 'Bildefil 1',
                  name: 'bildefil1',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 2',
                  name: 'bildefil2',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 3',
                  name: 'bildefil3',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Objekt ID',
                  name: 'objektnr',
                },
                {
                  alias: 'Lokal ID',
                  name: 'lokalid',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: true,
              },
            },
            gatekeeper: true,
            name: 'turisthytte',
            url: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            groupid: 7,
            order: 3,
            params: {
              layers: 'turisthytte_02',
              format: 'image/png',
            },
            guid: '7.turisthytte_02',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Registrert',
                  name: 'forstedatafangstdato',
                },
                {
                  alias: 'Oppdatert',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Navn',
                  name: 'navn',
                },
                {
                  alias: 'Eier',
                  name: 'eier',
                },
                {
                  alias: 'Kommentar',
                  name: 'kommentar',
                },
                {
                  alias: 'Objekt ID',
                  name: 'objektnr',
                },
                {
                  alias: 'Lokal ID',
                  name: 'lokalid',
                },
                {
                  alias: 'Lenke',
                  name: 'lenke',
                  type: 'link',
                  baseurl: ' ',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: true,
              },
            },
            gatekeeper: true,
            name: 'gapahukhytte',
            url: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            groupid: 7,
            order: 3,
            params: {
              layers: 'gapahukhytte_02',
              format: 'image/png',
            },
            guid: '7.gapahukhytte_02',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  name: 'tilgjengvurderingrulleauto',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol/',
                  filetype: 'png',
                },
                {
                  name: 'tilgjengvurderingelrullestol',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol_el/',
                  filetype: 'png',
                },
                {
                  name: 'tilgjengvurderingsyn',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/syn/',
                  filetype: 'png',
                },
                {
                  alias: 'Registrert',
                  name: 'forstedatafangstdato',
                },
                {
                  alias: 'Oppdatert',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Rampe bredde',
                  name: 'rampebredde',
                  unit: 'cm',
                },
                {
                  alias: 'Rampelengde',
                  name: 'rampelengde',
                  unit: 'cm',
                },
                {
                  alias: 'Rampe stigning',
                  name: 'rampestigning',
                  unit: '°',
                },
                {
                  alias: 'Rampe terskel',
                  name: 'rampeterskel',
                  unit: 'cm',
                },
                {
                  alias: 'Rampe tilgjengelig',
                  name: 'rampetilgjengelig',
                },
                {
                  alias: 'Håndlist',
                  name: 'handlist',
                },
                {
                  alias: 'Håndlist høyde øvre',
                  name: 'handlisthoydeovre',
                  unit: 'cm',
                },
                {
                  alias: 'Håndlist høyde nedre',
                  name: 'handlisthoydenedre',
                  unit: 'cm',
                },
                {
                  alias: 'Diameter',
                  name: 'diameter',
                  unit: 'cm',
                },
                {
                  alias: 'Inngang bredde',
                  name: 'breddeinngang',
                  unit: 'cm',
                },
                {
                  alias: 'Inngang høyde',
                  name: 'hoydeinngang',
                  unit: 'cm',
                },
                {
                  alias: 'Terskel høyde',
                  name: 'terskelhoyde',
                  unit: 'cm',
                },
                {
                  alias: 'Kommentar',
                  name: 'kommentar',
                },
                {
                  alias: 'Bildefil 1',
                  name: 'bildefil1',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 2',
                  name: 'bildefil2',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 3',
                  name: 'bildefil3',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Objekt ID',
                  name: 'objektnr',
                },
                {
                  alias: 'Lokal ID',
                  name: 'lokalid',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: true,
              },
            },
            gatekeeper: true,
            name: 'fiskeplass',
            url: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            groupid: 7,
            order: 3,
            params: {
              layers: 'fiskeplass_02',
              format: 'image/png',
            },
            guid: '7.fiskeplass_02',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  name: 'tilgjengvurderingrulleauto',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol/',
                  filetype: 'png',
                },
                {
                  name: 'tilgjengvurderingelrullestol',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol_el/',
                  filetype: 'png',
                },
                {
                  name: 'tilgjengvurderingsyn',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/syn/',
                  filetype: 'png',
                },
                {
                  alias: 'Registrert',
                  name: 'forstedatafangstdato',
                },
                {
                  alias: 'Oppdatert',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Flytebrygge',
                  name: 'flytebrygge',
                },
                {
                  alias: 'Rampe bredde',
                  name: 'rampebredde',
                  unit: 'cm',
                },
                {
                  alias: 'Rampe stigning',
                  name: 'rampestigning',
                  unit: '°',
                },
                {
                  alias: 'Rampe terskel',
                  name: 'rampeterskel',
                  unit: 'cm',
                },
                {
                  alias: 'Rampe tilgjengelig',
                  name: 'rampetilgjengelig',
                },
                {
                  alias: 'Håndlist',
                  name: 'handlist',
                },
                {
                  alias: 'Håndlist høyde øvre',
                  name: 'handlisthoydeovre',
                  unit: 'cm',
                },
                {
                  alias: 'Håndlist høyde nedre',
                  name: 'handlisthoydenedre',
                  unit: 'cm',
                },
                {
                  alias: 'Dekke materiale',
                  name: 'dekkemateriale',
                },
                {
                  alias: 'Planke avstand',
                  name: 'plankeavstand',
                  unit: 'cm',
                },
                {
                  alias: 'Diameter',
                  name: 'diameter',
                  unit: 'cm',
                },
                {
                  alias: 'Rekkverk',
                  name: 'rekkverk',
                },
                {
                  alias: 'Stoppkant',
                  name: 'stoppkant',
                },
                {
                  alias: 'Stoppkant høyde',
                  name: 'stoppkanthoyde',
                  unit: 'cm',
                },
                {
                  alias: 'Kommentar',
                  name: 'kommentar',
                },
                {
                  alias: 'Bildefil 1',
                  name: 'bildefil1',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 2',
                  name: 'bildefil2',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 3',
                  name: 'bildefil3',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Objekt ID',
                  name: 'objektnr',
                },
                {
                  alias: 'Lokal ID',
                  name: 'lokalid',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: true,
              },
            },
            gatekeeper: true,
            name: 'grillbalplass',
            url: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            groupid: 7,
            order: 3,
            params: {
              layers: 'grillbalplass_02',
              format: 'image/png',
            },
            guid: '7.grillbalplass_02',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  name: 'tilgjengvurderingrulleauto',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol/',
                  filetype: 'png',
                },
                {
                  alias: 'Registrert',
                  name: 'forstedatafangstdato',
                },
                {
                  alias: 'Oppdatert',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Type',
                  name: 'plasstype',
                },
                {
                  alias: 'Dekke materiale',
                  name: 'dekkemateriale',
                },
                {
                  alias: 'Dekke tilstand',
                  name: 'dekketilstand',
                },
                {
                  alias: 'Dekke fasthet',
                  name: 'dekkefasthet',
                },
                {
                  alias: 'Helning',
                  name: 'helning',
                  unit: '°',
                },
                {
                  alias: 'Kommentar',
                  name: 'kommentar',
                },
                {
                  alias: 'Bildefil 1',
                  name: 'bildefil1',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 2',
                  name: 'bildefil2',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 3',
                  name: 'bildefil3',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Objekt ID',
                  name: 'objektnr',
                },
                {
                  alias: 'Lokal ID',
                  name: 'lokalid',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: true,
              },
            },
            gatekeeper: true,
            name: 'hc_parkering',
            url: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            groupid: 7,
            order: 3,
            params: {
              layers: 'hc_parkering_friluft_02',
              format: 'image/png',
            },
            guid: '7.hc_parkering_friluft_02',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  name: 'tilgjengvurderingrulleauto',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol/',
                  filetype: 'png',
                },
                {
                  alias: 'Registrert',
                  name: 'forstedatafangstdato',
                },
                {
                  alias: 'Oppdatert',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Skiltet',
                  name: 'skiltet',
                },
                {
                  alias: 'Merket',
                  name: 'merket',
                },
                {
                  alias: 'Avstand fasilitet',
                  name: 'avstandfasilitet',
                  unit: 'm',
                },
                {
                  alias: 'Bredde',
                  name: 'bredde',
                  unit: 'cm',
                },
                {
                  alias: 'Lengde',
                  name: 'lengde',
                  unit: 'cm',
                },
                {
                  alias: 'Avgift',
                  name: 'avgift',
                },
                {
                  alias: 'Automat høyde',
                  name: 'automathoyde',
                  unit: 'cm',
                },
                {
                  alias: 'Automat tilgjengelig',
                  name: 'tilgjengeligautomat',
                },
                {
                  alias: 'Kommentar',
                  name: 'kommentar',
                },
                {
                  alias: 'Bildefil 1',
                  name: 'bildefil1',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 2',
                  name: 'bildefil2',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 3',
                  name: 'bildefil3',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Objekt ID',
                  name: 'objektnr',
                },
                {
                  alias: 'Lokal ID',
                  name: 'lokalid',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: true,
              },
            },
            gatekeeper: true,
            name: 'Skiløype',
            url: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            groupid: 7,
            order: 3,
            params: {
              layers: 'skiloype_02',
              format: 'image/png',
            },
            guid: '7.skiloype_02',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  name: 'tilgjengvurderingrulleman',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol/',
                  filetype: 'png',
                },
                {
                  name: 'tilgjengvurderingsyn',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/syn/',
                  filetype: 'png',
                },
                {
                  alias: 'Registrert',
                  name: 'forstedatafangstdato',
                },
                {
                  alias: 'Oppdatert',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Avstand HC',
                  name: 'avstandhc',
                  unit: 'cm',
                },
                {
                  alias: 'Tverrfall',
                  name: 'tverrfall',
                  unit: '°',
                },
                {
                  alias: 'Sperrebom',
                  name: 'sperrebom',
                },
                {
                  alias: 'Sperrebom tilgjengelig',
                  name: 'sperrebomtilgjengelig',
                },
                {
                  alias: 'Stigning',
                  name: 'stigning',
                  unit: '°',
                },
                {
                  alias: 'Bredde',
                  name: 'bredde',
                  unit: 'cm',
                },
                {
                  alias: 'Dobbelspor',
                  name: 'dobbelspor',
                },
                {
                  alias: 'Frihoyde',
                  name: 'frihoyde',
                },
                {
                  alias: 'Belysning',
                  name: 'belysning',
                },
                {
                  alias: 'Kommentar',
                  name: 'kommentar',
                },
                {
                  alias: 'Forbedringsforslag',
                  name: 'forbedringsforslag',
                },
                {
                  alias: 'Bildefil 1',
                  name: 'bildefil1',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 2',
                  name: 'bildefil2',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 3',
                  name: 'bildefil3',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Objekt ID',
                  name: 'objektnr',
                },
                {
                  alias: 'Lokal ID',
                  name: 'lokalid',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: true,
              },
            },
            gatekeeper: true,
            name: 'statlig_sikret',
            url: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            groupid: 3,
            order: 1,
            params: {
              layers: 'statlig_sikra_polygon_03',
              format: 'image/png',
            },
            guid: '3.statlig_sikra_polygon_03',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Navn',
                  name: 'navn',
                },
                {
                  alias: 'Registrert',
                  name: 'forstedatafangstdato',
                },
                {
                  alias: 'Oppdatert',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Objekt ID',
                  name: 'objektnr',
                },
                {
                  alias: 'Lokal ID',
                  name: 'lokalid',
                },
                {
                  alias: 'Link til informasjonsark',
                  name: 'linkskjema',
                  type: 'link',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/friluft-skjema-FRL-2012/',
                },
                {
                  alias: 'Link til bildeark',
                  name: 'linkbilde',
                  type: 'link',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/friluft-skjema-FRL-2012/',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: true,
              },
            },
            gatekeeper: true,
            name: 'friluftsomrade',
            url: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            groupid: 3,
            order: 1,
            params: {
              layers: 'friluftsomrade_03',
              format: 'image/png',
            },
            guid: '3.friluftsomrade_03',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  name: 'forstedatafangstdato',
                  alias: 'Registrert',
                },
                {
                  name: 'datafangstdato',
                  alias: 'Oppdatert',
                },
                {
                  name: 'navn',
                  alias: 'Navn',
                },
                {
                  alias: 'Naturbasenummer',
                  name: 'naturbaseid',
                },
                {
                  alias: 'HC-parkering',
                  name: 'hcparkeringsplass',
                },
                {
                  alias: 'Toalett',
                  name: 'toalett',
                },
                {
                  alias: 'Turvei',
                  name: 'turvei',
                },
                {
                  alias: 'Baderampe',
                  name: 'baderampe',
                },
                {
                  alias: 'Fiskeplass',
                  name: 'fiskeplass',
                },
                {
                  alias: 'Grillbålplass',
                  name: 'grillbalplass',
                },
                {
                  alias: 'Sittegruppe',
                  name: 'sittegruppe',
                },
                {
                  alias: 'Gapahuk',
                  name: 'gapahuk',
                },
                {
                  alias: 'Informasjon',
                  name: 'informasjon',
                },
                {
                  alias: 'Kommentar',
                  name: 'kommentar',
                },
                {
                  alias: 'Bildefil 1',
                  name: 'bildefil1',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 2',
                  name: 'bildefil2',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 3',
                  name: 'bildefil3',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Objekt ID',
                  name: 'objektnr',
                },
                {
                  alias: 'Lokal ID',
                  name: 'lokalid',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: true,
              },
            },
            gatekeeper: true,
            name: 'parkeringsomrader',
            url: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            groupid: 3,
            order: 1,
            params: {
              layers: 'parkeringsomrader_friluft_03',
              format: 'image/png',
            },
            guid: '3.parkeringsomrader_friluft_03',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  name: 'tilgjengvurderingrulleauto',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol/',
                  filetype: 'png',
                },
                {
                  alias: 'Registrert',
                  name: 'forstedatafangstdato',
                },
                {
                  alias: 'Oppdatert',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Kapasitet personbiler',
                  name: 'kapasitetpersonbiler',
                },
                {
                  alias: 'Kapasitet HC',
                  name: 'antalluu',
                },
                {
                  alias: 'Dekke materiale',
                  name: 'dekkemateriale',
                },
                {
                  alias: 'Dekke tilstand',
                  name: 'dekketilstand',
                },
                {
                  alias: 'Dekke fasthet',
                  name: 'dekkefasthet',
                },
                {
                  alias: 'Kommentar',
                  name: 'kommentar',
                },
                {
                  alias: 'Bildefil 1',
                  name: 'bildefil1',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 2',
                  name: 'bildefil2',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 3',
                  name: 'bildefil3',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Objekt ID',
                  name: 'objektnr',
                },
                {
                  alias: 'Lokal ID',
                  name: 'lokalid',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: true,
              },
            },
            gatekeeper: true,
            name: 'turvei',
            url: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            groupid: 3,
            order: 2,
            params: {
              layers: 'turvei_03',
              format: 'image/png',
            },
            guid: '3.turvei_03',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  name: 'tilgjengvurderingrulleauto',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol/',
                  filetype: 'png',
                },
                {
                  name: 'tilgjengvurderingelrullestol',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol_el/',
                  filetype: 'png',
                },
                {
                  name: 'tilgjengvurderingsyn',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/syn/',
                  filetype: 'png',
                },
                {
                  alias: 'Registrert',
                  name: 'forstedatafangstdato',
                },
                {
                  alias: 'Oppdatert',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Veitype',
                  name: 'veitype',
                },
                {
                  alias: 'Spesial fottyperute',
                  name: 'spesialfotrutetype',
                },
                {
                  alias: 'Dekke materiale',
                  name: 'dekkemateriale',
                },
                {
                  alias: 'Plankeavstand',
                  name: 'plankeavstand',
                  unit: 'cm',
                },
                {
                  alias: 'Dekke tilstand',
                  name: 'dekketilstand',
                },
                {
                  alias: 'Dekke fasthet',
                  name: 'dekkefasthet',
                },
                {
                  alias: 'Bredde',
                  name: 'bredde',
                  unit: 'cm',
                },
                {
                  alias: 'Stigning',
                  name: 'stigning',
                  unit: '°',
                },
                {
                  alias: 'Tverrfall',
                  name: 'tverrfall',
                  unit: '°',
                },
                {
                  alias: 'Belysning',
                  name: 'belysning',
                },
                {
                  alias: 'Fri høyde',
                  name: 'frihoyde',
                },
                {
                  alias: 'Ledelinje ',
                  name: 'ledelinje',
                },
                {
                  alias: 'Kommentar',
                  name: 'kommentar',
                },
                {
                  alias: 'Bildefil 1',
                  name: 'bildefil1',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 2',
                  name: 'bildefil2',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 3',
                  name: 'bildefil3',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Objekt ID',
                  name: 'objektnr',
                },
                {
                  alias: 'Lokal ID',
                  name: 'lokalid',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: true,
              },
            },
            gatekeeper: true,
            name: 'turisthytte',
            url: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            groupid: 3,
            order: 3,
            params: {
              layers: 'turisthytte_03',
              format: 'image/png',
            },
            guid: '3.turisthytte_03',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Registrert',
                  name: 'forstedatafangstdato',
                },
                {
                  alias: 'Oppdatert',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Navn',
                  name: 'navn',
                },
                {
                  alias: 'Eier',
                  name: 'eier',
                },
                {
                  alias: 'Kommentar',
                  name: 'kommentar',
                },
                {
                  alias: 'Objekt ID',
                  name: 'objektnr',
                },
                {
                  alias: 'Lokal ID',
                  name: 'lokalid',
                },
                {
                  alias: 'Lenke',
                  name: 'lenke',
                  type: 'link',
                  baseurl: ' ',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: true,
              },
            },
            gatekeeper: true,
            name: 'gapahukhytte',
            url: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            groupid: 3,
            order: 3,
            params: {
              layers: 'gapahukhytte_03',
              format: 'image/png',
            },
            guid: '3.gapahukhytte_03',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  name: 'tilgjengvurderingrulleauto',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol/',
                  filetype: 'png',
                },
                {
                  name: 'tilgjengvurderingelrullestol',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol_el/',
                  filetype: 'png',
                },
                {
                  name: 'tilgjengvurderingsyn',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/syn/',
                  filetype: 'png',
                },
                {
                  alias: 'Registrert',
                  name: 'forstedatafangstdato',
                },
                {
                  alias: 'Oppdatert',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Rampe bredde',
                  name: 'rampebredde',
                  unit: 'cm',
                },
                {
                  alias: 'Rampelengde',
                  name: 'rampelengde',
                  unit: 'cm',
                },
                {
                  alias: 'Rampe stigning',
                  name: 'rampestigning',
                  unit: '°',
                },
                {
                  alias: 'Rampe terskel',
                  name: 'rampeterskel',
                  unit: 'cm',
                },
                {
                  alias: 'Rampe tilgjengelig',
                  name: 'rampetilgjengelig',
                },
                {
                  alias: 'Håndlist',
                  name: 'handlist',
                },
                {
                  alias: 'Håndlist høyde øvre',
                  name: 'handlisthoydeovre',
                  unit: 'cm',
                },
                {
                  alias: 'Håndlist høyde nedre',
                  name: 'handlisthoydenedre',
                  unit: 'cm',
                },
                {
                  alias: 'Diameter',
                  name: 'diameter',
                  unit: 'cm',
                },
                {
                  alias: 'Inngang bredde',
                  name: 'breddeinngang',
                  unit: 'cm',
                },
                {
                  alias: 'Inngang høyde',
                  name: 'hoydeinngang',
                  unit: 'cm',
                },
                {
                  alias: 'Terskel høyde',
                  name: 'terskelhoyde',
                  unit: 'cm',
                },
                {
                  alias: 'Kommentar',
                  name: 'kommentar',
                },
                {
                  alias: 'Bildefil 1',
                  name: 'bildefil1',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 2',
                  name: 'bildefil2',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 3',
                  name: 'bildefil3',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Objekt ID',
                  name: 'objektnr',
                },
                {
                  alias: 'Lokal ID',
                  name: 'lokalid',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: true,
              },
            },
            gatekeeper: true,
            name: 'fiskeplass',
            url: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            groupid: 3,
            order: 3,
            params: {
              layers: 'fiskeplass_03',
              format: 'image/png',
            },
            guid: '3.fiskeplass_03',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  name: 'tilgjengvurderingrulleauto',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol/',
                  filetype: 'png',
                },
                {
                  name: 'tilgjengvurderingelrullestol',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol_el/',
                  filetype: 'png',
                },
                {
                  name: 'tilgjengvurderingsyn',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/syn/',
                  filetype: 'png',
                },
                {
                  alias: 'Registrert',
                  name: 'forstedatafangstdato',
                },
                {
                  alias: 'Oppdatert',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Flytebrygge',
                  name: 'flytebrygge',
                },
                {
                  alias: 'Rampe bredde',
                  name: 'rampebredde',
                  unit: 'cm',
                },
                {
                  alias: 'Rampelengde',
                  name: 'rampelengde',
                  unit: 'cm',
                },
                {
                  alias: 'Rampe stigning',
                  name: 'rampestigning',
                  unit: '°',
                },
                {
                  alias: 'Rampe terskel',
                  name: 'rampeterskel',
                  unit: 'cm',
                },
                {
                  alias: 'Rampe tilgjengelig',
                  name: 'rampetilgjengelig',
                },
                {
                  alias: 'Håndlist',
                  name: 'handlist',
                },
                {
                  alias: 'Håndlist høyde øvre',
                  name: 'handlisthoydeovre',
                  unit: 'cm',
                },
                {
                  alias: 'Håndlist høyde nedre',
                  name: 'handlisthoydenedre',
                  unit: 'cm',
                },
                {
                  alias: 'Dekke materiale',
                  name: 'dekkemateriale',
                },
                {
                  alias: 'Planke avstand',
                  name: 'plankeavstand',
                  unit: 'cm',
                },
                {
                  alias: 'Diameter',
                  name: 'diameter',
                  unit: 'cm',
                },
                {
                  alias: 'Rekkverk',
                  name: 'rekkverk',
                },
                {
                  alias: 'Stoppkant',
                  name: 'stoppkant',
                },
                {
                  alias: 'Stoppkant høyde',
                  name: 'stoppkanthoyde',
                  unit: 'cm',
                },
                {
                  alias: 'Kommentar',
                  name: 'kommentar',
                },
                {
                  alias: 'Bildefil 1',
                  name: 'bildefil1',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 2',
                  name: 'bildefil2',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 3',
                  name: 'bildefil3',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Objekt ID',
                  name: 'objektnr',
                },
                {
                  alias: 'Lokal ID',
                  name: 'lokalid',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: true,
              },
            },
            gatekeeper: true,
            name: 'grillbalplass',
            url: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            groupid: 3,
            order: 3,
            params: {
              layers: 'grillbalplass_03',
              format: 'image/png',
            },
            guid: '3.grillbalplass_03',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  name: 'tilgjengvurderingrulleauto',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol/',
                  filetype: 'png',
                },
                {
                  alias: 'Registrert',
                  name: 'forstedatafangstdato',
                },
                {
                  alias: 'Oppdatert',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Type',
                  name: 'plasstype',
                },
                {
                  alias: 'Dekke materiale',
                  name: 'dekkemateriale',
                },
                {
                  alias: 'Dekke tilstand',
                  name: 'dekketilstand',
                },
                {
                  alias: 'Dekke fasthet',
                  name: 'dekkefasthet',
                },
                {
                  alias: 'Helning',
                  name: 'helning',
                  unit: '°',
                },
                {
                  alias: 'Kommentar',
                  name: 'kommentar',
                },
                {
                  alias: 'Bildefil 1',
                  name: 'bildefil1',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 2',
                  name: 'bildefil2',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 3',
                  name: 'bildefil3',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Objekt ID',
                  name: 'objektnr',
                },
                {
                  alias: 'Lokal ID',
                  name: 'lokalid',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: true,
              },
            },
            gatekeeper: true,
            name: 'baderampe',
            url: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            groupid: 3,
            order: 3,
            params: {
              layers: 'baderampe_02',
              format: 'image/png',
            },
            guid: '3.baderampe_02',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  name: 'tilgjengvurderingrulleauto',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol/',
                  filetype: 'png',
                },
                {
                  name: 'tilgjengvurderingsyn',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/syn/',
                  filetype: 'png',
                },
                {
                  alias: 'Registrert',
                  name: 'forstedatafangstdato',
                },
                {
                  alias: 'Oppdatert',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Rampe bredde',
                  name: 'rampebredde',
                  unit: 'cm',
                },
                {
                  alias: 'Rampe stigning',
                  name: 'rampestigning',
                  unit: '°',
                },
                {
                  alias: 'Rampe terskel',
                  name: 'rampeterskel',
                  unit: 'cm',
                },
                {
                  alias: 'Rampe tilgjengelig',
                  name: 'rampetilgjengelig',
                },
                {
                  alias: 'Håndlist',
                  name: 'handlist',
                },
                {
                  alias: 'Håndlist høyde øvre',
                  name: 'handlisthoydeovre',
                  unit: 'cm',
                },
                {
                  alias: 'Håndlist høyde nedre',
                  name: 'handlisthoydenedre',
                  unit: 'cm',
                },
                {
                  alias: 'Kommentar',
                  name: 'kommentar',
                },
                {
                  alias: 'Bildefil 1',
                  name: 'bildefil1',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 2',
                  name: 'bildefil2',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 3',
                  name: 'bildefil3',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Objekt ID',
                  name: 'objektnr',
                },
                {
                  alias: 'Lokal ID',
                  name: 'lokalid',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: true,
              },
            },
            gatekeeper: true,
            name: 'hc_parkering',
            url: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            groupid: 3,
            order: 3,
            params: {
              layers: 'hc_parkering_friluft_03',
              format: 'image/png',
            },
            guid: '3.hc_parkering_friluft_03',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  name: 'tilgjengvurderingrulleauto',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol/',
                  filetype: 'png',
                },
                {
                  alias: 'Registrert',
                  name: 'forstedatafangstdato',
                },
                {
                  alias: 'Oppdatert',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Skiltet',
                  name: 'skiltet',
                },
                {
                  alias: 'Merket',
                  name: 'merket',
                },
                {
                  alias: 'Avstand fasilitet',
                  name: 'avstandfasilitet',
                  unit: 'm',
                },
                {
                  alias: 'Bredde',
                  name: 'bredde',
                  unit: 'cm',
                },
                {
                  alias: 'Lengde',
                  name: 'lengde',
                  unit: 'cm',
                },
                {
                  alias: 'Avgift',
                  name: 'avgift',
                },
                {
                  alias: 'Automat høyde',
                  name: 'automathoyde',
                  unit: 'cm',
                },
                {
                  alias: 'Automat tilgjengelig',
                  name: 'tilgjengeligautomat',
                },
                {
                  alias: 'Kommentar',
                  name: 'kommentar',
                },
                {
                  alias: 'Bildefil 1',
                  name: 'bildefil1',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 2',
                  name: 'bildefil2',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 3',
                  name: 'bildefil3',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Objekt ID',
                  name: 'objektnr',
                },
                {
                  alias: 'Lokal ID',
                  name: 'lokalid',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: true,
              },
            },
            gatekeeper: true,
            name: 'Skiløype',
            url: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            groupid: 3,
            order: 3,
            params: {
              layers: 'skiloype_03',
              format: 'image/png',
            },
            guid: '3.skiloype_03',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  name: 'tilgjengvurderingrulleman',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol/',
                  filetype: 'png',
                },
                {
                  name: 'tilgjengvurderingsyn',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/syn/',
                  filetype: 'png',
                },
                {
                  alias: 'Registrert',
                  name: 'forstedatafangstdato',
                },
                {
                  alias: 'Oppdatert',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Avstand HC',
                  name: 'avstandhc',
                  unit: 'cm',
                },
                {
                  alias: 'Tverrfall',
                  name: 'tverrfall',
                  unit: '°',
                },
                {
                  alias: 'Sperrebom',
                  name: 'sperrebom',
                },
                {
                  alias: 'Sperrebom tilgjengelig',
                  name: 'sperrebomtilgjengelig',
                },
                {
                  alias: 'Stigning',
                  name: 'stigning',
                  unit: '°',
                },
                {
                  alias: 'Bredde',
                  name: 'bredde',
                  unit: 'cm',
                },
                {
                  alias: 'Dobbelspor',
                  name: 'dobbelspor',
                },
                {
                  alias: 'Frihoyde',
                  name: 'frihoyde',
                },
                {
                  alias: 'Belysning',
                  name: 'belysning',
                },
                {
                  alias: 'Kommentar',
                  name: 'kommentar',
                },
                {
                  alias: 'Forbedringsforslag',
                  name: 'forbedringsforslag',
                },
                {
                  alias: 'Bildefil 1',
                  name: 'bildefil1',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 2',
                  name: 'bildefil2',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 3',
                  name: 'bildefil3',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Objekt ID',
                  name: 'objektnr',
                },
                {
                  alias: 'Lokal ID',
                  name: 'lokalid',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: true,
              },
            },
            gatekeeper: true,
            name: 'sittegruppe',
            url: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            groupid: 10,
            order: 3,
            params: {
              layers: 'sittegruppe',
              format: 'image/png',
            },
            guid: '10.sittegruppe',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  name: 'tilgjengvurderingrulleauto',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol/',
                  filetype: 'png',
                },
                {
                  name: 'tilgjengvurderingelrullestol',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol_el/',
                  filetype: 'png',
                },
                {
                  alias: 'Registrert',
                  name: 'forstedatafangstdato',
                },
                {
                  alias: 'Oppdatert',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Dekke materiale',
                  name: 'dekkemateriale',
                },
                {
                  alias: 'Dekke tilstand',
                  name: 'dekketilstand',
                },
                {
                  alias: 'Dekke fasthet',
                  name: 'dekkefasthet',
                },
                {
                  alias: 'Helning',
                  name: 'helning',
                  unit: '°',
                },
                {
                  alias: 'Høyde benk',
                  name: 'hoydebenk',
                  unit: 'cm',
                },
                {
                  alias: 'Armlene',
                  name: 'armlene',
                },
                {
                  alias: 'Ryggstøtte',
                  name: 'ryggstotte',
                },
                {
                  alias: 'Bord høyde',
                  name: 'hoydebord',
                  unit: 'cm',
                },
                {
                  alias: 'Bord utstikk',
                  name: 'utstikkbord',
                  unit: 'cm',
                },
                {
                  alias: 'Kommentar',
                  name: 'kommentar',
                },
                {
                  alias: 'Bildefil 1',
                  name: 'bildefil1',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 2',
                  name: 'bildefil2',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 3',
                  name: 'bildefil3',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Objekt ID',
                  name: 'objektnr',
                },
                {
                  alias: 'Lokal ID',
                  name: 'lokalid',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: true,
              },
            },
            gatekeeper: true,
            name: 'toalett',
            url: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.tilgjengelighet3?',
            groupid: 10,
            order: 3,
            params: {
              layers: 'toalett',
              format: 'image/png',
            },
            guid: '10.toalett',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  name: 'tilgjengvurderingrulleauto',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol/',
                  filetype: 'png',
                },
                {
                  name: 'tilgjengvurderingelrullestol',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/rullestol_el/',
                  filetype: 'png',
                },
                {
                  name: 'tilgjengvurderingsyn',
                  type: 'symbol',
                  alias: 'tilgjengelighet',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/symboler/syn/',
                  filetype: 'png',
                },
                {
                  alias: 'Registrert',
                  name: 'forstedatafangstdato',
                },
                {
                  alias: 'Oppdatert',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Rampe bredde',
                  name: 'rampebredde',
                  unit: 'cm',
                },
                {
                  alias: 'Rampe lengde',
                  name: 'rampelengde',
                  unit: 'cm',
                },
                {
                  alias: 'Rampe stigning',
                  name: 'rampestigning',
                  unit: '°',
                },
                {
                  alias: 'Rampe terskel',
                  name: 'rampeterskel',
                  unit: 'cm',
                },
                {
                  alias: 'Rampe tilgjengelig',
                  name: 'rampetilgjengelig',
                },
                {
                  alias: 'Håndlist',
                  name: 'handlist',
                },
                {
                  alias: 'Håndlist høyde øvre',
                  name: 'handlisthoydeovre',
                  unit: 'cm',
                },
                {
                  alias: 'Håndlist høyde nedre',
                  name: 'handlisthoydenedre',
                  unit: 'cm',
                },
                {
                  alias: 'Trapp',
                  name: 'trapp',
                },
                {
                  alias: 'Rekkverk',
                  name: 'rekkverk',
                },
                {
                  alias: 'Trapp kontrast',
                  name: 'trappkontrast',
                },
                {
                  alias: 'Horisontalt felt',
                  name: 'horisontalfelt',
                  unit: 'cm',
                },
                {
                  alias: 'Dørtype',
                  name: 'dortype',
                },
                {
                  alias: 'Døråpner',
                  name: 'dorapner',
                },
                {
                  alias: 'Inngang bredde',
                  name: 'breddeinngang',
                  unit: 'cm',
                },
                {
                  alias: 'Inngang kontrast',
                  name: 'kontrastinngang',
                },
                {
                  alias: 'Terskel høyde',
                  name: 'terskelhoyde',
                  unit: 'cm',
                },
                {
                  alias: 'Diameter',
                  name: 'diameter',
                  unit: 'cm',
                },
                {
                  alias: 'Belysning',
                  name: 'belysninginne',
                },
                {
                  alias: 'Omkledning',
                  name: 'omkledningtilgjengelig',
                },
                {
                  alias: 'Servant',
                  name: 'servanttilgjengelig',
                },
                {
                  alias: 'WC',
                  name: 'wctilgjengelig',
                },
                {
                  alias: 'Kommentar',
                  name: 'kommentar',
                },
                {
                  alias: 'Bildefil 1',
                  name: 'bildefil1',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 2',
                  name: 'bildefil2',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Bildefil 3',
                  name: 'bildefil3',
                  type: 'picture',
                  baseurl: 'https://data.kartverket.no/tilgjengelighet/tilgjengelighet/',
                },
                {
                  alias: 'Objekt ID',
                  name: 'objektnr',
                },
                {
                  alias: 'Lokal ID',
                  name: 'lokalid',
                },
              ],
            },
          },
        ],
        maplayer: [
          {
            index: 6,
            name: 'tettsted_rullestol',
            groupid: 6,
          },
          {
            index: 9,
            name: 'tettsted_elektrisk_rullestol',
            groupid: 9,
          },
          {
            index: 8,
            name: 'tettsted_syn',
            groupid: 8,
          },
          {
            index: 5,
            name: 'friluft_rullestol',
            groupid: 5,
          },
          {
            index: 7,
            name: 'friluft_elektrisk_rullestol',
            groupid: 7,
          },
          {
            index: 3,
            name: 'friluft_syn',
            groupid: 3,
          },
          {
            index: 10,
            name: 'Felles',
            groupid: 10,
          },
        ],
      },
    },
    {
      SiteTitle: 'fastmerker',
      ProjectName: 'Fastmerker_title',
      HeaderIcon: 'navigation',
      HeaderTitle: 'fastmerker',
      Config: {
        name: 'fastmerker',
        layer: [
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'niv_fastmerker',
            info: 'Koordinatbestemte fastmerker er markert i terrenget med metallbolter som vanligvis er satt ned i fast fjell. Fastmerkene er inndelt i Stamnett, landsnett, trekantpunkter og høydefastmerker.',
            url: 'https://wms.geonorge.no/skwms1/wms.fastmerker2',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.fastmerker2',
            groupid: 2,
            params: {
              layers: 'Niv_fastmerker',
              format: 'image/png',
            },
            guid: '2.Niv_fastmerker',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Punktnummer',
                  name: 'punktnummer',
                },
                {
                  alias: 'Punktnavn',
                  name: 'punktnavn',
                },
                {
                  alias: 'Nord',
                  name: 'nord',
                },
                {
                  alias: 'Øst',
                  name: 'ost',
                },
                {
                  alias: 'Sone',
                  name: 'sone',
                },
                {
                  alias: 'Høyde_nn2000',
                  name: 'hoyde_nn2000',
                  unit: ' m',
                },
                {
                  alias: 'Høyde_nn1954',
                  name: 'hoyde_nn1954',
                  unit: ' m',
                },
                {
                  alias: 'Ellipsoidisk_høyde',
                  name: 'ellipsoidisk_hoyde',
                },
                {
                  alias: 'Punkttype',
                  name: 'punkttype',
                },
                {
                  alias: 'Underlag',
                  name: 'underlag',
                },
                {
                  alias: 'Kvalitet_nn1954',
                  name: 'kvalitet_nn1954',
                  unit: ' mm',
                },
                {
                  alias: 'Kvalitet_grunnriss',
                  name: 'kvalitet_grunnriss',
                  unit: ' mm',
                },
                {
                  alias: 'Status',
                  name: 'status',
                },
                {
                  alias: 'Status_år',
                  name: 'status_ar',
                },
                {
                  alias: 'Beskrivelse',
                  name: 'beskrivelse',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'landsnettpunkter',
            info: 'Koordinatbestemte fastmerker er markert i terrenget med metallbolter som vanligvis er satt ned i fast fjell. Fastmerkene er inndelt i Stamnett, landsnett, trekantpunkter og høydefastmerker.',
            url: 'https://wms.geonorge.no/skwms1/wms.fastmerker2',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.fastmerker2',
            groupid: 2,
            params: {
              layers: 'Landsnettpunkt',
              format: 'image/png',
            },
            guid: '2.Landsnettpunkt',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Punktnummer',
                  name: 'punktnummer',
                },
                {
                  alias: 'Punktnavn',
                  name: 'punktnavn',
                },
                {
                  alias: 'Nord',
                  name: 'nord',
                },
                {
                  alias: 'Øst',
                  name: 'ost',
                },
                {
                  alias: 'Sone',
                  name: 'sone',
                },
                {
                  alias: 'Høyde_nn2000',
                  name: 'hoyde_nn2000',
                  unit: ' m',
                },
                {
                  alias: 'Høyde_nn1954',
                  name: 'hoyde_nn1954',
                  unit: ' m',
                },
                {
                  alias: 'Ellipsoidisk_høyde',
                  name: 'ellipsoidisk_hoyde',
                },
                {
                  alias: 'Punkttype',
                  name: 'punkttype',
                },
                {
                  alias: 'Underlag',
                  name: 'underlag',
                },
                {
                  alias: 'Kvalitet_nn1954',
                  name: 'kvalitet_nn1954',
                  unit: ' mm',
                },
                {
                  alias: 'Kvalitet_grunnriss',
                  name: 'kvalitet_grunnriss',
                  unit: ' mm',
                },
                {
                  alias: 'Status',
                  name: 'status',
                },
                {
                  alias: 'Status_år',
                  name: 'status_ar',
                },
                {
                  alias: 'Beskrivelse',
                  name: 'beskrivelse',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'stamnettpunkter',
            info: 'Koordinatbestemte fastmerker er markert i terrenget med metallbolter som vanligvis er satt ned i fast fjell. Fastmerkene er inndelt i Stamnett, landsnett, trekantpunkter og høydefastmerker.',
            url: 'https://wms.geonorge.no/skwms1/wms.fastmerker2',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.fastmerker2',
            groupid: 2,
            params: {
              layers: 'Stamnettpunkt',
              format: 'image/png',
            },
            guid: '2.Stamnettpunkt',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Punktnummer',
                  name: 'punktnummer',
                },
                {
                  alias: 'Punktnavn',
                  name: 'punktnavn',
                },
                {
                  alias: 'Nord',
                  name: 'nord',
                },
                {
                  alias: 'Øst',
                  name: 'ost',
                },
                {
                  alias: 'Sone',
                  name: 'sone',
                },
                {
                  alias: 'Høyde_nn2000',
                  name: 'hoyde_nn2000',
                  unit: ' m',
                },
                {
                  alias: 'Høyde_nn1954',
                  name: 'hoyde_nn1954',
                  unit: ' m',
                },
                {
                  alias: 'Ellipsoidisk_høyde',
                  name: 'ellipsoidisk_hoyde',
                },
                {
                  alias: 'Punkttype',
                  name: 'punkttype',
                },
                {
                  alias: 'Underlag',
                  name: 'underlag',
                },
                {
                  alias: 'Kvalitet_nn1954',
                  name: 'kvalitet_nn1954',
                  unit: ' mm',
                },
                {
                  alias: 'Kvalitet_grunnriss',
                  name: 'kvalitet_grunnriss',
                  unit: ' mm',
                },
                {
                  alias: 'Status',
                  name: 'status',
                },
                {
                  alias: 'Status_år',
                  name: 'status_ar',
                },
                {
                  alias: 'Beskrivelse',
                  name: 'beskrivelse',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'trekantpunkter',
            info: 'Koordinatbestemte fastmerker er markert i terrenget med metallbolter som vanligvis er satt ned i fast fjell. Fastmerkene er inndelt i Stamnett, landsnett, trekantpunkter og høydefastmerker.',
            url: 'https://wms.geonorge.no/skwms1/wms.fastmerker2',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.fastmerker2',
            groupid: 2,
            params: {
              layers: 'Trekantpunkt',
              format: 'image/png',
            },
            guid: '2.Trekantpunkt',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Punktnummer',
                  name: 'punktnummer',
                },
                {
                  alias: 'Punktnavn',
                  name: 'punktnavn',
                },
                {
                  alias: 'Nord',
                  name: 'nord',
                },
                {
                  alias: 'Øst',
                  name: 'ost',
                },
                {
                  alias: 'Sone',
                  name: 'sone',
                },
                {
                  alias: 'Høyde_nn2000',
                  name: 'hoyde_nn2000',
                  unit: ' m',
                },
                {
                  alias: 'Høyde_nn1954',
                  name: 'hoyde_nn1954',
                  unit: ' m',
                },
                {
                  alias: 'Ellipsoidisk_høyde',
                  name: 'ellipsoidisk_hoyde',
                },
                {
                  alias: 'Punkttype',
                  name: 'punkttype',
                },
                {
                  alias: 'Underlag',
                  name: 'underlag',
                },
                {
                  alias: 'Kvalitet_nn1954',
                  name: 'kvalitet_nn1954',
                  unit: ' mm',
                },
                {
                  alias: 'Kvalitet_grunnriss',
                  name: 'kvalitet_grunnriss',
                  unit: ' mm',
                },
                {
                  alias: 'Status',
                  name: 'status',
                },
                {
                  alias: 'Status_år',
                  name: 'status_ar',
                },
                {
                  alias: 'Beskrivelse',
                  name: 'beskrivelse',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'utm_rutenett',
            url: 'https://openwms.statkart.no/skwms1/wms.rutenett?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.rutenett?',
            groupid: 5,
            params: {
              layers: 'UTMrutenett',
              format: 'image/png',
            },
            guid: '5.UTMrutenett',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'Norske stasjoner',
            url: 'https://wms.geonorge.no/skwms1/wms.fastmerker2',
            groupid: 6,
            params: {
              layers: 'Stasjoner',
              format: 'image/png',
            },
            guid: '6.Stasjoner',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stasjonsnavn',
                  name: 'sitename',
                },
                {
                  alias: 'StasjonsId',
                  name: 'fourcharid',
                },
                {
                  alias: 'Status',
                  name: 'siteConfigstattypename',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'Svenske og finske stasjoner',
            url: 'https://wms.geonorge.no/skwms1/wms.fastmerker2',
            groupid: 6,
            params: {
              layers: 'Svenske_finske_stasjoner',
              format: 'image/png',
            },
            guid: '6.Svenske_finske_stasjoner',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Stasjonsnavn',
                  name: 'sitename',
                },
                {
                  alias: 'StasjonsId',
                  name: 'fourcharid',
                },
                {
                  alias: 'Status',
                  name: 'siteConfigstattypename',
                },
              ],
            },
          },
        ],
        maplayer: [
          {
            index: 2,
            name: 'fastmerker',
            groupid: 2,
          },
          {
            index: 6,
            name: 'Basestasjoner',
            groupid: 6,
          },
          {
            index: 5,
            name: 'utm_rutenett',
            groupid: 5,
          },
        ],
        featureDict: {
          Punkttype: {
            T: 'Trekantpunkt',
            L: 'Landsnett',
            S: 'Stamnett',
            N: 'Høydefastmerke',
          },
        },
      },
    },
    {
      SiteTitle: 'nrl',
      ProjectName: 'nrl',
      HeaderIcon: 'flight',
      HeaderTitle: 'nrl',
      Config: {
        name: 'nrl',
        layer: [
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'andre_linjer_60m_og_over',
            info: 'Linjehinder som ikke er kraftledning, med største høyde over underliggende overflate 60 meter eller mer.',
            url: 'https://wms.geonorge.no/skwms1/wms.nrl4?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.nrl4?',
            groupid: 5,
            params: {
              layers: 'andre_linjer_60m_og_over',
              format: 'image/png',
            },
            guid: '5.andre_linjer_60m_og_over',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Nrl-id',
                  name: 'nrl_id',
                },
                {
                  alias: 'Navn',
                  name: 'navn',
                },
                {
                  alias: 'Vertikalutstrekning',
                  name: 'vertikalutstrekning',
                  unit: ' m',
                },
                {
                  alias: 'Lyssetting',
                  name: 'lyssetting',
                },
                {
                  alias: 'Status',
                  name: 'status',
                },
                {
                  alias: 'Verifiseringsdato',
                  name: 'verifiseringsdato',
                },
                {
                  alias: 'Hindertype',
                  name: 'hindertype',
                },
                {
                  alias: 'Datafangstdato',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Merking',
                  name: 'merking',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'andre_linjer_40m_60m',
            info: 'Linjehinder som ikke er kraftledning, med største høyde over underliggende overflate mellom 40 og 60 meter.',
            url: 'https://wms.geonorge.no/skwms1/wms.nrl4?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.nrl4?',
            groupid: 5,
            params: {
              layers: 'andre_linjer_mellom_40m_60m',
              format: 'image/png',
            },
            guid: '5.andre_linjer_mellom_40m_60m',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Nrl-id',
                  name: 'nrl_id',
                },
                {
                  alias: 'Navn',
                  name: 'navn',
                },
                {
                  alias: 'Vertikalutstrekning',
                  name: 'vertikalutstrekning',
                  unit: ' m',
                },
                {
                  alias: 'Lyssetting',
                  name: 'lyssetting',
                },
                {
                  alias: 'Status',
                  name: 'status',
                },
                {
                  alias: 'Verifiseringsdato',
                  name: 'verifiseringsdato',
                },
                {
                  alias: 'Hindertype',
                  name: 'hindertype',
                },
                {
                  alias: 'Datafangstdato',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Merking',
                  name: 'merking',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'andre_linjer_under_40m',
            info: 'Linjehinder som ikke er kraftledning, med største høyde over underliggende overflate under 40 meter.',
            url: 'https://wms.geonorge.no/skwms1/wms.nrl4?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.nrl4?',
            groupid: 5,
            params: {
              layers: 'andre_linjer_under_40m',
              format: 'image/png',
            },
            guid: '5.andre_linjer_under_40m',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Nrl-id',
                  name: 'nrl_id',
                },
                {
                  alias: 'Navn',
                  name: 'navn',
                },
                {
                  alias: 'Vertikalutstrekning',
                  name: 'vertikalutstrekning',
                  unit: ' m',
                },
                {
                  alias: 'Lyssetting',
                  name: 'lyssetting',
                },
                {
                  alias: 'Status',
                  name: 'status',
                },
                {
                  alias: 'Verifiseringsdato',
                  name: 'verifiseringsdato',
                },
                {
                  alias: 'Hindertype',
                  name: 'hindertype',
                },
                {
                  alias: 'Datafangstdato',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Merking',
                  name: 'merking',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'andre_linjer_uten_hoyde',
            info: 'Linjehinder som ikke er kraftledning, der største høyde over underliggende overflate er ukjent.',
            url: 'https://wms.geonorge.no/skwms1/wms.nrl4?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.nrl4?',
            groupid: 5,
            params: {
              layers: 'andre_linjer_uten_hoyde',
              format: 'image/png',
            },
            guid: '5.andre_linjer_uten_hoyde',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Nrl-id',
                  name: 'nrl_id',
                },
                {
                  alias: 'Navn',
                  name: 'navn',
                },
                {
                  alias: 'Vertikalutstrekning',
                  name: 'vertikalutstrekning',
                  unit: ' m',
                },
                {
                  alias: 'Lyssetting',
                  name: 'lyssetting',
                },
                {
                  alias: 'Status',
                  name: 'status',
                },
                {
                  alias: 'Verifiseringsdato',
                  name: 'verifiseringsdato',
                },
                {
                  alias: 'Hindertype',
                  name: 'hindertype',
                },
                {
                  alias: 'Datafangstdato',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Merking',
                  name: 'merking',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'linjepunkt_60m_og_over',
            info: 'Endepunkt, knekkpunkt eller mast/stolpe tilknyttet et linjehinder som ikke er en kraftledning, med vertikalutstrekning 60 meter eller mer.',
            url: 'https://wms.geonorge.no/skwms1/wms.nrl4?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.nrl4?',
            groupid: 5,
            params: {
              layers: 'linjepunkt_60m_og_over',
              format: 'image/png',
            },
            guid: '5.linjepunkt_60m_og_over',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Nrl-id',
                  name: 'nrl_id',
                },
                {
                  alias: 'Navn',
                  name: 'navn',
                },
                {
                  alias: 'Vertikalutstrekning',
                  name: 'vertikalutstrekning',
                  unit: ' m',
                },
                {
                  alias: 'Lyssetting',
                  name: 'lyssetting',
                },
                {
                  alias: 'Status',
                  name: 'status',
                },
                {
                  alias: 'Verifiseringsdato',
                  name: 'verifiseringsdato',
                },
                {
                  alias: 'Hindertype',
                  name: 'hindertype',
                },
                {
                  alias: 'Datafangstdato',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Merking',
                  name: 'merking',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'linjepunkt_40m_60m',
            info: 'Endepunkt, knekkpunkt eller mast/stolpe tilknyttet et linjehinder som ikke er en kraftledning, med vertikalutstrekning mellom 40 og 60 meter.',
            url: 'https://wms.geonorge.no/skwms1/wms.nrl4?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.nrl4?',
            groupid: 5,
            params: {
              layers: 'linjepunkt_mellom_40m_60m',
              format: 'image/png',
            },
            guid: '5.linjepunkt_mellom_40m_60m',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Nrl-id',
                  name: 'nrl_id',
                },
                {
                  alias: 'Navn',
                  name: 'navn',
                },
                {
                  alias: 'Vertikalutstrekning',
                  name: 'vertikalutstrekning',
                  unit: ' m',
                },
                {
                  alias: 'Lyssetting',
                  name: 'lyssetting',
                },
                {
                  alias: 'Status',
                  name: 'status',
                },
                {
                  alias: 'Verifiseringsdato',
                  name: 'verifiseringsdato',
                },
                {
                  alias: 'Hindertype',
                  name: 'hindertype',
                },
                {
                  alias: 'Datafangstdato',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Merking',
                  name: 'merking',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'linjepunkt_under_40m',
            info: 'Endepunkt, knekkpunkt eller mast/stolpe tilknyttet et linjehinder som ikke er en kraftledning, med vertikalutstrekning lavere enn 40 meter.',
            url: 'https://wms.geonorge.no/skwms1/wms.nrl4?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.nrl4?',
            groupid: 5,
            params: {
              layers: 'linjepunkt_under_40m',
              format: 'image/png',
            },
            guid: '5.linjepunkt_under_40m',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Nrl-id',
                  name: 'nrl_id',
                },
                {
                  alias: 'Navn',
                  name: 'navn',
                },
                {
                  alias: 'Vertikalutstrekning',
                  name: 'vertikalutstrekning',
                  unit: ' m',
                },
                {
                  alias: 'Lyssetting',
                  name: 'lyssetting',
                },
                {
                  alias: 'Status',
                  name: 'status',
                },
                {
                  alias: 'Verifiseringsdato',
                  name: 'verifiseringsdato',
                },
                {
                  alias: 'Hindertype',
                  name: 'hindertype',
                },
                {
                  alias: 'Datafangstdato',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Merking',
                  name: 'merking',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'linjepunkt_uten_hoyde',
            info: 'Endepunkt, knekkpunkt eller mast/stolpe tilknyttet et linjehinder som ikke er en kraftledning, med ukjent vertikalutstrekning.',
            url: 'https://wms.geonorge.no/skwms1/wms.nrl4?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.nrl4?',
            groupid: 5,
            params: {
              layers: 'linjepunkt_uten_hoyde',
              format: 'image/png',
            },
            guid: '5.linjepunkt_uten_hoyde',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Nrl-id',
                  name: 'nrl_id',
                },
                {
                  alias: 'Navn',
                  name: 'navn',
                },
                {
                  alias: 'Vertikalutstrekning',
                  name: 'vertikalutstrekning',
                  unit: ' m',
                },
                {
                  alias: 'Lyssetting',
                  name: 'lyssetting',
                },
                {
                  alias: 'Status',
                  name: 'status',
                },
                {
                  alias: 'Verifiseringsdato',
                  name: 'verifiseringsdato',
                },
                {
                  alias: 'Hindertype',
                  name: 'hindertype',
                },
                {
                  alias: 'Datafangstdato',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Merking',
                  name: 'merking',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'kraftledning_60m_og_over',
            info: 'Kraftledning med største høyde over underliggende overflate 60 meter eller mer.',
            url: 'https://wms.geonorge.no/skwms1/wms.nrl4?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.nrl4?',
            groupid: 3,
            params: {
              layers: 'kraftledning_60m_og_over',
              format: 'image/png',
            },
            guid: '3.kraftledning_60m_og_over',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Nrl-id',
                  name: 'nrl_id',
                },
                {
                  alias: 'Navn',
                  name: 'navn',
                },
                {
                  alias: 'Vertikalutstrekning',
                  name: 'vertikalutstrekning',
                  unit: ' m',
                },
                {
                  alias: 'Lyssetting',
                  name: 'lyssetting',
                },
                {
                  alias: 'Status',
                  name: 'status',
                },
                {
                  alias: 'Verifiseringsdato',
                  name: 'verifiseringsdato',
                },
                {
                  alias: 'Hindertype',
                  name: 'hindertype',
                },
                {
                  alias: 'Datafangstdato',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Merking',
                  name: 'merking',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'kraftledning_40m_60m',
            info: 'Kraftledning med største høyde over underliggende overflate mellom 40 og 60 meter.',
            url: 'https://wms.geonorge.no/skwms1/wms.nrl4?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.nrl4?',
            groupid: 3,
            params: {
              layers: 'kraftledning_mellom_40m_60m',
              format: 'image/png',
            },
            guid: '3.kraftledning_mellom_40m_60m',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Nrl-id',
                  name: 'nrl_id',
                },
                {
                  alias: 'Navn',
                  name: 'navn',
                },
                {
                  alias: 'Vertikalutstrekning',
                  name: 'vertikalutstrekning',
                  unit: ' m',
                },
                {
                  alias: 'Lyssetting',
                  name: 'lyssetting',
                },
                {
                  alias: 'Status',
                  name: 'status',
                },
                {
                  alias: 'Verifiseringsdato',
                  name: 'verifiseringsdato',
                },
                {
                  alias: 'Hindertype',
                  name: 'hindertype',
                },
                {
                  alias: 'Datafangstdato',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Merking',
                  name: 'merking',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'kraftledning_under_40m',
            info: 'Kraftledning med største høyde over underliggende overflate lavere enn 40 meter.',
            url: 'https://wms.geonorge.no/skwms1/wms.nrl4?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.nrl4?',
            groupid: 3,
            params: {
              layers: 'kraftledning_under_40m',
              format: 'image/png',
            },
            guid: '3.kraftledning_under_40m',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Nrl-id',
                  name: 'nrl_id',
                },
                {
                  alias: 'Navn',
                  name: 'navn',
                },
                {
                  alias: 'Vertikalutstrekning',
                  name: 'vertikalutstrekning',
                  unit: ' m',
                },
                {
                  alias: 'Lyssetting',
                  name: 'lyssetting',
                },
                {
                  alias: 'Status',
                  name: 'status',
                },
                {
                  alias: 'Verifiseringsdato',
                  name: 'verifiseringsdato',
                },
                {
                  alias: 'Hindertype',
                  name: 'hindertype',
                },
                {
                  alias: 'Datafangstdato',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Merking',
                  name: 'merking',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'kraftledning_uten_hoyde',
            info: 'Kraftledning der største høyde over underliggende overflate er ukjent.',
            url: 'https://wms.geonorge.no/skwms1/wms.nrl4?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.nrl4?',
            groupid: 3,
            params: {
              layers: 'kraftledning_uten_hoyde',
              format: 'image/png',
            },
            guid: '3.kraftledning_uten_hoyde',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Nrl-id',
                  name: 'nrl_id',
                },
                {
                  alias: 'Navn',
                  name: 'navn',
                },
                {
                  alias: 'Vertikalutstrekning',
                  name: 'vertikalutstrekning',
                  unit: ' m',
                },
                {
                  alias: 'Lyssetting',
                  name: 'lyssetting',
                },
                {
                  alias: 'Status',
                  name: 'status',
                },
                {
                  alias: 'Verifiseringsdato',
                  name: 'verifiseringsdato',
                },
                {
                  alias: 'Hindertype',
                  name: 'hindertype',
                },
                {
                  alias: 'Datafangstdato',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Merking',
                  name: 'merking',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'kraftstolpe_60m_og_over',
            info: 'Kraftstolpe med vertikalutstrekning 60 meter eller mer.',
            url: 'https://wms.geonorge.no/skwms1/wms.nrl4?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.nrl4?',
            groupid: 3,
            params: {
              layers: 'kraftstolpe_60m_og_over',
              format: 'image/png',
            },
            guid: '3.kraftstolpe_60m_og_over',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Nrl-id',
                  name: 'nrl_id',
                },
                {
                  alias: 'Navn',
                  name: 'navn',
                },
                {
                  alias: 'Vertikalutstrekning',
                  name: 'vertikalutstrekning',
                  unit: ' m',
                },
                {
                  alias: 'Lyssetting',
                  name: 'lyssetting',
                },
                {
                  alias: 'Status',
                  name: 'status',
                },
                {
                  alias: 'Verifiseringsdato',
                  name: 'verifiseringsdato',
                },
                {
                  alias: 'Hindertype',
                  name: 'hindertype',
                },
                {
                  alias: 'Datafangstdato',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Merking',
                  name: 'merking',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'kraftstolpe_40m_60m',
            info: 'Kraftstolpe med vertikalutstrekning mellom 40 og 60 meter.',
            url: 'https://wms.geonorge.no/skwms1/wms.nrl4?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.nrl4?',
            groupid: 3,
            params: {
              layers: 'kraftstolpe_mellom_40m_60m',
              format: 'image/png',
            },
            guid: '3.kraftstolpe_mellom_40m_60m',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Nrl-id',
                  name: 'nrl_id',
                },
                {
                  alias: 'Navn',
                  name: 'navn',
                },
                {
                  alias: 'Vertikalutstrekning',
                  name: 'vertikalutstrekning',
                  unit: ' m',
                },
                {
                  alias: 'Lyssetting',
                  name: 'lyssetting',
                },
                {
                  alias: 'Status',
                  name: 'status',
                },
                {
                  alias: 'Verifiseringsdato',
                  name: 'verifiseringsdato',
                },
                {
                  alias: 'Hindertype',
                  name: 'hindertype',
                },
                {
                  alias: 'Datafangstdato',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Merking',
                  name: 'merking',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'kraftstolpe_under_40m',
            info: 'Kraftstolpe med vertikalutstrekning lavere enn 40 meter.',
            url: 'https://wms.geonorge.no/skwms1/wms.nrl4?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.nrl4?',
            groupid: 3,
            params: {
              layers: 'kraftstolpe_under_40m',
              format: 'image/png',
            },
            guid: '3.kraftstolpe_under_40m',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Nrl-id',
                  name: 'nrl_id',
                },
                {
                  alias: 'Navn',
                  name: 'navn',
                },
                {
                  alias: 'Vertikalutstrekning',
                  name: 'vertikalutstrekning',
                  unit: ' m',
                },
                {
                  alias: 'Lyssetting',
                  name: 'lyssetting',
                },
                {
                  alias: 'Status',
                  name: 'status',
                },
                {
                  alias: 'Verifiseringsdato',
                  name: 'verifiseringsdato',
                },
                {
                  alias: 'Hindertype',
                  name: 'hindertype',
                },
                {
                  alias: 'Datafangstdato',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Merking',
                  name: 'merking',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'kraftstolpe_uten_hoyde',
            info: 'Kraftstolpe der vertikalutstrekning er ukjent.',
            url: 'https://wms.geonorge.no/skwms1/wms.nrl4?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.nrl4?',
            groupid: 3,
            params: {
              layers: 'kraftstolpe_uten_hoyde',
              format: 'image/png',
            },
            guid: '3.kraftstolpe_uten_hoyde',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Nrl-id',
                  name: 'nrl_id',
                },
                {
                  alias: 'Navn',
                  name: 'navn',
                },
                {
                  alias: 'Vertikalutstrekning',
                  name: 'vertikalutstrekning',
                  unit: ' m',
                },
                {
                  alias: 'Lyssetting',
                  name: 'lyssetting',
                },
                {
                  alias: 'Status',
                  name: 'status',
                },
                {
                  alias: 'Verifiseringsdato',
                  name: 'verifiseringsdato',
                },
                {
                  alias: 'Hindertype',
                  name: 'hindertype',
                },
                {
                  alias: 'Datafangstdato',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Merking',
                  name: 'merking',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'punkthindre_60m_og_over',
            info: 'Punkthinder med vertikalutstrekning 60 meter eller mer.',
            url: 'https://wms.geonorge.no/skwms1/wms.nrl4?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.nrl4?',
            groupid: 7,
            params: {
              layers: 'Punkthindre_60m_og_over',
              format: 'image/png',
            },
            guid: '7.Punkthindre_60m_og_over',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Nrl-id',
                  name: 'nrl_id',
                },
                {
                  alias: 'Navn',
                  name: 'navn',
                },
                {
                  alias: 'Vertikalutstrekning',
                  name: 'vertikalutstrekning',
                  unit: ' m',
                },
                {
                  alias: 'Lyssetting',
                  name: 'lyssetting',
                },
                {
                  alias: 'Status',
                  name: 'status',
                },
                {
                  alias: 'Verifiseringsdato',
                  name: 'verifiseringsdato',
                },
                {
                  alias: 'Hindertype',
                  name: 'hindertype',
                },
                {
                  alias: 'Datafangstdato',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Merking',
                  name: 'merking',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'punkthindre_40m_60m',
            info: 'Punkthinder med vertikalutstrekning mellom 40 og 60 meter.',
            url: 'https://wms.geonorge.no/skwms1/wms.nrl4?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.nrl4?',
            groupid: 7,
            params: {
              layers: 'punkthindre_mellom_40m_60m',
              format: 'image/png',
            },
            guid: '7.punkthindre_mellom_40m_60m',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Nrl-id',
                  name: 'nrl_id',
                },
                {
                  alias: 'Navn',
                  name: 'navn',
                },
                {
                  alias: 'Vertikalutstrekning',
                  name: 'vertikalutstrekning',
                  unit: ' m',
                },
                {
                  alias: 'Lyssetting',
                  name: 'lyssetting',
                },
                {
                  alias: 'Status',
                  name: 'status',
                },
                {
                  alias: 'Verifiseringsdato',
                  name: 'verifiseringsdato',
                },
                {
                  alias: 'Hindertype',
                  name: 'hindertype',
                },
                {
                  alias: 'Datafangstdato',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Merking',
                  name: 'merking',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'punkthindre_under_40m',
            info: 'Punkthinder med vertikalutstrekning lavere enn 40 meter.',
            url: 'https://wms.geonorge.no/skwms1/wms.nrl4?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.nrl4?',
            groupid: 7,
            params: {
              layers: 'punkthindre_under_40m',
              format: 'image/png',
            },
            guid: '7.punkthindre_under_40m',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Nrl-id',
                  name: 'nrl_id',
                },
                {
                  alias: 'Navn',
                  name: 'navn',
                },
                {
                  alias: 'Vertikalutstrekning',
                  name: 'vertikalutstrekning',
                  unit: ' m',
                },
                {
                  alias: 'Lyssetting',
                  name: 'lyssetting',
                },
                {
                  alias: 'Status',
                  name: 'status',
                },
                {
                  alias: 'Verifiseringsdato',
                  name: 'verifiseringsdato',
                },
                {
                  alias: 'Hindertype',
                  name: 'hindertype',
                },
                {
                  alias: 'Datafangstdato',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Merking',
                  name: 'merking',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            Layers: {
              Layer: {
                queryable: false,
              },
            },
            gatekeeper: true,
            name: 'punkthindre_uten_hoyde',
            info: 'Punkthinder der vertikalutstrekning er ukjent.',
            url: 'https://wms.geonorge.no/skwms1/wms.nrl4?',
            legendurl: 'https://wms.geonorge.no/skwms1/wms.nrl4?',
            groupid: 7,
            params: {
              layers: 'punkthindre_uten_hoyde',
              format: 'image/png',
            },
            guid: '7.punkthindre_uten_hoyde',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: false,
            },
            includedfields: {
              field: [
                {
                  alias: 'Nrl-id',
                  name: 'nrl_id',
                },
                {
                  alias: 'Navn',
                  name: 'navn',
                },
                {
                  alias: 'Vertikalutstrekning',
                  name: 'vertikalutstrekning',
                  unit: ' m',
                },
                {
                  alias: 'Lyssetting',
                  name: 'lyssetting',
                },
                {
                  alias: 'Status',
                  name: 'status',
                },
                {
                  alias: 'Verifiseringsdato',
                  name: 'verifiseringsdato',
                },
                {
                  alias: 'Hindertype',
                  name: 'hindertype',
                },
                {
                  alias: 'Datafangstdato',
                  name: 'datafangstdato',
                },
                {
                  alias: 'Merking',
                  name: 'merking',
                },
              ],
            },
          },
        ],
        maplayer: [
          {
            index: 3,
            name: 'kraftledninger',
            groupid: 3,
          },
          {
            index: 5,
            name: 'andre_linjehindre',
            groupid: 5,
          },
          {
            index: 7,
            name: 'punkthindre',
            groupid: 7,
          },
        ],
        featureDict: {
          Status: {
            E: 'Eksisterende',
            P: 'Planlagt',
            O: 'Ombygd',
            U: 'Under arbeid',
          },
          Lyssetting: {
            IL: 'Ikke lyssatt',
            UKJ: 'Ukjent',
            LIA: 'Lyssatt',
            LIB: 'Lyssatt',
            LIC: 'Lyssatt',
            LID: 'Lyssatt',
            MIA: 'Lyssatt',
            MIB: 'Lyssatt',
            MIC: 'Lyssatt',
            HIA: 'Lyssatt',
            HIB: 'Lyssatt',
            FLO: 'Lyssatt',
            FR: 'Lyssatt',
            FH: 'Lyssatt',
            BH: 'Lyssatt',
            BR: 'Lyssatt',
            L: 'Lyssatt',
          },
        },
      },
    },
    {
      SiteTitle: 'dekning',
      ProjectName: 'Dekning_title',
      HeaderIcon: 'map',
      HeaderTitle: 'dekning',
      Config: {
        name: 'dekning',
        layer: [
          {
            distributionProtocol: 'GEOJSON',
            type: 'overlay',
            name: 'hovedkart_sjo',
            url: 'https://www.norgeskart.no/json/dekning/sjo/hovedserie_ny.json',
            epsg: 'EPSG:4326',
            groupid: 1,
            params: {
              format: 'application/json',
            },
            guid: '1.Hovedkart sjø',
            options: {
              visibility: false,
            },
            style: {
              fill: {
                color: 'rgba(128, 128, 128, 0.1)',
              },
              stroke: {
                color: 'rgb(64, 128, 64)',
                width: 1,
              },
              text: {
                text: '{id}',
                scale: 1.3,
                fill: {
                  color: '#000000',
                },
                stroke: {
                  color: '#FFF9AA',
                  width: 3.5,
                },
              },
            },
            includedfields: {
              field: [
                {
                  name: 'id',
                  alias: 'ID',
                },
                {
                  name: 'name',
                  alias: 'Navn',
                },
                {
                  name: 'u',
                  alias: 'Ny utgave',
                },
                {
                  name: 's',
                  alias: 'Målestokk',
                },
                {
                  name: 'p',
                  alias: 'Projeksjon',
                },
                {
                  name: 'd',
                  alias: 'Datum',
                },
              ],
            },
          },
          {
            distributionProtocol: 'GEOJSON',
            type: 'overlay',
            name: 'norge_1_50000',
            url: 'https://www.norgeskart.no/json/dekning/land/n50/pod-inndeling2015-flaterf.json',
            epsg: 'EPSG:25833',
            groupid: 1,
            params: {
              format: 'application/json',
            },
            guid: '1.Norge 1:50000',
            options: {
              visibility: false,
            },
            style: {
              fill: {
                color: 'rgba(128, 128, 128, 0.1)',
              },
              stroke: {
                color: 'rgb(64, 128, 64)',
                width: 1,
              },
              text: {
                text: '{n}',
                scale: 1.3,
                fill: {
                  color: '#000000',
                },
                stroke: {
                  color: '#FFF9AA',
                  width: 3.5,
                },
              },
            },
            includedfields: {
              field: [
                {
                  name: 'AREA',
                  alias: 'Area',
                },
                {
                  name: 'PERIMETER',
                  alias: 'Perimeter',
                },
                {
                  name: 'OPPR',
                  alias: 'Oppr',
                },
                {
                  name: 'X',
                  alias: 'X',
                },
                {
                  name: 'Y',
                  alias: 'Y',
                },
                {
                  name: 'KOORDH',
                  alias: 'Koordh',
                },
                {
                  name: 'n',
                  alias: 'Pod_kartnr',
                },
                {
                  name: 'TRNORD',
                  alias: 'TRNORD',
                },
                {
                  name: 'TROEST',
                  alias: 'TROEST',
                },
                {
                  name: 'MALEMETODE',
                  alias: 'MALEMETODE',
                },
                {
                  name: 'NOYAKTIGHE',
                  alias: 'NOYAKTIGHET',
                },
                {
                  name: 'SYNBARHET',
                  alias: 'SYNBARHET',
                },
                {
                  name: 'H_MALEMETO',
                  alias: 'H_MALEMETO',
                },
                {
                  name: 'H_NOYAKTIG',
                  alias: 'H_NOYAKTIG',
                },
                {
                  name: 'MAX_AVVIK',
                  alias: 'MAX_AVVIK',
                },
                {
                  name: 'OBJTYPE',
                  alias: 'OBJTYPE',
                },
              ],
            },
          },
          {
            distributionProtocol: 'GEOJSON',
            type: 'overlay',
            name: 'overseilingskart',
            url: 'https://www.norgeskart.no/json/dekning/sjo/overseilingskart_ny.json',
            epsg: 'EPSG:4326',
            groupid: 1,
            params: {
              format: 'application/json',
            },
            guid: '1.Overseilingskart',
            options: {
              visibility: false,
            },
            style: {
              fill: {
                color: 'rgba(128, 128, 128, 0.1)',
              },
              stroke: {
                color: 'rgb(64, 64, 128)',
                width: 1,
              },
              text: {
                text: '{id}',
                scale: 1.3,
                fill: {
                  color: '#000000',
                },
                stroke: {
                  color: '#FFF9AA',
                  width: 3.5,
                },
              },
            },
            includedfields: {
              field: [
                {
                  name: 'id',
                  alias: 'ID',
                },
                {
                  name: 'name',
                  alias: 'Navn',
                },
                {
                  name: 'u',
                  alias: 'Ny utgave',
                },
                {
                  name: 's',
                  alias: 'Målestokk',
                },
                {
                  name: 'p',
                  alias: 'Projeksjon',
                },
                {
                  name: 'd',
                  alias: 'Datum',
                },
              ],
            },
          },
          {
            distributionProtocol: 'GEOJSON',
            type: 'overlay',
            name: 'kystkart',
            url: 'https://www.norgeskart.no/json/dekning/sjo/kystkart_ny.json',
            epsg: 'EPSG:4326',
            groupid: 1,
            params: {
              format: 'application/json',
            },
            guid: '1.Kystkart',
            options: {
              visibility: false,
            },
            style: {
              fill: {
                color: 'rgba(128, 128, 128, 0.1)',
              },
              stroke: {
                color: 'rgb(128, 64, 64)',
                width: 1,
              },
              text: {
                text: '{id}',
                scale: 1.3,
                fill: {
                  color: '#000000',
                },
                stroke: {
                  color: '#FFF9AA',
                  width: 3.5,
                },
              },
            },
            includedfields: {
              field: [
                {
                  name: 'id',
                  alias: 'ID',
                },
                {
                  name: 'name',
                  alias: 'Navn',
                },
                {
                  name: 's',
                  alias: 'Målestokk',
                },
                {
                  name: 'p',
                  alias: 'Projeksjon',
                },
                {
                  name: 'd',
                  alias: 'Datum',
                },
              ],
            },
          },
          {
            distributionProtocol: 'GEOJSON',
            type: 'overlay',
            name: 'havnekart',
            url: 'https://www.norgeskart.no/json/dekning/sjo/havnekart_ny.json',
            epsg: 'EPSG:4326',
            groupid: 1,
            params: {
              format: 'application/json',
            },
            guid: '1.Havnekart',
            options: {
              visibility: false,
            },
            style: {
              fill: {
                color: 'rgba(128, 128, 128, 0.1)',
              },
              stroke: {
                color: 'rgb(128, 64, 64)',
                width: 1,
              },
              text: {
                text: '{id}',
                scale: 1.3,
                fill: {
                  color: '#000000',
                },
                stroke: {
                  color: '#FFF9AA',
                  width: 3.5,
                },
              },
            },
            includedfields: {
              field: [
                {
                  name: 'id',
                  alias: 'ID',
                },
                {
                  name: 'name',
                  alias: 'Navn',
                },
                {
                  name: 's',
                  alias: 'Målestokk',
                },
                {
                  name: 'p',
                  alias: 'Projeksjon',
                },
                {
                  name: 'd',
                  alias: 'Datum',
                },
              ],
            },
          },
          {
            distributionProtocol: 'GEOJSON',
            type: 'overlay',
            name: 'svalbardkart_sjo',
            url: 'https://www.norgeskart.no/json/dekning/sjo/svalbardkart_ny.json',
            epsg: 'EPSG:4326',
            groupid: 1,
            params: {
              format: 'application/json',
            },
            guid: '1.Hovedkart Svalbard',
            options: {
              visibility: false,
            },
            style: {
              fill: {
                color: 'rgba(128, 128, 128, 0.1)',
              },
              stroke: {
                color: 'rgb(64, 128, 64)',
                width: 1,
              },
              text: {
                text: '{id}',
                scale: 1.3,
                fill: {
                  color: '#000000',
                },
                stroke: {
                  color: '#FFF9AA',
                  width: 3.5,
                },
              },
            },
            includedfields: {
              field: [
                {
                  name: 'id',
                  alias: 'ID',
                },
                {
                  name: 'name',
                  alias: 'Navn',
                },
                {
                  name: 'u',
                  alias: 'Ny utgave',
                },
                {
                  name: 's',
                  alias: 'Målestokk',
                },
                {
                  name: 'p',
                  alias: 'Projeksjon',
                },
                {
                  name: 'd',
                  alias: 'Datum',
                },
              ],
            },
          },
        ],
        maplayer: [
          {
            index: 1,
            name: 'dekning',
            groupid: 1,
          },
        ],
      },
    },
    {
      SiteTitle: 'arbeidsgiveravgiftsoner',
      ProjectName: 'arbeidsgiveravgiftsoner',
      HeaderIcon: 'payments',
      HeaderTitle: 'arbeidsgiveravgiftsoner',
      Config: {
        name: 'arbeidsgiveravgiftsoner',
        layer: [
          {
            distributionProtocol: 'WMS',
            gatekeeper: true,
            name: 'Arbeidsgiveravgiftsoner',
            info: 'Arbeidsgiveravgiftsoner',
            url: 'https://openwms.statkart.no/skwms1/wms.arbeidsgiveravgiftsoner',
            legendurl: 'https://openwms.statkart.no/skwms1/wms.arbeidsgiveravgiftsoner',
            groupid: 2,
            params: {
              layers: 'soner',
              format: 'image/png',
            },
            guid: '2.Arbeidsgiveravgiftsoner',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: true,
            },
            includedfields: {
              field: [
                {
                  alias: 'Sone',
                  name: 'arbeidsgiveravgiftsonekode',
                },
                {
                  alias: 'datauttaksdato',
                  name: 'datauttaksdato',
                },
              ],
            },
          },
          {
            distributionProtocol: 'WMS',
            gatekeeper: true,
            name: 'Kommuner',
            info: 'Arbeidsgiveravgiftsoner',
            url: 'https://openwms.statkart.no/skwms1/wms.arbeidsgiveravgiftsoner',
            legendurl: 'https://openwms.statkart.no/skwms1/wms.arbeidsgiveravgiftsoner',
            groupid: 2,
            params: {
              layers: 'kommuner',
              format: 'image/png',
            },
            guid: '2.Arbeidsgiveravgiftsoner',
            options: {
              isbaselayer: false,
              singletile: true,
              visibility: true,
            },
            includedfields: {
              field: [
                {
                  alias: 'Kommunenummer',
                  name: 'kommunenummer',
                },
                {
                  alias: 'Navn prioritet 1',
                  name: 'navn_pri_1',
                },
                {
                  alias: 'Navn prioritet 2',
                  name: 'navn_pri_2',
                },
                {
                  alias: 'Navn prioritet 3',
                  name: 'navn_pri_3',
                },
              ],
            },
          },
        ],
        maplayer: [
          {
            index: 2,
            name: 'Arbeidsgiveravgiftsoner',
            groupid: 2,
          },
        ],
      },
    },
  ],
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

}));
