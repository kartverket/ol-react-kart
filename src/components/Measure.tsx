import * as React from 'react';
import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import OlFeature from 'ol/Feature';
import { unByKey } from 'ol/Observable';
import Overlay from 'ol/Overlay';
import { LineString, Polygon } from 'ol/geom';
import Geometry from 'ol/geom/Geometry';
import OlInteractionDraw, { createBox } from 'ol/interaction/Draw';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { getArea, getLength } from 'ol/sphere';
import { Circle as CircleStyle, Fill, Stroke } from 'ol/style';
import OlStyle from 'ol/style/Style';

import useMap from '../app/useMap';

type DrawType = 'Point' | 'LineString' | 'Polygon' | 'Circle' | 'Rectangle' | 'Text' | undefined;

const DEFAULT_FILL_COLOR = 'rgba(0, 183, 43, 0.5)';
const DEFAULT_STROKE_COLOR = 'rgba(0, 183, 43, 0.8)';
const FILL_COLOR = 'rgba(255, 255, 255, 0.2)';
const STROKE_COLOR = '#ffcc33';

const DrawMeasure = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [drawType, setDrawType] = useState<DrawType>();

  const map = useMap();

  let sketch: OlFeature<Geometry> | null = null;
  let helpTooltipElement: HTMLDivElement | null = null;
  let helpTooltip: Overlay | null = null;
  let measureTooltipElement: HTMLDivElement | null = null;
  let measureTooltip: Overlay | null = null;

  const continuePolygonMsg = t('continue_measure');
  const continueLineMsg = 'Click to continue drawing the line';

  useEffect(() => {
    if (!map || !drawType) return;
    const source = new VectorSource();
    const vector = new VectorLayer({
      source: source,
      style: new OlStyle({
        fill: new Fill({
          color: FILL_COLOR,
        }),
        stroke: new Stroke({
          color: STROKE_COLOR,
          width: 2,
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: STROKE_COLOR,
          }),
        }),
      }),
    });
    map.addLayer(vector);

    let geometryFunction;
    let type: 'Point' | 'Circle' | 'LineString' | 'Polygon';
    if (drawType === 'Rectangle') {
      geometryFunction = createBox();
      type = 'Circle';
    } else if (drawType === 'Text') {
      type = 'Point';
    } else {
      type = drawType;
    }

    const draw = new OlInteractionDraw({
      source: source,
      type: type,
      style: defaultDigitizeStyleFunction(type),
    });
    map.addInteraction(draw);

    const formatLength = function (line: LineString) {
      const length = getLength(line);
      let output;
      if (length > 100) {
        output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
      } else {
        output = Math.round(length * 100) / 100 + ' ' + 'm';
      }
      return output;
    };
    const formatArea = function (polygon: Polygon) {
      const area = getArea(polygon);
      let output;
      if (area > 10000) {
        output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>';
      } else {
        output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>';
      }
      return output;
    };

    createMeasureTooltip();
    createHelpTooltip();

    let listener: any;
    draw.on('drawstart', function (evt: any) {
      // set sketch
      sketch = evt.feature;
      if (!sketch) return;
      /** @type {import("../src/ol/coordinate.js").Coordinate|undefined} */
      let tooltipCoord = evt.coordinate;

      listener = sketch.getGeometry()?.on('change', function (evt: any) {
        if (!measureTooltipElement) return;
        if (!measureTooltip) return;
        const geom = evt.target;
        let output;
        if (geom instanceof Polygon) {
          output = formatArea(geom);
          tooltipCoord = geom.getInteriorPoint().getCoordinates();
        } else if (geom instanceof LineString) {
          output = formatLength(geom);
          tooltipCoord = geom.getLastCoordinate();
        }
        measureTooltipElement.innerHTML = output ? output : '';
        measureTooltip.setPosition(tooltipCoord);
      });
    });

    draw.on('drawend', function () {
      if (!measureTooltipElement) return;
      if (!measureTooltip) return;
      measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
      measureTooltip.setOffset([0, -7]);
      // unset sketch
      sketch = null;
      createHelpTooltip();
      createMeasureTooltip();
      unByKey(listener);
    });

    map.on('pointermove', pointerMoveHandler);

    return () => {
      map.removeInteraction(draw);
    };
  }, [map, drawType]);

  const defaultDigitizeStyleFunction = (type: string) => {
    if (!type) {
      return undefined;
    }
    switch (type) {
      case 'MultiPoint':
      case 'Point': {
        return new OlStyle({
          image: new CircleStyle({
            radius: 7,
            fill: new Fill({
              color: DEFAULT_FILL_COLOR,
            }),
            stroke: new Stroke({
              color: DEFAULT_STROKE_COLOR,
            }),
          }),
        });
      }
      case 'MultiLineString':
      case 'LineString': {
        return new OlStyle({
          stroke: new Stroke({
            color: DEFAULT_STROKE_COLOR,
            width: 2,
          }),
        });
      }
      case 'MultiPolygon':
      case 'Polygon':
      case 'Circle': {
        return new OlStyle({
          fill: new Fill({
            color: DEFAULT_FILL_COLOR,
          }),
          stroke: new Stroke({
            color: DEFAULT_STROKE_COLOR,
            width: 2,
          }),
        });
      }
      default:
        return undefined;
    }
  };

  const createHelpTooltip = () => {
    if (!map) return;
    if (helpTooltipElement) {
      map.removeOverlay(helpTooltip as Overlay);
      return;
    }
    helpTooltipElement = document.createElement('div');
    helpTooltipElement.className = 'ol-tooltip hidden';
    helpTooltip = new Overlay({
      element: helpTooltipElement,
      offset: [15, 0],
      positioning: 'center-left',
    });
    map.addOverlay(helpTooltip);
  };

  const createMeasureTooltip = () => {
    if (!map) return;
    if (measureTooltipElement) {
      measureTooltipElement = null;
      return;
    }
    measureTooltipElement = document.createElement('div');
    measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
    measureTooltip = new Overlay({
      element: measureTooltipElement,
      offset: [0, -15],
      positioning: 'bottom-center',
      stopEvent: false,
      insertFirst: false,
    });
    map.addOverlay(measureTooltip);
  };
  const pointerMoveHandler = function (evt: any) {
    if (!helpTooltipElement) return;
    if (!helpTooltip) return;
    if (evt.dragging) {
      return;
    }
    let helpMsg = t('start_measure');

    if (sketch) {
      const geom = sketch.getGeometry();
      if (geom instanceof Polygon) {
        helpMsg = t('continue_measure');
      } else if (geom instanceof LineString) {
        helpMsg = continueLineMsg;
      }
    }
    helpTooltipElement.innerHTML = helpMsg;
    helpTooltip.setPosition(evt.coordinate);

    helpTooltipElement.classList.remove('hidden');
  };

  return (
    <>
      <div
        className="d-flex expandBtn"
        onClick={() => {
          setShow(!show);
        }}
      >
        {t('measure')}
      </div>
      {show ? (
        <div className="expandContent container">
          <button className="button button__green--primary button--xs" onClick={() => setDrawType('LineString')}>
            {t('linje')}
          </button>
          <button className="button button__green--primary button--xs" onClick={() => setDrawType('Polygon')}>
            {t('flate')}
          </button>
        </div>
      ) : null}
    </>
  );
};

export default DrawMeasure;
