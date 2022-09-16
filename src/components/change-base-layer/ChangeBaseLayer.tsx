import React from 'react';

import { useGlobalStore } from '../../app/globalStore';
import { useBaseLayersStore } from '../../app/baseStore'

const ChangeBaseLayer = () => {
  const setGlobalLayers = useGlobalStore(state => state.setLayers);
  const setVisibleBaseLayer = useBaseLayersStore((state) => state.setVisibleBaseLayer)
  const activeBaseLayer = useBaseLayersStore(state => state.layers.find(layer => layer.options.visibility === true));

  const baseLayers = [
    {
      name: 'landkart',
      symbol: 'baseMap baseMap-land',
    },
    {
      name: 'rasterkart',
      symbol: 'baseMap baseMap-raster',
    },
    {
      name: 'flybilder',
      symbol: 'baseMap baseMap-aerial',
    },
    {
      name: 'gratone',
      symbol: 'baseMap baseMap-grey',
    },
  ];

  const toggleBaseLayer = (index: number): void => {
    setVisibleBaseLayer(baseLayers[index].name);
    setGlobalLayers(baseLayers[index].name);
  };

  return (
    <>
      <div className="changeBaseLayer baseLayerPanel change-base-map-mobile">
        {baseLayers.map((baseLayer, index) => (
          <button
            key={index}
            className={`button ${baseLayer.name === activeBaseLayer?.name ? 'button__green--primary' : ''}`}
            onClick={() => toggleBaseLayer(index)}
          >
            <div className={baseLayer.symbol} title={baseLayer.name}></div>
          </button>
        ))}
      </div>
    </>
  );
};

export default ChangeBaseLayer;
