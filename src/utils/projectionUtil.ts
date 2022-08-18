import { Extent } from 'ol/extent';
import { addProjection, Projection } from 'ol/proj';
import { register } from 'ol/proj/proj4.js';
import { METERS_PER_UNIT } from 'ol/proj/Units';
import proj4 from 'proj4';

export const loadCustomCrs = () => {
  // proj4 is on the global scope
  //proj4.defs("EPSG:25832", '+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs');
  //proj4.defs("EPSG:25833", '+proj=utm +zone=33 +ellps=GRS80 +units=m +no_defs');
  //proj4.defs("EPSG:25835", '+proj=utm +zone=35 +ellps=GRS80 +units=m +no_defs');
  //proj4.defs("EPSG:32632", '+proj=utm +zone=32 +ellps=WGS84 +datum=WGS84 +units=m +no_defs');
  //proj4.defs("EPSG:32633", '+proj=utm +zone=33 +ellps=WGS84 +datum=WGS84 +units=m +no_defs');
  //proj4.defs("EPSG:32635", '+proj=utm +zone=35 +ellps=WGS84 +datum=WGS84 +units=m +no_defs');
  //proj4.defs("EPSG:3575", '+proj=laea +lat_0=90 +lon_0=10 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs');

  // From epsg.io
  //SWEREF99:
  /*
  proj4.defs("EPSG:3006", "+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
  proj4.defs("EPSG:3007", "+proj=tmerc +lat_0=0 +lon_0=12 +k=1 +x_0=150000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
  proj4.defs("EPSG:3008", "+proj=tmerc +lat_0=0 +lon_0=13.5 +k=1 +x_0=150000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
  proj4.defs("EPSG:3009", "+proj=tmerc +lat_0=0 +lon_0=15 +k=1 +x_0=150000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
  proj4.defs("EPSG:3010", "+proj=tmerc +lat_0=0 +lon_0=16.5 +k=1 +x_0=150000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
  proj4.defs("EPSG:3011", "+proj=tmerc +lat_0=0 +lon_0=18 +k=1 +x_0=150000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
  proj4.defs("EPSG:3012", "+proj=tmerc +lat_0=0 +lon_0=14.25 +k=1 +x_0=150000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
  proj4.defs("EPSG:3013", "+proj=tmerc +lat_0=0 +lon_0=15.75 +k=1 +x_0=150000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
  proj4.defs("EPSG:3014", "+proj=tmerc +lat_0=0 +lon_0=17.25 +k=1 +x_0=150000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
  proj4.defs("EPSG:3015", "+proj=tmerc +lat_0=0 +lon_0=18.75 +k=1 +x_0=150000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
  proj4.defs("EPSG:3016", "+proj=tmerc +lat_0=0 +lon_0=20.25 +k=1 +x_0=150000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
  proj4.defs("EPSG:3017", "+proj=tmerc +lat_0=0 +lon_0=21.75 +k=1 +x_0=150000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
  proj4.defs("EPSG:3018", "+proj=tmerc +lat_0=0 +lon_0=23.25 +k=1 +x_0=150000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
  */
  //UTM 31-35:
  proj4.defs('EPSG:25831', '+proj=utm +zone=31 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');
  proj4.defs('EPSG:25832', '+proj=utm +zone=32 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');
  proj4.defs('EPSG:25833', '+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');
  proj4.defs('EPSG:25834', '+proj=utm +zone=34 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');
  proj4.defs('EPSG:25835', '+proj=utm +zone=35 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');
  proj4.defs('EPSG:25836', '+proj=utm +zone=36 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');
  proj4.defs('EPSG:32631', '+proj=utm +zone=31 +datum=WGS84 +units=m +no_defs');
  proj4.defs('EPSG:32632', '+proj=utm +zone=32 +datum=WGS84 +units=m +no_defs');
  proj4.defs('EPSG:32633', '+proj=utm +zone=33 +datum=WGS84 +units=m +no_defs');
  proj4.defs('EPSG:32634', '+proj=utm +zone=34 +datum=WGS84 +units=m +no_defs');
  proj4.defs('EPSG:32635', '+proj=utm +zone=35 +datum=WGS84 +units=m +no_defs');
  proj4.defs('EPSG:32636', '+proj=utm +zone=36 +datum=WGS84 +units=m +no_defs');

  proj4.defs('EPSG:3575', '+proj=laea +lat_0=90 +lon_0=10 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs');

  proj4.defs('EPSG:4258', '+proj=longlat +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +no_defs');
  proj4.defs('EPSG:4326', '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs');

  // TODO: Geoserver
  //proj4.defs("http://www.opengis.net/gml/srs/epsg.xml#25832", '+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs');
  //proj4.defs("http://www.opengis.net/gml/srs/epsg.xml#25833", '+proj=utm +zone=33 +ellps=GRS80 +units=m +no_defs');
  //proj4.defs("http://www.opengis.net/gml/srs/epsg.xml#25835", '+proj=utm +zone=35 +ellps=GRS80 +units=m +no_defs');
  //proj4.defs("http://www.opengis.net/gml/srs/epsg.xml#32632", '+proj=utm +zone=32 +ellps=WGS84 +datum=WGS84 +units=m +no_defs');
  //proj4.defs("http://www.opengis.net/gml/srs/epsg.xml#32633", '+proj=utm +zone=33 +ellps=WGS84 +datum=WGS84 +units=m +no_defs');
  //proj4.defs("http://www.opengis.net/gml/srs/epsg.xml#32635", '+proj=utm +zone=35 +ellps=WGS84 +datum=WGS84 +units=m +no_defs');
  register(proj4);
};
export const addCustomProj = (code: string, extent?: Extent) => {
  const proj = new Projection({
    code: code,
    units: 'm',
    extent: extent,
  });

  addProjection(proj);
  return proj;
};
/*
    export const toDms = (value: string | number) => {
      const deg = parseInt(value, 10);
      const min = parseInt((value - deg) * 60, 10);
      const sec = ((value - deg - min / 60) * 3600);
      return `${deg}° ${zerofill(min)}' ${zerofill(sec.toFixed(2))}''`;
    } */
export const zerofill = (value: string | number) => {
  return value < 10 ? `0${value}` : value;
};
export const getResolutionForScale = (scale: string, units: string | number) => {
  const dpi = 25.4 / 0.28;
  const mpu = METERS_PER_UNIT[units];
  const inchesPerMeter = 39.37;

  return parseFloat(scale) / (mpu * inchesPerMeter * dpi);
};
export const roundScale = (scale: number) => {
  let roundScale;
  if (scale < 100) {
    roundScale = Math.round(scale);
  }
  if (scale >= 100 && scale < 10000) {
    roundScale = Math.round(scale / 10) * 10;
  }
  if (scale >= 10000 && scale < 1000000) {
    roundScale = Math.round(scale / 100) * 100;
  }
  if (scale >= 1000000) {
    roundScale = Math.round(scale / 1000) * 1000;
  }
  return roundScale;
};
