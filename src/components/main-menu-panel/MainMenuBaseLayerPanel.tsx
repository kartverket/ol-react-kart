import React from 'react';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { useTranslation } from 'react-i18next';

import { useBaseLayersStore } from '../../app/baseStore';

const LayerInfo = (props: any) => {
  return (
    <Popover id="popover-basic">
      <Popover.Header as="h3">{props.baseLayer.name}</Popover.Header>
      <Popover.Body>
        <div>{props.baseLayer.description}</div>
        {props.baseLayer.uuid ? (
          <div>
            <a
              href={'https://kartkatalog.geonorge.no/metadata?text=' + props.uuid}
              className="underline"
              target="_blank"
              rel="noreferrer"
            >
              gå til geonorge
            </a>
          </div>
        ) : null}
      </Popover.Body>
    </Popover>
  );
};
const MainMenuBaseLayerPanel = () => {
  const setVisibleBaseLayer = useBaseLayersStore(state => state.setVisibleBaseLayer);
  const baseLayers = useBaseLayersStore();
  const { t } = useTranslation();

  const changeBaseLayer = (name: string): void => {
    setVisibleBaseLayer(name);
  };

  return (
    <>
      {baseLayers ? (
        <ul className="list-group list-group-flush">
          {baseLayers.layers.map((baseLayer, index) => (
            <li
              key={index}
              className="list-group-item list-group-item-action ps-5 px-2 projectlist-item"
              onClick={() => changeBaseLayer(baseLayer.name)}
            >
              {t(baseLayer.name)}
              <OverlayTrigger placement="right" delay={{ show: 50, hide: 500 }} overlay={LayerInfo({ baseLayer })}>
                <button className="button position-absolute end-0 projectlist-item">
                  <span className="material-icons-outlined">info</span>
                </button>
              </OverlayTrigger>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};

export default MainMenuBaseLayerPanel;
