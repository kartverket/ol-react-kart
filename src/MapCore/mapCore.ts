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
import { useCallback, useEffect, useState } from 'react';
import { IProjectConfig, ITileLayer } from './Models/config-model';
import { Layers } from './Layers/Layers';
import { GetClickCoordinates } from './Events/GetClickCoordinates';
import { MapMoveEnd } from './Events/MapMoveEnd';
import { useEventDispatch, useEventSelector } from '../../src/index';
import { selectVisibleBaseLayer, addWmsLayer, addWmtsLayer, selectBaseLayers } from './Layers/layersSlice';
import { addProject, selectToken } from './Project/projectSlice';
import { Project } from './Project/Project';

let myMap: Map;
const geojsonObject2 = mapConfig.geojsonObject2;
// let baseLayer: TileLayer;

const MapApi = function() {
  const dispatch = useEventDispatch();
  const mapMoveEnd = MapMoveEnd(dispatch);
  const getClickCoordinates = GetClickCoordinates(dispatch);
  const visibleBaseLayer = useEventSelector(selectVisibleBaseLayer);
  const baseLayers = useEventSelector(selectBaseLayers)
  const appProject = Project(dispatch);
  
  const token = useEventSelector(selectToken);

  useEffect(() => {
    if (token && visibleBaseLayer && baseLayers) {
      console.log('TOKEN updated, baseLayer: ', token, visibleBaseLayer);
      const layers = Layers(myMap);
      baseLayers.forEach(b => {
        layers.hideLayer(b.guid);
      })
      
      const newBaseLayer = layers.createTileLayer(visibleBaseLayer, token);
      if (newBaseLayer) {
          myMap.addLayer(newBaseLayer);
        }
    }
  }, [token, visibleBaseLayer, baseLayers])

  
  return {
    init(projectConfig: IProjectConfig) {

      if (!myMap) {
        dispatch(addProject(projectConfig.config.project));
        projectConfig.config.wmts.forEach(w => {
          w.source = 'WMTS';
          dispatch(addWmtsLayer(w));
        })
        projectConfig.config.wms.forEach(w => {
          w.source = 'WMS';
          dispatch(addWmsLayer(w));
        })
        
        const sm = new Projection({
          code: projectConfig.config.project.mapepsg,
        });
        const projectExtent = projectConfig.config.mapbounds.mapbound.find(m => m.epsg === projectConfig.config.project.mapepsg)?.extent;
        const newExtent = [0, 0, 0, 0] as [number, number, number, number];
        if (projectExtent) {
          projectExtent.split(',').map(e => Number(e)).forEach((v, index) => newExtent[index] = v);
        }
        sm.setExtent(newExtent);

        myMap = new Map({
          layers: [],
          target: 'map',
          view: new View({
            center: [projectConfig.config.project.lon, projectConfig.config.project.lat],
            projection: sm,
            zoom: 4
          }),
        });
      } else {
        appProject.generateToken();
        getClickCoordinates.activate(myMap);
        mapMoveEnd.activate(myMap);
      }
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