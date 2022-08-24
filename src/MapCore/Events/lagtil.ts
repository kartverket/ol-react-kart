import TileLayer from 'ol/layer/Tile';
import Map from 'ol/Map';
import { OSM } from 'ol/source';

export const lagtil = (map: Map) => {
  console.log('lagtil');

  return {
    activate(map: Map) {
      const newTileLayer = new TileLayer({
        source: new OSM(),
        zIndex: -10,
      });
      map.addLayer(newTileLayer);
      return newTileLayer;
    },

    deactivate(map: Map) {
      map.removeLayer(map.getLayers().item(0));
    },
  };
};
