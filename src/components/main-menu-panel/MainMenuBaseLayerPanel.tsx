import React from 'react';
import { useEventSelector, useEventDispatch } from '../../index';
import { selectBaseLayers, setVisibleBaseLayer } from '../../MapCore/Layers/layersSlice';
import { useTranslation } from 'react-i18next';

const MainMenuBaseLayerPanel = () => {
    const { t } = useTranslation();
    const baseLayers = useEventSelector(selectBaseLayers);
    const dispatch = useEventDispatch();
    const changeBaseLayer = (name: string): void => {
        dispatch(setVisibleBaseLayer(name))
    }

    return (
        <>
            {baseLayers ?  <ul className="list-group list-group-flush">
                {baseLayers.map((baseLayer, index) => 
                    <li key={index} className="list-group-item pt-2 pb-2" onClick={() => changeBaseLayer(baseLayer.name)}>
                        {t(baseLayer.name)}
                    </li>
                )}
                
            </ul> : null}
        </>
    )
}

export default MainMenuBaseLayerPanel;