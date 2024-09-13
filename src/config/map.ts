import Basemap from '@arcgis/core/Basemap';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import FeatureEffect from '@arcgis/core/layers/support/FeatureEffect';
import FeatureFilter from '@arcgis/core/layers/support/FeatureFilter';
import EsriMap from '@arcgis/core/Map';

import { ASSETFIELDNAME, ASSETLAYERMAPID, ASSETLAYERPORTALID } from './assetLayer';

enum BasemapRegion {
  ANTARCTIC = 'ANTARCTIC',
  ARCTIC = 'ARCTIC',
  WORLD = 'WORLD',
}

/**
 * Given a longitude and latitude pair, returns the basemap region.
 *
 * - Antarctica: latitude < -60
 * - Arctic: latitude > 60
 * - World: otherwise
 *
 * @param {[number, number]} coordinates - the coordinates array
 * @returns {BasemapRegion} the basemap region
 */
function getBasemapRegion([, lat]: [number, number]) {
  if (lat < -60) {
    return BasemapRegion.ANTARCTIC;
  } else if (lat > 60) {
    return BasemapRegion.ARCTIC;
  } else {
    return BasemapRegion.WORLD;
  }
}

/**
 * Given a longitude and latitude pair, returns a Basemap instance
 * optimized for the region.
 *
 * - Antarctica: latitude < -60
 * - Arctic: latitude > 60
 * - World: otherwise
 *
 * @param {[number, number]} center - the coordinates array
 * @returns {Basemap} the basemap instance
 */
export function getBasemapConfig(center: [number, number]): Basemap {
  const basemapIds = {
    [BasemapRegion.ANTARCTIC]: '435e23642bf94b83b07d1d3fc0c5c9d5',
    [BasemapRegion.ARCTIC]: 'beee46578bc44e0bb47901f04400588a',
    [BasemapRegion.WORLD]: 'streets-navigation-vector',
  };

  const region = getBasemapRegion(center);
  return region === BasemapRegion.WORLD
    ? Basemap.fromId(basemapIds[region])
    : new Basemap({ portalItem: { id: basemapIds[region] } });
}

/**
 * Creates an EsriMap instance with a basemap and a feature layer
 * containing the asset with the given assetId.
 *
 * @param {[number, number]} center - the coordinates array
 * @param {string} assetId - the id of the asset
 * @returns {EsriMap} an EsriMap instance
 */
export function getMap(center: [number, number], assetId: string) {
  return new EsriMap({
    basemap: getBasemapConfig(center),
    layers: [getAssetFeatureLayer(assetId)],
  });
}

let cachedFeatureLayer: __esri.FeatureLayer | undefined;

/**
 * Returns a cached FeatureLayer instance for the given asset ID.
 *
 * @param {string} assetId - The ID of the asset to filter on the layer
 * @returns {FeatureLayer} A cached FeatureLayer instance
 */
export function getAssetFeatureLayer(assetId: string): FeatureLayer {
  if (cachedFeatureLayer) {
    // Update the filter if the assetId has changed
    cachedFeatureLayer.featureEffect.filter.where = `${ASSETFIELDNAME} = '${assetId}'`;
    return cachedFeatureLayer;
  }

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
