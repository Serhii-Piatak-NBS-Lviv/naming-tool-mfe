import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './i18n/config';

// ToDo: replace {Counter} part of function name by your own: render{AppName}
window.renderCounter = (containerId, data) => {
  const root = ReactDOM.createRoot(document.getElementById(containerId));
  root.render(
  <React.StrictMode>
    <App data={data} />
  </React.StrictMode>
  );
  serviceWorker.unregister();
};

// ToDo: replace {Counter} part of function name by your own: unmount{AppName}
window.unmountCounter = containerId => {
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
};

// ToDo: replace {Counter} part of root div id by your own: '{AppName}-container'
if (!document.getElementById('Counter-container')) {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App data={{theme: 'default'}} />
    </React.StrictMode>
  );
  serviceWorker.unregister();
}

// ToDo: !!! Don't forget to document AppName you assigned !!!