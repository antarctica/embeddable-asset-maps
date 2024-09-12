import '@arcgis/core/assets/esri/themes/light/main.css?inline';

import React from 'react';

import { ASSETFIELDNAME } from '@/config/assetLayer';
import { getAssetFeatureLayer } from '@/config/map';
import { useAssetLocation } from '@/hooks/useAssetLocation';
import { Route } from '@/routes/__root';

import LoadingScrim from '../LoadingScrim';
import { Map } from '../Map/Map';

export function App() {
  const { asset_id } = Route.useSearch();
  const { data } = useAssetLocation(getAssetFeatureLayer(asset_id), ASSETFIELDNAME, asset_id);

  const center: [number, number] | undefined = React.useMemo(() => {
    return data ? [data.longitude, data.latitude] : undefined;
  }, [data]);

  return (
    <>
      {data && <Map assetId={asset_id} center={center}></Map>}
      <LoadingScrim isLoading={!data} />
    </>
  );
}
