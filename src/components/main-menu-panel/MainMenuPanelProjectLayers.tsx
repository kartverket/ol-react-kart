import React, { useState } from 'react';
import { faMap, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector, useAppDispatch, useEventSelector } from '../../index';
import { selectProjectsList, showActiveProjectFromList } from './projects-list/projectsListSlice';
import { selectLayersGroups } from '../../MapCore/Layers/layersSlice';
import { useTranslation } from 'react-i18next';


const MainMenuPanelProjectLayers = () => {
  const { t } = useTranslation();
  const layerGroups = useEventSelector(selectLayersGroups);

  return (
    <>
      <ul className="list-group list-group-flush">
        {layerGroups.map((layer, index) =>
          <li key={index} className="list-group-item pt-2 pb-2 text-capitalize">
            {t(layer.name)}
          </li>
        )}
      </ul>
    </>
  )
}

export default MainMenuPanelProjectLayers;