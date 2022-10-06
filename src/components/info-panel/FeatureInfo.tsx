import React, { useEffect, useRef, useState } from 'react';

import uniqid from 'uniqid'

import useMap from '../../app/useMap';
import { parseFeatureInfo } from '../../utils/FeatureUtil';

import { IField, IIncludedFields, ILayer, IIncludedFieldsDictionary } from '../../MapCore/Models/config-model';
import { useProjectStore } from '../../app/projetStore';

const FeatureInfo = () => {
  const [featureInfo, setFeatureInfo] = useState('');
  const [featureInfoVisible, setFeatureInfoVisible] = useState(false);
  const [featureInfoPosition, setFeatureInfoPosition] = useState({ x: 0, y: 0 });
  const featureInfoRef = useRef<HTMLDivElement>(null);
  const map = useMap();
  const listProjects = useProjectStore(state => state.projects);
  const listLayers = listProjects.filter(project => {
    const filterLayers = project.Config.layer.filter(layer => {
      if (layer.options.visibility === true && layer.options.isbaselayer === false) {
        return layer;
      }
    });
    if (filterLayers.length > 0) {
      return project;
    }
  });

  useEffect(() => {
    if (!map) return;
    map.on('singleclick', (e) => {
      const layers = map.getLayers().getArray();
      layers.forEach(element => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'getSource' does not exist on type 'any'.
        const source = element.getSource()
        if (source.constructor.name === 'TileWMS') {
          const formats = source.getParams().info_formats ?? [0, 'text/plain'];
          let indexFormat = 0;
          if (formats.indexOf('text/plain') > 0) {
            indexFormat = formats.indexOf('text/plain');
          } else if (formats.indexOf('text/xml') > 0) {
            indexFormat = formats.indexOf('text/xml');
          } else if (formats.indexOf('application/vnd.ogc.gml') > 0) {
            indexFormat = formats.indexOf('application/vnd.ogc.gml');
          } else if (formats.indexOf('application/json') > 0) {
            indexFormat = formats.indexOf('application/json');
          } else if (formats.indexOf('text/html') === 0) {
            indexFormat = 1;
          }
          const url: string = source.getFeatureInfoUrl(e.coordinate, map.getView().getResolution(), map.getView().getProjection(), {
              INFO_FORMAT: formats[indexFormat],
              QUERY_LAYERS: source.getParams().layers,
            });
          if (url) {
            fetch(url)
              .then(response => response.text())
              .then(data => {
                const parsedFeature = parseFeatureInfo(data, formats[indexFormat]);
                setFeatureInfo(parsedFeature);
                setFeatureInfoVisible(true);
                setFeatureInfoPosition({ x: e.pixel[0], y: e.pixel[1] });
              })
              .catch(error => {
                console.error('Error:', error);
                setFeatureInfoVisible(false);
              });
          }
        }
      });
    })
  }, [map]);
  const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const compareIncludedFields = (includedFields: IIncludedFieldsDictionary, feature: any, featureDict: any) => {
    const attributes = [];
    if (Object.keys(includedFields).length > 1) {
      for (const key in includedFields) {
        const fieldName = key;
        if (typeof includedFields[fieldName] === 'object') {
          let fieldValue = feature[fieldName];
          let newFieldName = '';
          if (Object.keys(feature).indexOf(fieldName) > -1) {
            newFieldName = includedFields._capitalize ? capitalizeFirstLetter(includedFields[fieldName].name.toLowerCase()) : includedFields[fieldName].name;
            if ((includedFields[fieldName].type === 'symbol' && includedFields[fieldName].baseurl) ||
              (includedFields[fieldName].type === 'picture' && includedFields[fieldName].baseurl) ||
              (includedFields[fieldName].type === 'link' && includedFields[fieldName].baseurl)) {
              fieldValue = {
                url: includedFields[fieldName].baseurl + feature[fieldName] + includedFields[fieldName].filetype,
                type: includedFields[fieldName].type,
                name: feature[fieldName]
              };
            } else if (includedFields[fieldName].unit) {
              fieldValue += includedFields[fieldName].unit;
            } else if (includedFields[fieldName].type === 'boolean') {
              fieldValue = fieldValue === 't' ? 'Ja' : 'Nei';
            }
          } else if (Object.keys(feature).length === 1) {
            newFieldName = feature._capitalize ? capitalizeFirstLetter(fieldName.toLowerCase()) : fieldName;
          } else {
            newFieldName = includedFields._capitalize ? capitalizeFirstLetter(includedFields[fieldName].name.toLowerCase()) : includedFields[fieldName].name;
          }
          if (featureDict !== undefined) {
            for (const dict in featureDict) {
              if (newFieldName === dict) {
                fieldValue = featureDict[dict][fieldValue];
              }
            }
          }
          attributes.push([newFieldName, fieldValue]);
        }
      }
    } else {
      for (const fieldName1 in feature) {
        const tmpFieldName = feature._capitalize ? capitalizeFirstLetter(fieldName1.toLowerCase()) : fieldName1;
        attributes.push([tmpFieldName, feature[fieldName1]]);
      }
    }
    console.log('attributes', attributes);
    return attributes;
  }
  const readIncludedFields = (includedFields: any): IIncludedFieldsDictionary => {
    const includedFieldsDict: IIncludedFieldsDictionary = {};
    if (includedFields.field) {
      if (includedFields.field.constructor !== Array) {
        includedFields.field = [includedFields.field];
      }
      includedFields.field.forEach((field: any) => {
        if (field.type === 'picture' || field.type === 'link' || field.type === 'symbol' || field.type === 'boolean') {
          includedFieldsDict[field.name] = {
            name: field.alias ? field.alias : field.name,
            type: field.type
          };
          if (field.baseurl) {
            includedFieldsDict[field.name].baseurl = field.baseurl;
            includedFieldsDict[field.name].filetype = field.filetype ? '.' + field.filetype : '';
          }
        } else {
          includedFieldsDict[field.name] = {
            name: field.alias ? field.alias : field.name,
            unit: field.unit ? field.unit : ''
          };
        }
      });
    }
    // if (includedFields.capitalize === 'true') {
    //   includedFieldsDict['_capitalize'] = true;
    // }
    console.log('includedFieldsDict' , includedFieldsDict);
    return includedFieldsDict;
  }
  const applyIncludedFields = (parsedResult: any, subLayer: any) => {
    if (!subLayer.includedfields) { return parsedResult; }
    const includedFields = readIncludedFields(subLayer.includedfields);
    const parsedResultsIncluded: any[][][] = [];
    parsedResult.forEach(function (feature: any) {
      parsedResultsIncluded.push(compareIncludedFields(includedFields, feature, subLayer.featureDict));
    });
    console.log('parsedResultsIncluded', parsedResultsIncluded);
    return parsedResultsIncluded;
  }
  const testFormat = (s: any) => {
    if (typeof s === 'object') return 'isObject'
    const rX = /^((\d+)|(true|false)|(\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}\+\d{2})|([\w\W]+))$/i
    const M = rX.exec(s)
    if (!M) return ''
    switch (M[1]) {
      case M[2]: return 'isNumeric'
      case M[3]: return 'isBoolean'
      case M[4]: return 'isDate'
      case M[5]: {
        if (M[5].length === 50 || M[5].length === 194) {
          return 'isBboxInternal'
        } else if (M[5].startsWith('{"type":"Point"')) {
          return 'isBboxJsonPoint'
        } else if (M[5].startsWith('{"type":"Polygon"')) {
          return 'isBboxJsonPolygon'
        } else if (M[5].startsWith('BOX(')) {
          return 'isBboxSimple'
        } else {
          return 'isString'
        }
      }
      default: return false
    }
  }
  const prepareItemFormat = (v: any) => {
    const test = testFormat(v)
    switch (test) {
      case 'isNumeric': return <>{v}</>
      case 'isBoolean': return <>{v}</>
      case 'isDate': return <>{v}</> // TODO: formatt?
      case 'isBboxInternal': return <>BBOX db internal</> // TODO: klikke for å vise?
      case 'isBboxJsonPoint': return <>BBOX point</> // TODO: klikke for å vise?
      case 'isBboxJsonPolygon': return <>BBOX polygon</> // TODO: klikke for å vise?
      case 'isBboxSimple': return <>{v}</> // TODO: klikke for å vise?
      case 'isString': return <>{v}</>
      default: return <></>
    }
  }
  const prepareFeature = (info: any) => {
    const layers = []
    for (const key in info) {
      const configLayer = listLayers.map((project) =>
        project.Config.layer
          .filter(w => w.options.visibility === true)
          .filter(w => w.params.layers === key)
          .map(
            (wmsLayer: ILayer, wmsIndex: number) => wmsLayer
          )
      ).filter(w => w.length > 0);
      if (configLayer.length === 0) return <></>

      const test = applyIncludedFields(info[key], configLayer[0][0]).forEach((feature: any) => {
        console.log(feature);
        const attributes = feature.map((item: any) => {
          return (
            <tr key={item[0]}>
              <td>{item[0]}</td>
              <td>{item[1]}</td>
            </tr>
          )
        })
        layers.push(
          <div key={key}>
            <h3>{key}</h3>
            <table>
              <tbody>
                {attributes}
              </tbody>
            </table>
          </div>
        )
      })
      console.log(test);

      const layer = info[key]
      const featureRow = []
      if (Array.isArray(layer)) {
        for (const key in layer) {
          if (key !== 'name') {
            const feature = layer[key]
            for (const key in feature) {
              const items = feature[key]
              if (typeof items !== "string") {
                for (const [key, value] of Object.entries(items)) {
                  featureRow.push(<li key={uniqid(key)}><i>{key} </i> = <strong>{prepareItemFormat(value)}</strong> </li>)
                }
              } else {
                featureRow.push(<li key={uniqid(key)}><i>{'FeatureID'} </i> = <strong>{prepareItemFormat(items)}</strong> </li>)
              }
            }
          }
        }
      } else {
        for (const [key, value] of Object.entries(layer)) {
          featureRow.push(<li key={uniqid(key)}><i>{key} </i> = <strong>{prepareItemFormat(value)}</strong> </li>)
        }
      }
      layers.push(<React.Fragment key={uniqid(key)}><h3>{key}</h3><ul>{featureRow}</ul></React.Fragment>)
    }
    return (<div className='ulContainer' key={uniqid()}>{layers}</div>)
  }
  const featureContent = () => {
    console.log('featureInfo', featureInfo);
    if (Array.isArray(featureInfo)) {
      return featureInfo.map((info) => prepareFeature(info))
    } else {
      return <div>No info</div>
    }
  }
  return (
    <>
      <div
        ref={featureInfoRef}
        className="feature-info"
        style={{
          display: featureInfoVisible ? 'block' : 'none',
          left: featureInfoPosition.x,
          top: featureInfoPosition.y,
        }}
      >
        {featureContent()}
      </div>

    </>
  );
}

export default FeatureInfo;
