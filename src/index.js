import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './i18n/config';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';

import store from './app/store';

window.renderNamingTool = (containerId, data) => {
  const root = ReactDOM.createRoot(document.getElementById(containerId));
  root.render(
  <React.StrictMode>
    <Provider store={store}>
    <ChakraProvider>
      <App data={data} />
    </ChakraProvider>
    </Provider>
  </React.StrictMode>
  );
  serviceWorker.unregister();
};

window.unmountNamingTool = containerId => {
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
};

if (!document.getElementById('NamingTool-container')) {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <ChakraProvider>
          <App data={{theme: 'default'}} />
        </ChakraProvider>
      </Provider>
    </React.StrictMode>
  );
  serviceWorker.unregister();
}