import React from 'react';
import { observable, action, asReference, when } from 'mobx';
import { initializeRouter, getRouteConfigFromName } from './routing';
import { QueryRunner } from './queryRunner';
import { ActiveRoute } from './route';

export default class ApplicationState {
    @observable currentRoute = asReference({
        route: {
            component: function DummyRoute() { return <div>Dummy Loading Route</div>; },
        },
        state: {}
    });
    @observable pendingRoute = asReference(null);

    constructor() {
        //listen for navigation
        initializeRouter((location, action) => {
            this.handleRouteChange(location);
        });
    }

    @action
    handleRouteChange(newRoute) {
        console.log(newRoute);

        this.pendingRoute = new ActiveRoute(newRoute);
        //this.pendingRoute = new QueryRunner(newRoute.route, newRoute.state);

        when(() => this.pendingRoute.ready, () => {
            this.currentRoute = this.pendingRoute;
            this.pendingRoute = null;
        });
    }
}
