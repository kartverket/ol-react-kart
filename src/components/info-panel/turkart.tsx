import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { Coordinate } from 'ol/coordinate';

import { PrintBoxSelect } from '../../MapCore/printBoxSelect';
import useMap from '../../app/useMap';
import { generateLagTurkartUrl } from '../../utils/n3api';

export interface IScale {
  scale: number;
  label: string;
}
const scales: IScale[] = [
  {
    scale: 25000,
    label: '1: 25 000',
  },
  {
    scale: 50000,
    label: '1: 50 000',
  },
];

const Turkart = () => {
  const { t } = useTranslation();
  const [scale, setScale] = useState<number>(25000);
  const [titel, setTitel] = useState<string>('Turkart');
  const [coordinates, setCoordinates] = useState<Coordinate | null>(null);
  const [legend, setLegend] = useState<boolean>(false);
  const [trips, setTrips] = useState<boolean>(false);
  const [sweden, setSweden] = useState<boolean>(false);
  const [compass, setCompass] = useState<boolean>(false);
  const [createMapButtonOn, setCreateMapButtonOn] = useState<boolean>(false);
  const [mapAvailable, setMapAvailable] = useState<boolean>(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const map = useMap();

  let extent = { bbox: [0, 0, 0, 0], center: [0, 0], projection: 'EPSG:4326', sone: 0, biSone: 0, scale: 0 };

  const printBoxSelectTool: any = new PrintBoxSelect();
  printBoxSelectTool.activate({ scale: scale, cols: 4, rows: 3, extent });

  useEffect(() => {
    return () => {
      printBoxSelectTool.deactivate();
    };
  }, []);
  const deactivatePrintBoxSelect = () => {
    const printBox = document.getElementById('printBox');
    if (printBox) {
      printBox.style.display = 'none';
    }
  };
  const applyScale = () => {
    if (map) {
      console.log('applyScale: ', scale);
      //map.style.transform = `scale(${scale})`;
    }
  };
  const mapReadyForDownload = (data: any, url: string) => {
    const mapLink = url.replace('turkart2', '') + data.linkPdf;
    console.log('mapLink', mapLink);
  };
  const mapCreationFailed = (data: any) => {
    console.log('mapCreationFailed', data);
  };
  const createJson = () => {
    extent = printBoxSelectTool.getExtentOfPrintBox();
    return {
      map: {
        bbox: extent.bbox,
        center: extent.center,
        dpi: '300',
        layers: [
          {
            baseURL: 'https://wms.geonorge.no/skwms1/wms.toporaster4',
            customParams: {
              TRANSPARENT: 'false',
            },
            imageFormat: 'image/jpeg',
            layers: ['toporaster'],
            opacity: 1,
            type: 'WMS',
          },
        ],
        projection: extent.projection,
        sone: extent.sone,
        biSone: extent.biSone,
      },
      paging: 12,
      layout: 'A4 landscape',
      scale: extent.scale,
      titel: titel,
      legend: legend,
      trips: trips,
      sweden: sweden,
      compass: compass,
      link: 'https://norgeskart.no/',
      //link: "https://norgeskart.no/#!?z=" + activePosition.zoom + "&ma=" + Number(Math.round(activePosition.lat + 'e' + 2) + 'e-' + 2) + "&mo=" + Number(Math.round(activePosition.lon + 'e' + 2) + 'e-' + 2) + '&p=tur'
    };
  };
  const orderMap = () => {
    console.log('orderMap')
    const map = document.getElementById('map');
    if (map) {
      map.style.order = '1';
    }
    if (!extent.bbox) {
      return;
    }
    const json = createJson();
    const jsonData = JSON.stringify(json);
    const urlLagTurkart = generateLagTurkartUrl();
    fetch(urlLagTurkart, {
      method: 'POST',
      body: jsonData,
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => {
        return res.json();
      })
      .then(response => {
        mapReadyForDownload(response, urlLagTurkart);
      })
      .catch((error: any) => {
        mapCreationFailed(error);
      });
    setShowSpinner(true)
    //document.getElementById('spinner1').style.backgroundColor = 'rgba(0,0,0,0.4)';
    //document.getElementById('spinner1').style.transition = '0.8s';
  };
  const downloadMap = () => {
    const map = document.getElementById('map');
    if (map) {
      map.style.order = '2';
    }
  };
  return (
    <>
      <div>
        <p>{t('Turkart_info')}</p>
        <div>
          <label className="label label--sml label--dropdown" htmlFor="turkart_scale">
            {t('Scale')}
          </label>
          <select
            id="turkart_scale"
            className="dropdown"
            onChange={e => {
              setScale(Number(e.target.value));
              applyScale();
            }}
            value={scale}
          >
            {scales.map((item, index) => (
              <option value={item.scale} key={index}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <div className="inputField__wrapper">
          <label className="label label--sml" htmlFor="text">
            {t('Turkart_navn')}
          </label>
          <input
            type="text"
            placeholder={t('Turkart_navn_eks')}
            onChange={e => setTitel(e.target.value)}
            className="inputField"
          />
        </div>
        <div className="pt-4 mt-4">
          <div className="checkbox">
            <input id="showTrips" type="checkbox" onClick={() => setTrips(!trips)} />
            <label className="detail detail--sml" htmlFor="showSweden">
              {t('FremhevMerkedeStier')}
            </label>
          </div>
          <div className="checkbox">
            <input id="showLegend" type="checkbox" onClick={() => setLegend(!legend)} />
            <label className="detail detail--sml" htmlFor="showLegend">
              {t('AddLegend')}
            </label>
          </div>
          <div className="checkbox">
            <input id="showSweden" type="checkbox" onClick={() => setSweden(!sweden)} />
            <label className="detail detail--sml" htmlFor="showSweden">
              {t('AddSweden')}
            </label>
          </div>
          <div className="checkbox">
            <input id="showCompass" type="checkbox" onClick={() => setCompass(!compass)} />
            <label className="detail detail--sml" htmlFor="showCompass">
              {t('AddCompass')}
            </label>
          </div>
        </div>
        <div>
          {/*
          <button className="button button__green--primary button--xs"
            onClick={() => { deactivatePrintBoxSelect(); showSearchOptionsPanel() }}>{t('Cancel_txt')}
          </button>

 */}{' '}
          <button
            className="button button__green--primary button--xs"
            onClick={() => {
              orderMap();
            }}
            disabled={!createMapButtonOn}
          >
            {t('lagTurkart')}
          </button>
          <button
            className=""
            onClick={() => {
              downloadMap();
            }}
            disabled={!mapAvailable}
          >
            {t('DownloadMap')}
          </button>
        </div>
      </div>
    </>
  );
};

export default Turkart;
