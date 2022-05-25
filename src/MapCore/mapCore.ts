import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import { WMTS } from 'ol/source';
import Projection from 'ol/proj/Projection';
import { wmtsTileGrid } from './TileGrid/wmts';
import { getTopLeft, getWidth } from 'ol/extent';
import OLVectorLayer from 'ol/layer/Vector';
import FeatureStyles from './Features/Styles';
import mapConfig from '../config.json';
import { fromLonLat, get } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import { vector } from './Source/vector';
import { useState } from 'react';
import { IProjectConfig } from './Models/config-model';
import { Layers } from './Layers/Layers';

let myMap: Map;
const geojsonObject2 = mapConfig.geojsonObject2;

const MapApi = function() {
  const layers = Layers();
  return {
    init(projectConfig: IProjectConfig) {
      
      projectConfig.config.wmts.forEach(w => {
        layers.addWmtsLayer(w);
      })

      if (!myMap) {
        myMap = new Map({
          layers: [],
          target: 'map',
          view: new View({
            center: [1187255.1082210522, 9258443.652733022],
            zoom: 6,
          }),
        });
        const baseLayer = layers.getVisibleBaseLayer();
        if (baseLayer) {
          myMap.addLayer(baseLayer);
        }
      }      

      return myMap;
    },

    setCenter() {
      myMap.getView().setCenter([1187255.1082210522, 9258443.652733022]);
      myMap.getView().setZoom(6);
    },

    getCenter() {
      console.log('get center: ', myMap.getView().getCenter());
    },

    showLayer() {
      const source = vector({
        features: new GeoJSON().readFeatures(geojsonObject2, {
          featureProjection: get('EPSG:3857') || undefined,        
        })
      });
      const style = FeatureStyles.MultiPolygon;
      // source.set('id', 'juraj');
      const vectorLayer = new OLVectorLayer({
        source,
        style,
      });
      vectorLayer.set('id', 'juraj');
      myMap.addLayer(vectorLayer);
      // console.log('ADDED layer: ', myMap.getAllLayers());
    },
  }
}

export default MapApi;