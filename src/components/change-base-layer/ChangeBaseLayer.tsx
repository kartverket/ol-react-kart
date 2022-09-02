import React from 'react';

import { selectVisibleBaseLayer, setVisibleBaseLayer } from '../../MapCore/Layers/layersSlice';
import { useGlobalStore } from '../../app/globalStore';
import { useEventDispatch, useEventSelector } from '../../index';

const ChangeBaseLayer = () => {
  const setGlobalLayers = useGlobalStore(state => state.setLayers);
  const dispatch = useEventDispatch();
  const visibleBaseLayer = useEventSelector(selectVisibleBaseLayer);
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
    dispatch(setVisibleBaseLayer(baseLayers[index].name));
    setGlobalLayers(baseLayers[index].name);
  };

  return (
    <>
      <div className="changeBaseLayer baseMapPanel baseLayerPanel change-base-map-mobile">
        {baseLayers.map((baseLayer, index) => (
          <button
            key={index}
            className={`btn btn-default ${baseLayer.name === visibleBaseLayer?.name ? 'activeBtn' : 'btn-toggle'}`}
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
