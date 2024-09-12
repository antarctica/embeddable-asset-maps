import { css } from '@styled-system/css';
import { Box, Circle } from '@styled-system/jsx';
import React from 'react';

import { ArcSceneView } from '@/arcgis/ArcView/ArcSceneView';
import { useCurrentMapView, useViewState, useWatchEffect } from '@/arcgis/hooks';
import { getSceneMap } from '@/config/scene';
import { Route } from '@/routes/__root';

export function Globe() {
  const { asset_id } = Route.useSearch();
  const mapView = useCurrentMapView();
  const [sceneView, onSceneViewCreated] = useViewState<__esri.SceneView>();

  const map = React.useMemo(() => {
    return getSceneMap(asset_id);
  }, [asset_id]);

  useWatchEffect(
    () => mapView.center,
    () => {
      if (mapView && sceneView && (mapView.interacting || mapView.animation)) {
        const newCenter = mapView.center.clone();
        newCenter.z = 0;
        sceneView.center = newCenter;
      }
    },
  );

  useWatchEffect(
    () => sceneView?.camera,
    () => {
      if (sceneView?.camera && sceneView.camera.heading > 1) {
        sceneView.camera.set('heading', 0);
      }
    },
  );

  return (
    <Circle
      className={css({
        position: 'absolute',
        top: '0',
        right: '0',
        overflow: 'hidden',
        borderColor: 'white',
        borderStyle: 'solid',
        borderWidth: 'thick',
        pointerEvents: 'none',
        shadow: 'lg',
      })}
      size={{
        base: '40',
        md: '64',
      }}
    >
      <Box
        className={css({
          position: 'absolute',
          w: '[200%]',
          h: '[200%]',
          left: '[-50%]',
          top: '[-50%]',
          inset: '0',
          pointerEvents: 'none',
        })}
      >
        <ArcSceneView
          id="ref-globe"
          map={map}
          zoom={0}
          center={mapView.center}
          onArcgisViewReadyChange={(event) => {
            onSceneViewCreated(event.target.view);
            event.target.view.camera.fov = 10;
          }}
          environment={{
            lighting: { type: 'virtual' },
            background: {
              type: 'color',
              color: [0, 0, 0],
            },
            starsEnabled: false,
            atmosphereEnabled: false,
          }}
          constraints={{
            altitude: {
              min: 25507477,
              max: 25507477,
            },
          }}
        />
      </Box>
      <Circle
        size={{
          base: '40',
          md: '64',
        }}
        className={css({
          opacity: '[0.4]',
          mixBlendMode: 'hard-light',
          pointerEvents: 'none',
          backgroundGradient: '[radial-gradient(circle at 20px 20px, #ffffff8d 20%, #000 80%)]',
        })}
      ></Circle>
    </Circle>
  );
}
