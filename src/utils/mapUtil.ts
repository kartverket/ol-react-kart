
export interface IProsjektion {
  epsg: number;
  info: string;
  name: string;
}
export interface IUtm {
  epsg: string;
  sone: string;
}

export const getUTMZoneFromGeographicPoint = function (lon: number, lat: number): IUtm {
  // From emergencyPoster.js
  let sone = '32V',
    epsg = 'EPSG:25832';
  if (lat > 72) {
    if (lon < 21) {
      sone = '33X';
      epsg = 'EPSG:25833';
    } else {
      sone = '35X';
      epsg = 'EPSG:25835';
    }
  } else if (lat > 64) {
    if (lon < 6) {
      sone = '31W';
      epsg = 'EPSG:25831';
    } else if (lon < 12) {
      sone = '32W';
      epsg = 'EPSG:25832';
    } else if (lon < 18) {
      sone = '33W';
      epsg = 'EPSG:25833';
    } else if (lon < 24) {
      sone = '34W';
      epsg = 'EPSG:25834';
    } else if (lon < 30) {
      sone = '35W';
      epsg = 'EPSG:25835';
    } else {
      sone = '36W';
      epsg = 'EPSG:25836';
    }
  } else {
    if (lon < 3) {
      sone = '31V';
      epsg = 'EPSG:25831';
    } else if (lon >= 12) {
      sone = '33V';
      epsg = 'EPSG:25833';
    }
  }
  return {
    sone: sone,
    epsg: epsg,
  };
};
