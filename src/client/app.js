import React from 'react';

import './styleReset.scss';
import Header from './layout/header';
import { Link } from './routing';

import { pushHistoryState, getUrl, parseUrl, getRouteConfigFromName } from './routing';

window.getUrl = getUrl;
window.parseUrl = parseUrl;


export default class App extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            pageComponent: () => <div>Loading...</div>,
            pageParams: {}
        };

        //bindy bindy
        [
        ].forEach(fnName => this[fnName] = this[fnName].bind(this));
    }

    handleRouteChange(newRouteState) {
        let routeConfig = getRouteConfigFromName(newRouteState.route);

        this.setState({
            pageComponent: routeConfig.component,
            pageParams: newRouteState.params
        });
    }

    render() {
        return <div>
            <Header>
                <Link route="home">Home</Link>
                <Link route="viewUser" params={{ id: 312 }}>View User</Link>
            </Header>
            <PageContainer component={this.state.pageComponent} params={this.state.pageParams} />
        </div>;
    }
}

class PageContainer extends React.Component
{
    render() {
        return <this.props.component {...this.props.params} />;
    }
}
