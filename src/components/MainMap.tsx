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
import TopLeftMenu from './TopLeftMenu';

const geojsonObject = mapConfig.geojsonObject;
const geojsonObject2 = mapConfig.geojsonObject2;
const markersLonLat = [mapConfig.lerkendalLonLat, mapConfig.ntnuLonLat];
let layerSelected = '';

export default function OverLayLayer() {
  const [center, setCenter] = useState(mapConfig.center);
  const [zoom /*setZoom*/] = useState(12);

  const [showLayer1, setShowLayer1] = useState(true);
  const [showLayer2, setShowLayer2] = useState(true);
  // const [showWmts, setShowWmts] = useState(true);
  const [showOsm, setShowOsm] = useState(false);
  const [showMarker, setShowMarker] = useState(false);
  // const [wmtsLayer, setWmtsLayer] = useState('norges_grunnkart');
  const [wmtsLayerSelected, setWmtsLayerSelected] = useState({ checked: true, layer: 'norges_grunnkart_graatone' });
  layerSelected = wmtsLayerSelected.layer;
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

  const handleCheckboxOsm = (event: React.ChangeEvent<HTMLInputElement>): void => {
    return setShowOsm(event.target.checked);
  };
  const handleCheckboxWmts = (event: React.ChangeEvent<HTMLInputElement>): void => {
    return setWmtsLayerSelected({ checked: event.target.checked, layer: wmtsLayerSelected.layer });
  };
  const handleSetWmtsLayer = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setWmtsLayerSelected({ checked: wmtsLayerSelected.checked, layer: event.target.value });
    layerSelected = wmtsLayerSelected.layer;
  };
  const handleShowLayer1 = (event: React.ChangeEvent<HTMLInputElement>): void => setShowLayer1(event.target.checked);
  const handleShowLayer2 = (event: React.ChangeEvent<HTMLInputElement>): void => setShowLayer2(event.target.checked);
  const handleShowMarkers = (event: React.ChangeEvent<HTMLInputElement>): void => setShowMarker(event.target.checked);

  const osmTileLayer = <TileLayer source={osm()} zIndex={0} />;
  const markerLayer = <VectorLayer source={vector({ features })} style={FeatureStyles.MultiPolygon} zIndex={0} />;

  const wmtsVectorLayer = (
    <TileLayer
      source={wmts({
        url: 'http://opencache.statkart.no/gatekeeper/gk/gk.open_wmts?',
        layer: layerSelected,
        matrixSet: sProjection,
        projection: projection,
        tileGrid: tileGrid,
        style: 'default',
        format: 'image/png',
      })}
      zIndex={0}
    />
  );

  const geoJsonVectorLayer = getGeoJson(geojsonObject);
  const geoJson2VectorLayer = getGeoJson(geojsonObject2);

  const layerSelection = (
    <Layers>
      {showOsm && osmTileLayer}
      {showLayer1 && geoJsonVectorLayer}
      {showLayer2 && geoJson2VectorLayer}
      {wmtsLayerSelected.checked && wmtsVectorLayer}
      {showMarker && markerLayer}
    </Layers>
  );

  const selectLayerBox = (
    <div>
      <input type="checkbox" checked={wmtsLayerSelected.checked} onChange={handleCheckboxWmts} /> WMTS
      {wmtsLayerSelected.checked && (
        <select value={wmtsLayerSelected.layer} onChange={handleSetWmtsLayer}>
          {wmtsLayers.map(selectedLayer => (
            <option key={selectedLayer.value} value={selectedLayer.value}>
              {selectedLayer.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );

  const menuItems = (
    <div className="overlayLayer">
      <TopLeftMenu />
      <div>
        <input type="checkbox" checked={showOsm} onChange={handleCheckboxOsm} /> OSM
      </div>
      {selectLayerBox}
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
  );

  return (
    <>
      <Map center={fromLonLat(center)} zoom={zoom}>
        {layerSelection}
        {/* <Controls> */}
        {/* <FullScreenControl /> */}
        {/* </Controls> */}
      </Map>
      {menuItems}
    </>
  );

  function getGeoJson(geojsonObject: GeoJSON | any) {
    return (
      <VectorLayer
        source={vector({
          features: new GeoJSON().readFeatures(geojsonObject, {
            featureProjection: get(sProjection) || undefined,
          }),
        })}
        style={FeatureStyles.MultiPolygon}
        zIndex={0}
      />
    );
  }
}
