import { WMTS as WmtsSource } from 'ol/source';
import WMTSTileGrid from 'ol/tilegrid/WMTS';

interface WmtsProps {
  url: string
  style: string;
  tileGrid: WMTSTileGrid;
  layer: string;
  matrixSet: string;
}
function wmts({ url, style, tileGrid, layer, matrixSet }: WmtsProps) {
  return new WmtsSource({
    url,
    style,
    tileGrid,
    layer,
    matrixSet,
    format: 'image/png',
  });
}
export default wmts;
