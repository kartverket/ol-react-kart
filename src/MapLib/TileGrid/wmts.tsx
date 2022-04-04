import { Coordinate } from 'ol/coordinate';
import WMTSTileGrid from 'ol/tilegrid/WMTS';

interface WmtsProps {
  origin: Coordinate
  resolutions: Array<number>;
  matrixIds:Array<string>;
}
function wmtsTileGrid({ origin, resolutions, matrixIds }: WmtsProps) {
  return new WMTSTileGrid({
    origin,
    resolutions,
    matrixIds,
  });
}
export default wmtsTileGrid;
