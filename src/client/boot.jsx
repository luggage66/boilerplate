/* globals document */
import React from 'react';
import ReactDom from 'react-dom';
import App from './app';

// make a root element to mount the app into
let reactContainer = document.createElement('div');
reactContainer.id = 'app-react-container';
document.body.appendChild(reactContainer);

//mounty mounty
ReactDom.render(<App />, reactContainer);
