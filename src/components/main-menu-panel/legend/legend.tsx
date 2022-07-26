import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useEventSelector } from '../../../index';
import { selectTileLayers } from '../../../MapCore/Layers/layersSlice';
import { ITileLayer } from '../../../MapCore/Models/config-model';

const Legend = () => {
  const wmsLayers = useEventSelector(selectTileLayers);
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
            {wmsLayers
              .filter(w => w.options.visibility === 'true')
              .map(
                (wmsLayer: ITileLayer, wmsIndex: number) =>
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
              )}
          </ul>
        ) : null}
      </div>
    </>
  );
};

export default Legend;
