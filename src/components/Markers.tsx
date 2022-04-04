import { Coordinate } from 'ol/coordinate';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Icon, Style } from 'ol/style';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import mapConfig from '../config.json';

function addMarkers(lonLatArray: Coordinate[]) {
  const iconStyle = new Style({
    image: new Icon({
      anchorXUnits: IconAnchorUnits.FRACTION,
      anchorYUnits: IconAnchorUnits.PIXELS,
      src: mapConfig.markerImage32,
    }),
  });
  const features = lonLatArray.map((item: Coordinate) => {
    const feature = new Feature({
      geometry: new Point(fromLonLat(item)),
    });
    feature.setStyle(iconStyle);
    return feature;
  });
  return features;
}

export default addMarkers;
