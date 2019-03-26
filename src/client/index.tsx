import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ShellViewModel } from './shell/state';
import { ShellView } from './shell/view';
import { configure as configureMobx } from 'mobx';

configureMobx({
    // Alloy mutating observables only inside actions to keep it under control
    enforceActions: 'observed',
});

// Create root element for react
const rootDiv = document.createElement("div");
document.body.appendChild(rootDiv);

const shellViewModel = new ShellViewModel();

// mount up that app.
ReactDOM.render(<ShellView viewModel={shellViewModel} />, rootDiv);