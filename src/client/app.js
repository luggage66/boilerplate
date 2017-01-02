import React from 'react';
import { Link } from './routing';
import styles from './styles';
import Header from './layout/header';


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
        return <div className={styles.app}>
            <Header />
            <PageContainer component={this.state.pageComponent} params={this.state.pageParams} className="md-text-container md-cell md-cell--12" />
        </div>;

    }
}

class PageContainer extends React.Component
{
    render() {
        return <div className={styles.appBodyContainer}>
            <this.props.component {...this.props.params} />
        </div>;
    }
}
