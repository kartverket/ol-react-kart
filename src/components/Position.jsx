import React, { useState, useEffect } from "react"
import style from './Position.module.css'
import { format } from 'ol/coordinate.js'
import OlMousePositionControl from 'ol/control/MousePosition'

const Position = () => {
  const [projection, setProjectionString] = useState('EPSG:25833')

  useEffect(() => {
    if (window.olMap !== {}) {
      createOlMousePositionControl(window.olMap)
    }
  })

  /**
   * Creates and adds the mouse position control to the map.
   *
   * @param {OlMap} The OpenLayers map
   */
  const createOlMousePositionControl = (map) => {
    const existingControls = map.getControls()
    const mousePositionControl = existingControls.getArray().find((c) => c instanceof OlMousePositionControl)
    setProjectionString(map.getView().getProjection().getCode())

    const customFormat = (coordinate) => format(coordinate, 'EU89 UTM33 {y}N, {x}Ø')

    if (!mousePositionControl) {
      const options = {
        name: 'ol-mouse-position',
        coordinateFormat: customFormat,
        target: document.getElementById('mouse-position'),
        //undefinedHTML: '&nbsp;',
        projection: projection
      }
      const mousePositionControl = new OlMousePositionControl(options)
      map.addControl(mousePositionControl)
    }
  }

  return (
    <div className={ style.mouseposition }>
      <div id="mouse-position" />
    </div>
  )
}

export default Position
