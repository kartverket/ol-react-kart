import React from 'react';

import { useTranslation } from 'react-i18next';

import { ILayer, IMapLayer, IProject, IVector } from '../../MapCore/Models/config-model';
import { useProjectStore } from '../../app/projetStore';
import Legend from './legend/legend';

export interface IMainMenuPanelProjectLayersProps {
  ProjectName: string;
}
const MainMenuPanelProjectLayers = ({ ProjectName }: IMainMenuPanelProjectLayersProps) => {
  const { t } = useTranslation();
  const project = useProjectStore();
  const setToggleLayer = useProjectStore(state => state.setToggleLayer);
  const setToggleGroup = useProjectStore(state => state.setToggleGroup);

  const tileLayers = project.projects.find((p: IProject) => p.ProjectName === ProjectName)?.Config.layer;
  const vectorLayers = project.projects.find((p: IProject) => p.ProjectName === ProjectName)?.Config.vector;
  const layerGroups = project.projects.find((p: IProject) => p.ProjectName === ProjectName)?.Config.maplayer;

  const toggleVector = (vector: IVector): void => {
    console.log('toggleVector', vector);
    //eventDispatch(toggleVectorLayer(vector));
  };

  const toggleLayer = (layer: ILayer): void => {
    setToggleLayer(layer.name, ProjectName);
  };

  const toggleLayerGroup = (group: IMapLayer): void => {
    setToggleGroup(group.groupid, ProjectName);
  };

  return (
    <>
      {layerGroups ? (
        <ul className="list-group list-group-flush">
          {layerGroups.map((group, index) => (
            <li key={index} className="list-group-item list-group-item-action pt-2 pb-2">
              <div
                className="d-flex pt-2 pb-2"
                style={{ alignItems: 'center' }}
                onClick={() => toggleLayerGroup(group)}
              >
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
                      ? tileLayers
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
                          ))
                      : null}
                    {vectorLayers
                      ? vectorLayers
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
                          ))
                      : null}
                  </ul>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
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
