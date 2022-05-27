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
import { GetClickCoordinates } from './Events/GetClickCoordinates';
import { MapMoveEnd } from './Events/MapMoveEnd';

let myMap: Map;
const geojsonObject2 = mapConfig.geojsonObject2;
const getClickCoordinates = GetClickCoordinates();
const mapMoveEnd = MapMoveEnd();

const MapApi = function() {
  const layers = Layers();
  return {
    init(projectConfig: IProjectConfig) {
      
      projectConfig.config.wmts.forEach(w => {
        layers.addWmtsLayer(w);
      })
      projectConfig.config.wms.forEach(w => {
        layers.addWmsLayer(w);
      })

      const sm = new Projection({
        code: projectConfig.config.project.mapepsg,
        // extent: projectConfig.config.mapbounds.mapbound.find(m => m.epsg === projectConfig.config.project.mapepsg)
        // units: mapConfig.extentUnits
      });
      const projectExtent = projectConfig.config.mapbounds.mapbound.find(m => m.epsg === projectConfig.config.project.mapepsg)?.extent;
      const newExtent = [0, 0, 0, 0] as [number, number, number, number];
      if (projectExtent) {
        projectExtent.split(',').map(e => Number(e)).forEach((v, index) => newExtent[index] = v);
      }
      sm.setExtent(newExtent);

      // const newMapRes = [];
      // newMapRes[0] = 21664;

      // const mapScales = [];
      // mapScales[0] = 81920000;
      // for (let t = 1; t < 20; t++) {
      //   newMapRes[t] = newMapRes[t - 1] / 2;
      //   mapScales[t] = mapScales[t - 1] / 2;
      // }


      if (!myMap) {
        myMap = new Map({
          layers: [],
          target: 'map',
          view: new View({
            center: [projectConfig.config.project.lon, projectConfig.config.project.lat],
            projection: sm,
            // constrainResolution: true,
            // maxResolution: 21664,
            // resolutions: newMapRes,
            // numZoomLevels: 18,
            zoom: 4
          }),
        });
        const baseLayer = layers.getVisibleBaseLayer();
        if (baseLayer) {
          myMap.addLayer(baseLayer);
        }
      } else {
        getClickCoordinates.activate(myMap);
        mapMoveEnd.activate(myMap);
      }

      return myMap;
    },

    setCenter() {
      myMap.getView().setCenter([1187255.1082210522, 9258443.652733022]);
      myMap.getView().setZoom(8);
    },

    getCenter() {
      console.log('get center: ', myMap.getView().getCenter());
      console.log('get epsg: ', myMap.getView().getProjection().getCode());
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