import { WMTS as WmtsSource } from 'ol/source';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import Projection from 'ol/proj/Projection';

interface WmtsProps {
  url: string
  style: string;
  tileGrid: WMTSTileGrid;
  layer: string;
  matrixSet: string;
  projection: Projection;
  format: string;
}
function wmts({ url, style, tileGrid, layer, matrixSet, projection, format }: WmtsProps) {
  return new WmtsSource({
    url,
    style,
    tileGrid,
    layer,
    matrixSet,
    projection,
    format,
  });
}
export default wmts;
