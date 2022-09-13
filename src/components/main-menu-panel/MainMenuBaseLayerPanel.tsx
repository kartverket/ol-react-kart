import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import { selectBaseLayers, setVisibleBaseLayer } from '../../MapCore/Layers/layersSlice';
import { useEventDispatch, useEventSelector } from '../../index';

const LayerInfo = (props: any) => {
  return (
    <div className="card" style={{ width: '18rem' }}>
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <p className="card-text"> {props.description}</p>
        {props.uuid ? (
          <a
            href={'https://kartkatalog.geonorge.no/metadata?text=' + props.uuid}
            className="button button__green--tertiary button--xs"
            target="_blank"
            rel="noreferrer"
          >
            gå til geonorge
          </a>
        ) : null}
      </div>
    </div>
  );
};

const MainMenuBaseLayerPanel = () => {
  const [activeIndex, setActiveIndex] = useState<number>();
  const { t } = useTranslation();
  const baseLayers = useEventSelector(selectBaseLayers);
  const dispatch = useEventDispatch();
  const changeBaseLayer = (name: string): void => {
    dispatch(setVisibleBaseLayer(name));
  };

  return (
    <>
      {baseLayers ? (
        <ul className="list-group list-group-flush">
          {baseLayers.map((baseLayer, index) => (
            <li
              key={index}
              className="list-group-item list-group-item-action ps-5 px-2 projectlist-item"
              onClick={() => changeBaseLayer(baseLayer.name)}
            >
              {t(baseLayer.name)}
              <button className="button position-absolute end-0 projectlist-item" onClick={() => setActiveIndex(index)}>
                <span className="material-icons-outlined">info</span>
              </button>
              {index == activeIndex ? (
                <LayerInfo name={baseLayer.name} uuid={baseLayer.uuid} description={baseLayer.description} />
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};

export default MainMenuBaseLayerPanel;
