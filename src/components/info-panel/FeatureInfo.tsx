import React, { useEffect, useRef, useState } from 'react';

import uniqid from 'uniqid';

import { IField, IIncludedFields, IIncludedFieldsDictionary, ILayer } from '../../MapCore/Models/config-model';
import { useProjectStore } from '../../app/projetStore';
import useMap from '../../app/useMap';
import { parseFeatureInfo } from '../../utils/FeatureUtil';

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
    map.on('singleclick', e => {
      const layers = map.getLayers().getArray();
      layers.forEach(element => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'getSource' does not exist on type 'any'.
        const source = element.getSource();
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
          const url: string = source.getFeatureInfoUrl(
            e.coordinate,
            map.getView().getResolution(),
            map.getView().getProjection(),
            {
              INFO_FORMAT: formats[indexFormat],
              QUERY_LAYERS: source.getParams().layers,
            },
          );
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
    });
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
            newFieldName = includedFields._capitalize
              ? capitalizeFirstLetter(includedFields[fieldName].name.toLowerCase())
              : includedFields[fieldName].name;
            if (
              (includedFields[fieldName].type === 'symbol' && includedFields[fieldName].baseurl) ||
              (includedFields[fieldName].type === 'picture' && includedFields[fieldName].baseurl) ||
              (includedFields[fieldName].type === 'link' && includedFields[fieldName].baseurl)
            ) {
              fieldValue = {
                url: includedFields[fieldName].baseurl + feature[fieldName] + includedFields[fieldName].filetype,
                type: includedFields[fieldName].type,
                name: feature[fieldName],
              };
            } else if (includedFields[fieldName].unit) {
              fieldValue += includedFields[fieldName].unit;
            } else if (includedFields[fieldName].type === 'boolean') {
              fieldValue = fieldValue === 't' ? 'Ja' : 'Nei';
            }
          } else if (Object.keys(feature).length === 1) {
            newFieldName = feature._capitalize ? capitalizeFirstLetter(fieldName.toLowerCase()) : fieldName;
          } else {
            newFieldName = includedFields._capitalize
              ? capitalizeFirstLetter(includedFields[fieldName].name.toLowerCase())
              : includedFields[fieldName].name;
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
    return attributes;
  };
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
            type: field.type,
          };
          if (field.baseurl) {
            includedFieldsDict[field.name].baseurl = field.baseurl;
            includedFieldsDict[field.name].filetype = field.filetype ? '.' + field.filetype : '';
          }
        } else {
          includedFieldsDict[field.name] = {
            name: field.alias ? field.alias : field.name,
            unit: field.unit ? field.unit : '',
          };
        }
      });
    }
    // if (includedFields.capitalize === 'true') {
    //   includedFieldsDict['_capitalize'] = true;
    // }
    return includedFieldsDict;
  };
  const applyIncludedFields = (featureInLayer: any, subLayer: any) => {
    if (!subLayer.includedfields) {
      return featureInLayer;
    }
    const includedFields = readIncludedFields(subLayer.includedfields);
    const parsedResultsIncluded: any[][][] = [];
    if (Array.isArray(featureInLayer)) {
      for (const key in featureInLayer) {
        if (key !== 'name') {
          const feature = featureInLayer[key];
          for (const key in feature) {
            const items = feature[key];
            const attributes = compareIncludedFields(includedFields, items, subLayer.featuredict);
            parsedResultsIncluded.push(attributes);
          }
        }
      }
    } else {
      for (const [key, value] of Object.entries(featureInLayer)) {
        const attributes = compareIncludedFields(includedFields, value, subLayer.featuredict);
        parsedResultsIncluded.push(attributes);
      }
    }
    return parsedResultsIncluded;
  };
  const testFormat = (s: any) => {
    if (typeof s === 'object') return 'isObject';
    const rX = /^((\d+)|(true|false)|(\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}\+\d{2})|([\w\W]+))$/i;
    const M = rX.exec(s);
    if (!M) return '';
    switch (M[1]) {
      case M[2]:
        return 'isNumeric';
      case M[3]:
        return 'isBoolean';
      case M[4]:
        return 'isDate';
      case M[5]: {
        if (M[5].length === 50 || M[5].length === 194) {
          return 'isBboxInternal';
        } else if (M[5].startsWith('{"type":"Point"')) {
          return 'isBboxJsonPoint';
        } else if (M[5].startsWith('{"type":"Polygon"')) {
          return 'isBboxJsonPolygon';
        } else if (M[5].startsWith('BOX(')) {
          return 'isBboxSimple';
        } else {
          return 'isString';
        }
      }
      default:
        return false;
    }
  };
  const prepareItemFormat = (v: any) => {
    const test = testFormat(v);
    switch (test) {
      case 'isNumeric':
        return <>{v}</>;
      case 'isBoolean':
        return <>{v}</>;
      case 'isDate':
        return <>{v}</>; // TODO: formatt?
      case 'isBboxInternal':
        return <>BBOX db internal</>; // TODO: klikke for å vise?
      case 'isBboxJsonPoint':
        return <>BBOX point</>; // TODO: klikke for å vise?
      case 'isBboxJsonPolygon':
        return <>BBOX polygon</>; // TODO: klikke for å vise?
      case 'isBboxSimple':
        return <>{v}</>; // TODO: klikke for å vise?
      case 'isString':
        return <>{v}</>;
      default:
        return <></>;
    }
  };
  const showImage = (url: string, name: string) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      const w = window.open('');
      if (w) {
        w.document.write(img.outerHTML);
        w.document.title = name;
      }
    };
  };
  const prepareFeature = (info: any) => {
    const layers:any[] = [];
    for (const key in info) {
      const featureInLayer = info[key];
      const configLayer = listLayers
        .map(project =>
          project.Config.layer
            .filter(w => w.options.visibility === true)
            .filter(w => w.params.layers === key)
            .map((wmsLayer: ILayer, wmsIndex: number) => wmsLayer),
        )
        .filter(w => w.length > 0);
      if (configLayer.length === 0) return <></>;

      const appliedFields = applyIncludedFields(featureInLayer, configLayer[0][0]);
      appliedFields.map((feature: any) => {
        const attributes = feature.map((attribute: any) => {
          console.log(attribute);
          return (
            <div key={attribute[0]}>
              <li className="ist-group-item">
                <div className="row">
                  <div className="col-4"></div>
                  {attribute[1].type == 'symbol' ? <img className="symbol-image" src={attribute[1].url} /> : null}
                </div>
              </li>
              <li className="ist-group-item">
                <div className="row">
                  <div className="col-5">{attribute[1].type != 'symbol' ? <span className='text-capitalize'>{attribute[0]}</span> : null}</div>
                  {attribute[1].type == 'picture' ? (
                    <div className="col-5" onClick={() => showImage(attribute[1].url, attribute[1].name)}>
                      <img className="scale-image" src={attribute[1].url} />
                      <span>{attribute[1].name}</span>
                    </div>
                  ) : null}
                  {attribute[1].type == 'link' ? (
                    <div className="col-5">
                      {attribute[1].url ? (
                        <a className="text-info" href={attribute[1].url} target="_blank" rel="noopener noreferrer">
                          {' '}
                          <span>{attribute[1].name}</span>
                        </a>
                      ) : null}
                    </div>
                  ) : null}
                  {!attribute[1].type ? (
                    <div className="col-5">
                      <span>{attribute[1]}</span>
                    </div>
                  ) : null}
                </div>
              </li>
            </div>
          );
        });
        layers.push(
          <div key={key}>
            <h3>{key}</h3>
            <ul className="list-group list-group-flush closeable-subcontent">{attributes}</ul>
          </div>,
        );
      });
    }
    return (
      <div className="ulContainer" key={uniqid()}>
        {layers}
      </div>
    );
  };
  const featureContent = () => {
    if (Array.isArray(featureInfo)) {
      return featureInfo.map(info => prepareFeature(info));
    } else {
      return <div>No info</div>;
    }
  };
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
};

export default FeatureInfo;
