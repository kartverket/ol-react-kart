import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import { Vector as VectorSource } from 'ol/source';
interface VectorProps {
  features: Feature<Geometry>[];
}
function vector({ features }: VectorProps) {
  return new VectorSource({
    features,
  });
}
export default vector;
