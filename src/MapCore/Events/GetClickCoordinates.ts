/* eslint-disable @typescript-eslint/ban-ts-comment */
import { EventsKey } from 'ol/events';
import Map from 'ol/Map';
import { unByKey } from 'ol/Observable';
import { setSsrResult } from '../../components/search/searchSlice';
import { useAppDispatch, useEventDispatch } from '../../index';
import { parseFeatureInfo } from '../../utils/FeatureUtil';
import { setClickCoordinates } from './getClickCoordinatesSlice';

export const GetClickCoordinates = function () {
  let infoKey: EventsKey;
  let isActive = false;
  const eventDispatch = useEventDispatch();
  const appDispatch = useAppDispatch();
  return {
    activate(map: Map) {
      if (!isActive) {
        if (map) {
          infoKey = map.on('singleclick', function (evt) {
            const layers = map.getLayers().getArray();
            layers.forEach(element => {
              // @ts-expect-error
              if (element.getSource().constructor.name === 'TileWMS') {
                // @ts-expect-error
                const url: string = element.getSource()
                  .getFeatureInfoUrl(evt.coordinate, map.getView().getResolution(), map.getView().getProjection(), {
                    INFO_FORMAT: 'text/plain',
                    // @ts-expect-error
                    QUERY_LAYERS: element.getSource().getParams().layers,
                  });
                /*
                const formats = element.getSource().getParams().info_formats;
                console.log(formats);
                let indexFormat = 0;
                if (formats.indexOf('text/plain') > 0) {
                  indexFormat = formats.indexOf('text/plain');
                } else if (formats.indexOf('text/xml') > 0) {
                  indexFormat = formats.indexOf('text/xml');
                } else if (formats.indexOf('application/vnd.ogc.gml') > 0) {
                  indexFormat = formats.indexOf('application/vnd.ogc.gml');
                } else if (formats.indexOf('application/json') > 0) {
                  indexFormat = formats.indexOf('application/json');
                } else if (formats.indexOf('text/html') === 0) {
                  indexFormat = 1;
                }
                */
                if (url) {
                  console.log('url', url);
                  fetch(url)
                    .then(response => response.text())
                    .then(data => {
                      console.log(data);
                      const parsedFeature = parseFeatureInfo(data, 'text/plain');
                      console.log('parsedFeature', parsedFeature);
                    })
                    .catch(error => {
                      console.error('Error:', error);
                    });
                }
              }
            });

            if (evt && evt.originalEvent && map.getView()) {
              appDispatch(setSsrResult({}));
              eventDispatch(
                setClickCoordinates({
                  type: evt.type,
                  dragging: evt.dragging,
                  zoom: evt.map.getView().getZoom(),
                  epsg: evt.map.getView().getProjection().getCode(),
                  coordinate: evt.coordinate,
                  center: evt.map.getView().getCenter(),
                  extent: evt.map.getView().calculateExtent(map.getSize()),
                }),
              );
            }
          });
        }
      }
      isActive = true;
    },

    deactivate(map: Map) {
      if (isActive) {
        if (map) {
          unByKey(infoKey);
          infoKey.type = '';
        }
        isActive = false;
      }
    },
  };
};
