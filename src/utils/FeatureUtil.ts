import * as fxparser from 'fast-xml-parser';

export const parseFeatureInfo = (data: any, format: string) => {
  switch (format) {
    case 'text/plain': {
      return parsePlainFeatureInfo(data);
    }
    case 'text/html': {
      return data;
    }
    case 'text/xml': {
      // ArcGis Simple XML with just fields
      // Or GML v ?
      return parseGmlFeatureInfo(data);
    }
    case 'text/xml; subtype=gml/3.1.1': {
      return parseGmlFeatureInfo(data);
    }
    case 'application/vnd.ogc.gml': {
      return parseGmlFeatureInfo(data);
    }
    case 'application/vnd.ogc.gml/3.1.1': {
      return parseGmlFeatureInfo(data);
    }
    case 'application/json': {
      return data;
    }
    default:
      return parsePlainFeatureInfo(data);
  }
};
export const parseCSV = (data: any) => {
  const cellDelims = ';';
  const lineDelims = '; ';
  let line = [];
  const lines = [];
  const layer: Record<string, object> = {};
  let layername = '';

  if (data.startsWith('@')) {
    layername = data.substring(data.indexOf('@') + 1, data.indexOf(' '));
    data = data.substring(data.indexOf(' ') + 1);
  }
  data = data.split(lineDelims);
  data.pop();
  for (let i = 0; i < data.length; i++) {
    line = data[i].split(cellDelims);
    lines.push(line);
  }
  layer[layername] = mergeArrayToObject(lines[0], lines[1]);
  return [layer];
};

export const parseGmlFeatureInfo = (data: any) => {
  const parser = new fxparser.XMLParser({
    ignoreAttributes: false,
    ignorePiTags: true,
    removeNSPrefix: true,
    attributeNamePrefix: '',
    allowBooleanAttributes: true,
  });
  const parsedGml = parser.parse(data);
  let getProperties;
  let parsedResult;
  let returnResult;
  if (Object.hasOwn(parsedGml, 'msGMLOutput')) {
    if (Object.hasOwn(parsedGml.msGMLOutput, parsedGml.msGMLOutput.name + '_layer')) {
      getProperties =
        parsedGml.msGMLOutput[parsedGml.msGMLOutput.name + '_layer'][parsedGml.msGMLOutput.name + '_feature'];
      parsedResult = [];
      if (getProperties.constructor !== Array) {
        getProperties = [getProperties];
      }
      for (let i = 0; i < getProperties.length; i++) {
        parsedResult.push(getProperties[i]);
      }
    } else {
      for (const element in parsedGml.msGMLOutput) {
        if (element.endsWith('layer')) {
          const layername = element.substring(0, element.indexOf('_layer'));
          getProperties = parsedGml.msGMLOutput[element][layername + '_feature'];
          parsedResult = [];
          if (getProperties.constructor !== Array) {
            getProperties = [getProperties];
          }
          for (let p = 0; p < getProperties.length; p++) {
            parsedResult.push(getProperties[p]);
          }
          returnResult = { [layername]: arrayToObject(parsedResult) };
        }
      }
    }
    return returnResult;
  } else if (parsedGml.FeatureCollection) {
    return [parsedGml.FeatureCollection.featureMember];
  }
};
const mergeArrayToObject = (array_1: any, array_2: any): object => {
  const obj: Record<string, string | number> = {};
  for (let i = 0; i < array_1.length; i++) {
    obj[array_1[i]] = array_2[i];
  }
  return obj;
};
const arrayToObject = (array: any) => {
  const obj = array.reduce((obj: any, item: any) => {
    if (typeof item === 'string' && item.length > 0) {
      const [key, value] = item.trim().split(' :');
      if (key && value) {
        obj[key] = value.replace(/'/g, '').trim();
      } else {
        obj[key] = '';
      }
    } else {
      if (item.objid) {
        obj[item.objid] = item;
      } else if (item.fid) {
        obj[item.fid] = item;
      } else {
        obj[0] = item;
      }
    }
    return obj;
  }, {});
  return obj;
};

export const parsePlainFeatureInfo = (data: any) => {
  let parsedFeatureInfo;
  if (data === 'no features were found' || data.includes('Search returned no results') || data.includes('Overforbruk'))
    return '';
  if (data.includes('Layer')) {
    const featureInfo = data.split('\n\n');
    featureInfo.shift();
    parsedFeatureInfo = featureInfo.map((layer: any) => {
      const r_layer: Record<string, string | number> = {};
      const subf = layer.split(/(Layer[^\r\n]*)/);
      subf.shift();
      const layerName = subf.splice(0, 1)[0].split('Layer ')[1].replace(/'/g, '');
      r_layer[layerName] = subf.map((f: any) => {
        let feature = f.split(/(Feature[^\r\n]*)/);
        feature.shift();
        if (Array.isArray(feature) && feature[0].length > 1) {
          feature = feature.map((item, index) => {
            if (index % 2 !== 0) {
              item = item.trim().replace(/=/g, ':').split('\n');
              return arrayToObject(item);
            }
          })
          feature = feature.filter((item: any) => item);
          return feature;
        } else {
          const feature1 = feature.splice(0, 1)[0].replace(/:/g, '').trim();
          return {
            feature: feature1,
          };
        }
      });
      return r_layer;
    });
  } else if (parseCSV(data).length !== 0) {
    parsedFeatureInfo = parseCSV(data);
  } else {
    parsedFeatureInfo = [data];
  }
  return parsedFeatureInfo;
};
