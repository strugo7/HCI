import { RouterProvider } from 'react-router-dom';

import { AppProviders } from '@/providers';
import { router } from '@/router';

export function App(): React.ReactNode {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}
