import Map from 'ol/Map';
import { unByKey } from 'ol/Observable';
import { EventsKey } from 'ol/events';

import { mapMoveEnd } from '../Events/mapMoveSlice';
import type { EventStoreDispatch } from './Event/eventStore';

export const MapMoveEnd = function (dispatch: EventStoreDispatch) {
  let infoKey: EventsKey;
  let isActive = false;

  return {
    activate(map: Map) {
      if (!isActive) {
        if (map) {
          infoKey = map.on('moveend', function (evt) {
            if (evt && map.getView()) {
              dispatch(
                mapMoveEnd({
                  coordinates: String(map.getView().getCenter()?.join(',')),
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
