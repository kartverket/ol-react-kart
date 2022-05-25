import { Coordinate } from 'ol/coordinate';
import WMTSTileGrid from 'ol/tilegrid/WMTS';

interface IWmts {
  origin: Coordinate
  resolutions: Array<number>;
  matrixIds: Array<string>;
}

export const wmtsTileGrid = function ( wmts: IWmts) {
  return new WMTSTileGrid(wmts);
}