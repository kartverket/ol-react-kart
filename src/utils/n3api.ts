/**
 * Sammling av url api's brukt i norgeskart.no ( ekstraktet fra gammel noprgeskart, bare for å finne de som er brukt i norgeskart.no )
 */

const url = 'https://www.norgeskart.no/';
const urlOpenWps = 'https://openwps.statkart.no/skwms1/';
const urlOpenWms = 'http://openwms.statkart.no/skwms1/';
const urlGeonorge = 'https://ws.geonorge.no/';
const urlSeEiendom = 'http://www.seeiendom.no/';
const urlFaktaark = 'https://stadnamn.kartverket.no/fakta/';
const urlHavnivaa = 'http://api.sehavniva.no/';
const urlAdresseSok = 'https://ws.geonorge.no/adresser/v1/sok';
const urlAdressePunktsok = 'https://ws.geonorge.no/adresser/v1/punktsok';

export const uploadGpxFileService = () => {
  return `${url}ws/upload-gpx.py`;
};

export const generateElevationChartServiceUrl = (gpxFile: string) => {
  return `${urlOpenWps}wps.elevation2?request=Execute&service=WPS&version=1.0.0&identifier=elevationChart&dataInputs=gpx=@xlink:href=${gpxFile}`;
};

export const generateMapLinkServiceUrl = (config: {
  service: string | number | boolean;
  request: string | number | boolean;
  CRS: string | number | boolean;
  FORMAT: string | number | boolean;
  BGCOLOR: string | number | boolean;
  TRANSPARENT: string | number | boolean;
  LAYERS: string | number | boolean;
  VERSION: string | number | boolean;
  WIDTH: string | number | boolean;
  HEIGHT: string | number | boolean;
  BBOX: string | number | boolean;
}) => {
  const service = encodeURIComponent(config.service);
  const request = encodeURIComponent(config.request);
  const crs = encodeURIComponent(config.CRS);
  const format = encodeURIComponent(config.FORMAT);
  const bgcolor = encodeURIComponent(config.BGCOLOR);
  const transparent = encodeURIComponent(config.TRANSPARENT);
  const layers = encodeURIComponent(config.LAYERS);
  const version = encodeURIComponent(config.VERSION);
  const width = encodeURIComponent(config.WIDTH);
  const height = encodeURIComponent(config.HEIGHT);
  const bbox = encodeURIComponent(config.BBOX);

  return `${urlOpenWms}wms.topo4?service=${service}&request=${request}&CRS=${crs}&FORMAT=${format}&BGCOLOR=${bgcolor}&TRANSPARENT=${transparent}&LAYERS=${layers}&VERSION=${version}&WIDTH=${width}&HEIGHT=${height}&BBOX=${bbox}`;
};

export const generateEmergencyPosterServiceUrl = (config: {
  locationName: string | number | boolean;
  position1: string | number | boolean;
  position2: string | number | boolean;
  street: string | number | boolean;
  place: string | number | boolean;
  matrikkel: string | number | boolean;
  utm: string | number | boolean;
  posDez: string | number | boolean;
  map: string | number | boolean;
}) => {
  const locationName = encodeURIComponent(config.locationName);
  const position1 = encodeURIComponent(config.position1);
  const position2 = encodeURIComponent(config.position2);
  const street = encodeURIComponent(config.street);
  const place = encodeURIComponent(config.place);
  const matrikkel = encodeURIComponent(config.matrikkel);
  const utm = encodeURIComponent(config.utm);
  const posDez = encodeURIComponent(config.posDez);
  const map = encodeURIComponent(config.map);

  return `${urlGeonorge}/fop/fop?locationName=${locationName}&position1=${position1}&position2=${position2}&street=${street}&place=${place}&matrikkel=${matrikkel}&utm=${utm}&posDez=${posDez}&map=${map}`;
};

export const generateSearchMatrikkelVegUrl = (query: string | number | boolean) => {
  return `${urlGeonorge}norgeskart/v1/matrikkel/veg/${encodeURIComponent(query)}`;
};

export const generateSearchMatrikkelAdresseUrl = (query: string | number | boolean) => {
  query = typeof query === 'string' ? query : '';
  query = query.indexOf(',') !== -1 ? query.replace(',', '*') : query + '';
  return `${urlAdresseSok}?sok=${encodeURIComponent(query)}&treffPerSide=10`;
};

export const generateSearchStedsnavnUrl = (query: string, side: number, antall: number) => {
  if (query) {
    const testquery = query.split(',');
    if (testquery.length >= 2) {
      testquery[0] = testquery[0].indexOf('*') !== -1 ? testquery[0] : testquery[0] + '*';
      testquery[1] = testquery[1].indexOf('*') !== -1 ? testquery[1].trim() : testquery[1].trim() + '*';
      query = `${testquery[0]}&kommunenavn=+${testquery[1]}`;
      return `${urlGeonorge}stedsnavn/v1/navn?sok=${query}&treffPerSide=${antall}&side=${side}`;
    }
  }
  query = query ? (query.indexOf('*') !== -1 ? query : query + '*') : '';
  return `${urlGeonorge}stedsnavn/v1/navn?sok=${query}&treffPerSide=${antall}&side=${side}`;
};

export const generateSearchAdresseUrl = (query: string | number | boolean) => {
  return `${urlGeonorge}AdresseWS/adresse/sok?sokestreng=${encodeURIComponent(query)}&antPerSide=100&side=0`;
};

export const generateElevationPointUrl = (lat: string, lon: string, epsgNumber: string) => {
  return `${urlGeonorge}hoydedata/v1/punkt?nord=${lat}&ost=${lon}&koordsys=${epsgNumber}&geojson=false`;
};
export const generatStedsnavnPunktsok = (lat: string, lon: string, epsgNumber: string, side?: number) => {
  if (!side) {
    side = 1;
  }
  return `${urlGeonorge}stedsnavn/v1/punkt?nord=${lat}&ost=${lon}&treffPerSide=35&koordsys=25833&radius=150&side=${side}`;
};
export const generatStedsnavnPunktsokNodplakat = (lat: string, lon: string, epsgNumber: string, side?: number) => {
  if (!side) {
    side = 1;
  }
  return `${urlGeonorge}stedsnavn/v1/punkt?nord=${lat}&ost=${lon}&treffPerSide=35&koordsys=25833&radius=1000&side=${side}`;
};
export const generateHoydedataPointUrl = (ost: string, nord: string, koordsys: string) => {
  return `${urlGeonorge}hoydedata/v1/punkt?ost=${ost}&nord=${nord}&koordsys=${koordsys}&geojson=false`;
};

export const generateAdresseSokUrl = (query: string | number | boolean) => {
  query = typeof query === 'string' ? query : '';
  query = query.indexOf(',') !== -1 ? query.replace(',', '*') : query + '*';
  return `${urlAdresseSok}?sok=${encodeURIComponent(query)}&treffPerSide=10&side=0`;
};

export const generateAdressePunktsokUrl = (radius: number, lat: number, lon: number) => {
  return `${urlAdressePunktsok}?radius=${radius}&lat=${lat}&lon=${lon}&treffPerSide=10`;
};

export const generateMatrikkelInfoUrl = (minx: number, miny: number, maxx: number, maxy: number) => {
  return `${urlGeonorge}norgeskart/v1/teiger/bbox/${minx},${miny},${maxx},${maxy}`;
};

export const generateSeEiendomUrl = (knr: string, gnr: string, bnr: string, fnr: string, snr: string) => {
  return `${urlSeEiendom}eiendom/${knr}/${gnr}/${bnr}/${fnr}/${snr}`;
};

export const generateFaktaarkUrl = (stedsnummer?: number) => {
  return urlFaktaark + stedsnummer;
};

export const generateKoordTransUrl = (x: number, y: number, tilEPSG: string, fraESPG: string) => {
  if (typeof fraESPG === 'string') {
    fraESPG = fraESPG.indexOf(':') !== -1 ? fraESPG.split(':')[1] : fraESPG;
  }
  return `${urlGeonorge}transformering/v1/transformer?x=${x}&y=${y}&fra=${fraESPG}&til=${tilEPSG}`;
};
export const generateProjeksjonerUrl = () => {
  return `${urlGeonorge}transformering/v1/projeksjoner`;
};
export const generateSeHavnivaaUrl = (lat: string, lon: string) => {
  return `${urlHavnivaa}tideapi.php?lat=${lat}&lon=${lon}&lang=nb&year=${new Date().getFullYear()}&place=&tide_request=tidetable`;
};

export const generateLagTurkartUrl = () => {
  return `${urlGeonorge}norgeskart/nkprint/turkart2`;
};

export const generateLagFargeleggingskartUrl = () => {
  return `${urlGeonorge}norgeskart/nkprint/fargelegg`;
};

export const generateEmergencyPosterPointUrl = (lat: number, lon: number) => {
  return `${urlGeonorge}norgeskart/emergencyPoster/${lon}/${lat}`;
};

export const generateEmergencyPosterPreviewImageUrl = (minx: number, miny: number, maxx: number, maxy: number) => {
  const topo4 =
    'wms.topo4?service=WMS&request=GetMap&CRS=EPSG:32633&FORMAT=image%2Fjpeg&BGCOLOR=0xFFFFFF&TRANSPARENT=false&LAYERS=topo4_WMS&VERSION=1.3.0&WIDTH=';
  return `${urlOpenWms}${topo4}${window.innerWidth}&HEIGHT=${window.innerHeight}&BBOX=${minx},${miny},${maxx},${maxy}`;
};

export const generateGeoJSONSaveUrl = () => {
  return `${url}ws/upload-json.py`;
};

export const generateSearchMatrikkelNummerUrl = (query: string) => {
  return `${urlGeonorge}norgeskart/v1/matrikkel/eie/${query}`;
};

export const generateMatrikkelWfsFilterUrl = (property: {
  kommunenr: string;
  gardsnr: string;
  bruksnr: string;
  festenr?: string;
  seksjonsnr?: string;
}) => {
  return `${urlGeonorge}norgeskart/v1/teiger/${property.kommunenr}-${property.gardsnr}-${property.bruksnr}-${property.festenr}-${property.seksjonsnr}/`;
};
export const generateEiendomAddressUrl = (
  kommunenr: string,
  gardsnr: string,
  bruksnr: string,
  festnr?: string,
  sectionsnr?: string,
) => {
  let baseUrl = `${urlGeonorge}norgeskart/matrikkel/eiendom/`;
  if (festnr !== '0') {
    if (sectionsnr === '0') {
      baseUrl += kommunenr + '-' + gardsnr + '/' + bruksnr + '/' + festnr;
    } else {
      baseUrl += kommunenr + '-' + gardsnr + '/' + bruksnr + '/' + festnr + '/' + sectionsnr;
    }
  } else {
    baseUrl += kommunenr + '-' + gardsnr + '/' + bruksnr;
  }
  return `${baseUrl}&KILDE:Eiendom KOMMUNENR:${kommunenr} GARDSNR:${gardsnr} BRUKSNR:${bruksnr} SEKSJONSNR:${sectionsnr} FESTENR:${festnr}`;
};

export const generateFaqUrl = (code: string) => {
  return `${url}ws/faq.py?code=${code}`;
};

/*
 // No CORS
 const generateSeHavnivaaUrl =  (lat, lon) => {
 return urlHavnivaa + "tideapi.php?lat=" + lat + "&lon=" + lon + "&refcode=cd&place=&lang=nb&file=&tide_request=locationlevels"

 }                const generateSearchEiendomUrl =  (query) => {
 return "http://eiendom.statkart.no/Search.ashx?filter=KILDE:sted,matreiendom,SITEURLKEY:httpwwwseeiendomno,LESEGRUPPER:guests&term=" + query
 }
 */

const sosiCodes = [
  {
    ESRI: null,
    EPSG: 4326,
    SOSI: 84,
    name: 'EU89 - Geografisk, grader (Lat/Lon)',
    viewable: false,
    key: 'EU89_Lat_Lon',
    type: 'standard',
    bbox: {
      // WGS84
      MinX: 3.844925191,
      MaxX: 31.95907717,
      MinY: 57.69458922, // Norway
      MaxY: 71.45477563, // Norway
    },
  }, //viewable, but not necessary in selectors
  {
    ESRI: 25831,
    EPSG: 25831,
    SOSI: 21,
    name: 'EU89, UTM-sone 31',
    viewable: true,
    key: 'EU89_UTM_31',
    type: 'standard',
    bbox: {},
  },
  {
    ESRI: 25832,
    EPSG: 25832,
    SOSI: 22,
    name: 'EU89, UTM-sone 32',
    viewable: true,
    key: 'EU89_UTM_32',
    type: 'standard',
    bbox: {
      // UTM zone 32
      MinX: 229614.1053,
      MaxX: 751898.5673,
      MinY: 6401682.026, // Norway
      MaxY: 7231445.376, // Norway
    },
  },
  {
    ESRI: 25833,
    EPSG: 25833,
    SOSI: 23,
    name: 'EU89, UTM-sone 33',
    viewable: true,
    key: 'EU89_UTM_33',
    type: 'standard',
    bbox: {
      // UTM zone 33
      MinX: 288889.7639,
      MaxX: 804809.936,
      MinY: 7211211.98, // Norway
      MaxY: 7866186.306, // Norway
      // alternative
      // UTM zone 33 for all of Norway
      /*
    MinX : -128551.4542,
    MaxX : 1148218.099,
    MinY : 6404024.705, // Norway
    MaxY : 8010780.591 // Norway
    */
    },
  },
  {
    ESRI: 25834,
    EPSG: 25834,
    SOSI: 24,
    name: 'EU89, UTM-sone 34',
    viewable: true,
    key: 'EU89_UTM_34',
    type: 'standard',
    bbox: {
      // UTM zone 34
      MinX: 389363.4613,
      MaxX: 624301.8048,
      MinY: 7565200.998, // Norway
      MaxY: 7930309.032, // Norway
    },
  },
  {
    ESRI: 25835,
    EPSG: 25835,
    SOSI: 25,
    name: 'EU89, UTM-sone 35',
    viewable: true,
    key: 'EU89_UTM_35',
    type: 'standard',
    bbox: {
      // UTM zone 35
      MinX: 253177.3653,
      MaxX: 683621.7167,
      MinY: 7603094, // Norway
      MaxY: 7924929.221, // Norway
    },
  },
  {
    ESRI: 25836,
    EPSG: 25836,
    SOSI: 26,
    name: 'EU89, UTM-sone 36',
    viewable: true,
    key: 'EU89_UTM_36',
    type: 'standard',
    bbox: {},
  },
  {
    ESRI: 27391,
    EPSG: 27391,
    SOSI: 1,
    name: 'NGO1948, Gauss-K. Akse 1',
    viewable: false,
    key: 'NGO1948_GaussK_1',
    type: 'extended',
    bbox: {
      // NGO1948 Axis 1-4
      MinX: -368207.9294,
      MaxX: 172305.8,
      MinY: -28995.15926, // Norway
      MaxY: 808453.3338, // Norway
    },
  },
  {
    ESRI: 27392,
    EPSG: 27392,
    SOSI: 2,
    name: 'NGO1948, Gauss-K. Akse 2',
    viewable: false,
    key: 'NGO1948_GaussK_2',
    type: 'extended',
    bbox: {
      // NGO1948 Axis 1-4
      MinX: -368207.9294,
      MaxX: 172305.8,
      MinY: -28995.15926, // Norway
      MaxY: 808453.3338, // Norway
    },
  },
  {
    ESRI: 27393,
    EPSG: 27393,
    SOSI: 3,
    name: 'NGO1948, Gauss-K. Akse 3',
    viewable: false,
    key: 'NGO1948_GaussK_3',
    type: 'extended',
    bbox: {
      // NGO1948 Axis 1-4
      MinX: -368207.9294,
      MaxX: 172305.8,
      MinY: -28995.15926, // Norway
      MaxY: 808453.3338, // Norway
    },
  },
  {
    ESRI: 27394,
    EPSG: 27394,
    SOSI: 4,
    name: 'NGO1948, Gauss-K. Akse 4',
    viewable: false,
    key: 'NGO1948_GaussK_4',
    type: 'extended',
    bbox: {
      // NGO1948 Axis 1-4
      MinX: -368207.9294,
      MaxX: 172305.8,
      MinY: -28995.15926, // Norway
      MaxY: 808453.3338, // Norway
    },
  },
  {
    ESRI: 27395,
    EPSG: 27395,
    SOSI: 5,
    name: 'NGO1948, Gauss-K. Akse 5',
    viewable: false,
    key: 'NGO1948_GaussK_5',
    type: 'extended',
    bbox: {
      // NGO1948 Axis 5-8
      MinX: -312424.3471,
      MaxX: 410629.5171,
      MinY: 808453.3338, // Norway
      MaxY: 1507978.752, // Norway
    },
  },
  {
    ESRI: 27396,
    EPSG: 27396,
    SOSI: 6,
    name: 'NGO1948, Gauss-K. Akse 6',
    viewable: false,
    key: 'NGO1948_GaussK_6',
    type: 'extended',
    bbox: {
      // NGO1948 Axis 5-8
      MinX: -312424.3471,
      MaxX: 410629.5171,
      MinY: 808453.3338, // Norway
      MaxY: 1507978.752, // Norway
    },
  },
  {
    ESRI: 27397,
    EPSG: 27397,
    SOSI: 7,
    name: 'NGO1948, Gauss-K. Akse 7',
    viewable: false,
    key: 'NGO1948_GaussK_7',
    type: 'extended',
    bbox: {
      // NGO1948 Axis 5-8
      MinX: -312424.3471,
      MaxX: 410629.5171,
      MinY: 808453.3338, // Norway
      MaxY: 1507978.752, // Norway
    },
  },
  {
    ESRI: 27398,
    EPSG: 27398,
    SOSI: 8,
    name: 'NGO1948, Gauss-K. Akse 8',
    viewable: false,
    key: 'NGO1948_GaussK_8',
    type: 'extended',
    bbox: {
      // NGO1948 Axis 5-8
      MinX: -312424.3471,
      MaxX: 410629.5171,
      MinY: 808453.3338, // Norway
      MaxY: 1507978.752, // Norway
    },
  },
  {
    ESRI: null,
    EPSG: null,
    SOSI: 50,
    name: 'ED50 - Geografisk, grader',
    viewable: false,
    key: 'ED50',
    type: 'extended',
    bbox: {},
  },
  {
    ESRI: 23031,
    EPSG: 23031,
    SOSI: 31,
    name: 'ED50, UTM-sone 31',
    viewable: false,
    key: 'ED50_UTM_31',
    type: 'extended',
    bbox: {},
  },
  {
    ESRI: 23032,
    EPSG: 23032,
    SOSI: 32,
    name: 'ED50, UTM-sone 32',
    viewable: false,
    key: 'ED50_UTM_32',
    type: 'extended',
    bbox: {},
  },
  {
    ESRI: 23033,
    EPSG: 23033,
    SOSI: 33,
    name: 'ED50, UTM-sone 33',
    viewable: false,
    key: 'ED50_UTM_33',
    type: 'extended',
    bbox: {},
  },
  {
    ESRI: 23034,
    EPSG: 23034,
    SOSI: 34,
    name: 'ED50, UTM-sone 34',
    viewable: false,
    key: 'ED50_UTM_34',
    type: 'extended',
    bbox: {},
  },
  {
    ESRI: 23035,
    EPSG: 23035,
    SOSI: 35,
    name: 'ED50, UTM-sone 35',
    viewable: false,
    key: 'ED50_UTM_35',
    type: 'extended',
    bbox: {},
  },
  {
    ESRI: 23036,
    EPSG: 23036,
    SOSI: 36,
    name: 'ED50, UTM-sone 36',
    viewable: false,
    key: 'ED50_UTM_36',
    type: 'extended',
    bbox: {},
  },
  /*
          ,{
            Name: "Lokalt nett, Oslo",
            SOSI: 101,
            bbox: {
              MinX : -13231.52378,
              MaxX : 13557.59229,
              MinY : -11742.49708,
              MaxY : 25100.80578
            }
          }
  */
  //{ESRI: null,EPSG: null,SOSI: null,name: 'what3words',viewable: false,forward: true,key: 'w3w',type: 'extended',bbox: {}}
  //{'ESRI': null, 'EPSG': null, 'SOSI': null, 'name': 'Geohash', 'viewable': false, 'forward': true}
  //{'ESRI': null, 'EPSG': null, 'SOSI': 53, 'name': 'Møre-A'},
  //{'ESRI': null, 'EPSG': null, 'SOSI': 54, 'name': 'Møre-B'},
  //{'ESRI': null, 'EPSG': null, 'SOSI': 84, 'name': 'EU89, Geografisk, sekunder'}
  //{'ESRI': 4230, 'EPSG': 4230, 'SOSI': 4230, 'name': 'ED50 Geografisk, grader'},
  //{'ESRI': 4231, 'EPSG': null, 'SOSI': 4231, 'name': 'ED87 Geografisk, grader'},
  //{'ESRI': 4273, 'EPSG': 4273, 'SOSI': 4273, 'name': 'NGO1948 Geografisk, grader'},
  //{'ESRI': null, 'EPSG': 4322, 'SOSI': 4322, 'name': 'WGS72 Geografisk, grader'},
  //{'ESRI': 4326, 'EPSG': 4326, 'SOSI': 4326, 'name': 'EU89/WGS84 Geografisk, grader'}
];
export const getSOSIfromEPSG = (epsg: number | null) => {
  return sosiCodes.filter(el => el.EPSG === epsg).map(obj => obj.SOSI)[0];
};
export const getCoordinateSystems = (type: string) => {
  const result: any = {};
  sosiCodes
    .filter(el => el.type === type)
    .filter(Boolean)
    .map((obj: any) => {
      const rObj: any = {};
      rObj[obj.SOSI] = obj.key;
      return rObj;
    })
    .forEach((element: any) => {
      for (const i in element) {
        result[i] = element[i];
      }
    });
  return result;
};

export const generateUrlPrintCapabilities = (appId: string) => {
  return urlGeonorge + 'print/' + appId + '/capabilities.json';
};
export const generatePrintUrl = (appId: string) => {
  return urlGeonorge + 'print/' + appId + '/report.pdf';
};
export const generatePrintDownloadUrl = (downloadUrl: string) => {
  return urlGeonorge.slice(0, -1) + downloadUrl;
};
export const generateStatusPrintDownloadUrl = (statusUrl: string) => {
  return urlGeonorge.slice(0, -1) + statusUrl;
};
export const generateCancelPrintUrl = (refNum: string) => {
  return urlGeonorge + 'print/cancel/' + refNum;
};
export const toDms = (value: string) => {
  const deg = parseInt(value, 10);
  const min = parseInt(((parseFloat(value) - deg) * 60).toString(), 10);
  const sec = parseInt(((parseFloat(value) - deg - min / 60) * 3600).toString(), 10);
  return {
    degrees: deg,
    minutes: min,
    seconds: sec,
  };
};
export const zerofill = (value: number) => {
  return value < 10 ? `0${value}` : value;
};
export const round = (value: number, decimals: number) => {
  return Number(Math.round(Number(value + 'e' + decimals)) + 'e-' + decimals);
};
