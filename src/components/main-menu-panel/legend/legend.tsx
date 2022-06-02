import React from 'react';
import { ITileLayer } from '../../../MapCore/Models/config-model';
import { useEventSelector } from '../../../index';
import { selectWmsLayers } from '../../../MapCore/Layers/layersSlice';
import { useTranslation } from 'react-i18next';


const Legend = () => {
    const wmsLayers = useEventSelector(selectWmsLayers);
    const { t } = useTranslation();

  return (
      <>
      <span>{t('legend_txt')}</span>
      <ul className="list-group list-group-flush">
      {wmsLayers.filter(w => w.options.visibility === 'true').map((wmsLayer:ITileLayer, wmsIndex:number) => 
       <li key={wmsIndex}>
           <img src={wmsLayer.legendurl + 'Service=wms&Request=GetLegendGraphic&Version=1.0.0&Format=' + wmsLayer.params.format + '&Layer=' + wmsLayer.params.layers}/>
       </li>
      )}
      </ul>
      </>
  )
}

export default Legend;