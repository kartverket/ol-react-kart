import { Coordinate } from 'ol/coordinate';
import { Extent } from 'ol/extent';
import { Size } from 'ol/size';
import WMTSTileGrid from 'ol/tilegrid/WMTS';

interface IWmts {
  extent?: Extent | undefined;
  origin?: Coordinate | undefined;
  resolutions: number[];
  matrixIds: string[];
  sizes?: Size[] | undefined;
  tileSize?: number | Size | undefined;
  tileSizes?: Size[] | undefined;
}

export const wmtsTileGrid = function ( wmts: IWmts) {
  return new WMTSTileGrid(wmts);
}
