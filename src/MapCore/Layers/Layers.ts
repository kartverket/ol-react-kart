// import { useEventStoreSelector } from '../Events/Event/eventHooks';
import axios from 'axios';

import OlFeature from 'ol/Feature';
import Map from 'ol/Map';
import { getTopLeft, getWidth } from 'ol/extent';
import { GeoJSON, MVT } from 'ol/format';
import OlGeometry from 'ol/geom/Geometry';
import TileLayer from 'ol/layer/Tile';
import OLVectorLayer from 'ol/layer/Vector';
import { get } from 'ol/proj';
import RenderFeature from 'ol/render/Feature';
import { TileWMS, WMTS } from 'ol/source';
import { Vector as VectorSource } from 'ol/source';
import OlStyleFill from 'ol/style/Fill';
import OlStyleStroke from 'ol/style/Stroke';
import OlStyle from 'ol/style/Style';
import OlStyleText from 'ol/style/Text';

import { addCustomProj, loadCustomCrs } from '../../utils/projectionUtil';
import { ILayer } from '../Models/config-model';
import { wmtsTileGrid } from '../TileGrid/wmts';
import { createStyle } from './Style';

let map: Map;

const sProjection = 'EPSG:25833';
loadCustomCrs();
addCustomProj('EPSG:25832');
const projection = addCustomProj('EPSG:25833', [-2500000, 3500000, 3045984, 9045984]);
addCustomProj('EPSG:25834');
addCustomProj('EPSG:25835');
addCustomProj('EPSG:25836');
addCustomProj('EPSG:32632');
addCustomProj('EPSG:32633');
addCustomProj('EPSG:32634');
addCustomProj('EPSG:32635');
addCustomProj('EPSG:32636');
addCustomProj('EPSG:4258');
addCustomProj('EPSG:4326');

const _getLayersWithGuid = function () {
  return map
    .getLayers()
    .getArray()
    .filter(function (elem) {
      return elem.get('guid') !== undefined;
    });
};

const _getLayerByGuid = function (guid: string) {
  const layers = _getLayersWithGuid();
  for (let i = 0; i < layers.length; i++) {
    const layer = layers[i];
    if (layer.get('guid') === guid) {
      return layer;
    }
  }
  return null;
};

const _isLayerVisible = function (layerGuid: string) {
  let layerexists = false;
  map.getLayers().forEach(function (maplayer) {
    if (!layerexists && maplayer.get('guid') === layerGuid) {
      layerexists = true;
    }
  });
  return layerexists;
};

export const Layers = function (myMap: Map) {
  map = myMap;
  return {
    createTileLayer(layer: ILayer, token: string) {
      switch (layer.distributionProtocol) {
        case 'WMTS': {
          let extent = projection.getExtent();
          if (layer.wmtsextent) {
            const wmtsExtent = layer.wmtsextent.split(',').map((c: string) => Number(c));
            if (wmtsExtent.length === 4) {
              extent = [wmtsExtent[0], wmtsExtent[1], wmtsExtent[2], wmtsExtent[3]];
            }
          }
          const size = getWidth(extent) / 256;

          const resolutions = [];
          const matrixIds = [];

          let matrixSet = layer.matrixset;
          if (matrixSet === null || matrixSet === '' || matrixSet === undefined) {
            matrixSet = layer.matrixprefix === true ? sProjection : sProjection.substring(sProjection.indexOf(':') + 1);
          }

          for (let z = 0; z < 21; ++z) {
            //Max 18?
            resolutions[z] = size / Math.pow(2, z);
            matrixIds[z] = layer.matrixprefix === true ? matrixSet + ':' + String(z) : String(z);
          }

          const tileGrid = wmtsTileGrid({
            extent: extent,
            origin: getTopLeft(extent),
            resolutions: resolutions,
            matrixIds: matrixIds,
          });

          let tokenUrl = '';
          if (layer.gatekeeper === true) {
            tokenUrl = layer.url.split('|')[0] + '&gkt=' + token;
          }
          const newTileLayer = new TileLayer({
            source: new WMTS({
              url: tokenUrl ? tokenUrl : layer.url.split('|')[0],
              layer: layer.params.layers ? layer.params.layers : '',
              matrixSet: matrixSet,
              projection: projection,
              tileGrid: tileGrid,
              style: 'default',
              format: layer.params.format,
              wrapX: true,
            }),
          });
          newTileLayer.set('guid', layer.guid);
          if (layer.wmtsextent) newTileLayer.set('wmtsextent', extent);
          if (layer.options.isbaselayer) {
            newTileLayer.set('zIndex', -1);
          }
          map.addLayer(newTileLayer);
          break;
        }
        case 'WMS': {
          const newTileLayer = new TileLayer({
            source: new TileWMS({
              urls: layer.url.split('|'),
              url: layer.url.split('|')[0],
              params: layer.params,
              projection: projection,
            }),
          });
          newTileLayer.set('guid', layer.guid);
          map.addLayer(newTileLayer);
          break;
        }
        case 'GEOJSON': {
          console.log('GEOJSON');
          axios.get(`${layer.url}`).then(function (response) {
            const source = new VectorSource({
              features: new GeoJSON().readFeatures(response.data, {
                featureProjection: get('EPSG:25833') || undefined,
                dataProjection: get(layer.epsg) || undefined,
              }),
            });
            const vectorLayer = new OLVectorLayer({
              source,
            });
            if (layer.style) {
              const textStyle = (feature: OlFeature<OlGeometry> | RenderFeature, resolution: any) => {
                return new OlStyle({
                  stroke: new OlStyleStroke({
                    color: layer.style?.stroke?.color ?? 'rgb(128, 64, 64)',
                    width: layer.style?.stroke?.width ?? 1,
                  }),
                  fill: new OlStyleFill({
                    color: layer.style?.fill?.color ?? 'rgba(128, 128, 128, 0.1)',
                  }),
                  text: new OlStyleText({
                    text: layer.style?.text?.text ? feature.get(layer.style?.text?.text as string) : feature.getId(),
                    scale: layer.style?.text?.scale ?? 1.3,
                    fill: new OlStyleFill({
                      color: layer.style?.text?.fill.color ?? '#000000',
                    }),
                    stroke: new OlStyleStroke({
                      color: layer.style?.text?.stroke.color ??'#FFF9AA',
                      width: layer.style?.text?.stroke.width ?? 3.5,
                    }),
                  }),
                });
              };
              vectorLayer.setStyle(textStyle);
            }
            vectorLayer.set('guid', layer.guid);
            map.addLayer(vectorLayer);
          });
          break;
        }
        case 'MVT': {
          const source = new VectorSource({
            format: new MVT(),
            url: layer.url,
          });
          const vectorLayer = new OLVectorLayer({
            source,
          });
          if (layer.style) {
            vectorLayer.setStyle(createStyle(layer.style));
          }
          vectorLayer.set('guid', layer.guid);
          map.addLayer(vectorLayer);
          break;
        }
        default: {
          console.warn('Unknown distribution protocol: ' + layer.distributionProtocol);
          break;
        }
      }
    },

    hideLayer(layerGuid: string): void {
      if (_isLayerVisible(layerGuid)) {
        const layer = _getLayerByGuid(layerGuid);
        if (layer) {
          map.removeLayer(layer);
        }
      }
    },

    removeAllLayers(): void {
      const layers = _getLayersWithGuid();
      layers.forEach(l => map.removeLayer(l));
    },

    updateLayerParams(layer: TileLayer<WMTS | TileWMS>, token: string) {
      const source = layer.getSource() as WMTS;
      const urls = source.getUrls();
      const newUrls: string[] = [];
      urls?.forEach(u => {
        // if (u.indexOf('gkt') )
        const newUrl = u.replace(/gkt=[^&?$]*/, 'gkt=' + token);
        newUrls.push(newUrl);
      });
      if (newUrls.length > 0) {
        source.setUrls(newUrls);
      }

      // sourceUrl = sourceUrl + '&GKT=' + token;
    },

    getLayerByGuid(layerGuid: string) {
      return _getLayerByGuid(layerGuid);
    },

    getLayersWithGuid() {
      return _getLayersWithGuid();
    },
  };
};
