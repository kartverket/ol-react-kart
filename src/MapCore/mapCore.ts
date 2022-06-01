import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import { WMTS } from 'ol/source';
import Projection from 'ol/proj/Projection';
import { wmtsTileGrid } from './TileGrid/wmts';
import { Extent, getCenter, getWidth } from 'ol/extent';
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
import { selectVisibleBaseLayer, addWmsLayers, addWmtsLayers, selectBaseLayers, addGroups, addVectorLayers, selectToggleVectorLayer, toggleVectorLayer, toggleWmsLayer, selectToggleWmsLayer } from './Layers/layersSlice';
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
  const toggleVector = useEventSelector(selectToggleVectorLayer);
  const toggleWms = useEventSelector(selectToggleWmsLayer);
  
  const token = useEventSelector(selectToken);

  useEffect(() => {
    if (token && visibleBaseLayer && baseLayers) {
      console.log('TOKEN updated, baseLayer: ', token, visibleBaseLayer);
      const layers = Layers(myMap);
      baseLayers.forEach(b => {
        layers.hideLayer(b.guid);
      })
      
      layers.createTileLayer(visibleBaseLayer, token);
      // TODO: temporary commented
      // if (newBaseLayer) {
      //     myMap.addLayer(newBaseLayer);
      //     if (newBaseLayer.get('wmtsextent')) {
      //       const wmtsExtent:Extent = newBaseLayer.get('wmtsextent');
      //       const projection = new Projection({
      //         code: 'EPSG:25832',
      //         extent: wmtsExtent,
      //       });
      //       const newCenter = getCenter(projection.getExtent());
      //       myMap.getView().setCenter(newCenter);
      //     }
      //   }
    }
  }, [token, visibleBaseLayer, baseLayers])

  useEffect(() => {
    if (toggleVector) {
      const layers = Layers(myMap);
      if (toggleVector.options.visibility === 'false') {
        layers.createVectorLayer(toggleVector);
        dispatch(toggleVectorLayer());
      } else {
        layers.hideLayer(toggleVector.guid);
        dispatch(toggleVectorLayer());
      }
      
    }
  }, [toggleVector, dispatch])

  useEffect(() => {
    if (toggleWms && token) {
      const layers = Layers(myMap);
      if (toggleWms.options.visibility === 'false') {
        layers.createTileLayer(toggleWms, token);
        dispatch(toggleWmsLayer());
      } else {
        layers.hideLayer(toggleWms.guid);
        dispatch(toggleWmsLayer());
      }
    }
  }, [toggleWms, token, dispatch]) 
  
  return {
    init(projectConfig: IProjectConfig) {

      if (!myMap) {
        dispatch(addProject(projectConfig.config.project));
        dispatch(addGroups(projectConfig.config.maplayer));
        dispatch(addWmtsLayers(projectConfig.config.wmts));
        dispatch(addWmsLayers(projectConfig.config.wms));
        dispatch(addVectorLayers(projectConfig.config.vector));
        
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
    }
  }
}

export default MapApi;