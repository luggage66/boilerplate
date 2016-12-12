import React from 'react';

import './styleReset.scss';

import Home from './pages/home';

import { pushHistoryState, getUrl, parseUrl } from './routing';

window.getUrl = getUrl;
window.parseUrl = parseUrl;


export default class App extends React.Component
{
    constructor(props) {
        super(props);

        //bindy bindy
        [
        ].forEach(fnName => this[fnName] = this[fnName].bind(this));
    }

    componentDidMount() {
        pushHistoryState(window.location.pathname + window.location.search, { replace: true });
    }

    render() {
        return <div>
            <Home />
        </div>;
    }
}
