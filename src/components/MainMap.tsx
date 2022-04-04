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
import addMarkers from './Markers';
import SearchInput from './search/SearchInput';
import Logo from './Logo';

const geojsonObject = mapConfig.geojsonObject;
const geojsonObject2 = mapConfig.geojsonObject2;
const markersLonLat = [mapConfig.lerkendalLonLat, mapConfig.ntnuLonLat];

export default function OverLayLayer() {
  const [center, setCenter] = useState(mapConfig.center);
  const [zoom /*setZoom*/] = useState(12);

  const [showLayer1, setShowLayer1] = useState(true);
  const [showLayer2, setShowLayer2] = useState(true);
  const [showWmts, setShowWmts] = useState(true);
  const [showOsm, setShowOsm] = useState(false);
  const [showMarker, setShowMarker] = useState(false);
  const [wmtsLayer, setWmtsLayer] = useState('norges_grunnkart');

  const wmtsLayers = [
    { label: 'Toporaster 4', value: 'toporaster4' },
    { label: 'Norges grunnkart', value: 'norges_grunnkart' },
    { label: 'Norges grunnkart gråtone', value: 'norges_grunnkart_graatone' },
    { label: 'Europeisk grunnkart', value: 'egk' },
    { label: 'Havbunn grunnkart', value: 'havbunn_grunnkart' },
    { label: 'Terreng norgeskart', value: 'terreng_norgeskart' },
    { label: 'Sjøkartraster', value: 'sjokartraster' },
  ];

  const [features /*setFeatures*/] = useState(addMarkers(markersLonLat));
  const sProjection = 'EPSG:3857';
  const extent = {
    'EPSG:3857': [-20037508.34, -20037508.34, 20037508.34, 20037508.34] as [number, number, number, number],
    'EPSG:32633': [-2500000, 3500000, 3045984, 9045984] as [number, number, number, number],
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
    <>
      <Map center={fromLonLat(center)} zoom={zoom}>
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
        {/* <Controls> */}
        {/* <FullScreenControl /> */}
        {/* </Controls> */}
      </Map>
      <div className="overlayLayer">
        <h1>Norgeskart</h1>
        <SearchInput />

        <div>
          <input type="checkbox" checked={showOsm} onChange={event => setShowOsm(event.target.checked)} /> OSM
        </div>
        <div>
          <input type="checkbox" checked={showWmts} onChange={event => setShowWmts(event.target.checked)} /> WMTS
          {!showWmts && (
            <select
              value={wmtsLayer}
              onChange={event => setWmtsLayer(event.target.value)}
            >
              {wmtsLayers.map(l => (
                <option key={l.value} value={l.value}>
                  {l.label}
                </option>
              ))}
            </select>
          )}
        </div>

        <div>
          <input type="checkbox" checked={showLayer1} onChange={event => setShowLayer1(event.target.checked)} /> Ringve
          botaniske
        </div>
        <div>
          <input type="checkbox" checked={showLayer2} onChange={event => setShowLayer2(event.target.checked)} />{' '}
          Grillstad marina
        </div>
        <div>
          <input type="checkbox" checked={showMarker} onChange={event => setShowMarker(event.target.checked)} /> Show
          markers
        </div>
        <Logo />
      </div>
    </>
  );
}
