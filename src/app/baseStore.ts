import produce from 'immer';
import create from 'zustand';

import { IBaseConfig, IBaseLayers, IBaseMap, ILayer } from '../MapCore/Models/config-model';

export const useBaseConfigStore = create<IBaseConfig>(set => ({
  center: [396722, 7197864],
  mapepsg: 'EPSG:25833',
  zoom: 4,
  displayCenter: '396722,7197864',
  gatekeeperhost: 'https://www.norgeskart.no/ws/gatekeeper.py?key=73e029c3632c49bb1586fc57a60fb701kv',
  tickethost: 'https://www.norgeskart.no/ws/esk.py?wms.ecc_enc',
  name: 'norgeskart',
  mapbound: [
    {
      epsg: 'EPSG:23031',
      extent: '-1500000.0, 3500000.0, 4045984.0, 9045984.0',
    },
    {
      epsg: 'EPSG:23032',
      extent: '-2000000.0, 3500000.0, 3545984.0, 9045984.0',
    },
    {
      epsg: 'EPSG:23033',
      extent: '-2500000.0, 3500000.0, 3045984.0, 9045984.0',
    },
    {
      epsg: 'EPSG:23034',
      extent: '-3000000.0, 3500000.0, 2545984.0, 9045984.0',
    },
    {
      epsg: 'EPSG:23035',
      extent: '-3500000.0, 3500000.0, 2045984.0, 9045984.0',
    },
    {
      epsg: 'EPSG:23036',
      extent: '-4000000.0, 3500000.0, 1545984.0, 9045984.0',
    },
    {
      epsg: 'EPSG:25831',
      extent: '-1500000.0, 3500000.0, 4045984.0, 9045984.0',
    },
    {
      epsg: 'EPSG:25832',
      extent: '-2000000.0, 3500000.0, 3545984.0, 9045984.0',
    },
    {
      epsg: 'EPSG:25833',
      extent: '-2500000.0, 3500000.0, 3045984.0, 9045984.0',
    },
    {
      epsg: 'EPSG:25834',
      extent: '-3000000.0, 3500000.0, 2545984.0, 9045984.0',
    },
    {
      epsg: 'EPSG:25835',
      extent: '-3500000.0, 3500000.0, 2045984.0, 9045984.0',
    },
    {
      epsg: 'EPSG:25836',
      extent: '-4000000.0, 3500000.0, 1545984.0, 9045984.0',
    },
    {
      epsg: 'EPSG:32631',
      extent: '-1500000.0, 3500000.0, 4045984.0, 9045984.0',
    },
    {
      epsg: 'EPSG:32632',
      extent: '-2000000.0, 3500000.0, 3545984.0, 9045984.0',
    },
    {
      epsg: 'EPSG:25833',
      extent: '-2500000.0, 3500000.0, 3045984.0, 9045984.0',
    },
    {
      epsg: 'EPSG:32634',
      extent: '-3000000.0, 3500000.0, 2545984.0, 9045984.0',
    },
    {
      epsg: 'EPSG:32635',
      extent: '-3500000.0, 3500000.0, 2045984.0, 9045984.0',
    },
    {
      epsg: 'EPSG:32636',
      extent: '-4000000.0, 3500000.0, 1545984.0, 9045984.0',
    },
    {
      epsg: 'EPSG:4326',
      extent: '-180, -90, 180, 90',
    },
    {
      epsg: 'EPSG:3857',
      extent: '-20037508.34, -20037508.34, 20037508.34, 20037508.34',
    },
    {
      epsg: 'EPSG:900913',
      extent: '-20037508.34, -20037508.34, 20037508.34, 20037508.34',
    },
    {
      epsg: 'EPSG:54009',
      extent: '-18000000.0, -9000000.0, 18000000.0, 9000000.0',
    },
    {
      epsg: 'EPSG:3006',
      extent: '-1200000.0, 4700000.0, 2600000.0, 8500000.0',
    },
  ],

  setBaseConfig: (baseConfig: IBaseConfig) => set(baseConfig),
}));

export const useBaseMapStore = create<IBaseMap>(set => ({
  url: 'https://cache.kartverket.no/europa_forenklet/v1/wmts/1.0.0/',
  gatekeeper: true,
  name: 'europa_forenklet',
  layers: 'europa_forenklet',
  format: 'image/png',
  matrixPrefix: false,
  matrixSet: 'utm33n',
  options: {
    isbaselayer: true,
    singletile: false,
    visibility: true,
  },

  setBaseMap: (baseMap: IBaseMap) => set(baseMap),
}));

export const useBaseLayersStore = create<IBaseLayers>(set => ({
  layers: [
    {
      distributionProtocol: 'WMTS',
      type: 'map',
      gatekeeper: true,
      name: 'landkart',
      uuid: 'c0d063aa-59fc-42db-bc5d-a1c88f2bf256',
      description: 'Viser data fra Topografisk norgeskart WMS, Dybdedata WMS og Svalvard data fra Polar Instituttet',
      url: 'https://cache.kartverket.no/norgeskart_bakgrunn/v1/wmts/1.0.0/',
      params: {
        layers: 'norgeskart_bakgrunn',
        format: 'image/png',
      },
      matrixprefix: false,
      matrixset: 'utm33n',
      guid: '0.norgeskart_bakgrunn',
      options: {
        isbaselayer: true,
        singletile: false,
        visibility: true,
      },
      thumbnail: 'land',
    },
    {
      distributionProtocol: 'WMTS',
      type: 'map',
      gatekeeper: true,
      name: 'flybilder',
      uuid: 'efae19ae-c267-47b7-ae0d-61861fb3b24f',
      description: 'Dette er flybilder, mer info finner du på geonorge',
      url: 'https://gatekeeper1.geonorge.no/BaatGatekeeper/gk/gk.nib_utm33_wmts_v2?|https://gatekeeper1.geonorge.no/BaatGatekeeper/gk/gk.nib_utm33_wmts_v2?',
      params: {
        layers: 'Nibcache_UTM33_EUREF89',
        format: 'image/png',
      },
      matrixset: 'default028mm',
      guid: '0.ortofoto',
      options: {
        isbaselayer: true,
        singletile: false,
        visibility: false,
      },
      thumbnail: 'aerial',
    },
    {
      distributionProtocol: 'WMTS',
      type: 'map',
      gatekeeper: true,
      name: 'rasterkart',
      uuid: '99de348d-fdc1-4b04-a79e-31feeeba030a',
      description: 'Viser kart slik den ser ut på papirkart',
      url: 'https://cache.kartverket.no/toporaster/v1/wmts/1.0.0/|https://cache.kartverket.no/toporaster/v1/wmts/1.0.0/',
      params: {
        layers: 'toporaster',
        format: 'image/png',
      },
      matrixprefix: false,
      matrixset: 'utm33n',
      guid: '0.toporaster',
      options: {
        isbaselayer: true,
        singletile: false,
        visibility: false,
      },
      thumbnail: 'raster',
    },
    {
      distributionProtocol: 'WMTS',
      type: 'map',
      gatekeeper: true,
      name: 'gratone',
      uuid: 'e84c9a6d-2297-4323-9078-36ac4b8e35e4',
      description: 'Viser topografiske kart som er ment som bakgrunnskart',
      url: 'https://cache.kartverket.no/norges_grunnkart_graatone/v1/wmts/1.0.0/|https://cache.kartverket.no/norges_grunnkart_graatone/v1/wmts/1.0.0/',
      params: {
        layers: 'norges_grunnkart_graatone',
        format: 'image/png',
      },
      matrixprefix: false,
      matrixset: 'utm33n',
      guid: '0.norges_grunnkart_graatone',
      options: {
        isbaselayer: true,
        singletile: false,
        visibility: false,
      },
      thumbnail: 'grey',
    },
    {
      distributionProtocol: 'WMTS',
      type: 'map',
      gatekeeper: true,
      name: 'enkel',
      uuid: '',
      description: 'Viser kartet i et enkelt uttrykk',
      url: 'https://cache.kartverket.no/norges_grunnkart/v1/wmts/1.0.0/|https://cache.kartverket.no/norges_grunnkart/v1/wmts/1.0.0/',
      params: {
        layers: 'norges_grunnkart',
        format: 'image/png',
      },
      matrixprefix: false,
      matrixset: 'utm33n',
      guid: '0.norges_grunnkart',
      options: {
        isbaselayer: true,
        singletile: false,
        visibility: false,
      },
    },
    {
      distributionProtocol: 'WMTS',
      type: 'map',
      gatekeeper: true,
      name: 'terreng',
      uuid: 'db2280ab-1f55-4596-b1fc-26ff147a2bc5',
      description: 'Viser kartet med terreng og høyde',
      url: 'https://cache.kartverket.no/terreng_norgeskart/v1/wmts/1.0.0/|https://cache.kartverket.no/terreng_norgeskart/v1/wmts/1.0.0/',
      params: {
        layers: 'terreng_norgeskart',
        format: 'image/png',
      },
      matrixprefix: false,
      matrixset: 'utm33n',
      guid: '0.terreng_norgeskart',
      options: {
        isbaselayer: true,
        singletile: false,
        visibility: false,
      },
    },
    {
      distributionProtocol: 'WMTS',
      type: 'map',
      gatekeeper: true,
      name: 'sjokart',
      uuid: '72044503-938b-4955-a931-9e5a7eabf28e',
      description: 'Viser kartet med sjøkartene (papirkartene) i rasterutgave',
      url: 'https://cache.kartverket.no/sjokartraster/v1/wmts/1.0.0/|https://cache.kartverket.no/sjokartraster/v1/wmts/1.0.0/',
      params: {
        layers: 'sjokartraster',
        format: 'image/png',
      },
      matrixprefix: false,
      matrixset: 'utm33n',
      guid: '0.sjokartraster',
      options: {
        isbaselayer: true,
        singletile: false,
        visibility: false,
      },
    },
    {
      distributionProtocol: 'WMTS',
      type: 'map',
      name: 'jan_mayen',
      uuid: '32165035-2d7b-4ac4-ba97-881b616e31b7',
      description: 'Viser de offisielle topografiske data over Jan Mayen',
      url: 'https://geodata.npolar.no/arcgis/rest/services/Basisdata/NP_Basiskart_JanMayen_WMTS_25833/MapServer/WMTS?',
      params: {
        layers: 'Basisdata_NP_Basiskart_JanMayen_WMTS_25833',
        format: 'image/png',
      },
      matrixset: 'default028mm',
      wmtsextent: '-393783.2540000008,7978220.98008712,-276963.7430000013,8084965.524000007',
      getcapabilities: true,
      guid: '2.Basisdata_NP_Basiskart_JanMayen_WMTS_25833',
      options: {
        isbaselayer: true,
        singletile: false,
        visibility: false,
      },
    },
    {
      distributionProtocol: 'WMTS',
      type: 'map',
      name: 'svalbard',
      uuid: 'c4d0693a-d723-494c-9c90-42f72139b876',
      description: 'Viser de offisielle topografiske data over Svalbard',
      url: 'https://geodata.npolar.no/arcgis/rest/services/Basisdata/NP_Basiskart_Svalbard_WMTS_25833/MapServer/WMTS?',
      params: {
        layers: 'Basisdata_NP_Basiskart_Svalbard_WMTS_25833',
        format: 'image/png',
      },
      matrixset: 'default028mm',
      wmtsextent: '369976.3899489096,8221306.539890718,878234.7199568129,9010718.76990194',
      getcapabilities: true,
      guid: '2.Basisdata_NP_Basiskart_Svalbard_WMTS_25833',
      options: {
        isbaselayer: true,
        singletile: false,
        visibility: false,
      },
    },
    {
      distributionProtocol: 'WMS',
      type: 'overlay',
      Layers: {
        Layer: {
          queryable: false,
        },
      },
      ticket: true,
      name: 'elektron_sjokart',
      uuid: '',
      description: 'Viser kartet med elektron sjokart',
      url: 'https://wms.geonorge.no/skwms1/wms.ecc_enc',
      params: {
        layers: 'cells',
        format: 'image/png',
      },
      guid: '0.cells',
      options: {
        isbaselayer: true,
        singletile: true,
        visibility: false,
      },
    },
    {
      distributionProtocol: 'WMS',
      type: 'overlay',
      Layers: {
        Layer: {
          queryable: false,
        },
      },
      gatekeeper: true,
      name: 'ok_1_utgave',
      uuid: '79ea9761-1ac9-4780-a065-e4738835643e',
      description: 'Viser 1. gangs økonomisk kartverk',
      url: 'https://wms.geonorge.no/skwms1/wms.n5raster2',
      params: {
        layers: 'n5raster_foerstegang_metadata,n5raster_foerstegang',
        format: 'image/png',
      },
      guid: '0.n5raster_foerstegang_metadata,n5raster_foerstegang',
      options: {
        isbaselayer: true,
        singletile: true,
        visibility: false,
      },
    },
  ],
  setVisibleBaseLayer: (name: string) => {
    return set(
      produce(state => ({
        ...state,
        layers: state.layers.map((layer: ILayer) => ({
          ...layer,
          options: {
            ...layer.options,
            visibility: layer.name === name,
          },
        })),
      })),
    );
  },

  setBaseLayers: (baselayers: IBaseLayers) => set(baselayers),

}));
