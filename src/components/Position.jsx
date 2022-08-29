import OlMousePositionControl from 'ol/control/MousePosition';
import { format } from 'ol/coordinate.js';
import React, { useEffect, useState } from 'react';
import style from './Position.module.css';

const Position = () => {
  const [projection, setProjectionString] = useState('EPSG:25833');

  useEffect(() => {
    createOlMousePositionControl(window.olMap);
  });

  const createOlMousePositionControl = map => {
    const existingControls = map.getControls();
    let mousePositionControl = existingControls.getArray().find(c => c instanceof OlMousePositionControl);
    setProjectionString(map.getView().getProjection().getCode());

    const customFormat = coordinate => format(coordinate, 'EU89 UTM33  {y} N, {x} Ø');

    if (!mousePositionControl) {
      const options = {
        name: 'ol-mouse-position',
        coordinateFormat: customFormat,
        target: document.getElementById('mouse-position'),
        projection: projection,
      };
      mousePositionControl = new OlMousePositionControl(options);
      map.addControl(mousePositionControl);
    }
  };

  return (
    <>
      <div className={style.mouseposition} id="mouse-position" />
    </>
  );
};

export default Position;
