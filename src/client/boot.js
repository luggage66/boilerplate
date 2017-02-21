/* globals document, window, process */
import React from 'react';
import ReactDom from 'react-dom';
import App from './layout/app';
import ApplicationState from './applicationState';
import { useStrict } from 'mobx';

if (process.env.NODE_ENV === 'development') {
    useStrict(true);
}

// make a root element to mount the app into
let reactContainer = document.createElement('div');
reactContainer.id = 'app-react-container';
document.body.appendChild(reactContainer);

//mounty mounty
let appState = window.app = new ApplicationState();
ReactDom.render(<App appState={appState} />, reactContainer);
