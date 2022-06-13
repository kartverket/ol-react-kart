import React from 'react';
import { useEventDispatch, useEventSelector } from '../../index';
import { selectVisibleBaseLayer, setVisibleBaseLayer } from '../../MapCore/Layers/layersSlice';

const ChangeBaseLayer = () => {
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
  };

  return (
    <>
      <div className="changeBaseLayer baseMapPanel baseLayerPanel">
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
