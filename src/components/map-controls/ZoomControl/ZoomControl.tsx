import ZoomVM from '@arcgis/core/widgets/Zoom/ZoomViewModel';
import { css } from '@styled-system/css';
import { Divider, Flex } from '@styled-system/jsx';
import * as React from 'react';

import { useCurrentMapView, useWatchState } from '@/arcgis/hooks';

import { MapButton } from '../../Button/MapButton';
import SvgIcon from '../../SvgIcon';

function ZoomControl() {
  const mapView = useCurrentMapView();
  const widget = React.useMemo(() => new ZoomVM({ view: mapView }), [mapView]);

  const canZoomIn = useWatchState(() => widget.canZoomIn) ?? false;
  const canZoomOut = useWatchState(() => widget.canZoomOut) ?? false;

  return (
    <Flex
      direction="column"
      className={css({
        boxShadow: 'md',
        bg: 'grayscale.200',
        borderColor: 'grayscale.400',
        borderWidth: 'thin',
      })}
    >
      <MapButton
        icon={<SvgIcon name="icon-add" size={12} />}
        aria-label="Zoom In"
        isDisabled={canZoomIn ? undefined : true}
        onPress={() => widget.zoomIn()}
      />
      <Divider w="full" thickness={'thin'} color="grayscale.400"></Divider>
      <MapButton
        icon={<SvgIcon name="icon-subtract" size={12} />}
        aria-label="Zoom Out"
        isDisabled={canZoomOut ? undefined : true}
        onPress={() => widget.zoomOut()}
      />
    </Flex>
  );
}

export default ZoomControl;
