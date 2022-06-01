import React, { useState } from 'react';
import { faMap, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector, useAppDispatch, useEventSelector, useEventDispatch } from '../../index';
import { selectProjectsList, showActiveProjectFromList } from './projects-list/projectsListSlice';
import { selectLayersGroups, selectWmtsLayers, selectWmsLayers, selectVectorLayers, showVectorLayer } from '../../MapCore/Layers/layersSlice';
import { useTranslation } from 'react-i18next';
import { IVector } from '../../MapCore/Models/config-model';


const MainMenuPanelProjectLayers = () => {
  const { t } = useTranslation();
  const layerGroups = useEventSelector(selectLayersGroups);
  const wmsLayers = useEventSelector(selectWmsLayers);
  const vectorLayers = useEventSelector(selectVectorLayers);
  const eventDispatch = useEventDispatch();

  const toggleVectorLayer = (vector: IVector): void => {
    eventDispatch(showVectorLayer(vector));
  }


  return (
    <>
      <ul className="list-group list-group-flush">
        {layerGroups.map((layer, index) =>
          <li key={index} className="list-group-item pt-2 pb-2">
            <span>
              {t(layer.name)}
            </span>
            <ul className="list-group list-group-flush">
            {wmsLayers.filter(w => w.groupid && w.groupid === layer.groupid).map((wmsLayer, wmsIndex) => 
              <li key={wmsIndex} className="list-group-item pt-2 pb-2 ps-4">
                <span className='ps-2'>{t(wmsLayer.name)}</span>
              </li>
            )}
            {vectorLayers.filter(v => v.groupid && v.groupid === layer.groupid).map((vectorLayer, vectorIndex) =>
              <li key={vectorIndex} className="list-group-item pt-2 pb-2 ps-4" onClick={() => toggleVectorLayer(vectorLayer)}>
                <span className='ps-2'>{t(vectorLayer.name)}</span>
              </li>
            )}
            </ul>
          </li>
        )}
      </ul>
    </>
  )
}

export default MainMenuPanelProjectLayers;