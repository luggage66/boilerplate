/* globals window */
import * as React from 'react';
import RouteRecognizer from 'route-recognizer';
import createHistory from 'history/createBrowserHistory';

import routes from './routes';

const router = new RouteRecognizer();
const history = createHistory();

export interface IPageComponentProps {
    route: {};
}

// A react component that it mounted by the router. It accepts route-related props
interface PageComponent extends React.ComponentClass<IPageComponentProps> {
    loadData?(state: any): PromiseLike<{}>;
}

// a route as-configured
export interface IRouteConfig {
    name: string;
    path: string;
    component: any;
}

export interface IActiveRoute {
    location: {
        path: string;
        query: string;
    };
    state: {};
    route: IRouteConfig;
    data: {};
}

export type RouteChangeListener = (newRoute: IActiveRoute) => void;

// for each route, configure it in route-recognizer.
// pass our route object into "handler", so we get it back when the url is parsed
// and use our route.name with route-recognizer's named routes feature.
for (const route of routes) {
    router.add([{ path: route.path, handler: route }], { as: route.name});
}

export function getRouteConfigFromName(routeName) {
    return routes.find(r => r.name === routeName);
}

export function parseUrl(url) {
    // [0] because we'll deal with nested routes later.
    const result = router.recognize(url)[0];

    return {
        route: (result.handler as IRouteConfig).name,
        params: result.params
    };
}

// build a url from the route name (from ./routes.js) and the params.
export function getUrl(routeName, params) {
    return router.generate(routeName, params);
}

// minimum data to navigate
export interface IRouteLink {
    route: string; // route name
    params?: any;
}

// Update the app url / current route
// Never call history.push() or history.replace() directly, this function does that.
// can take a url (e.g. "/users/123"),
// or an object like: { route: "viewUser", params: { id: 123 } }
export function pushHistoryState(urlOrState: string | IRouteLink, { replace = false } = {}) {
    let state: IRouteLink;
    let url: string;

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
export function initializeRouter(listenCallback: RouteChangeListener) {
    history.listen((location, action) => {
        const route = getRouteConfigFromName(location.state.route);
        listenCallback({
            location: {
                path: location.pathname,
                query: location.search
            },
            state: location.state.params,
            route,
            data: {}
        });
    });

    // get started with the current URL
    pushHistoryState(window.location.pathname + window.location.search, { replace: true });
}

export { Link } from './components/link';
