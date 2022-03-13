import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import store from './app/store'

import App from './app/App';
import { Provider } from 'react-redux';

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
