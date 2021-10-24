
import React from 'react';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';

import Root from './src/root';
import { ThemeProvider } from './src/component';
import store, { persistor } from './src/redux/store';

const App = () => (
  <Provider store={store} >
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider>
        <Root />
      </ThemeProvider>
    </PersistGate>
  </Provider>
)

export default App;
