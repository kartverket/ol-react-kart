// import { EventsEventTypes } from '../Events/EventHandler';
import { unByKey } from 'ol/Observable';
// import { EventHandler, EventsEventTypes } from './EventHandler';
import Map from 'ol/Map';
import { EventsKey } from 'ol/events';
import EventHandler from './EventHandler';


export const GetClickCoordinates = function () {

    // return {

    // }
  // const eventHandler = eH;
  let infoKey: EventsKey;
  let isActive = false;
  // let epsg;
  // const eventHandler = EventHandler();
  // let eventHandler = EventHandler;
  // constructor(eventHandler) {
  //   this.eventHandler = eventHandler;
  // }

  return {
    activate(map: Map) {
      if (!isActive) {
        // epsg = initEpsg;
        if (map) {
          // const self = this;
          infoKey = map.on('singleclick', function (evt) {
            if (evt && evt.originalEvent && map.getView()) {
              const mapPosition = evt.coordinate;
              console.log('MAP Position: ', mapPosition);
              // eventHandler.triggerEvent(EventsEventTypes.GetClickCoordinates, mapPosition);
              EventHandler.setClickCoordinates('IT WORKS');
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
        EventHandler.setClickCoordinates('');
        isActive = false;
      }
    }
  }



}
