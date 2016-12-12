/* globals document */
import React from 'react';
import ReactDom from 'react-dom';
import App from './app';
import { initializeRouter } from './routing';

// make a root element to mount the app into
let reactContainer = document.createElement('div');
reactContainer.id = 'app-react-container';
document.body.appendChild(reactContainer);

function updateAppRef(app) {
    window.app = app;
    initializeRouter((location, action) => {
        app.handleRouteChange(location.state);
    });
}

//mounty mounty
ReactDom.render(<App ref={updateAppRef} />, reactContainer);
