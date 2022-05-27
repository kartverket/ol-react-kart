import { BehaviorSubject, Observable } from 'rxjs';

const getClickCoordinatesAction = new BehaviorSubject<string>('');

const EventHandler = {
    getClickCoordinates$(): Observable<string> {
       return getClickCoordinatesAction.asObservable();
    },
    setClickCoordinates(value: string) {
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
