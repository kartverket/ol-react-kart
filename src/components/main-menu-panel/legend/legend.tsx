import React, { useState } from 'react';
import { ITileLayer } from '../../../MapCore/Models/config-model';
import { useEventSelector } from '../../../index';
import { selectWmsLayers } from '../../../MapCore/Layers/layersSlice';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';


const Legend = () => {
    const wmsLayers = useEventSelector(selectWmsLayers);
    const { t } = useTranslation();
    const [collapsedLegend, setCollapsedLegend] = useState(false);

    const toggleCollapseLegend = (): void => {
        setCollapsedLegend(!collapsedLegend);
    }
  return (
      <>
        <div className='container' onClick={() => toggleCollapseLegend()}>
            <div className='d-flex ps-2 pe-2'>
                <span >{t('legend_txt')}</span>
                <div className="ms-auto ps-2 pe-2">
                    {!collapsedLegend ?
                        <FontAwesomeIcon icon={faChevronUp} />
                        :
                        <FontAwesomeIcon icon={faChevronDown} />
                    }
                </div>
            </div>
            {!collapsedLegend ? 
            <ul className="list-group list-group-flush">
            {wmsLayers.filter(w => w.options.visibility === 'true').map((wmsLayer:ITileLayer, wmsIndex:number) => 
                <li key={wmsIndex}>
                    <p>{t(wmsLayer.name)}</p>
                    <img src={wmsLayer.legendurl + 'Service=wms&Request=GetLegendGraphic&Version=1.0.0&Format=' + wmsLayer.params.format + '&Layer=' + wmsLayer.params.layers}/>
                </li>
            )}
            </ul> : null}
      </div>
      </>
  )
}

export default Legend;