import * as React from 'react';
import { ReactNode, useEffect, useState } from 'react';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useTranslation } from 'react-i18next';

import OlCollection from 'ol/Collection';
import OlFeature from 'ol/Feature';
import OlMap from 'ol/Map';
import OlMapBrowserEvent from 'ol/MapBrowserEvent';
import { unByKey } from 'ol/Observable';
import Overlay from 'ol/Overlay';
import View from 'ol/View';
import { Coordinate } from 'ol/coordinate';
import { EventsKey } from 'ol/events';
import * as OlEventConditions from 'ol/events/condition';
import { LineString, MultiLineString, MultiPolygon, Geometry as OlGeometry, Polygon } from 'ol/geom';
import OlInteractionDraw, { DrawEvent as OlDrawEvent, Options as OlDrawOptions, createBox } from 'ol/interaction/Draw';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import RenderFeature from 'ol/render/Feature';
import { OSM, Vector as VectorSource } from 'ol/source';
import { getArea, getLength } from 'ol/sphere';
import { Circle as CircleStyle, Fill, Text as OlStyleText, RegularShape, Stroke } from 'ol/style';
import OlStyle, { StyleLike } from 'ol/style/Style';

import useMap from '../app/useMap';
import { DigitizeUtil } from '../utils/DigitizeUtil';

type DrawType = 'Point' | 'LineString' | 'Polygon' | 'Circle' | 'Rectangle' | 'Text' | undefined;
type textStyleKeys = 'normal' | 'bold' | 'italic' | 'bold-italic';
interface pointType {
  type: string;
  points: number;
  label: string;
  radius: number;
  angle: number;
}
const pointTypes: pointType[] = [
  { type: 'Circle', points: 64, label: '○', radius: 5, angle: 0 },
  { type: 'Star', points: 5, label: '*', radius: 5, angle: 0 },
  { type: 'Triangle', points: 3, label: '▲', radius: 5, angle: 0 },
  { type: 'Square', points: 4, label: '■', radius: 5, angle: 0 },
  { type: 'Rectangle', points: 4, label: '□', radius: 5, angle: 0 },
  { type: 'Stacked', points: 4, label: '△', radius: 5, angle: 0 },
  { type: 'Diamond', points: 4, label: '◇', radius: 5, angle: 0 },
  { type: 'X', points: 4, label: 'X', radius: 5, angle: 0 },
  { type: 'Cross', points: 4, label: '+', radius: 5, angle: 0 },
];
const colors = [
  { color: 'black', colorValue: '#000000' },
  { color: 'yellow', colorValue: '#FFFF00' },
  { color: 'orange', colorValue: '#FFA500' },
  { color: 'red', colorValue: '#FF0000' },
  { color: 'purple', colorValue: '#800080' },
  { color: 'blue', colorValue: '#0000FF' },
  { color: 'darkgreen', colorValue: '#006400' },
  { color: 'grey', colorValue: '#808080' },
];
const pointSizes = [
  { sizeType: 'Small', size: 7 },
  { sizeType: 'Medium', size: 14 },
  { sizeType: 'Large', size: 21 },
];
const lineTypes = [
  { lineTypeId: 'line', lineLength: 15, lineSpace: 0, lineType: '_____' },
  { lineTypeId: 'dash', lineLength: 15, lineSpace: 15, lineType: '_ _ _ _' },
  { lineTypeId: 'dot', lineLength: 2, lineSpace: 15, lineType: '.......' },
];
const lineWidthSizes = [
  { lineTypeId: 1, lineWidth: 2, sizeType: 'S' },
  { lineTypeId: 2, lineWidth: 4, sizeType: 'M' },
  { lineTypeId: 3, lineWidth: 6, sizeType: 'L' },
  { lineTypeId: 4, lineWidth: 8, sizeType: 'XL' },
];
const polygonOpacities = [
  { opacityType: '0%', opacityValue: 0 },
  { opacityType: '25%', opacityValue: 25 },
  { opacityType: '50%', opacityValue: 50 },
  { opacityType: '75%', opacityValue: 75 },
  { opacityType: '100%', opacityValue: 100 },
];
const textHightSizes = [
  { textType: 'Small', textHight: 10 },
  { textType: 'Medium', textHight: 15 },
  { textType: 'Large', textHight: 18 },
];

const DrawMeasure = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [digitizeTextFeature, setDigitizeTextFeature] = useState<OlFeature<OlGeometry> | null>(null);
  const [drawType, setDrawType] = useState<DrawType>();
  //const [drawStyle, setDrawStyle] = useState<StyleLike>();
  const [color, setColor] = useState<string>('#000000');
  const [pointSize, setPointSize] = useState<number>(7);
  const [pointType, setPointType] = useState<pointType>({
    type: 'Circle',
    points: 64,
    label: '○',
    radius: 5,
    angle: 0,
  });
  const [lineType, setLineType] = useState<{
    lineTypeId: string;
    lineLength: number;
    lineSpace: number;
    lineType: string;
  }>({ lineTypeId: 'line', lineLength: 15, lineSpace: 0, lineType: '_____' });
  const map = useMap();
  let sketch: OlFeature<OlGeometry> | null = null;

  const defaultDigitizeStyleFunction = (feature: OlFeature<OlGeometry> | RenderFeature): OlStyle | undefined => {
    const geom = feature.getGeometry();
    if (!geom) {
      return undefined;
    }
    switch (geom.getType()) {
      case 'MultiPoint':
      case 'Point': {
        return new OlStyle({
          image: new RegularShape({
            fill: new Fill({
              color: color ?? DigitizeUtil.DEFAULT_FILL_COLOR,
            }),
            radius: pointSize,
            points: pointType.points,
            angle: pointType.angle,
          }),
        });
      }
      case 'MultiLineString':
      case 'LineString': {
        return new OlStyle({
          stroke: new Stroke({
            color: color ?? DigitizeUtil.DEFAULT_STROKE_COLOR,
            width: 2,
          }),
        });
      }
      case 'MultiPolygon':
      case 'Polygon':
      case 'Circle': {
        return new OlStyle({
          fill: new Fill({
            color: color ?? DigitizeUtil.DEFAULT_FILL_COLOR,
          }),
          stroke: new Stroke({
            color: color ?? DigitizeUtil.DEFAULT_STROKE_COLOR,
            width: 2,
          }),
        });
      }
      default:
        return undefined;
    }
  };
  useEffect(() => {
    if (!map) return;
    if (!drawType) return;

    const drawSource = new VectorSource();
    const drawLayer = new VectorLayer({
      source: drawSource,
      style: new OlStyle({
        fill: new Fill({
          color: '#FF0000',
        }),
        stroke: new Stroke({
          color: '#FF0000',
          width: 2,
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: '#FF0000',
          }),
        }),
      }),
    });
    map.addLayer(drawLayer);
    drawLayer.setStyle(defaultDigitizeStyleFunction);

    let type: 'Point' | 'Circle' | 'LineString' | 'Polygon';
    let isLabel = false;

    if (drawType === 'Rectangle') {
      type = 'Circle';
    } else if (drawType === 'Text') {
      type = 'Point';
      isLabel = true;
    } else {
      type = drawType;
    }

    map.on('pointermove', pointerMoveHandler);
    let geometryFunction;

    const drawInteraction = new OlInteractionDraw({
      source: drawSource,
      type: type,
      geometryFunction: geometryFunction,
      style: defaultDigitizeStyleFunction,
      freehandCondition: OlEventConditions.never,
      stopClick: true,
    });

    drawInteraction.set('name', `react-geo-draw-interaction-${drawType}`);
    //drawInteraction.setActive(false);

    let key: EventsKey;
    drawInteraction.on('drawstart', function (evt: any) {
      // set sketch
      sketch = evt.feature;
      if (!sketch) return;
    });

    drawInteraction.on('drawend', function () {
      // unset sketch
      sketch = null;
    });

    if (drawType === 'Text') {
      key = drawInteraction.on('drawend', evt => {
        evt.feature.set('isLabel', true);
        setDigitizeTextFeature(evt.feature);
      });
    }
    map.addInteraction(drawInteraction);
    return () => {
      unByKey(key);
      map.removeInteraction(drawInteraction);
    };
  }, [drawType, map, color, pointSize, pointType, lineType]);

  const pointerMoveHandler = function (evt: any) {
    if (evt.dragging) {
      return;
    }
  };
  const handleChange = (eventKey: any) => {
    setDrawType(eventKey);
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
          <Tabs defaultActiveKey="Point" id="drawtabs" className="" onSelect={handleChange}>
            <Tab eventKey="Point" title={t('point_txt')}>
              <div className="row">
                <span className="title-text">{t('pointType_txt')}</span>
                <div className="hstack gap-1">
                  {pointTypes.map((item, index) => {
                    return (
                      <button key={index} className="border" onClick={() => setPointType(item)}>
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="row">
                <span className="title-text">{t('size_txt')}</span>
                <div className="hstack gap-1">
                  {pointSizes.map((item: any, index: any) => {
                    return (
                      <button className="border" key={index} onClick={() => setPointSize(item.size)}>
                        {t(item.sizeType)}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="row">
                <div className="title-text">{t('color_txt')}</div>
                <div className="hstack gap-1">
                  {colors.map((item: any, index: any) => {
                    return (
                      <button className="border" key={index} onClick={() => setColor(item.colorValue)}>
                        <div className="color-box" style={{ backgroundColor: item.color, border: 'none' }}></div>
                      </button>
                    );
                  })}
                </div>
              </div>
              <button className="button button__blue--secondary button--xs">{t('remove_txt')}</button>
              <button className="button button__green--primary button--xs">{t('change_txt')}</button>
            </Tab>
            <Tab eventKey="LineString" title={t('line_txt')}>
              <div className="row">
                <div className="title-text">{t('lineType_txt')}</div>
                <div className="hstack gap-1">
                  {lineTypes.map((item: any, index: any) => {
                    return (
                      <button className="border" key={index} onClick={() => setLineType(item)}>
                        {item.lineType}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="row">
                <div className="title-text">{t('width_txt')}</div>
                <div className="hstack gap-1">
                  {lineWidthSizes.map((item: any, index: any) => {
                    return (
                      <button className="border" key={index} onClick={() => setLineType(item)}>
                        {item.sizeType}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="row">
                <div className="title-text">{t('color_txt')}</div>
                <div className="hstack gap-1">
                  {colors.map((item: any, index: any) => {
                    return (
                      <button className="border" key={index} onClick={() => setColor(item.colorValue)}>
                        <div className="color-box" style={{ backgroundColor: item.color, border: 'none' }}></div>
                      </button>
                    );
                  })}
                </div>
              </div>
              <button className="button button__blue--secondary button--xs">{t('remove_txt')}</button>
              <button className="button button__green--primary button--xs">{t('change_txt')}</button>
            </Tab>
            <Tab eventKey="Polygon" title={t('polygon_txt')}>
              <div className="row">
                <div className="title-text">{t('opacity_txt')}</div>
                <div className="hstack gap-1">
                  {polygonOpacities.map((item: any, index: any) => {
                    return (
                      <button className="border" key={index} onClick={() => setLineType(item)}>
                        {item.opacityType}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="row">
                <div className="title-text">{t('color_txt')}</div>
                <div className="hstack gap-1">
                  {colors.map((item: any, index: any) => {
                    return (
                      <button className="border" key={index} onClick={() => setColor(item.colorValue)}>
                        <div className="color-box" style={{ backgroundColor: item.color, border: 'none' }}></div>
                      </button>
                    );
                  })}
                </div>
              </div>
              <button className="button button__blue--secondary button--xs">{t('remove_txt')}</button>
              <button className="button button__green--primary button--xs">{t('change_txt')}</button>
              <button className="button button__green--primary button--xs" onClick={() => setDrawType('Polygon')}>
                {t('polygon_txt')}
              </button>
            </Tab>
            <Tab eventKey="Text" title={t('text_txt')}>
              <label htmlFor="text_txt_label">{t('text_txt_label')}</label>
              <input id="text_txt_label" type="text" className="inputField" placeholder={t('text_label_placeholder')} />
              {t('size_txt')}
              <div className="row">
                <div className="title-text">{t('color_txt')}</div>
                <div className="hstack gap-1">
                  {colors.map((item: any, index: any) => {
                    return (
                      <button className="border" key={index} onClick={() => setColor(item.colorValue)}>
                        <div className="color-box" style={{ backgroundColor: item.color, border: 'none' }}></div>
                      </button>
                    );
                  })}
                </div>
              </div>
              <button className="button button__blue--secondary button--xs">{t('remove_txt')}</button>
              <button className="button button__green--primary button--xs">{t('change_txt')}</button>
            </Tab>
          </Tabs>
        </div>
      ) : null}
    </>
  );
};

export default DrawMeasure;
