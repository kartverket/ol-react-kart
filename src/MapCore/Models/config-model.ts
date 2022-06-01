export interface IMapBound {
  epsg: string;
  extent: string;
}

export interface IMapLayer {
  groupid: number;
  index: number;
  name: string;
}

export interface ICodeList {
  id: string;
  url: string;
}

export interface ISearchParam {
  hasurl: string;
  name: string;
  title: string;
}

export interface IFeatureInfoElement {
  attachment: string;
  datatype?: string;
  type?: string;
  editable: string;
  hascodelist: string;
  codevalue: string[];
  name: string;
  text: string;
  isSelected?: boolean;
}

export interface IMetadataService {
  metadataurl: string;
  opennewwindow?: string;
  useisytoken?: string;
  restricted?: string;
  title?: string;
  visible?: boolean;
}

export interface IFeatureInfoProjectConfig {
  attachment: string;
  codelistid: string;
  editable: string;
  featureinfoelement: IFeatureInfoElement[];
  metadataservices: IMetadataService[];
  metadataurl: string;
  opennewwindow: string;
  openparentwindow: string;
  popupwithdatatitle: string;
  showdialog: string;
  showneighborlist: string;
  advancedfilter: string;
  showpopup: string;
  showpopuplibrary: string;
  showpopupwithdata: string;
  title: string;
  tooltiptemplate: string;
  width?: string;
  layertype?: string;
  geometrytype: string;
  sendusername: string;
}

export interface IVectorOptions {
  visibility: string;
}

export interface IFill {
  color: string;
}

export interface IRegularshape {
  fill: IFill
  points: number;
  radius: number;
}

export interface IStyle {
  regularshape: IRegularshape;
}

export interface IParamsVector {
  format: string;
}

export interface IVector {
  type: string;
  name: string;
  url: string;
  epsg: string;
  groupid: number,
  params: IParamsVector;
  guid: string;
  options: IVectorOptions;
  style: IStyle;
}

export interface IWmsLayer {
  name: string;
  queryable: string;
  title: string;
}

export interface IFeatureInfoFormats {
  format: any;
}

// export interface IParamsWms {
//   layers: string;
//   format: string;
// }

export interface ILayers {
  Layer: IWmsLayer;
}

export interface ITileLayerParams {
  layers?: string;
  format?: string;
}

export interface ITileLayerOptions {
  isbaselayer: string;
  singletile: string;
  visibility: string;
}

export interface ITileLayer {
  type: string;
  gatekeeper?: string;
  name: string;
  url: string;
  params: ITileLayerParams;
  matrixprefix?: string;
  matrixset?: string;
  guid: string;
  options: ITileLayerOptions;
  thumbnail?: string;  
  Layers?: ILayers,
  ticket?: string;
  wmtsextent?: string;
  source?: 'WMS' | 'WMTS';
}

export interface ICodeLists {
  codelist: ICodeList[];
}

export interface ISearchParams {
  searchparam: ISearchParam[];
}

export interface IProjectList {
  HeaderIcon: string;
  HeaderTitle: string;
  ProjectName: string;
  SiteTitle: string;
  Restricted: boolean;
  UpdateExtent: boolean;
}

export interface IProject {
  lat: number;
  lon: number;
  mapepsg: string;
  zoom: number;
  mapbackgroundcolor: string;
  displaycenterepsgcode: string;
  displayCenter: string;
  displayprojectionepsgcode: string;
  isygatekeeper: string;
  tickethost: string;
  name: string;
}

export interface IMapBounds {
  mapbound: IMapBound[];
}

export interface IConfig {
  mapbounds: IMapBounds;
  maplayer: IMapLayer[];
  project: IProject;
  vector: IVector[];
  wms: ITileLayer[];
  wmts: ITileLayer[];
}

export interface IProjectConfig {
  config: IConfig;
}

export interface IJobtechQueryParams {
  jtfunksjon: string;
  jtobjektid: string;
}

export interface IGIVisPlanQueryParams {
  funksjon: string;
  kommunenummer: string;
  plan: string;
}

export interface IGIVisEiendomQueryParams {
  funksjon: string;
  kommunenummer: string;
  gaardsnummer: string;
  bruksnummer: string;
  festenummer: string;
  seksjonsnummer: string;
}

export interface IGIVisBygningQueryParams {
  funksjon: string;
  kommunenummer: string;
  bygningsnummer: string;
  endringsloepenummer: string;
}

export interface IGIVisAdresseQueryParams {
  funksjon: string;
  kommunenummer: string;
  adressenavn: string;
  husnummer: string;
  bokstav: string;
  gaardsnummer: string;
  bruksnummer: string;
  festenummer: string;
  seksjonsnummer: string;
  undernummer: string;
}
