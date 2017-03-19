import * as React from 'react';
import { observable, action, runInAction, computed } from 'mobx';
import { initializeRouter } from './routing';

export default class ApplicationState {
    @observable.shallow currentRoute = {
        route: {
            component: function DummyRoute() { return <div>Dummy Loading Route</div>; },
        },
        state: {}
    };
    @observable.shallow pendingRoute = null;

    constructor() {
        //listen for navigation
        initializeRouter((location, action) => {
            this.handleRouteChange(location);
        });
    }

    @computed
    get isPageLoading() {
        return Boolean(this.pendingRoute);
    }

    /* newRoute = {
        route: { name: "", component: SomeComponent }, // from the route config
        state: { id: 123, tab: "details" } // the params parsed from the url + queryString (mixed)
    } */
    @action
    async handleRouteChange(newRoute) {
        // set a pending route. We'll swap it to currentRoute AFTER it
        // has it's minimum data loaded
        this.pendingRoute = {
            ...newRoute,
            data: undefined //will be filled in after data loads
        };

        // use the loadData() static function on the route's component
        let data;
        if (newRoute.route.component.loadData) {
            data = await newRoute.route.component.loadData(newRoute.state);
        }

        runInAction('mount page', () => {
            this.pendingRoute.data = data;
            this.currentRoute = this.pendingRoute;
            this.pendingRoute = null;
        });
    }
}
