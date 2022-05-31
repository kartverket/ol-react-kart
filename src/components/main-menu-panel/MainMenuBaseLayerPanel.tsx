import React, { Component } from 'react';
// import { useEventStoreSelector } from '../../MapCore/Events/Event/eventHooks';
import { useEventSelector } from '../../index';
import { selectBaseLayers } from '../../MapCore/Layers/layersSlice';

type MainMenuBaseLayerPanelProps = {
    changeBaseLayer:(baseLayerName: string) => void
};

const MainMenuBaseLayerPanel = (props : MainMenuBaseLayerPanelProps) => {
    const baseLayers = useEventSelector(selectBaseLayers);
    return (
        <>
            {baseLayers ?  <ul className="list-group list-group-flush">
                {baseLayers.map((baseLayer, index) => 
                    <li key={index} className="list-group-item pt-2 pb-2 text-capitalize" onClick={() => props.changeBaseLayer(baseLayer.Layers?.Layer.title ? baseLayer.Layers?.Layer.title : baseLayer.name)}>
                        {baseLayer.Layers?.Layer.title ? baseLayer.Layers?.Layer.title : baseLayer.name}
                    </li>
                )}
                
            </ul> : null}
        </>
    )
}

export default MainMenuBaseLayerPanel;