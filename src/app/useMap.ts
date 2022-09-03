import { useContext } from 'react';

import OlMap from 'ol/Map';

import MapContext from './mapContext';

export const useMap = (): OlMap | null => {
  return useContext(MapContext);
};

export default useMap;
