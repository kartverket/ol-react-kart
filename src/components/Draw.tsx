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
import { Geometry, LineString, MultiLineString, Polygon, MultiPolygon } from 'ol/geom';
import OlInteractionDraw, { DrawEvent as OlDrawEvent, Options as OlDrawOptions, createBox } from 'ol/interaction/Draw';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { getArea, getLength } from 'ol/sphere';
import { Circle as CircleStyle, Fill, RegularShape, Stroke, Text as OlStyleText } from 'ol/style';
import OlStyle, { StyleLike } from 'ol/style/Style';

import useMap from '../app/useMap';
import { DigitizeUtil } from '../utils/DigitizeUtil';

type DrawType = 'Point' | 'LineString' | 'Polygon' | 'Circle' | 'Rectangle' | 'Text' | undefined;
type textStyleKeys = 'normal' | 'bold' | 'italic' | 'bold-italic';
interface pointType {
  type: string;
  value: number;
  label: string;
};
const pointTypes:pointType[] = [
  { type: 'Circle', value: 64, label: '○' },
  { type: 'Star', value: 5, label: '*' },
  { type: 'Triangle', value: 3, label: '▲' },
  { type: 'Square', value: 4, label: '■' },
  { type: 'Rectangle', value: 4, label: '□' },
  { type: 'Stacked', value: 4, label: '△' },
  { type: 'Diamond', value: 4, label: '◇' },
  { type: 'X', value: 4, label: 'X' },
  { type: 'Cross', value: 4, label: '+' },
]
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
  { sizeType: 'Small', size: 7, },
  { sizeType: 'Medium', size: 14, },
  { sizeType: 'Large', size: 21, },
];
const lineTypes = [
  { lineTypeId: 'line', lineLength: 15, lineSpace: 0, lineType: '_____', },
  { lineTypeId: 'dash', lineLength: 15, lineSpace: 15, lineType: '_ _ _ _', },
  { lineTypeId: 'dot', lineLength: 2, lineSpace: 15, lineType: '.......', },
];
const lineWidthSizes = [
  { lineTypeId: 1, lineWidth: 2, sizeType: 'Small', },
  { lineTypeId: 2, lineWidth: 4, sizeType: 'Medium', },
  { lineTypeId: 3, lineWidth: 6, sizeType: 'Large', },
  { lineTypeId: 4, lineWidth: 8, sizeType: 'Extra Large', },
];
const polygonOpacities = [
  { opacityType: '0%', opacityValue: 0, },
  { opacityType: '25%', opacityValue: 25, },
  { opacityType: '50%', opacityValue: 50, },
  { opacityType: '75%', opacityValue: 75, },
  { opacityType: '100%', opacityValue: 100, },
];
const textHightSizes = [
  { textType: 'Small', textHight: 10, },
  { textType: 'Medium', textHight: 15, },
  { textType: 'Large', textHight: 18, },
];

const DrawMeasure = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [drawInteraction, setDrawInteraction] = useState<OlInteractionDraw>();
  const [layer, setLayer] = useState<VectorLayer<VectorSource<Geometry>> | null>(null);
  const [digitizeTextFeature, setDigitizeTextFeature] = useState<OlFeature<Geometry> | null>(null);
  const [drawType, setDrawType] = useState<DrawType>();
  const [drawStyle, setDrawStyle] = useState<StyleLike>();
  const [drawInteractionConfig, setDrawInteractionConfig] = useState<OlDrawOptions>();
  const [digitizeLayer, setDigitizeLayer] = useState<VectorLayer<VectorSource<Geometry>> | null>(null);
  const [color, setColor] = useState<string>('#000000');
  const [pointSize, setPointSize] = useState<number>(7);
  const [pointType, setPointType] = useState<pointType>({ type: 'Circle', value: 64, label: '○' });
  const map = useMap();

  let draw;
  let sketch: OlFeature<Geometry> | null = null;

  useEffect(() => {
    if (!map) return;
    if (!drawType) return;
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
    let isLabel = false;

    if (drawType === 'Rectangle') {
      type = 'Circle';
    } else if (drawType === 'Text') {
      type = 'Point';
      isLabel = true;
    } else {
      type = drawType;
    }

    const draw = new OlInteractionDraw({
      source: source,
      type: type,
      style: defaultDigitizeStyleFunction(type),
      stopClick: true,
    });
    setDrawStyle(defaultDigitizeStyleFunction(type));
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
          image: new RegularShape({
            fill: new Fill({
              color: color,
            }),
            radius: pointSize,
            points: pointType.value,
          }),
        });
      }
      case 'MultiLineString':
      case 'LineString': {
        return new OlStyle({
          stroke: new Stroke({
            color: DigitizeUtil.DEFAULT_STROKE_COLOR,
            width: 2,
          }),
        });
      }
      case 'MultiPolygon':
      case 'Polygon':
      case 'Circle': {
        return new OlStyle({
          fill: new Fill({
            color: DigitizeUtil.DEFAULT_FILL_COLOR,
          }),
          stroke: new Stroke({
            color: DigitizeUtil.DEFAULT_STROKE_COLOR,
            width: 2,
          }),
        });
      }
      default:
        return undefined;
    }
  };
  const switchSymbol = (symbol: any) => {
    if (!map) return;
  };
  const setSelectedPointStyle = (featureStyle: any, selectedColor: any) => {
    if (featureStyle.getText()) {
      return [setSelectedTextStyle(featureStyle, selectedColor), featureStyle];
    } else {
      return [
        new OlStyle({
          image: new RegularShape({
            fill: new Fill({
              color: selectedColor,
            }),
            radius: featureStyle.getImage().getRadius() + 3,
            points: featureStyle.getImage().getPoints(),
          }),
        }),
        featureStyle,
      ];
    }
  };
  const setSelectedTextStyle = (featureStyle: any, selectedColor: any) => {
    return new OlStyle({
      text: new OlStyleText({
        font: featureStyle.getText().getFont(),
        text: featureStyle.getText().getText(),
        stroke: new Stroke({
          color: selectedColor,
          width: featureStyle.getText().getStroke().getWidth() + 5,
        }),
        fill: featureStyle.getText().getFill(),
      }),
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

    console.log('drawType', drawType);
    console.log('type', type);
    const newInteraction = new OlInteractionDraw({
      source: layer.getSource() || undefined,
      type: type,
      geometryFunction: geometryFunction,
      style: drawStyle,
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
  const handleChange = (e: any) => {
    console.log(e.target.value);
    setDrawType(e.target.value);
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
          <Tabs defaultActiveKey="point" id="drawtabs" className="" onChange={handleChange}>
            <Tab eventKey="point" title={t('point_txt')} >
              <div className="row">
                <span className="title-text">{t('pointType_txt')}</span>
                <div className="hstack gap-1">
                  {pointTypes.map((item, index) => {
                      return (
                        <button key={index} className="border" onClick={() => setPointType(item)}>{item.label}</button>
                      );
                    })
                  }
                </div>
              </div>
              <div className="row">
                <span className="title-text">{t('size_txt')}</span>
                <div className="hstack gap-1">
                  {pointSizes.map((item: any, index: any) => {
                    return (
                      <button className="border" key={index} onClick={() => setPointSize(item.size)}>{t(item.sizeType)}</button>
                    );
                  })}
                </div>
              </div>
              <div className="row">
                <div className="title-text">{t('color_txt')}</div>
                <div className="hstack gap-1">
                  {colors.map((item: any, index: any) => {
                    return (
                      <button className="border" key={index} onClick={() => setColor(item.colorValue)} >
                        <div className="color-box" style={{ backgroundColor: item.color, border: 'none' }}></div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button className="button button__blue--secondary button--xs">{t('remove_txt')}</button>
              <button className="button button__green--primary button--xs">{t('change_txt')}</button>

              <button className="button button__green--primary button--xs" onClick={() => setDrawType('Point')}>
                {t('point_txt')}
              </button>
            </Tab>
            <Tab eventKey="linestring" title={t('line_txt')}>
              <button className="button button__green--primary button--xs" onClick={() => setDrawType('LineString')}>
                {t('line_txt')}
              </button>
              {t('lineType_txt')}
              {t('width_txt')}
              {t('color_txt')}
              <button className="button button__blue--secondary button--xs">{t('remove_txt')}</button>
              <button className="button button__green--primary button--xs">{t('change_txt')}</button>
            </Tab>
            <Tab eventKey="polygon" title={t('polygon_txt')}>
              {t('opacity_txt')}
              {t('color_txt')}
              <button className="button button__blue--secondary button--xs">{t('remove_txt')}</button>
              <button className="button button__green--primary button--xs">{t('change_txt')}</button>
              <button className="button button__green--primary button--xs" onClick={() => setDrawType('Polygon')}>
                {t('polygon_txt')}
              </button>
            </Tab>
            <Tab eventKey="text" title={t('text_txt')}>
              <label htmlFor="text_txt_label">{t('text_txt_label')}</label>
              <input id="text_txt_label" type="text" className="inputField" placeholder={t('text_label_placeholder')} />
              {t('size_txt')}
              {t('color_txt')}

              <button className="button button__blue--secondary button--xs">{t('remove_txt')}</button>
              <button className="button button__green--primary button--xs">{t('change_txt')}</button>

              <button className="button button__green--primary button--xs" onClick={() => setDrawType('Text')}>
                {t('text_txt')}
              </button>
            </Tab>
          </Tabs>
        </div>
      ) : null}
    </>
  );
};

export default DrawMeasure;
