import * as React from 'react';
import { ReactNode, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import OlCollection from 'ol/Collection';
import OlFeature from 'ol/Feature';
import Map from 'ol/Map';
import OlMap from 'ol/Map';
import OlMapBrowserEvent from 'ol/MapBrowserEvent';
import { unByKey } from 'ol/Observable';
import Overlay from 'ol/Overlay';
import OlOverlay from 'ol/Overlay';
import View from 'ol/View';
import { Coordinate } from 'ol/coordinate';
import { EventsKey } from 'ol/events';
import * as OlEventConditions from 'ol/events/condition';
import { LineString, Polygon } from 'ol/geom';
import OlGeometry from 'ol/geom/Geometry';
import Geometry from 'ol/geom/Geometry';
import OlGeomLineString from 'ol/geom/LineString';
import OlMultiLineString from 'ol/geom/MultiLineString';
import OlMultiPolygon from 'ol/geom/MultiPolygon';
import OlGeomPolygon from 'ol/geom/Polygon';
import OlInteractionDraw, { DrawEvent as OlDrawEvent, Options as OlDrawOptions, createBox } from 'ol/interaction/Draw';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import OlVectorLayer from 'ol/layer/Vector';
import OlLayerVector from 'ol/layer/Vector';
import { OSM, Vector as VectorSource } from 'ol/source';
import OlVectorSource from 'ol/source/Vector';
import OlSourceVector from 'ol/source/Vector';
import { getArea, getLength } from 'ol/sphere';
import { Circle as CircleStyle, Fill, Stroke } from 'ol/style';
import OlStyleCircle from 'ol/style/Circle';
import OlStyleFill from 'ol/style/Fill';
import OlStyleStroke from 'ol/style/Stroke';
import OlStyle, { StyleLike } from 'ol/style/Style';
import OlStyleText from 'ol/style/Text';

import useMap from '../app/useMap';
import { DigitizeUtil } from '../utils/DigitizeUtil';

type DrawType = 'Point' | 'LineString' | 'Polygon' | 'Circle' | 'Rectangle' | 'Text' | undefined;

const DrawMeasure = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  const [drawInteraction, setDrawInteraction] = useState<OlInteractionDraw>();
  const [layer, setLayer] = useState<OlVectorLayer<OlVectorSource<OlGeometry>> | null>(null);
  const [digitizeTextFeature, setDigitizeTextFeature] = useState<OlFeature<OlGeometry> | null>(null);
  const [drawType, setDrawType] = useState<DrawType>();
  const [drawStyle, setDrawStyle] = useState<StyleLike>();
  const [drawInteractionConfig, setDrawInteractionConfig] = useState<OlDrawOptions>();
  const [digitizeLayer, setDigitizeLayer] = useState<OlLayerVector<OlSourceVector<OlGeometry>> | null>(null);
  const map = useMap();

  let draw;
  let sketch: OlFeature<OlGeometry> | null = null;

  useEffect(() => {
    if (!map) return;
    createOlMeasureControl(map);
    map.on('pointermove', pointerMoveHandler);
  }, [map, drawType]);

  const defaultDigitizeStyleFunction = (type: string) => {
    if (!type) {
      return undefined;
    }
    switch (type) {
      case 'MultiPoint':
      case 'Point': {
        return new OlStyle({
          image: new OlStyleCircle({
            radius: 7,
            fill: new OlStyleFill({
              color: DigitizeUtil.DEFAULT_FILL_COLOR,
            }),
            stroke: new OlStyleStroke({
              color: DigitizeUtil.DEFAULT_STROKE_COLOR,
            }),
          }),
        });
      }
      case 'MultiLineString':
      case 'LineString': {
        return new OlStyle({
          stroke: new OlStyleStroke({
            color: DigitizeUtil.DEFAULT_STROKE_COLOR,
            width: 2,
          }),
        });
      }
      case 'MultiPolygon':
      case 'Polygon':
      case 'Circle': {
        return new OlStyle({
          fill: new OlStyleFill({
            color: DigitizeUtil.DEFAULT_FILL_COLOR,
          }),
          stroke: new OlStyleStroke({
            color: DigitizeUtil.DEFAULT_STROKE_COLOR,
            width: 2,
          }),
        });
      }
      default:
        return undefined;
    }
  };

  const createOlMeasureControl = (map: Map) => {
    if (!drawType) return;
    console.log('createOlMeasureControl');
    const source = new VectorSource();
    const vector = new VectorLayer({
      source: source,
      style: new OlStyle({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new Stroke({
          color: '#ffcc33',
          width: 2,
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: '#ffcc33',
          }),
        }),
      }),
    });
    map.addLayer(vector);

    let type: 'Point' | 'Circle' | 'LineString' | 'Polygon';
    if (drawType === 'Rectangle') {
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

    draw.on('drawstart', function (evt: any) {
      // set sketch
      sketch = evt.feature;
      if (!sketch) return;
    });

    draw.on('drawend', function () {
      // unset sketch
      sketch = null;
    });
  };
  useEffect(() => {
    if (!map) {
      return;
    }

    if (digitizeLayer) {
      setLayer(digitizeLayer);
    } else {
      setLayer(DigitizeUtil.getDigitizeLayer(map));
    }
  }, [map, digitizeLayer]);
  useEffect(() => {
    if (!map || !layer || !drawType) {
      return undefined;
    }
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

    const newInteraction = new OlInteractionDraw({
      source: layer.getSource() || undefined,
      type: type,
      geometryFunction: geometryFunction,
      style: drawStyle ?? DigitizeUtil.defaultDigitizeStyleFunction,
      freehandCondition: OlEventConditions.never,
      ...(drawInteractionConfig ?? {}),
    });

    newInteraction.set('name', `react-geo-draw-interaction-${drawType}`);

    newInteraction.setActive(false);

    map.addInteraction(newInteraction);

    setDrawInteraction(newInteraction);

    let key: EventsKey;

    if (drawType === 'Text') {
      key = newInteraction.on('drawend', evt => {
        evt.feature.set('isLabel', true);
        setDigitizeTextFeature(evt.feature);
      });
    }

    return () => {
      unByKey(key);
      map.removeInteraction(newInteraction);
    };
  }, [drawType, layer, drawInteractionConfig, drawStyle, map]);

  const pointerMoveHandler = function (evt: any) {
    if (evt.dragging) {
      return;
    }
  };

  return (
    <>
      <div
        className="d-flex expandBtn"
        onClick={() => {
          setShow(!show);
        }}
      >
        {t('Draw_title')}
      </div>
      {show ? (
        <div className="expandContent container">
          <button className="button button__green--primary button--xs" onClick={() => setDrawType('Point')}>
            {t('punkt')}
          </button>
          <button className="button button__green--primary button--xs" onClick={() => setDrawType('LineString')}>
            {t('linje')}
          </button>
          <button className="button button__green--primary button--xs" onClick={() => setDrawType('Polygon')}>
            {t('flate')}
          </button>
          <button className="button button__green--primary button--xs" onClick={() => setDrawType('Text')}>
            {t('tekst')}
          </button>
        </div>
      ) : null}
    </>
  );
};

export default DrawMeasure;
