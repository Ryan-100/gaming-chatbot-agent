'use client';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import { Theme } from '@radix-ui/themes';
import { Toaster } from 'sonner';
import store from 'shared/src/stores';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <div>
      <Provider store={store}>
        <Theme>{children}</Theme>
        <Toaster />
      </Provider>
    </div>
  );
}
