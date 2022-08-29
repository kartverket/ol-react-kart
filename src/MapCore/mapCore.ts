import axios from 'axios';
import { defaults, ScaleLine } from 'ol/control';
import { getTopLeft, getWidth } from 'ol/extent';
import TileLayer from 'ol/layer/Tile';
import Map from 'ol/Map';
import Overlay from 'ol/Overlay';
import Projection from 'ol/proj/Projection';
import { WMTS } from 'ol/source';
import View from 'ol/View';
import { useEffect } from 'react';
import { useEventDispatch, useEventSelector, useAppSelector } from '../../src/index';
import baseconfig from '../config/baseconfig.json';
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
import { wmtsTileGrid } from './TileGrid/wmts';

declare global {
  interface Window {
    olMap: any;
  }
}
window.olMap = window.olMap || {};

let myMap: Map;
let activateMap = false;

const MapApi = () => {
  const eventDispatch = useEventDispatch();
  const mapMoveEnd = MapMoveEnd(eventDispatch);
  const getClickCoordinates = GetClickCoordinates();
  const visibleBaseLayer = useEventSelector(selectVisibleBaseLayer);
  const baseLayers = useEventSelector(selectBaseLayers);
  const appProject = Project(eventDispatch);
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
        eventDispatch(toggleVectorLayer());
      } else {
        layers.hideLayer(toggleVector.guid);
        eventDispatch(toggleVectorLayer());
      }
    }
  }, [toggleVector, eventDispatch]);

  useEffect(() => {
    if (toggleTile && token) {
      const layers = Layers(myMap);
      if (toggleTile.options.visibility === 'false') {
        layers.createTileLayer(toggleTile, token);
        eventDispatch(toggleTileLayer());
      } else {
        layers.hideLayer(toggleTile.guid);
        eventDispatch(toggleTileLayer());
      }
    }
  }, [toggleTile, token, eventDispatch]);

  return {
    init(projectConfig: IProjectConfig) {
      if (!activateMap) {
        if (projectConfig.config.project) {
          eventDispatch(addProject(projectConfig.config.project));
        } else {
          eventDispatch(addProject(baseconfig.project));
        }
        eventDispatch(addGroups(projectConfig.config.maplayer));
        eventDispatch(addTileLayers(projectConfig.config.layer));
        if (projectConfig.config.vector) {
          eventDispatch(addVectorLayers(projectConfig.config.vector));
        }

        if (!myMap) {
          const mapepsg = projectConfig.config.project ? projectConfig.config.mapepsg : baseconfig.project.mapepsg;

          const sm = new Projection({
            code: mapepsg,
          });
          const projectExtent = projectConfig.config.mapbounds.mapbound.find(m => m.epsg === mapepsg)?.extent;
          const newExtent = [0, 0, 0, 0] as [number, number, number, number];
          if (projectExtent) {
            projectExtent
              .split(',')
              .map(e => Number(e))
              .forEach((v, index) => (newExtent[index] = v));
          }
          sm.setExtent(newExtent);

          const size = getWidth(newExtent) / 256;
          const resolutions = [];
          const matrixIds = [];
          for (let z = 0; z < 21; ++z) {
            resolutions[z] = size / Math.pow(2, z);
            matrixIds[z] = String(z);
          }
          const center =
            projectConfig.config && !isNaN(projectConfig.config.center[0])
              ? projectConfig.config.center
              : baseconfig.project.center;
          const zoom =
            projectConfig.config && !isNaN(projectConfig.config.zoom)
              ? projectConfig.config.zoom
              : baseconfig.project.zoom;

          const overlay = new Overlay({
            id: 'marker',
            position: center,
            positioning: 'bottom-center',
            element: document.getElementById('marker') || document.createElement('marker'),
          });
          const markerElement = overlay.getElement();
          if (markerElement) {
            markerElement.style.visibility = 'hidden';
          }

          myMap = new Map({
            layers: [
              new TileLayer({
                source: new WMTS({
                  url: baseconfig.basemap.url,
                  layer: baseconfig.basemap.layers,
                  matrixSet: baseconfig.basemap.matrixSet,
                  projection: sm,
                  tileGrid: wmtsTileGrid({
                    extent: newExtent,
                    origin: getTopLeft(newExtent),
                    resolutions: resolutions,
                    matrixIds: matrixIds,
                  }),
                  style: 'default',
                  format: baseconfig.basemap.format,
                }),
                zIndex: -1,
              }),
            ],
            overlays: [overlay],
            target: 'map',
            view: new View({
              center: center,
              projection: sm,
              zoom: zoom,
              minZoom: 3,
              maxZoom: 18,
            }),
            controls: defaults({ zoom: true, attribution: false, rotate: false }).extend([new ScaleLine()]),
          });

          window.olMap = myMap;
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
      eventDispatch(removeAll());
      activateMap = false;
    },
  };
};

export default MapApi;
