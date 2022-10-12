export interface IMapBound {
  epsg: string;
  extent: string;
}

export interface IMapLayer {
  groupid: number;
  index: number;
  name: string;
  isOpen?: boolean;
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
  visibility: boolean;
}

export interface IFill {
  color: string;
}
export interface IStroke {
  color: string;
  width: number;
}
export interface IText {
  text: string;
  scale: number;
  fill: IFill;
  stroke: IStroke;
}

export interface IRegularshape {
  fill: IFill;
  points: number;
  radius: number;
}

export interface IStyle {
  regularshape?: IRegularshape;
  fill?: IFill;
  stroke?: IStroke;
  text?: IText;
}

export interface IParamsVector {
  format: string;
}

export interface IVector {
  type: string;
  name: string;
  url: string;
  epsg: string;
  groupid: number;
  params: IParamsVector;
  guid: string;
  options: IVectorOptions;
  style: IStyle;
  distributionProtocol?: string;
}

export interface IWmsLayer {
  name?: string;
  queryable: boolean;
  title?: string;
}

export interface IFeatureInfoFormats {
  format: string;
}

export interface ILayers {
  Layer: IWmsLayer;
}

export interface ITileLayerParams {
  layers?: string;
  format?: string;
  styles?: string;
}

export interface ITileLayerOptions {
  isbaselayer?: boolean;
  singletile?: boolean;
  visibility?: boolean;
}
export interface IField {
  name: string;
  type?: string;
  alias?: string;
  baseurl?: string;
  filetype?: string;
  unit?: string;
}
export interface IIncludedFields {
  field: IField[];
  capitalize?: boolean;
}
export interface IIncludedFieldsDictionary {
  [key: string]: IField;
}
export interface IBaseLayers {
  setVisibleBaseLayer: any;
  layers: ILayer[];
}
export interface ILayer {
  type?: string;
  gatekeeper?: boolean;
  name: string;
  info?: string;
  url: string;
  url_mvt?: string;
  styleUrl?: string;
  epsg?: string;
  params: ITileLayerParams;
  order?: number;
  matrixprefix?: boolean;
  matrixset?: string;
  guid: string;
  options: ITileLayerOptions;
  thumbnail?: string;
  Layers?: ILayers;
  ticket?: boolean;
  wmtsextent?: string;
  distributionProtocol?: 'WMS' | 'WMTS' | 'WFS' | 'TMS' | 'XYZ' | 'GEOJSON' | 'KML' | 'MVT';
  getcapabilities?: boolean;
  groupid?: number;
  maxResolution?: number;
  legendurl?: string;
  uuid?: string;
  description?: string;
  style?: IStyle;
  includedfields?: IIncludedFields;
}

export interface ICodeLists {
  codelist: ICodeList[];
}

export interface ISearchParams {
  searchparam: ISearchParam[];
}

export interface IProject {
  HeaderIcon: string;
  HeaderTitle: string;
  ProjectName: string;
  SiteTitle: string;
  Config: IConfig;
}

export interface IProjectConfig {
  gatekeeperhost: string;
  tickethost: string;
  name: string;
}

export interface IProjectList {
  setToggleLayer: any;
  setToggleGroup: any;
  setActiveProject: any;
  showActiveProjectFromList: any;
  toggleTileLayer: any;

  projects: IProject[];
  status: 'loading' | 'done';
  showActiveProject: boolean;
  activeProject: IProject;
}

export interface IBaseConfig {
  center: [number, number];
  mapepsg: string;
  zoom: number;
  mapbound: IMapBound[];
  name: string;
  displayCenter: string;
  gatekeeperhost: string;
  tickethost: string;
}

export interface IBaseMap {
  url: string;
  gatekeeper?: boolean;
  name: string;
  layers: string;
  format: string;
  matrixPrefix: boolean;
  matrixSet: string;
  options: ITileLayerOptions;
}

export interface IIFeatureDictPunktType {
  T: string;
  L: string;
  S: string;
  N: string;
}

export interface IIFeatureDictStatus {
  E: string;
  P: string;
  O: string;
  U: string;
}

export interface IFeatureDictLyssetting {
  IL: string;
  UKJ: string;
  LIA: string;
  LIB: string;
  LIC: string;
  LID: string;
  MIA: string;
  MIB: string;
  MIC: string;
  HIA: string;
  HIB: string;
  FLO: string;
  FR: string;
  FH: string;
  BH: string;
  BR: string;
  L: string;
}

export interface IFeatureDict {
  Punkttype?: IIFeatureDictPunktType;
  Status?: IIFeatureDictStatus;
  Lyssetting?: IFeatureDictLyssetting;
}

export interface IConfig {
  name: string;
  layer: ILayer[];
  maplayer?: IMapLayer[];
  vector?: IVector[];
  featureDict?: IFeatureDict;
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
