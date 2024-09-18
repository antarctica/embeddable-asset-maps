import Basemap from '@arcgis/core/Basemap';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import EsriMap from '@arcgis/core/Map';

import { ASSETFIELDNAME, ASSETLAYERMAPID, ASSETLAYERPORTALID } from './assetLayer';

enum BasemapRegion {
  ANTARCTIC = 'ANTARCTIC',
  ARCTIC = 'ARCTIC',
  WORLD = 'WORLD',
}

/**
 * Basemap configuration constant that defines the basemap and initial zoom levels
 * for different regions.
 */
const BASEMAP_CONFIG: Record<BasemapRegion, { basemap: Basemap; initialZoom: number }> = {
  [BasemapRegion.ANTARCTIC]: {
    basemap: new Basemap({ portalItem: { id: '435e23642bf94b83b07d1d3fc0c5c9d5' } }),
    initialZoom: 13,
  },
  [BasemapRegion.ARCTIC]: {
    basemap: new Basemap({ portalItem: { id: 'beee46578bc44e0bb47901f04400588a' } }),
    initialZoom: 13,
  },
  [BasemapRegion.WORLD]: {
    basemap: new Basemap({ portalItem: { id: '67ab7f7c535c4687b6518e6d2343e8a2' } }),
    initialZoom: 10,
  },
};

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
 * @param {[number, number]} center - the coordinates array
 * @param {boolean} [isSDA=false] - Whether to use the SDA basemap.
 * @returns {Basemap} the basemap instance
 */
export function getBasemapConfig(center: [number, number]): {
  basemap: Basemap;
  initialZoom: number;
} {
  const region = getBasemapRegion(center);
  const config = BASEMAP_CONFIG[region];

  return config;
}

/**
 * Creates an EsriMap instance with a basemap and a feature layer
 * containing the asset with the given assetId.
 *
 * @param {[number, number]} center - the coordinates array
 * @param {string} assetId - the id of the asset
 * @returns {EsriMap} an EsriMap instance
 */
export function getMap(
  center: [number, number],
  assetId: string,
): {
  map: EsriMap;
  initialZoom: number;
} {
  const { basemap, initialZoom } = getBasemapConfig(center);

  return {
    map: new EsriMap({
      basemap,
      layers: [getAssetFeatureLayer(assetId)],
    }),
    initialZoom,
  };
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
    // cachedFeatureLayer.featureEffect.filter.where = `${ASSETFIELDNAME} = '${assetId}'`;

    return cachedFeatureLayer;
  }

  cachedFeatureLayer = new FeatureLayer({
    id: ASSETLAYERMAPID,
    portalItem: {
      id: ASSETLAYERPORTALID,
    },
    definitionExpression: `${ASSETFIELDNAME} = '${assetId}'`,

    // featureEffect: new FeatureEffect({
    //   filter: new FeatureFilter({
    //     where: `${ASSETFIELDNAME} = '${assetId}'`,
    //   }),
    //   excludedEffect: 'opacity(40%) grayscale(50%)',
    // }),
  });

  return cachedFeatureLayer;
}
