import React from 'react';

import OlMap from 'ol/Map';

const MapContext = React.createContext<OlMap | null>(null);
export default MapContext;
