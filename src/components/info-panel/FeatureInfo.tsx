import React, { useEffect, useRef, useState } from 'react';

import uniqid from 'uniqid';

import MapBrowserEvent from 'ol/MapBrowserEvent';
import { Coordinate } from 'ol/coordinate';

import { IIncludedFieldsDictionary, ILayer, IProject } from '../../MapCore/Models/config-model';
import { useProjectStore } from '../../app/projetStore';
import useMap from '../../app/useMap';
import { parseFeatureInfo } from '../../utils/FeatureUtil';

const FeatureInfo = () => {
  const [showFeature, setShowFeature] = useState<number>(0);
  const [featureInfos, setFeatureInfo] = useState<any[]>([]);
  const featureInfoRef = useRef<HTMLDivElement>(null);
  const map = useMap();
  const listProjects = useProjectStore((state: { projects: IProject[] }) => state.projects);
  const activeProject = useProjectStore((state: { activeProject: IProject }) => state.activeProject);
  const listLayers = listProjects.filter((project: { Config: { layer: ILayer[] } }) => {
    const filterLayers = project.Config.layer.filter((layer: ILayer) => {
      if (layer.options.visibility === true && layer.options.isbaselayer === false) {
        return layer;
      }
    });
    if (filterLayers.length > 0) {
      return project;
    }
  });
  const onMapClick = (e: MapBrowserEvent<MouseEvent>) => {
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
            feature_count: 10
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
        const layername = element.get('guid') ?? '';
        const getExtentForCoordinate = (coordinate: Coordinate, pixelTolerance: number, resolution: number) => {
          const toleranceInMapUnits = pixelTolerance * resolution;
          const minN = coordinate[0] - toleranceInMapUnits;
          const minE = coordinate[1] - toleranceInMapUnits;
          const maxN = coordinate[0] + toleranceInMapUnits;
          const maxE = coordinate[1] + toleranceInMapUnits;
          return [minN, minE, maxN, maxE];
        };
        const extent = getExtentForCoordinate(e.coordinate, 5, map.getView().getResolution() as number);
        const features: any[] = [];
        source.forEachFeatureIntersectingExtent(extent, (feature: any) => {
          features.push(feature.getProperties());
        });
        if (features) {
          setFeatureInfo(prevFeatures => [...prevFeatures, { [layername]: features }]);
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
    if (subLayer.distributionProtocol === 'GEOJSON') {
      for (const key in featureInLayer) {
        const items = featureInLayer[key];
        if (Object.getPrototypeOf(items).constructor.name !== 'Polygon') {
          const attributes = compareIncludedFields(includedFields, items, activeProject.Config.featureDict);
          parsedResultsIncluded.push(attributes);
        }
      }
    } else {
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
    }
    return parsedResultsIncluded;
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
        .map((project: { Config: { layer: ILayer[] } }) =>
          project.Config.layer
            .filter((w: ILayer) => w.options.visibility === true)
            .filter((w: ILayer) => w.params.layers === (featureInLayer.name ?? key) || w.guid === key)
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
      appliedFields.map((feature: any, index: number) => {
        if (!Array.isArray(feature)) return <></>;
        const attributes = feature.map((attribute: any) => {
          if (!attribute[1]) {
            return null;
          }
          return (
            <div key={attribute[0]}>
              {attribute[1].type == 'symbol' ? (
                <div className="row">
                  <div className="col-4"></div>
                  {attribute[1].type == 'symbol' ? <img className="symbol-image" src={attribute[1].url} /> : null}
                </div>
              ) : null}
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
            </div>
          );
        });
        layers.push(
          <div key={key}>
            <h3 className="text-capitalize">{key}</h3>
            {attributes}
          </div>,
        );
      });
    }
    return (
      <div className="ulContainer" key={uniqid()}>
        {layers.map((layer: any, index: number) => (
          showFeature === index ? <div key={index}>{layer}</div> : null
        ))}
        <ul className="pagination">
          {layers.map((layer: any, index: number) => (
            <li key={index}>
              <a className="page-link" href="#" onClick={() => toggleShowFeature(index)}>
                {index + 1}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  const toggleShowFeature = (index: number) => {
    setShowFeature(showFeature === index ? 0 : index);
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
