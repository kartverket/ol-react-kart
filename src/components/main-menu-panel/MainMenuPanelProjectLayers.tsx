import React, { useState } from 'react';
import { faMap, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector, useAppDispatch, useEventSelector, useEventDispatch } from '../../index';
import { selectProjectsList, showActiveProjectFromList } from './projects-list/projectsListSlice';
import { selectLayersGroups, selectWmtsLayers, selectWmsLayers, selectVectorLayers, toggleVectorLayer, toggleGroup } from '../../MapCore/Layers/layersSlice';
import { useTranslation } from 'react-i18next';
import { IMapLayer, IVector } from '../../MapCore/Models/config-model';


const MainMenuPanelProjectLayers = () => {
  const { t } = useTranslation();
  const layerGroups = useEventSelector(selectLayersGroups);
  const wmsLayers = useEventSelector(selectWmsLayers);
  const vectorLayers = useEventSelector(selectVectorLayers);
  const eventDispatch = useEventDispatch();

  const toggleVector = (vector: IVector): void => {
    eventDispatch(toggleVectorLayer(vector));    
  }

  const toggleLayerGroup = (group: IMapLayer): void => {
    eventDispatch(toggleGroup(group));
  }


  return (
    <>
      <ul className="list-group list-group-flush">
        {layerGroups.map((group, index) =>
          <li key={index} className="list-group-item pt-2 pb-2">
            <div className='d-flex' onClick={() => toggleLayerGroup(group)}>
              <div>
                <span>
                  {t(group.name)}
                </span>
              </div>
              <div className="ms-auto ps-2 pe-2">
                {group.isOpen ?
                  <FontAwesomeIcon icon={faChevronUp} />
                  :
                  <FontAwesomeIcon icon={faChevronDown} />
                }
              </div>
            </div>
            {group.isOpen 
              ?
              <div>
                <ul className="list-group list-group-flush">
                  {wmsLayers.filter(w => w.groupid && w.groupid === group.groupid).map((wmsLayer, wmsIndex) => 
                  <li key={wmsIndex} className="list-group-item pt-2 pb-2 ps-4">
                    <span className='ps-2'>{t(wmsLayer.name)}</span>
                  </li>
                )}
                  {vectorLayers.filter(v => v.groupid && v.groupid === group.groupid).map((vectorLayer, vectorIndex) =>
                    <li key={vectorIndex} className="list-group-item pt-2 pb-2 ps-4" onClick={() => toggleVector(vectorLayer)}>
                    <div className='d-flex'>
                      <div className="ps-2 pe-2">
                        {vectorLayer.options.visibility === 'true' ?
                            <FontAwesomeIcon icon={faCheckSquare} />
                          :
                            <FontAwesomeIcon icon={faSquare} />
                        }
                      </div>
                      <div>
                        <span className='ps-2'>{t(vectorLayer.name)}</span>
                      </div>
                    </div>
                  </li>
                )}
                </ul>
              </div>
              :
            null}
          </li>
        )}
      </ul>
    </>
  )
}

export default MainMenuPanelProjectLayers;