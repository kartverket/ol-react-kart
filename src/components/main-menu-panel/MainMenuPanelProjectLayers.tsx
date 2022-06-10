import { faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useEventDispatch, useEventSelector } from '../../index';
import {
  selectLayersGroups,
  selectVectorLayers,
  selectWmsLayers,
  toggleGroup,
  toggleVectorLayer,
  toggleWmsLayer,
} from '../../MapCore/Layers/layersSlice';
import { IMapLayer, ITileLayer, IVector } from '../../MapCore/Models/config-model';
import Legend from './legend/legend';

const MainMenuPanelProjectLayers = () => {
  const { t } = useTranslation();
  const layerGroups = useEventSelector(selectLayersGroups);
  const wmsLayers = useEventSelector(selectWmsLayers);
  const vectorLayers = useEventSelector(selectVectorLayers);
  const eventDispatch = useEventDispatch();

  const toggleVector = (vector: IVector): void => {
    eventDispatch(toggleVectorLayer(vector));
  };

  const toggleWms = (wms: ITileLayer): void => {
    console.log('WMS: ', wms);
    eventDispatch(toggleWmsLayer(wms));
  };

  const toggleLayerGroup = (group: IMapLayer): void => {
    eventDispatch(toggleGroup(group));
  };

  return (
    <>
      <ul className="list-group list-group-flush">
        {layerGroups.map((group, index) => (
          <li key={index} className="list-group-item pt-2 pb-2">
            <div className="d-flex pt-2 pb-2" onClick={() => toggleLayerGroup(group)}>
              <div>
                <span>{t(group.name)}</span>
              </div>
              <div className="ms-auto ps-2 pe-2">
                {group.isOpen ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
              </div>
            </div>
            {group.isOpen ? (
              <div>
                <ul className="list-group list-group-flush">
                  {wmsLayers
                    .filter(w => w.groupid && w.groupid === group.groupid)
                    .map((wmsLayer, wmsIndex) => (
                      <li key={wmsIndex} className="list-group-item pt-2 pb-2" onClick={() => toggleWms(wmsLayer)}>
                        <div className="d-flex">
                          <div className="pe-2">
                            {wmsLayer.options.visibility === 'true' ? (
                              <FontAwesomeIcon icon={faCheckSquare} />
                            ) : (
                              <FontAwesomeIcon icon={faSquare} />
                            )}
                          </div>
                          <div className="ps-2">
                            <span>{t(wmsLayer.name)}</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  {vectorLayers
                    .filter(v => v.groupid && v.groupid === group.groupid)
                    .map((vectorLayer, vectorIndex) => (
                      <li
                        key={vectorIndex}
                        className="list-group-item pt-2 pb-2"
                        onClick={() => toggleVector(vectorLayer)}
                      >
                        <div className="d-flex">
                          <div className="pe-2">
                            {vectorLayer.options.visibility === 'true' ? (
                              <FontAwesomeIcon icon={faCheckSquare} />
                            ) : (
                              <FontAwesomeIcon icon={faSquare} />
                            )}
                          </div>
                          <div className="ps-2">
                            <span>{t(vectorLayer.name)}</span>
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            ) : null}
          </li>
        ))}
      </ul>
      <hr />
      <div className="container">
        <div className="mb-2">
          <Legend />
        </div>
      </div>
    </>
  );
};

export default MainMenuPanelProjectLayers;
