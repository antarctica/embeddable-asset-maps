import '@arcgis/map-components/dist/components/arcgis-scene';

import { ArcgisScene } from '@arcgis/map-components-react';
import React from 'react';

import { useCreateView } from '@/arcgis/hooks/useCreateView';

import { ArcInternalViewProvider } from './ArcViewContext';
export function ArcSceneView({
  children,
  onArcgisViewReadyChange,
  ...props
}: React.ComponentProps<typeof ArcgisScene>) {
  const { view, onViewReady } = useCreateView(props.id);
  const containerRef = React.useRef<HTMLArcgisSceneElement>(null);

  return (
    <ArcInternalViewProvider view={view}>
      <ArcgisScene
        ref={containerRef}
        {...props}
        onArcgisViewReadyChange={(ev) => {
          if (ev.target !== containerRef.current) return;
          onViewReady(ev.target.view);
          onArcgisViewReadyChange?.(ev);
        }}
      >
        {view && children}
      </ArcgisScene>
    </ArcInternalViewProvider>
  );
}
