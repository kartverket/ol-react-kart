import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import { Vector as VectorSource } from 'ol/source';

interface IFeatures {
  features: Feature<Geometry>[];
}

export const vector = function ( features: IFeatures ) {
  return new VectorSource (
    features
  );
} 