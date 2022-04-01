import OLVectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style } from 'ol/style';
import { useContext, useEffect } from 'react';
import MapContext from '../Map/MapContext';

interface Props {
  source: VectorSource;
  style: Style;
  zIndex: number;
}

const VectorLayer = ({ source, style, zIndex = 0 }: Props) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    const vectorLayer = new OLVectorLayer({
      source,
      style,
    });

    map.addLayer(vectorLayer);
    vectorLayer.setZIndex(zIndex);

    return () => {
      if (map) {
        map.removeLayer(vectorLayer);
      }
    };
  }, [map]);

  return null;
};

export default VectorLayer;
