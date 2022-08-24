import { Coordinate } from 'ol/coordinate';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point';
import { Vector as VectorLayer } from 'ol/layer.js';
import { transform } from 'ol/proj';
import { Vector as VectorSource } from 'ol/source.js';
import { Icon, Style } from 'ol/style';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import pin_blue from '../../assets/pin-md-blueish.png';
import pin_orange from '../../assets/pin-md-orange.png';
import { useAppSelector, useEventDispatch } from '../../index';
import { setCenter } from '../../MapCore/Project/projectSlice';
import { selectSearch } from '../search/searchSlice';
import style from './SearchBar.module.scss';

const vectorSource = new VectorSource({});

const SearchResultsList = () => {
  const { t } = useTranslation();
  const searchResult = useAppSelector(selectSearch);
  const dispatch = useEventDispatch();
  const [expandedAdress, setStateAdress] = useState(false);
  const [expandedSsr, setStateSsr] = useState(true);
  const [expandedMatrikkel, setStateMatrikkel] = useState(false);
  let vectorLayer: any;

  useEffect(() => {
    vectorLayer = new VectorLayer({ source: vectorSource, properties: { name: 'searchResultsLayer' } });
    window.olMap.addLayer(vectorLayer);
    vectorSource.clear();
    return () => {
      vectorSource.clear();
      window.olMap.removeLayer(vectorLayer);
    };
  }, []);
  const icon_orange = new Style({
    image: new Icon({
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: pin_orange,
    }),
  });
  const icon_blue = new Style({
    image: new Icon({
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: pin_blue,
    }),
  });
  const showInfoMarker = (coordinate: Coordinate) => {
    const iconFeature = new Feature({ geometry: new Point(coordinate) });
    iconFeature.setStyle(icon_orange);
    vectorSource.addFeature(iconFeature);
  };
  const clearMarkers = () => {
    vectorSource.clear();
  };
  const constructPoint = (coord: { lon: number; lat: number; epsg: number | string }, epsgTo = 'EPSG:25833') => {
    const epsgFrom: string = typeof coord.epsg === 'number' ? 'EPSG:' + coord.epsg : coord.epsg;
    return transform([Number(coord.lon), Number(coord.lat)], epsgFrom, epsgTo);
  };
  const mouseOver = (coordinate: Coordinate) => {
    const features = vectorSource.getFeaturesAtCoordinate(coordinate);
    features.forEach(feature => feature.setStyle(icon_blue));
  };
  const mouseOut = (coordinate: Coordinate) => {
    const features = vectorSource.getFeaturesAtCoordinate(coordinate);
    features.forEach(feature => feature.setStyle(icon_orange));
  };
  return (
    <>
      <div id="ssrResult" className="search-result ps-2">
        <div
          onClick={() => {
            setStateSsr(!expandedSsr);
            clearMarkers();
          }}
          className={style.expandBtn}
        >
          <span className={style.ellipsisToggle}>{t('searchResult_placenames')}</span>
          <span className="badge text-bg-secondary">{searchResult?.ssr?.metadata?.totaltAntallTreff || 0}</span>
          <span className="ps-2 material-icons-outlined">{expandedSsr ? 'expand_less' : 'expand_more'}</span>
        </div>
        <div className={expandedSsr ? `${style.selected} ${style.open}` : style.selected}>
          {searchResult.ssr ? (
            <ul className="list-group list-group-flush search-result-list">
              {searchResult?.ssr?.navn?.map((result, index) => {
                if (expandedSsr) {
                  showInfoMarker(
                    constructPoint({
                      lon: result.representasjonspunkt.øst,
                      lat: result.representasjonspunkt.nord,
                      epsg: result.representasjonspunkt.koordsys,
                    }),
                  );
                }
                return (
                  <li
                    key={index}
                    className="list-group-item pt-2 pb-2 search-result-list-item"
                    onClick={() =>
                      dispatch(
                        setCenter({
                          lon: result.representasjonspunkt.øst,
                          lat: result.representasjonspunkt.nord,
                          epsg: result.representasjonspunkt.koordsys,
                        }),
                      )
                    }
                    onMouseOver={() =>
                      mouseOver(
                        constructPoint({
                          lon: result.representasjonspunkt.øst,
                          lat: result.representasjonspunkt.nord,
                          epsg: result.representasjonspunkt.koordsys,
                        }),
                      )
                    }
                    onMouseOut={() =>
                      mouseOut(
                        constructPoint({
                          lon: result.representasjonspunkt.øst,
                          lat: result.representasjonspunkt.nord,
                          epsg: result.representasjonspunkt.koordsys,
                        }),
                      )
                    }
                  >
                    <span>
                      {result.skrivemåte}, {result.navneobjekttype}{' '}
                      {result.kommuner ? 'i ' + result.kommuner[0].kommunenavn : null}
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      </div>

      <div id="addressREsult" className="search-result ps-2">
        <div
          onClick={() => {
            setStateAdress(!expandedAdress);
            clearMarkers();
          }}
          className={style.expandBtn}
        >
          <span className={style.ellipsisToggle}>{t('searchResult_addresses')}</span>
          <span className="badge text-bg-secondary">{searchResult?.adresser?.metadata?.totaltAntallTreff || 0}</span>
          <span className="material-icons-outlined">{expandedAdress ? 'expand_less' : 'expand_more'}</span>
        </div>
        <div className={expandedAdress ? `${style.selected} ${style.open}` : style.selected}>
          {searchResult.adresser ? (
            <ul className="list-group list-group-flush search-result-list">
              {searchResult?.adresser?.adresser?.map((result, index) => {
                if (expandedAdress) {
                  showInfoMarker(constructPoint(result.representasjonspunkt));
                }
                return (
                  <li
                    key={index}
                    className="list-group-item pt-2 pb-2 search-result-list-item"
                    onClick={() => dispatch(setCenter(result.representasjonspunkt))}
                    onMouseOver={() => mouseOver(constructPoint(result.representasjonspunkt))}
                    onMouseOut={() => mouseOut(constructPoint(result.representasjonspunkt))}
                  >
                    <span>
                      Adresse {result.adressetekst}, {result.objtype}{' '}
                      {result.kommunenavn ? 'i ' + result.kommunenavn : null}
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      </div>

      <div id="matrikkelResult" className="search-result ps-2">
        <div
          onClick={() => {
            setStateMatrikkel(!expandedMatrikkel);
            clearMarkers();
          }}
          className={style.expandBtn}
        >
          <span className={style.ellipsisToggle}>Eiendom</span>
          <span className="badge text-bg-secondary">{searchResult?.matrikkel?.metadata?.totaltAntallTreff || 0}</span>
          <span className="material-icons-outlined">{expandedMatrikkel ? 'expand_less' : 'expand_more'}</span>
        </div>
        <div className={expandedMatrikkel ? `${style.selected} ${style.open}` : style.selected}>
          {searchResult.matrikkel ? (
            <ul className="list-group list-group-flush search-result-list">
              {searchResult?.matrikkel?.adresser?.map((result, index) => {
                if (expandedMatrikkel) {
                  showInfoMarker(constructPoint(result.representasjonspunkt));
                }
                return (
                  <li
                    key={index}
                    className="list-group-item pt-2 pb-2 search-result-list-item"
                    onClick={() => dispatch(setCenter(result.representasjonspunkt))}
                    onMouseOver={() => mouseOver(constructPoint(result.representasjonspunkt))}
                    onMouseOut={() => mouseOut(constructPoint(result.representasjonspunkt))}
                  >
                    <span>
                      Adresse {result.adressetekst}, {result.objtype}{' '}
                      {result.kommunenavn ? 'i ' + result.kommunenavn : null}
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default SearchResultsList;
