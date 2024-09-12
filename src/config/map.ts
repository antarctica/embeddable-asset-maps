import Basemap from '@arcgis/core/Basemap';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import FeatureEffect from '@arcgis/core/layers/support/FeatureEffect';
import FeatureFilter from '@arcgis/core/layers/support/FeatureFilter';
import EsriMap from '@arcgis/core/Map';

import { ASSETFIELDNAME, ASSETLAYERMAPID, ASSETLAYERPORTALID } from './assetLayer';

export function getBasemapConfig([, lat]: [number, number]): Basemap {
  switch (true) {
    case lat < -60:
      return new Basemap({
        portalItem: {
          id: '435e23642bf94b83b07d1d3fc0c5c9d5',
        },
      });

    case lat > 60:
      return new Basemap({
        portalItem: {
          id: 'beee46578bc44e0bb47901f04400588a',
        },
      });

    default:
      return Basemap.fromId('streets-navigation-vector');
  }
}

export function getMap(center: [number, number], assetId: string) {
  return new EsriMap({
    basemap: getBasemapConfig(center),
    layers: [getAssetFeatureLayer(assetId)],
  });
}

let cachedFeatureLayer: __esri.FeatureLayer | undefined;
export function getAssetFeatureLayer(assetId: string) {
  if (cachedFeatureLayer) {
    return cachedFeatureLayer;
  } else {
    cachedFeatureLayer = new FeatureLayer({
      id: ASSETLAYERMAPID,
      portalItem: {
        id: ASSETLAYERPORTALID,
      },
      featureEffect: new FeatureEffect({
        filter: new FeatureFilter({
          where: `${ASSETFIELDNAME} = '${assetId}'`,
        }),
        excludedEffect: 'opacity(40%) grayscale(50%)',
      }),
    });

    return cachedFeatureLayer;
  }
}
