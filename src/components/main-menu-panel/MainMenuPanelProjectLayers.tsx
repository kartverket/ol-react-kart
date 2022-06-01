import React, { useState } from 'react';
import { faMap, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector, useAppDispatch, useEventSelector } from '../../index';
import { selectProjectsList, showActiveProjectFromList } from './projects-list/projectsListSlice';
import { selectLayersGroups, selectWmtsLayers, selectWmsLayers, selectVectorLayers } from '../../MapCore/Layers/layersSlice';
import { useTranslation } from 'react-i18next';


const MainMenuPanelProjectLayers = () => {
  const { t } = useTranslation();
  const layerGroups = useEventSelector(selectLayersGroups);
  const wmsLayers = useEventSelector(selectWmsLayers);
  const vectorLayers = useEventSelector(selectVectorLayers);

  return (
    <>
      <div className="list-group list-group-flush">
        {layerGroups.map((layer, index) =>
          <div key={index}>
            <div className="list-group-item pt-2 pb-2">
              {t(layer.name)}
            </div>
            {wmsLayers.filter(w => w.groupid && w.groupid === layer.groupid).map((wmsLayer, wmsIndex) => 
              <div key={wmsIndex} className="list-group-item pt-2 pb-2 ps-4">
              <span className='ps-2'>{t(wmsLayer.name)}</span>
            </div>
            )}
            {vectorLayers.filter(v => v.groupid && v.groupid === layer.groupid).map((vectorLayer, vectorIndex) =>
              <div key={vectorIndex} className="list-group-item pt-2 pb-2 ps-4">
                <span className='ps-2'>{t(vectorLayer.name)}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default MainMenuPanelProjectLayers;