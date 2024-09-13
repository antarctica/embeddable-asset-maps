import { ArcgisPlacement } from '@arcgis/map-components-react';
import { Box, Flex } from '@styled-system/jsx';
import React from 'react';

import { ArcMapView } from '@/arcgis/ArcView/ArcMapView';
import { getMap } from '@/config/map';

import { Globe } from '../Globe';
import HomeControl from '../map-controls/HomeControl';
import ZoomControl from '../map-controls/ZoomControl';
import { applySymbolRotationCorrection, GLOBAL_EXTENT } from './utils';

export function Map({
  center = [-100.4593, 36.9014],
  assetId,
}: {
  center?: [number, number];
  assetId: string;
}) {
  const { map, initialZoom } = React.useMemo(() => {
    return getMap(center, assetId);
  }, [assetId, center]);

  return (
    <Box w={'full'} h={'full'} position={'relative'}>
      <ArcMapView
        map={map}
        zoom={initialZoom}
        center={center}
        onArcgisViewReadyChange={(event) => {
          const view = event.target.view;
          view.constraints = {
            geometry: GLOBAL_EXTENT,
            rotationEnabled: false,
            minScale: 100000000,
          };

          applySymbolRotationCorrection(center, view);
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
