import { EventsKey } from 'ol/events';
import Map from 'ol/Map';
import { unByKey } from 'ol/Observable';
import { setSsrResult } from '../../components/search/searchSlice';
import { useAppDispatch, useEventDispatch } from '../../index';
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
