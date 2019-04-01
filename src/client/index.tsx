import { makeStyles, ThemeProvider } from '@material-ui/styles';
import { configure as configureMobx } from 'mobx';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './bootstrap';
import { ShellViewModel } from './shell/state';
import { ShellView } from './shell/view';
import { theme } from './theme';

configureMobx({
    // Alloy mutating observables only inside actions to keep it under control
    enforceActions: 'observed',
});

makeStyles({
    root: {
        height: '100%',
    },
});

// Create root element for react
const rootDiv = document.createElement('div');
rootDiv.classList.add('d');
document.body.appendChild(rootDiv);

const shellViewModel = new ShellViewModel();
shellViewModel.finishLoading();

console.log('theme', theme);

// mount up that app.
ReactDOM.render(
    <ThemeProvider theme={theme}>
        <ShellView />
    </ThemeProvider>,
    rootDiv
);
