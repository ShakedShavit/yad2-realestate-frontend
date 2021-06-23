import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './styles/styles.scss';
import Favicon from 'react-favicon';
import favicon from './images/favicon.ico';

ReactDOM.render(
  <React.StrictMode>
    <Favicon url={favicon} />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
