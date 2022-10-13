import React, { useEffect, useRef, useState } from 'react';

import uniqid from 'uniqid';

import { IField, IIncludedFields, IIncludedFieldsDictionary, ILayer } from '../../MapCore/Models/config-model';
import { useProjectStore } from '../../app/projetStore';
import useMap from '../../app/useMap';
import { parseFeatureInfo } from '../../utils/FeatureUtil';

const FeatureInfo = () => {
  const [featureInfos, setFeatureInfo] = useState<any[]>([]);
  const featureInfoRef = useRef<HTMLDivElement>(null);
  const map = useMap();
  const listProjects = useProjectStore((state: { projects: any }) => state.projects);
  const activeProject = useProjectStore((state: { activeProject: any }) => state.activeProject);
  const listLayers = listProjects.filter((project: { Config: { layer: any[] } }) => {
    const filterLayers = project.Config.layer.filter(
      (layer: { options: { visibility: boolean; isbaselayer: boolean } }) => {
        if (layer.options.visibility === true && layer.options.isbaselayer === false) {
          return layer;
        }
      },
    );
    if (filterLayers.length > 0) {
      return project;
    }
  });
  const onMapClick = (e: any) => {
    if (!map) return;
    setFeatureInfo([]);
    const layers = map.getLayers().getArray();
    layers.forEach(element => {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'getSource' does not exist on type 'any'.
      const source = element.getSource();
      if (source.constructor.name === 'TileWMS') {
        const info_format = source.getParams().info_format ?? 'text/plain';
        const url: string = source.getFeatureInfoUrl(
          e.coordinate,
          map.getView().getResolution(),
          map.getView().getProjection(),
          {
            INFO_FORMAT: info_format,
            QUERY_LAYERS: source.getParams().layers,
          },
        );
        const layernames = source.getParams().layers ?? '';
        if (url) {
          fetch(url)
            .then(response => response.text())
            .then(data => {
              const parsedFeature = parseFeatureInfo(data, info_format);
              if (parsedFeature) {
                setFeatureInfo(prevFeatures => [...prevFeatures, { [layernames]: parsedFeature }]);
              } else {
                setFeatureInfo(prevFeatures => [...prevFeatures, { [layernames]: '' }]);
              }
            })
            .catch(error => {
              console.error('Error:', error);
            });
        }
      } else if (source.constructor.name === 'VectorSource') {
        const getExtentForCoordinate = (coordinate: any, pixelTolerance: any, resolution: any) => {
          const toleranceInMapUnits = pixelTolerance * resolution;
          const minN = coordinate[0] - toleranceInMapUnits;
          const minE = coordinate[1] - toleranceInMapUnits;
          const maxN = coordinate[0] + toleranceInMapUnits;
          const maxE = coordinate[1] + toleranceInMapUnits;
          return [minN, minE, maxN, maxE];
        };
        const extent = getExtentForCoordinate(e.coordinate, 5, map.getView().getResolution());
        const features = source.forEachFeatureInExtent(extent, (feature: any) => {
          return feature.getProperties();
        });
        const feature = [features];
        if (features) {
          setFeatureInfo(prevFeatures => [...prevFeatures, ...feature]);
        }
      }
    });
  };
  useEffect(() => {
    if (!map) return;
    map.on('click', onMapClick);
    return () => {
      map.un('click', onMapClick);
    };
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
            const attributes = compareIncludedFields(includedFields, items[0], activeProject.Config.featureDict);
            parsedResultsIncluded.push(attributes);
          }
        }
      }
    } else {
      for (const [key, value] of Object.entries(featureInLayer)) {
        const attributes = compareIncludedFields(includedFields, value, activeProject.Config.featureDict);
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
    const layers: any[] = [];
    for (const key in info) {
      const featureInLayer = info[key];
      const configLayer = listLayers
        .map((project: { Config: { layer: any[] } }) =>
          project.Config.layer
            .filter((w: { options: { visibility: boolean } }) => w.options.visibility === true)
            .filter((w: { params: { layers: any } }) => w.params.layers === (featureInLayer.name ?? key))
            .map((wmsLayer: ILayer) => wmsLayer),
        )
        .filter((w: string | any[]) => w.length > 0);
      if (configLayer.length === 0)
        return (
          <>
            <span>Ingen lag valgt</span>
          </>
        );
      if (featureInLayer === '')
        return (
          <>
            <span>Ingen data</span>
          </>
        );
      const appliedFields = applyIncludedFields(featureInLayer, configLayer[0][0]);
      appliedFields.map((feature: any) => {
        if (!Array.isArray(feature)) return <></>;
        const attributes = feature.map((attribute: any) => {
          if (!attribute[1]) {
            return null;
          }
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
                  <div className="col-5">
                    {attribute[1].type != 'symbol' ? <span className="text-capitalize">{attribute[0]}</span> : null}
                  </div>
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
            <h3 className="text-capitalize">{key}</h3>
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
    if (Array.isArray(featureInfos)) {
      return featureInfos.map(info => prepareFeature(info));
    } else {
      return prepareFeature(featureInfos);
    }
  };
  return (
    <>
      <div ref={featureInfoRef} className="feature-info">
        {featureContent()}
      </div>
    </>
  );
};

export default FeatureInfo;
