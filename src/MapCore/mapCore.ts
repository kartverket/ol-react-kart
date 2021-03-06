import axios from 'axios';
import { defaults, ScaleLine } from 'ol/control';
import Map from 'ol/Map';
import Projection from 'ol/proj/Projection';
import View from 'ol/View';
import { useEffect } from 'react';
import { useEventDispatch, useEventSelector } from '../../src/index';
import { generateKoordTransUrl } from '../utils/n3api';
import { GetClickCoordinates } from './Events/GetClickCoordinates';
import { MapMoveEnd } from './Events/MapMoveEnd';
import { Layers } from './Layers/Layers';
import {
  addGroups,
  addTileLayers,
  addVectorLayers,
  removeAll,
  selectBaseLayers,
  selectToggleTileLayer,
  selectToggleVectorLayer,
  selectVisibleBaseLayer,
  toggleTileLayer,
  toggleVectorLayer,
} from './Layers/layersSlice';
import { IProjectConfig } from './Models/config-model';
import { Project } from './Project/Project';
import { addProject, selectCenter, selectToken } from './Project/projectSlice';

let myMap: Map;
let activateMap = false;

const MapApi = function () {
  const dispatch = useEventDispatch();
  const mapMoveEnd = MapMoveEnd(dispatch);
  const getClickCoordinates = GetClickCoordinates();
  const visibleBaseLayer = useEventSelector(selectVisibleBaseLayer);
  const baseLayers = useEventSelector(selectBaseLayers);
  const appProject = Project(dispatch);
  const toggleVector = useEventSelector(selectToggleVectorLayer);
  const toggleTile = useEventSelector(selectToggleTileLayer);

  const token = useEventSelector(selectToken);
  const center = useEventSelector(selectCenter);

  useEffect(() => {
    if (center) {
      const projectProjection = myMap.getView().getProjection().getCode().replace(/.*:/, '');
      const transUrl = generateKoordTransUrl(center.lon, center.lat, projectProjection, center.epsg);
      axios.get(transUrl).then(function (response) {
        const transformedCoordinate = response.data;
        myMap.getView().setCenter([transformedCoordinate.x, transformedCoordinate.y]);
        if (Number(myMap.getView().getZoom()) < 10) {
          myMap.getView().setZoom(12);
        }
      });
    }
  }, [center]);

  useEffect(() => {
    if (token && visibleBaseLayer && baseLayers) {
      // console.log('TOKEN updated, baseLayer: ', token, visibleBaseLayer);
      const layers = Layers(myMap);
      baseLayers.forEach(b => {
        layers.hideLayer(b.guid);
      });
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
  }, [token, visibleBaseLayer, baseLayers]);

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
  }, [toggleVector, dispatch]);

  useEffect(() => {
    if (toggleTile && token) {
      const layers = Layers(myMap);
      if (toggleTile.options.visibility === 'false') {
        layers.createTileLayer(toggleTile, token);
        dispatch(toggleTileLayer());
      } else {
        layers.hideLayer(toggleTile.guid);
        dispatch(toggleTileLayer());
      }
    }
  }, [toggleTile, token, dispatch]);

  return {
    init(projectConfig: IProjectConfig) {
      if (!activateMap) {
        dispatch(addProject(projectConfig.config.project));
        dispatch(addGroups(projectConfig.config.maplayer));
        dispatch(addTileLayers(projectConfig.config.layer));
        if (projectConfig.config.vector) {
          dispatch(addVectorLayers(projectConfig.config.vector));
        }

        if (!myMap) {
          const sm = new Projection({
            code: projectConfig.config.project.mapepsg,
          });
          const projectExtent = projectConfig.config.mapbounds.mapbound.find(
            m => m.epsg === projectConfig.config.project.mapepsg,
          )?.extent;
          const newExtent = [0, 0, 0, 0] as [number, number, number, number];
          if (projectExtent) {
            projectExtent
              .split(',')
              .map(e => Number(e))
              .forEach((v, index) => (newExtent[index] = v));
          }
          sm.setExtent(newExtent);

          myMap = new Map({
            layers: [],
            target: 'map',
            view: new View({
              center: [projectConfig.config.project.lon, projectConfig.config.project.lat],
              projection: sm,
              zoom: 4,
            }),
            controls: defaults({ zoom: true, attribution: false, rotate: false }).extend([new ScaleLine()]),
          });
        }
        activateMap = true;
      } else {
        appProject.generateToken();
        getClickCoordinates.activate(myMap);
        mapMoveEnd.activate(myMap);
      }
    },
    destroyProject() {
      // myMap.dispose();
      const layers = Layers(myMap);
      layers.removeAllLayers();
      dispatch(removeAll());
      activateMap = false;
    },
  };
};

export default MapApi;
