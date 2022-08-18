import Map from 'ol/Map';
import { OSM } from 'ol/source';
import TileLayer from 'ol/layer/Tile';

export const lagtil = (map: Map) => {

  console.log('lagtil');

  return {
    activate(map: Map) {
      console.log('Layers.activate');
      const newTileLayer = new TileLayer({
        source: new OSM(),
        zIndex: -10,
      });
      map.addLayer(newTileLayer);
      return newTileLayer;
    },

    deactivate(map: Map) {
      console.log('Layers.deactivate');
      map.removeLayer(map.getLayers().item(0));
    }
  }
}
