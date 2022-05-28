import { unByKey } from 'ol/Observable';
import Map from 'ol/Map';
import { EventsKey } from 'ol/events';
import EventHandler from './EventHandler';
import type { EventStoreDispatch } from './Event/eventStore';
import { mapMoveEnd } from '../Events/mapMoveSlice';


export const MapMoveEnd = function () {

  let infoKey: EventsKey;
  let isActive = false;

  return {
    activate(map: Map, dispatch: EventStoreDispatch) {
      if (!isActive) {
        if (map) {
          infoKey = map.on('moveend', function (evt) {
            if (evt && map.getView()) {
              EventHandler.setMapMoveEnd('MoveEnd: ' + map.getView().getCenter()?.join(','));
              dispatch(mapMoveEnd({
                coordinates: String(map.getView().getCenter()?.join(','))
              }))
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
        EventHandler.setMapMoveEnd('');
        isActive = false;
      }
    }
  }



}
