import { ASSETLAYERMAPID } from '@/config/assetLayer';

import arcadeAntarticHeading from '../../config/arcade/arcadeAntarcticHeading?raw';

export async function applyAntarcticHeadingCorrection(map: __esri.MapView) {
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
