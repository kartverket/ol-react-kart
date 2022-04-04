import { Coordinate } from 'ol/coordinate';
import { getTopLeft, getWidth } from 'ol/extent';
import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import Point from 'ol/geom/Point';
import { fromLonLat, get } from 'ol/proj';
import Projection from 'ol/proj/Projection';
import { Icon, Style } from 'ol/style';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import React, { useState } from 'react';
import SearchInput from './components/search/SearchInput';
import mapConfig from './config.json';
import FeatureStyles from './MapLib/Features/Styles';
import { Layers, TileLayer, VectorLayer } from './MapLib/Layers';
import Map from './MapLib/Map';
import { osm, vector } from './MapLib/Source';
import wmts from './MapLib/Source/wmts';
import wmtsTileGrid from './MapLib/TileGrid/wmts';

const geojsonObject = mapConfig.geojsonObject;
const geojsonObject2 = mapConfig.geojsonObject2;
const markersLonLat = [mapConfig.lerkendalLonLat, mapConfig.ntnuLonLat];

function addMarkers(lonLatArray: Coordinate[]) {
  const iconStyle = new Style({
    image: new Icon({
      anchorXUnits: IconAnchorUnits.FRACTION,
      anchorYUnits: IconAnchorUnits.PIXELS,
      src: mapConfig.markerImage32,
    }),
  });
  const features = lonLatArray.map((item: Coordinate) => {
    const feature = new Feature({
      geometry: new Point(fromLonLat(item)),
    });
    feature.setStyle(iconStyle);
    return feature;
  });
  return features;
}

function App() {
  const [center, setCenter] = useState(mapConfig.center);
  const [zoom /*setZoom*/] = useState(12);

  const [showLayer1, setShowLayer1] = useState(true);
  const [showLayer2, setShowLayer2] = useState(true);
  const [showWmts, setShowWmts] = useState(true);
  const [showOsm, setShowOsm] = useState(false);
  const [showMarker, setShowMarker] = useState(false);

  const [features /*setFeatures*/] = useState(addMarkers(markersLonLat));
  const sProjection = 'EPSG:3857';
  const extent = {
    'EPSG:3857': [-20037508.34, -20037508.34, 20037508.34, 20037508.34] as [
      number,
      number,
      number,
      number,
    ],
    'EPSG:32633': [-2500000, 3500000, 3045984, 9045984] as [
      number,
      number,
      number,
      number,
    ],
  };
  const projection = new Projection({
    code: sProjection,
    extent: extent[sProjection],
  });

  const projectionExtent = projection.getExtent();
  const size = getWidth(projectionExtent) / 256;

  const resolutions = [];
  const matrixIds = [];

  for (let z = 0; z < 21; ++z) {
    //Max 18?
    resolutions[z] = size / Math.pow(2, z);
    matrixIds[z] = sProjection + ':' + z;
  }

  const tileGrid = wmtsTileGrid({
    origin: getTopLeft(projection.getExtent()),
    resolutions: resolutions,
    matrixIds: matrixIds,
  });

  return (
    <div className="App">
      <Map center={fromLonLat(center)} zoom={zoom}>
        <Layers>
          {showOsm && <TileLayer source={osm()} zIndex={0} />}
          {showLayer1 && (
            <VectorLayer
              source={vector({
                features: new GeoJSON().readFeatures(geojsonObject, {
                  featureProjection: get('EPSG:3857') || undefined,
                }),
              })}
              style={FeatureStyles.MultiPolygon}
              zIndex={0}
            />
          )}
          {showLayer2 && (
            <VectorLayer
              source={vector({
                features: new GeoJSON().readFeatures(geojsonObject2, {
                  featureProjection: get('EPSG:3857') || undefined,
                }),
              })}
              style={FeatureStyles.MultiPolygon}
              zIndex={0}
            />
          )}
          {showWmts && (
            <TileLayer
              source={wmts({
                url: 'http://opencache.statkart.no/gatekeeper/gk/gk.open_wmts?',
                layer: 'norges_grunnkart',
                matrixSet: sProjection,
                projection: projection,
                tileGrid: tileGrid,
                style: 'default',
                format: 'image/png'
              })}
              zIndex={0}
            />
          )}
          {showMarker && (
            <VectorLayer
              source={vector({ features })}
              style={FeatureStyles.MultiPolygon}
              zIndex={0}
            />
          )}
        </Layers>
        {/* <Controls> */}
        {/* <FullScreenControl /> */}
        {/* </Controls> */}
      </Map>
      <div className="overlayLayer">
        <h1>Norgeskart</h1>
        <SearchInput />

        <div>
          <input
            type="checkbox"
            checked={showOsm}
            onChange={event => setShowOsm(event.target.checked)}
          />{' '}
          OSM
        </div>
        <div>
          <input
            type="checkbox"
            checked={showWmts}
            onChange={event => setShowWmts(event.target.checked)}
          />{' '}
          WMTS
        </div>

        <div>
          <input
            type="checkbox"
            checked={showLayer1}
            onChange={event => setShowLayer1(event.target.checked)}
          />{' '}
          Ringve botaniske
        </div>
        <div>
          <input
            type="checkbox"
            checked={showLayer2}
            onChange={event => setShowLayer2(event.target.checked)}
          />{' '}
          Grillstad marina
        </div>
        <div>
          <input
            type="checkbox"
            checked={showMarker}
            onChange={event => setShowMarker(event.target.checked)}
          />{' '}
          Show markers
        </div>
        <div className="logo-overlay fixed-bottom">
          <a className="logo-kartverket" href="https://kartverket.no/">
            kartverket.no
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
