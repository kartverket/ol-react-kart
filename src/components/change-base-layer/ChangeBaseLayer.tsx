import React from 'react';
import { useEventDispatch } from '../../index';
import { setVisibleBaseLayer } from '../../MapCore/Layers/layersSlice'


const ChangeBaseLayer = () =>  {
    const dispatch = useEventDispatch();
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
                    <button key={index} className="btn btn-default btn-toggle" onClick={() => toggleBaseLayer(index)}>
                        <div className={baseLayer.symbol} title={baseLayer.name}></div>
                    </button>
                )}
            </div>
        </>
        
    );
    
}

export default ChangeBaseLayer;