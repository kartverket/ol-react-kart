import { Vector as VectorSource } from 'ol/source';
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
interface VectorProps {
    features: Feature<Geometry>[]
}
function vector({ features }: VectorProps ) {
    return new VectorSource({
        features
    });
}
export default vector;