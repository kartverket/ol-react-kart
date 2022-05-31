import React from 'react';
import { useEventDispatch, useEventSelector } from '../../index';
import { setVisibleBaseLayer, selectVisibleBaseLayer } from '../../MapCore/Layers/layersSlice'


const ChangeBaseLayer = () =>  {
    const dispatch = useEventDispatch();
    const visibleBaseLayer = useEventSelector(selectVisibleBaseLayer);
    const baseLayers = [
        {
            id: "land",
            name: "landkart",
            symbol: "baseMap baseMap-land",
            isSelected: false
        },
        {
            id: "raster",
            name: "rasterkart",
            symbol: "baseMap baseMap-raster",
            isSelected: false
        },
        {
            id: "aerial",
            name: "flybilder",
            symbol: "baseMap baseMap-aerial",
            isSelected: false
        },
        {
            id: "grey",
            name: "gratone",
            symbol: "baseMap baseMap-grey",
            isSelected: false
        }
    ];

    const toggleBaseLayer = (index: number): void  =>  {
        dispatch(setVisibleBaseLayer(baseLayers[index].name));
    }

    return (
        <>
            <div className="changeBaseLayer baseMapPanel baseLayerPanel">
                {baseLayers.map((baseLayer, index) => 
                    <button key={index} className={`btn btn-default ${baseLayer.name === visibleBaseLayer?.name ? "activeBtn" : "btn-toggle"}`} onClick={() => toggleBaseLayer(index)}>
                        <div className={baseLayer.symbol} title={baseLayer.name}></div>
                    </button>
                )}
            </div>
        </>
        
    );
    
}

export default ChangeBaseLayer;