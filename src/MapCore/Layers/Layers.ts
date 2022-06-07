import { ITileLayer, IVector } from '../Models/config-model';
import { WMTS, TileWMS } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import { wmtsTileGrid } from '../TileGrid/wmts';
import { getTopLeft, getWidth } from 'ol/extent';
import Projection from 'ol/proj/Projection';
// import { useEventStoreSelector } from '../Events/Event/eventHooks';
import { Vector as VectorSource } from 'ol/source';
import Map from 'ol/Map';
import GeoJSON from 'ol/format/GeoJSON';
import { get } from 'ol/proj';
import OLVectorLayer from 'ol/layer/Vector';
import axios from 'axios';
import { createStyle } from './Style';

let map: Map;
const sProjection = 'EPSG:25833';
const extent = {
  'EPSG:3857': [-20037508.34, -20037508.34, 20037508.34, 20037508.34] as [number, number, number, number],
  'EPSG:25833': [-2500000, 3500000, 3045984, 9045984] as [number, number, number, number],
};
const projection = new Projection({
  code: sProjection,
  extent: extent[sProjection],
});



const _getLayersWithGuid = function() {
  return map.getLayers().getArray().filter(function (elem) {
    return elem.get('guid') !== undefined;
  });
}

const _getLayerByGuid = function(guid: string) {
    const layers = _getLayersWithGuid();
    for (let i = 0; i < layers.length; i++) {
      const layer = layers[i];
      if (layer.get('guid') === guid) {
        return layer;
      }
    }
    return null;
}

const _isLayerVisible = function(layerGuid: string) {
  let layerexists = false;
  map.getLayers().forEach(function (maplayer) {
    if (!layerexists && maplayer.get('guid') === layerGuid) {
      layerexists = true;
    }
  });
  return layerexists;
}


export const Layers = function (myMap: Map) {
  map = myMap;
  return {
    createTileLayer(layer: ITileLayer, token: string): TileLayer<WMTS|TileWMS> | undefined {
      if (layer.source === 'WMTS') {
        let extent = projection.getExtent();
        if (layer.wmtsextent) {
          const wmtsExtent = layer.wmtsextent.split(',').map((c:string)=> Number(c));
          if (wmtsExtent.length === 4) {
            extent = [wmtsExtent[0],wmtsExtent[1],wmtsExtent[2],wmtsExtent[3]];
          }
        }
        const size = getWidth(extent) / 256;

        const resolutions = [];
        const matrixIds = [];

        let matrixSet = layer.matrixset;
        if (matrixSet === null || matrixSet === '' || matrixSet === undefined) {
          matrixSet = layer.matrixprefix === 'true' ? sProjection : sProjection.substring(sProjection.indexOf(':') + 1)
        }

        for (let z = 0; z < 21; ++z) {
          //Max 18?
          resolutions[z] = size / Math.pow(2, z);
          matrixIds[z] = layer.matrixprefix === 'true' ? matrixSet + ':' + String(z) : String(z);
        }

        const tileGrid = wmtsTileGrid({
          extent: extent,
          origin: getTopLeft(extent),
          resolutions: resolutions,
          matrixIds: matrixIds,
        });

        let tokenUrl = '';
        if (layer.gatekeeper === 'true') {
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
          })
        });
        newTileLayer.set('guid', layer.guid);
        if (layer.wmtsextent) newTileLayer.set('wmtsextent', extent);
        if (layer.options.isbaselayer) {
          newTileLayer.set('zIndex', -1);
        }
        map.addLayer(newTileLayer);
        return newTileLayer;
      }
      if (layer.source === 'WMS') {
        const newTileLayer = new TileLayer({
          source: new TileWMS({
            urls: layer.url.split('|'),
            url: layer.url.split('|')[0],
            params: layer.params,
            projection: projection,
          })
        });
        newTileLayer.set('guid', layer.guid);
        map.addLayer(newTileLayer);
        return newTileLayer;
      }
    },

    createVectorLayer(layer: IVector) {
      axios.get(`${layer.url}`).then(function (response) {
        const source = new VectorSource({
          features: new GeoJSON().readFeatures(response.data, {
            featureProjection: get('EPSG:3857') || undefined,
          })
        });
        const vectorLayer = new OLVectorLayer({
          source
        });
        if (layer.style) {
          vectorLayer.setStyle(createStyle(layer.style))
        //   const fill = layer.style.regularshape.fill;

        //   const newStyle = new Style({stroke: new Stroke({color: layer.style.regularshape})});
        }
        vectorLayer.set('guid', layer.guid);
        map.addLayer(vectorLayer);
      });
    },


    hideLayer(layerGuid: string): void{
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

    updateLayerParams(layer: TileLayer<WMTS|TileWMS>, token: string) {
      const source = layer.getSource() as WMTS;
      const urls = source.getUrls();
      const newUrls: string[] = [];
      urls?.forEach(u => {
        // if (u.indexOf('gkt') )
        const newUrl = u.replace(/gkt=[^&?$]*/, 'gkt=' + token);
        newUrls.push(newUrl);
      })
      if (newUrls.length > 0) {
        source.setUrls(newUrls);
      }

      // sourceUrl = sourceUrl + '&GKT=' + token;

    }

  }
}

