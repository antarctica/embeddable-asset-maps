import Polygon from '@arcgis/core/geometry/Polygon';

import { ASSETLAYERMAPID } from '@/config/assetLayer';

import arcadeAntarticHeading from '../../config/arcade/arcadeAntarcticHeading?raw';

export async function applySymbolRotationCorrection(center: [number, number], map: __esri.MapView) {
  // if using the Antarctic basemap, apply the arcade antarctic heading correction.
  if (center[1] < -60) {
    const FeatureLayer = map.map.findLayerById(ASSETLAYERMAPID) as __esri.FeatureLayer;
    const featureLayerView = await map.whenLayerView(FeatureLayer);

    const { renderer } = featureLayerView.layer;
    if (renderer.type === 'simple' || renderer.type === 'unique-value') {
      const rotationVisualVariable = (
        renderer as __esri.SimpleRenderer | __esri.UniqueValueRenderer
      ).visualVariables.find((visVar) => visVar.type === 'rotation') as
        | __esri.RotationVariable
        | undefined;

      if (rotationVisualVariable) {
        rotationVisualVariable.valueExpression = arcadeAntarticHeading;
        rotationVisualVariable.valueExpressionTitle = 'Heading Correction';
        rotationVisualVariable.rotationType = 'geographic';
      }
    }
  }
}

// Prevent scrolling beyon the southern and northern poles on
// web mercator maps
export const GLOBAL_EXTENT = new Polygon({
  rings: [
    [
      [-20026376.39 * 16, -20048966.1],
      [-20026376.39 * 16, 20048966.1],
      [20026376.39 * 16, 20048966.1],
      [20026376.39 * 16, -20048966.1],
      [-20026376.39 * 16, -20048966.1],
    ],
  ],
  spatialReference: {
    wkid: 3857,
  },
});
