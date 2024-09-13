import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import EsriMap from '@arcgis/core/Map';
import UniqueValueRenderer from '@arcgis/core/renderers/UniqueValueRenderer';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';

import { ASSETFIELDNAME, ASSETLAYERMAPID, ASSETLAYERPORTALID } from './assetLayer';

/**
 * Returns an EsriMap instance with a satellite basemap and a feature layer
 * containing the asset with the given assetId.
 *
 * @param {string} [assetId] - the id of the asset to filter on the layer
 * @returns {EsriMap} an EsriMap instance
 */
export function getSceneMap(assetId?: string): EsriMap {
  const featureLayer = new FeatureLayer({
    id: ASSETLAYERMAPID,
    portalItem: {
      id: ASSETLAYERPORTALID,
    },
    labelingInfo: [],
    definitionExpression: `${ASSETFIELDNAME} = '${assetId}'`,
  });

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

  featureLayer.renderer = uniqueValueRenderer;

  return new EsriMap({
    basemap: 'satellite',
    layers: [featureLayer],
    ground: undefined,
  });
}
