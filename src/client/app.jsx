import React from 'react';

import './styleReset.scss';

import Home from './pages/home';


export default class App extends React.Component
{
    constructor(props) {
        super(props);

        //bindy bindy
        [
        ].forEach(fnName => this[fnName] = this[fnName].bind(this));
    }

    render() {
        return <div>
            <Home />
        </div>;
    }
}
