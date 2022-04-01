import OLTileLayer from 'ol/layer/Tile';
import TileSource from 'ol/source/Tile';
import { useContext, useEffect } from 'react';
import MapContext, { IMapContext } from './MapContext';

interface Props {
  source: TileSource;
  zIndex: number;
}

const TileLayer = ({ source, zIndex = 0 }: Props) => {
  const { map } = useContext(MapContext) as IMapContext;

  useEffect(() => {
    if (!map) return;

    const tileLayer = new OLTileLayer({
      source,
      zIndex,
    });

    map.addLayer(tileLayer);
    tileLayer.setZIndex(zIndex);

    return () => {
      if (map) {
        map.removeLayer(tileLayer);
      }
    };
  }, [map, source, zIndex]);

  return null;
};

export default TileLayer;
