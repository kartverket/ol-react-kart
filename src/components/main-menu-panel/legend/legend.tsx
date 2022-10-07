import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import { ILayer } from '../../../MapCore/Models/config-model';
import { useProjectStore } from '../../../app/projetStore';

const Legend = () => {
  const listProjects = useProjectStore(state => state.projects);
  const listLayers = listProjects.filter(project => {
    const filterLayers = project.Config.layer.filter(layer => {
      if (layer.options.visibility === true && layer.options.isbaselayer === false) {
        return layer;
      }
    });
    if (filterLayers.length > 0) {
      return project;
    }
  });
  const { t } = useTranslation();
  const [collapsedLegend, setCollapsedLegend] = useState(false);

  const toggleCollapseLegend = (): void => {
    setCollapsedLegend(!collapsedLegend);
  };
  return (
    <>
      <div className="container" onClick={() => toggleCollapseLegend()}>
        <div className="d-flex p-0">
          <span>{t('legend_txt')}</span>
          <div className="ms-auto ps-2 pe-2">
            <span className="material-icons-outlined">{!collapsedLegend ? 'expand_less' : 'expand_more'}</span>
          </div>
        </div>
        {!collapsedLegend ? (
          <ul className="list-group list-group-flush">
            {listLayers.map(project =>
              project.Config.layer
                .filter(w => w.options.visibility === true)
                .map(
                  (wmsLayer: ILayer, wmsIndex: number) =>
                    wmsLayer.legendurl && (
                      <li key={wmsIndex}>
                        <p>{t(wmsLayer.name)}</p>
                        <img
                          src={
                            wmsLayer.legendurl?.replace(/\?$/, '') +
                            '?Service=wms&Request=GetLegendGraphic&Version=1.0.0&Format=' +
                            wmsLayer.params.format +
                            '&Layer=' +
                            wmsLayer.params.layers
                          }
                        />
                      </li>
                    ),
                ),
            )}
          </ul>
        ) : null}
      </div>
    </>
  );
};

export default Legend;
