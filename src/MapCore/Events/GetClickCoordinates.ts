import { unByKey } from 'ol/Observable';
import Map from 'ol/Map';
import { EventsKey } from 'ol/events';
import EventHandler from './EventHandler';


export const GetClickCoordinates = function () {

  let infoKey: EventsKey;
  let isActive = false;

  return {
    activate(map: Map) {
      if (!isActive) {
        if (map) {
          infoKey = map.on('singleclick', function (evt) {
            if (evt && evt.originalEvent && map.getView()) {
              EventHandler.setClickCoordinates({
                type: evt.type,
                dragging: evt.dragging,
                zoom: evt.map.getView().getZoom(),
                epsg: evt.map.getView().getProjection().getCode(),
                coordinate: evt.coordinate
              });
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
        EventHandler.setClickCoordinates({coordinate:[0,0]});
        isActive = false;
      }
    }
  }



}
