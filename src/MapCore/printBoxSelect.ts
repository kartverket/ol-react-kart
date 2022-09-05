import { OlHTMLAttributes } from 'react';

import Feature from 'ol/Feature.js';
import Map from 'ol/Map';
import { unByKey } from 'ol/Observable';
import { Coordinate } from 'ol/coordinate';
import { MultiPolygon, Point, Polygon } from 'ol/geom';
import { DragPan } from 'ol/interaction';
import { Vector as VectorLayer } from 'ol/layer.js';
import { getTransform } from 'ol/proj';
import { Vector as VectorSource } from 'ol/source.js';
import { Fill, Stroke, Style } from 'ol/style';

import { IUtm, getLayerByName, getUTMZoneFromGeographicPoint } from '../utils/mapUtil';

export class PrintBoxSelect {
  isActive = false;
  printBoxSelectionLayer!: any;
  oldCenter!: Coordinate;
  oldUTM!: IUtm;
  scale = 25000;
  oldInteraction = {};
  cols = 4;
  rows = 3;
  pageMargin = 1.7; // cm
  pageWidth = 21 - this.pageMargin * 2; // 21cm = A4 width
  pageHeight = 29.7 - this.pageMargin * 2;
  eventKeys: any = {};
  orientation = 'portrait';
  rotation = true;
  map: Map;

  constructor() {
    this.map = window.olMap;
  }

  toggleOrientation = () => {
    const tmpWidth = this.pageWidth;
    this.pageWidth = this.pageHeight;
    this.pageHeight = tmpWidth;
  };

  UTMZoneNotChanged = (): boolean => {
    if (!this.isActive) {
      return true;
    }
    const mapCenterGeographic = this.getMapCenterGeographic(this.getMapCenter());
    const UTM = getUTMZoneFromGeographicPoint(
      mapCenterGeographic.getCoordinates()[0],
      mapCenterGeographic.getCoordinates()[1],
    );
    if (UTM !== this.oldUTM) {
      this.createFrame();
      return false;
    }
    return true;
  };

  deregisterMouseEvents = () => {
    for (const eventKey in this.eventKeys) {
      unByKey(this.eventKeys[eventKey]);
      this.eventKeys[eventKey] = false;
    }
  };

  registerMouseEvents = () => {
    this.eventKeys['changecenter'] = this.map.getView().on('change:center', () => {
      if (this.UTMZoneNotChanged()) {
        const deltaCenter = this.findDelta();
        this.moveLayer(deltaCenter);
      }
    });

    this.eventKeys['moveend'] = this.map.on('moveend', () => {
      this.getExtentOfPrintBox();
    });
  };

  getExtentOfPrintBox = () => {
    const mapCenter = this.getMapCenter();
    const mapCenterActiveUTMZone = this.getMapCenterActiveUTMZone(mapCenter);
    const printBox = this.getPrintBox(mapCenterActiveUTMZone);
    const biSone = this.getBiSone(printBox, this.oldUTM);
    const extent = {
      bbox: [printBox.left, printBox.bottom, printBox.right, printBox.top],
      center: mapCenterActiveUTMZone.getCoordinates(),
      projection: this.oldUTM.epsg,
      sone: this.oldUTM.sone,
      biSone: biSone,
      scale: this.scale,
    };
    return extent;
  };

  getMapCenter = () => {
    return this.map.getView().getCenter() ?? [0, 0];
  };

  getMapCenterGeographic = (mapCenter: Coordinate) => {
    const mapCenterGeographic = new Point(mapCenter);
    if (this.rotation) {
      mapCenterGeographic.applyTransform(getTransform('EPSG:25833', 'EPSG:4326'));
    }
    return mapCenterGeographic;
  };

  findDelta = () => {
    const newCenter = this.map.getView().getCenter() ?? [0, 0];
    const deltaCenter = [newCenter[0] - this.oldCenter[0], newCenter[1] - this.oldCenter[1]];
    this.oldCenter = newCenter;
    return deltaCenter;
  };

  moveLayer = (deltaCenter: any[]) => {
    const source = this.printBoxSelectionLayer.getSource();
    const feature = source.getFeatures()[0];
    feature.getGeometry().translate(deltaCenter[0], deltaCenter[1]);
  };

  getBiSone = (geometry: { left?: any; bottom?: any; right?: any; top?: any }, sone: IUtm): string => {
    const lonLatBL = new Point([geometry.left, geometry.bottom]);
    lonLatBL.applyTransform(getTransform(sone.epsg, 'EPSG:4326'));
    const soneBL = getUTMZoneFromGeographicPoint(lonLatBL.getCoordinates()[0], lonLatBL.getCoordinates()[1]).sone;
    if (soneBL !== sone.sone) {
      return soneBL;
    }

    const lonLatTL = new Point([geometry.right, geometry.top]);
    lonLatTL.applyTransform(getTransform(sone.epsg, 'EPSG:4326'));
    const soneTL = getUTMZoneFromGeographicPoint(lonLatTL.getCoordinates()[0], lonLatTL.getCoordinates()[1]).sone;
    if (soneTL !== sone.sone) {
      return soneTL;
    }

    const lonLatBR = new Point([geometry.right, geometry.bottom]);
    lonLatBR.applyTransform(getTransform(sone.epsg, 'EPSG:4326'));
    const soneBR = getUTMZoneFromGeographicPoint(lonLatBR.getCoordinates()[0], lonLatBR.getCoordinates()[1]).sone;
    if (soneBR !== sone.sone) {
      return soneBR;
    }

    const lonLatTR = new Point([geometry.right, geometry.top]);
    lonLatTR.applyTransform(getTransform(sone.epsg, 'EPSG:4326'));
    const soneTR = getUTMZoneFromGeographicPoint(lonLatTR.getCoordinates()[0], lonLatTR.getCoordinates()[1]).sone;
    if (soneTR !== sone.sone) {
      return soneTR;
    }
    return '';
  };

  createFrame = () => {
    if (getLayerByName(this.map, 'printBoxSelectionLayer')) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.map.removeLayer(getLayerByName(this.map, 'printBoxSelectionLayer') as any);
    }
    const mapCenter = this.getMapCenter();
    this.oldCenter = mapCenter;

    const printBoxSelect = this.getPrintBox(this.getMapCenterActiveUTMZone(mapCenter));
    const multiPolygonGeometry = this.getMultiPolygonGeometry(this.getGrid(printBoxSelect), mapCenter);

    const feature = new Feature(multiPolygonGeometry);
    feature.setStyle(this.getStyle());

    const vectorSource = new VectorSource();
    vectorSource.addFeature(feature);

    this.printBoxSelectionLayer = new VectorLayer({
      source: vectorSource,
      updateWhileAnimating: true,
      updateWhileInteracting: true,
      properties: {
        name: 'printBoxSelectionLayer',
      },
    });

    this.map.addLayer(this.printBoxSelectionLayer);
    this.printBoxSelectionLayer.setZIndex(2000);
  };

  getUTMZoneFromMapCenter = (mapCenter: any) => {
    const mapCenterGeographic = this.getMapCenterGeographic(mapCenter);
    const UTM = getUTMZoneFromGeographicPoint(
      mapCenterGeographic.getCoordinates()[0],
      mapCenterGeographic.getCoordinates()[1],
    );
    this.oldUTM = UTM;
    return UTM;
  };

  getMultiPolygonGeometry = (coordinates: any[], mapCenter: any) => {
    const multiPolygonGeometry = new MultiPolygon(coordinates);
    if (this.rotation) {
      multiPolygonGeometry.applyTransform(getTransform(this.getUTMZoneFromMapCenter(mapCenter).epsg, 'EPSG:25833'));
    }
    return multiPolygonGeometry;
  };

  getMapCenterActiveUTMZone = (mapCenter: any) => {
    const mapCenterActiveUTMZone = new Point(mapCenter);
    if (this.rotation) {
      mapCenterActiveUTMZone.applyTransform(getTransform('EPSG:25833', this.getUTMZoneFromMapCenter(mapCenter).epsg));
    } else {
      this.getUTMZoneFromMapCenter(mapCenter);
    }
    return mapCenterActiveUTMZone;
  };

  getPrintBox = (mapCenterActiveUTMZone: { getCoordinates: () => number[] }) => {
    const width = (this.scale * this.pageWidth * this.cols) / 100;
    const height = (this.scale * this.pageHeight * this.rows) / 100;
    const left = mapCenterActiveUTMZone.getCoordinates()[0] - width / 2;
    const bottom = mapCenterActiveUTMZone.getCoordinates()[1] - height / 2;
    const printBoxSelect = {
      width: width,
      height: height,
      left: left,
      right: left + width,
      bottom: bottom,
      top: bottom + height,
    };
    return printBoxSelect;
  };

  getGrid = (printBoxSelect: { left?: any; right?: any; bottom?: any; top?: any }) => {
    const coordinates = [];
    let tempLeft = printBoxSelect.left;
    for (let c = 1; c <= this.cols; c++) {
      const tempRight = tempLeft + (printBoxSelect.right - printBoxSelect.left) / this.cols;
      let tempBottom = printBoxSelect.bottom;
      for (let r = 1; r <= this.rows; r++) {
        const tempTop = tempBottom + (printBoxSelect.top - printBoxSelect.bottom) / this.rows;
        const lowerLeft = new Point([tempLeft, tempBottom]);
        const upperLeft = new Point([tempLeft, tempTop]);
        const upperRight = new Point([tempRight, tempTop]);
        const lowerRight = new Point([tempRight, tempBottom]);
        const tempBox = new Polygon([
          [
            lowerLeft.getCoordinates(),
            upperLeft.getCoordinates(),
            upperRight.getCoordinates(),
            lowerRight.getCoordinates(),
            lowerLeft.getCoordinates(),
          ],
        ]);
        coordinates.push(tempBox.getCoordinates());
        tempBottom = tempTop;
      }
      tempLeft = tempRight;
    }
    return coordinates;
  };

  getStyle = () => {
    return new Style({
      stroke: new Stroke({
        color: '#ee9900',
        width: 1,
      }),
      fill: new Fill({
        color: 'rgba(238,153,0,0.4)',
      }),
    });
  };

  removeKineticDragPan = (copyOld: boolean) => {
    this.map.getInteractions().forEach((interaction: any) => {
      if (interaction instanceof DragPan) {
        this.map.removeInteraction(interaction);
        if (copyOld) {
          this.oldInteraction = interaction;
        }
      }
    });
  };

  activate = (options: {
    scale: number;
    pageWidth: number | undefined;
    pageHeight: number | undefined;
    cols: number;
    rows: number;
    orientation: string;
    rotation: boolean;
  }) => {
    this.scale = options.scale;
    if (options.pageWidth !== undefined) {
      this.pageWidth = options.pageWidth;
    }
    if (options.pageHeight !== undefined) {
      this.pageHeight = options.pageHeight;
    }
    this.cols = options.cols;
    this.rows = options.rows;
    if (options.orientation !== undefined && this.orientation !== options.orientation) {
      this.toggleOrientation();
    }
    this.orientation = options.orientation;
    this.rotation = options.rotation || true;
    this.registerMouseEvents();
    this.createFrame();
  };

  deactivate = () => {
    this.deregisterMouseEvents();
    if (getLayerByName(this.map, 'printBoxSelectionLayer')) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.map.removeLayer(getLayerByName(this.map, 'printBoxSelectionLayer') as any);
    }
  };
}
