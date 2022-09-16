import React from 'react';

import { useTranslation } from 'react-i18next';

import {
  selectLayersGroups,
  selectTileLayers,
  selectVectorLayers,
  toggleGroup,
  toggleTileLayer,
  toggleVectorLayer,
} from '../../MapCore/Layers/layersSlice';
import { ILayer, IMapLayer, IVector } from '../../MapCore/Models/config-model';
import { useEventDispatch, useEventSelector } from '../../index';
import Legend from './legend/legend';

const MainMenuPanelProjectLayers = () => {
  const { t } = useTranslation();
  const layerGroups = useEventSelector(selectLayersGroups);
  console.log('layerGroups', layerGroups);
  const tileLayers = useEventSelector(selectTileLayers);
  const vectorLayers = useEventSelector(selectVectorLayers);
  const eventDispatch = useEventDispatch();

  const toggleVector = (vector: IVector): void => {
    eventDispatch(toggleVectorLayer(vector));
  };

  const toggleLayer = (layer: ILayer): void => {
    eventDispatch(toggleTileLayer(layer));
  };

  const toggleLayerGroup = (group: IMapLayer): void => {
    eventDispatch(toggleGroup(group));
  };

  return (
    <>
      <ul className="list-group list-group-flush">
        {layerGroups.map((group, index) => (
          <li key={index} className="list-group-item list-group-item-action pt-2 pb-2">
            <div className="d-flex pt-2 pb-2" style={{ alignItems: 'center' }} onClick={() => toggleLayerGroup(group)}>
              <span className="material-icons-outlined">layers</span>
              <div>
                <span>{t(group.name)}</span>
              </div>
              <div className="ms-auto ps-2 pe-2">
                <span className="material-icons-outlined">{group.isOpen ? 'expand_more' : 'chevron_right'}</span>
              </div>
            </div>
            {group.isOpen ? (
              <div className="p-0">
                <ul className="list-group list-group-flush">
                  {tileLayers
                    .filter(w => w.groupid && w.groupid === group.groupid)
                    .map((tileLayer, wmsIndex) => (
                      <li
                        key={wmsIndex}
                        className="list-group-item list-group-item-action pt-2 pb-2"
                        onClick={() => toggleLayer(tileLayer)}
                      >
                        <div className="d-flex p-0 checkbox">
                          <input
                            type="checkbox"
                            id={tileLayer.name}
                            defaultChecked={tileLayer.options.visibility === true ? true : false}
                            onClick={e => {
                              e.stopPropagation();
                            }}
                          />
                          <label htmlFor={tileLayer.name}>{t(tileLayer.name)}</label>
                        </div>
                      </li>
                    ))}
                  {vectorLayers
                    .filter(v => v.groupid && v.groupid === group.groupid)
                    .map((vectorLayer, vectorIndex) => (
                      <li
                        key={vectorIndex}
                        className="list-group-item list-group-item-action pt-2 pb-2"
                        onClick={() => toggleVector(vectorLayer)}
                      >
                        <div className="d-flex p-0 checkbox">
                          <input
                            type="checkbox"
                            id={vectorLayer.name}
                            defaultChecked={vectorLayer.options.visibility === true ? true : false}
                            onChange={() => {
                              console.log('toggleVector');
                            }}
                          />
                          <label htmlFor={vectorLayer.name}>{t(vectorLayer.name)}</label>
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
