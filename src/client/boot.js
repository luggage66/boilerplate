/* globals document, window */
import React from 'react';
import ReactDom from 'react-dom';
import App from './layout/app';
import ApplicationState from './applicationState';

// make a root element to mount the app into
let reactContainer = document.createElement('div');
reactContainer.id = 'app-react-container';
document.body.appendChild(reactContainer);

let appState = window.app = new ApplicationState();

//mounty mounty
ReactDom.render(<App appState={appState} />, reactContainer);
