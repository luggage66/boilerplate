/* globals document, window, process */
import * as React from 'react';
import * as ReactDom from 'react-dom';
import AppView from './appView';
import ApplicationState from './applicationState';
import { useStrict } from 'mobx';

if (process.env.NODE_ENV === 'development') {
    useStrict(true);
}

// make a root element to mount the app into
const reactContainer = document.createElement('div');
reactContainer.id = 'app-react-container';
document.body.appendChild(reactContainer);

// mounty mounty
const appState = (window as any).app = new ApplicationState();
ReactDom.render(<AppView appState={appState} />, reactContainer);
