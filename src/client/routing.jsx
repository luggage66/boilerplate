import React from 'react';
import RouteRecognizer from 'route-recognizer';
import createHistory from 'history/createBrowserHistory';

import { routes } from './pages';

let router = new RouteRecognizer();
let history = createHistory();

for (let route of routes) {
    router.add([{ path: route.path, handler: route }], { as: route.name});
}

history.listen((location, action) => {
    console.log('history.listen', location, action);
});

export function parseUrl(url) {
    let result = router.recognize(url)[0];

    return {
        route: result.handler.name,
        params: result.params
    };
}

export function getUrl(routeName, params) {
    return router.generate(routeName, params);
}

export class Link extends React.Component {
    static propTypes = {
        route: React.PropTypes.string.isRequired,
        params: React.PropTypes.object,
    }

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        pushHistoryState(this.props);
    }

    render() {
        let { route, params, children, ...otherProps } = this.props;
        let url = getUrl(route, params);

        return <a href={url} onClick={this.handleClick} {...otherProps}>{children}</a>;
    }
}

export function pushHistoryState(urlOrState, { replace } = {}) {
    let state;
    let url;

    if (typeof(urlOrState) === 'string') {
        state = parseUrl(urlOrState);
    }
    else {
        state = urlOrState;
    }

    url = getUrl(state.route, state.params);

    history[replace ? 'replace' : 'push'](url, state);
}
