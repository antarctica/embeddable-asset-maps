import Polygon from '@arcgis/core/geometry/Polygon';
import { ArcgisPlacement } from '@arcgis/map-components-react';
import { css } from '@styled-system/css';
import { Box, Flex } from '@styled-system/jsx';
import React from 'react';

import { ArcMapView } from '@/arcgis/ArcView/ArcMapView';
import { getMap } from '@/config/map';

import { Globe } from '../Globe';
import HomeControl from '../map-controls/HomeControl';
import ZoomControl from '../map-controls/ZoomControl';
import { applyAntarcticHeadingCorrection } from './utils';

// Prevent scrolling beyon the southern and northern poles on
// web mercator maps
const globalExtent = new Polygon({
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

export function Map({
  center = [-100.4593, 36.9014],
  assetId,
}: {
  center?: [number, number];
  assetId: string;
}) {
  const map = React.useMemo(() => {
    return getMap(center, assetId);
  }, [assetId, center]);

  return (
    <Box w={'full'} h={'full'} position={'relative'}>
      <ArcMapView
        className={css({ h: 'full', w: 'full', pointerEvents: 'auto' })}
        map={map}
        zoom={13}
        center={center}
        onArcgisViewReadyChange={(event) => {
          const view = event.target.view;
          view.constraints = {
            geometry: globalExtent,
            rotationEnabled: false,
            minScale: 150000000,
          };
          if (center[1] < 60) {
            applyAntarcticHeadingCorrection(view);
          }
        }}
      >
        <ArcgisPlacement position="top-left">
          <Flex direction="column" gap={'4'}>
            <ZoomControl />
            <HomeControl />
          </Flex>
        </ArcgisPlacement>
        <ArcgisPlacement position="top-right">
          <Globe></Globe>
        </ArcgisPlacement>
      </ArcMapView>
    </Box>
  );
}
