//src/components/MainMap.tsx
import { getTopLeft, getWidth } from 'ol/extent';
import GeoJSON from 'ol/format/GeoJSON';
import { fromLonLat, get } from 'ol/proj';
import Projection from 'ol/proj/Projection';
import React, { useState } from 'react';
import mapConfig from '../config.json';
import FeatureStyles from '../MapLib/Features/Styles';
import { Layers, TileLayer, VectorLayer } from '../MapLib/Layers';
import Map from '../MapLib/Map';
import { osm, vector } from '../MapLib/Source';
import wmts from '../MapLib/Source/wmts';
import wmtsTileGrid from '../MapLib/TileGrid/wmts';
import Logo from './Logo';
import addMarkers from './Markers';

const geojsonObject = mapConfig.geojsonObject;
const geojsonObject2 = mapConfig.geojsonObject2;
const markersLonLat = [mapConfig.lerkendalLonLat, mapConfig.ntnuLonLat];

export default function OverLayLayer() {
  const [center, setCenter] = useState(mapConfig.center);
  const [zoom /*setZoom*/] = useState(12);

  const [showLayer1, setShowLayer1] = useState(true);
  const [showLayer2, setShowLayer2] = useState(true);
  const [showWmts, setShowWmts] = useState({ checked: true, wmtsLabel: 'norges_grunnkart' });
  const [showOsm, setShowOsm] = useState(false);
  const [showMarker, setShowMarker] = useState(false);
  const [wmtsLayer, setWmtsLayer] = useState('norges_grunnkart');

  const wmtsLayers = mapConfig.wmtsLayers;

  const [features /*setFeatures*/] = useState(addMarkers(markersLonLat));
  const sProjection = 'EPSG:3857';
  const extent = mapConfig.extent;
  const projection = new Projection({
    code: sProjection,
    extent: extent[sProjection] as [number, number, number, number],
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

  const handleCheckboxOsm = (event: React.ChangeEvent<HTMLInputElement>): void => {
    return setShowOsm(event.target.checked);
  };
  const handleCheckboxWmts = (event: React.ChangeEvent<HTMLInputElement>): void => {
    return setShowWmts({ checked: event.target.checked, wmtsLabel: 'norges_grunnkart' });
  };
  const handleSetWmtsLayer = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setWmtsLayer(event.target.value);
  };
  const handleShowLayer1 = (event: React.ChangeEvent<HTMLInputElement>): void => setShowLayer1(event.target.checked);
  const handleShowLayer2 = (event: React.ChangeEvent<HTMLInputElement>): void => setShowLayer2(event.target.checked);
  const handleShowMarkers = (event: React.ChangeEvent<HTMLInputElement>): void => setShowMarker(event.target.checked);

  const layerSelection = (
    <Layers>
      {showOsm && <TileLayer source={osm()} zIndex={0} />}
      {showLayer1 && (
        <VectorLayer
          source={vector({
            features: new GeoJSON().readFeatures(geojsonObject, {
              featureProjection: get(sProjection) || undefined,
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
              featureProjection: get(sProjection) || undefined,
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
            layer: wmtsLayer,
            matrixSet: sProjection,
            projection: projection,
            tileGrid: tileGrid,
            style: 'default',
            format: 'image/png',
          })}
          zIndex={0}
        />
      )}
      {showMarker && <VectorLayer source={vector({ features })} style={FeatureStyles.MultiPolygon} zIndex={0} />}
    </Layers>
  );

  return (
    <>
      <Map center={fromLonLat(center)} zoom={zoom}>
        {layerSelection}
        {/* <Controls> */}
        {/* <FullScreenControl /> */}
        {/* </Controls> */}
      </Map>
      <div className="overlayLayer">
        <div>
          <input type="checkbox" checked={showOsm} onChange={handleCheckboxOsm} /> OSM
        </div>
        <div>
          <input type="checkbox" checked={showWmts} onChange={handleCheckboxWmts} /> WMTS
          {showWmts && (
            <select value={wmtsLayer} onChange={handleSetWmtsLayer}>
              {wmtsLayers.map(selectedLayer => (
                <option key={selectedLayer.value} value={selectedLayer.value}>
                  {selectedLayer.label}
                </option>
              ))}
            </select>
          )}
        </div>

        <div>
          <input type="checkbox" checked={showLayer1} onChange={handleShowLayer1} /> Ringve botaniske
        </div>
        <div>
          <input type="checkbox" checked={showLayer2} onChange={handleShowLayer2} /> Grillstad marina
        </div>
        <div>
          <input type="checkbox" checked={showMarker} onChange={handleShowMarkers} /> Show markers
        </div>
        <Logo />
      </div>
    </>
  );
}
