import { createRootRoute, Outlet } from '@tanstack/react-router';
import { fallback, zodSearchValidator } from '@tanstack/router-zod-adapter';
import * as React from 'react';
import { z } from 'zod';

import AuthWrapper from '@/arcgis/auth/AuthWrapper';

const assetSearchSchema = z.object({
  asset_id: fallback(z.string(), '').default(''),
});

export const Route = createRootRoute({
  component: () => (
    <React.Fragment>
      <AuthWrapper appId="m3Tb1Ix8KOmX1Vh4">
        <Outlet />
      </AuthWrapper>
    </React.Fragment>
  ),
  validateSearch: zodSearchValidator(assetSearchSchema),
});
