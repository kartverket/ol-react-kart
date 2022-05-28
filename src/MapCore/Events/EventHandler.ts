import { Coordinate } from 'ol/coordinate';
import { BehaviorSubject, Observable } from 'rxjs';

export interface MapClickInfo {
  epsg?: string;
  zoom?: number;
  coordinate: Coordinate;
  type?: string;
  dragging?:boolean;

}
const getClickCoordinatesAction = new BehaviorSubject<MapClickInfo>({coordinate: [0,0]});
const mapMoveEndAction = new BehaviorSubject<string>('');

const EventHandler = {
  mapMoveEnd$(): Observable<string> {
      return mapMoveEndAction.asObservable();
  },
  setMapMoveEnd(value: string) {
    mapMoveEndAction.next(value);
  },
  getClickCoordinates$(): Observable<MapClickInfo> {
       return getClickCoordinatesAction.asObservable();
  },
  setClickCoordinates(value: MapClickInfo) {
    getClickCoordinatesAction.next(value);
  }
}

export default EventHandler;


// export enum EventsEventTypes {
//   ChangeCenter = 'ChangeCenter',
//   ChangeResolution = 'ChangeResolution',
//   ChangeLayers = 'ChangeLayers',
//   FeatureInfoStart = 'FeatureInfoStart',
//   FeatureInfoEnd = 'FeatureInfoEnd',
//   FeatureHoverStart = 'FeatureHoverStart',
//   FeatureHoverMove = 'FeatureHoverMove',
//   FeatureHoverEnd = 'FeatureHoverEnd',
//   MapConfigLoaded = 'MapConfigLoaded',
//   MapLoaded = 'MapLoaded',
//   MapMoveend = 'MapMoveend',
//   MapProgress = 'MapProgress',
//   MapProgressEnd = 'MapProgressEnd',
//   MapVectorProgressEnd = 'MapVectorProgressEnd',
//   ShowExportPanel = 'ShowExportPanel',
//   MeasureMouseMove = 'MeasureMouseMove',
//   LoadingLayerEnd = 'LoadingLayerEnd',
//   LayerCreated = 'LayerCreated',
//   CachingStart = 'CachingStart',
//   CachingEnd = 'CachingEnd',
//   CachingProgress = 'CachingProgress',
//   StatusPouchDbChanged = 'StatusPouchDbChanged',
//   MeasureEnd = 'MeasureEnd',
//   DrawFeatureMouseMove = 'DrawFeatureMouseMove',
//   DrawFeatureEnd = 'DrawFeatureEnd',
//   DrawFeatureStart = 'DrawFeatureStart',
//   DrawGeoJsonEnd = 'DrawGeoJsonEnd',
//   GetClickCoordinates = 'GetClickCoordinates',
//   AddLayerFeatureEnd = 'AddLayerFeatureEnd',
//   ModifyFeatureEnd = 'ModifyFeatureEnd',
//   RefreshSourceDone = 'RefreshSourceDone',
//   ZoomIn = 'ZoomIn',
//   ZoomOut = 'ZoomOut',
//   TransactionSuccessful = 'TransactionSuccessful',
//   TransactionFailed = 'TransactionFailed',
//   TransactionInsertEnd = 'TransactionInsertEnd',
//   TransactionUpdateEnd = 'TransactionUpdateEnd',
//   TransactionRemoveEnd = 'TransactionRemoveEnd',
//   FeatureHasBeenDescribed = 'FeatureHasBeenDescribed',
//   FeatureUrlHasBeenDescribed = 'FeatureUrlHasBeenDescribed',
//   GeolocationUpdated = 'GeolocationUpdated',
//   PrintBoxSelectReturnValue = 'PrintBoxSelectReturnValue',
//   FeatureSelected = 'FeatureSelected',
//   FeatureDeselected = 'FeatureDeselected',
//   DrawBoxEnd = 'DrawBoxEnd',
//   DrawFeatureSelect = 'DrawFeatureSelect',
//   ElevationProfileLine = 'ElevationProfileLine',
//   FeatureClick = 'FeatureClick',
//   LoggedIn = 'LoggedIn',
//   LoggedOut = 'LoggedOut',
//   MapMoveStart = 'MapMoveStart',
//   ReInitMap = 'ReInitMap',
//   GetCapabilitiesFromUrl = 'GetCapabilitiesFromUrl',
//   FeatureValues = 'FeatureValues',
//   LinePositionMarkerCoordinates = 'LinePositionMarkerCoordinates',
//   ExportDone = 'ExportDone'
// }
