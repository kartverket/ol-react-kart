import { Coordinate } from 'ol/coordinate';
import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import Point from 'ol/geom/Point';
import { fromLonLat, get } from 'ol/proj';
import { Icon, Style } from 'ol/style';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import React, { useState } from 'react';
import mapConfig from './config.json';
import FeatureStyles from './MapLib/Features/Styles';
import { Layers, TileLayer, VectorLayer } from './MapLib/Layers';
import Map from './MapLib/Map';
import { osm, vector } from './MapLib/Source';

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
  const [center, /*setCenter*/] = useState(mapConfig.center);
  const [zoom, /*setZoom*/] = useState(12);

  const [showLayer1, setShowLayer1] = useState(true);
  const [showLayer2, setShowLayer2] = useState(true);
  const [showMarker, setShowMarker] = useState(false);

  const [features, /*setFeatures*/] = useState(addMarkers(markersLonLat));
  return (
    <div className="App">
      <Map center={fromLonLat(center)} zoom={zoom}>
        <Layers>
          <TileLayer source={osm()} zIndex={0} />
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
      <div className='overlayLayer'>
        <h1>Norgeskart</h1>
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
        <hr />
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
