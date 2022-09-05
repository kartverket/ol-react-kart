import { Fill, RegularShape, Stroke, Style, Text } from 'ol/style';
import { StyleLike } from 'ol/style/Style';

import { IFill, IStroke, IStyle } from '../Models/config-model';

function createFillStyle(style: IFill): Fill {
  return new Fill({
    color: style.color,
  });
}
function createStrokeStyle(style: IStroke): Stroke {
  return new Stroke({
    color: style.color,
    width: style.width,
  });
}

export function createStyle(style: IStyle): StyleLike {
  const olStyle = new Style({
    fill: style.fill ? createFillStyle(style.fill) : undefined,
    image: style.regularshape
      ? new RegularShape({
          fill: createFillStyle(style.regularshape.fill),
          points: style.regularshape.points,
          radius: style.regularshape.radius,
        })
      : undefined,
    stroke: style.stroke ? createStrokeStyle(style.stroke) : undefined,
    text: style.text
      ? new Text({
          text: style.text.text,
          scale: style.text.scale,
          fill: createFillStyle(style.text.fill),
          stroke: createStrokeStyle(style.text.stroke),
        })
      : undefined,
  });

  return olStyle;
}
