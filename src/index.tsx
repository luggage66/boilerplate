import './style.css';
import * as React from 'react';
import * as ReactDOM  from 'react-dom';
import AppView from './views';
import AppStore from './stores/app';

const appStore = new AppStore();

ReactDOM.render(<AppView appStore={appStore} />, document.getElementById('appRoot'));
