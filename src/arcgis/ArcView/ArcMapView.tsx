import '@arcgis/map-components/dist/components/arcgis-map';

import { ArcgisMap } from '@arcgis/map-components-react';
import React from 'react';

import { useCreateView } from '@/arcgis/hooks/useCreateView';

import { ArcInternalViewProvider } from './ArcViewContext';

export function ArcMapView({
  children,
  onArcgisViewReadyChange,
  ...props
}: React.ComponentProps<typeof ArcgisMap>) {
  const { view, onViewReady } = useCreateView(props.id);
  const containerRef = React.useRef<HTMLArcgisMapElement>(null);

  return (
    <ArcInternalViewProvider view={view}>
      <ArcgisMap
        ref={containerRef}
        {...props}
        onArcgisViewReadyChange={(ev) => {
          if (ev.target !== containerRef.current) return;
          onViewReady(ev.target.view);
          onArcgisViewReadyChange?.(ev);
        }}
      >
        {view && children}
      </ArcgisMap>
    </ArcInternalViewProvider>
  );
}
