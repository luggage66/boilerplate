import { QueryRunner } from './queryRunner';
import { observable, computed } from 'mobx';

export class ActiveRoute {
    route;
    queryRunner;

    constructor(newRoute) {
        this.route = newRoute.route;
        this.queryRunner = new QueryRunner(newRoute.route.queries, newRoute.state);
    }

    @computed
    get ready() {
        return this.queryRunner.dataLoaded;
    }

    @computed
    get componentProps() {
        return this.queryRunner.state;
    }
}
