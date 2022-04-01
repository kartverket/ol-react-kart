import { WMTS as WmtsSource } from 'ol/source';
import { Options } from 'ol/source/WMTS';

function wmts(options: Options) {
  return new WmtsSource(options);
}
export default wmts;
