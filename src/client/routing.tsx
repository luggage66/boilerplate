/* globals window */
import * as React from 'react';
import RouteRecognizer from 'route-recognizer';
import createHistory from 'history/createBrowserHistory';

import routes from './routes';

let router = new RouteRecognizer();
let history = createHistory();

// for each route, configure it in route-recognizer.
// pass our route object into "handler", so we get it back when the url is parsed
// and use our route.name with route-recognizer's named routes feature.
for (let route of routes) {
    router.add([{ path: route.path, handler: route }], { as: route.name});
}

export function getRouteConfigFromName(routeName) {
    return routes.find(r => r.name === routeName);
}

export function parseUrl(url) {
    // [0] because we'll deal with nested routes later.
    let result = router.recognize(url)[0];

    return {
        route: result.handler.name,
        params: result.params
    };
}

// build a url from the route name (from ./routes.js) and the params.
export function getUrl(routeName, params) {
    return router.generate(routeName, params);
}

export interface LinkProps {
    route: any,
    params?: any,
    className?: string
}

// Use this link component for all internal links.
export class Link extends React.Component<LinkProps, {}> {
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
        let { route, params } = this.props;
        pushHistoryState({ route, params });
    }

    render() {
        let { route, params, children, ...otherProps } = this.props;
        let url = getUrl(route, params);

        return <a href={url} {...otherProps} onClick={this.handleClick}>{children}</a>;
    }
}

// Update the app url / current route
// Never call history.push() or history.replace() directly, this function does that.
// can take a url (e.g. "/users/123"),
// or an object like: { route: "viewUser", params: { id: 123 } }
export function pushHistoryState(urlOrState, { replace = false } = {}) {
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

// The app needs to call this once to get things started, passing in
// the callback you want called on route changes.
export function initializeRouter(listenCallback) {
    history.listen((location, action) => {
        let route = getRouteConfigFromName(location.state.route);
        listenCallback({
            location: {
                path: location.pathname,
                query: location.search
            },
            state: location.state.params,
            route: route
        });
    });

    // get started with the current URL
    pushHistoryState(window.location.pathname + window.location.search, { replace: true });
}
