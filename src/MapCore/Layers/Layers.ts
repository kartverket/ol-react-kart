import { IWmts } from '../Models/config-model';
import { WMTS } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import { wmtsTileGrid } from '../TileGrid/wmts';
import { getTopLeft, getWidth } from 'ol/extent';
import Projection from 'ol/proj/Projection';

const sProjection = 'EPSG:3857';
const extent = {
  'EPSG:3857': [-20037508.34, -20037508.34, 20037508.34, 20037508.34] as [number, number, number, number],
  'EPSG:32633': [-2500000, 3500000, 3045984, 9045984] as [number, number, number, number],
};
const projection = new Projection({
  code: sProjection,
  extent: extent[sProjection],
});

const projectionExtent = projection.getExtent();
const size = getWidth(projectionExtent) / 256;

const resolutions = [];
const matrixIds = [];

export enum ELayer {
  ISBASELAYER = 'isBaseLayer',
  ISVISIBLE = 'isVisible'
}

for (let z = 0; z < 21; ++z) {
  //Max 18?
  resolutions[z] = size / Math.pow(2, z);
  matrixIds[z] = sProjection + ':' + z;
}

const tileGrid = wmtsTileGrid({
  origin: getTopLeft(projection.getExtent()),
  resolutions: resolutions,
  matrixIds: matrixIds,
});

const wmtsLayers: TileLayer[] = [];

export const Layers = function() {
  return {
    addWmtsLayer(wmts: IWmts) {
      const newTileLayer = new TileLayer({
        source: new WMTS({
          url: wmts.url,
          layer: wmts.params.layers,
          matrixSet: sProjection,
          projection: projection,
          tileGrid: tileGrid,
          style: 'default',
          format: wmts.params.format,
        })
      });
      newTileLayer.set(ELayer.ISVISIBLE, wmts.options.visibility);
      newTileLayer.set(ELayer.ISBASELAYER, wmts.options.isbaselayer);
      wmtsLayers.push(newTileLayer);
    },

    getVisibleBaseLayer(): TileLayer | undefined {
      const visibleBaseLayer = wmtsLayers.find(w => w.get(ELayer.ISVISIBLE) && w.get(ELayer.ISBASELAYER));
      return visibleBaseLayer;
    }
    
  }
}