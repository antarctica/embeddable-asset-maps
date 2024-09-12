import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import EsriMap from '@arcgis/core/Map';
import UniqueValueRenderer from '@arcgis/core/renderers/UniqueValueRenderer';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';

import { ASSETFIELDNAME, ASSETLAYERMAPID, ASSETLAYERPORTALID } from './assetLayer';

const MAP_ASSET_FEATURELAYER = new FeatureLayer({
  id: ASSETLAYERMAPID,
  portalItem: {
    id: ASSETLAYERPORTALID,
  },
  labelingInfo: [],
});

export function getSceneMap(assetId?: string) {
  const uniqueValueRenderer = new UniqueValueRenderer({
    field: ASSETFIELDNAME,
    uniqueValueInfos: [
      {
        value: assetId ?? 'unknown',
        symbol: new SimpleMarkerSymbol({
          color: '#CC0033',
          outline: {
            width: 1,
            color: 'white',
          },
          size: 6,
        }),
      },
    ],
    defaultSymbol: new SimpleMarkerSymbol({
      color: [0, 0, 0, 0],
      outline: {
        width: 0.5,
        color: '#CC003340',
      },
      size: 4,
    }),
  });

  MAP_ASSET_FEATURELAYER.renderer = uniqueValueRenderer;

  return new EsriMap({
    basemap: 'satellite',
    layers: [MAP_ASSET_FEATURELAYER],
    ground: undefined,
  });
}
