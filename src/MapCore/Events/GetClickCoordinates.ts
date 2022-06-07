import { unByKey } from 'ol/Observable';
import Map from 'ol/Map';
import { EventsKey } from 'ol/events';
import { setClickCoordinates } from './getClickCoordinatesSlice';
import { useEventDispatch, useAppDispatch } from '../../index';
import { setResult } from '../../components/search/searchSlice';



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
              appDispatch(setResult({}));
              eventDispatch(setClickCoordinates({
                type: evt.type,
                dragging: evt.dragging,
                zoom: evt.map.getView().getZoom(),
                epsg: evt.map.getView().getProjection().getCode(),
                coordinate: evt.coordinate
              }));
              
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
    }
  }



}
