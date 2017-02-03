import {
    observable,
    extendObservable,
    reaction,
    asReference,
    autorun,
    toJS,
    action,
    computed,
    runInAction,
    when
} from 'mobx';
import bluebird from 'bluebird';

bluebird.config({cancellation: true});

//let attempt = 0;
// queries for a 'page/ route'
let queries = {
    user: ({id}) => {
        return `data for id: ${id}`;
    },
    pageData: ({id, page}) => {
        /*if (!attempt) {
            attempt++;
            throw new Error("erro!r");
        }*/
        return `data for id: ${id} - page ${page}`;
    }
};

export class QueryRunner {
    @observable variables = null;
    @observable data = null;
    queries = null;
    maxRetries = 3;

    // the component displays once dataLoaded === true
    // At that time all required queries are loaded.
    @observable dataLoaded = false;

    constructor(queries, initialVariables) {
        this.variables = initialVariables; //Object.assign({}, route.defaultParams, initialVariables);
        this.queries = queries;

        this.startReacting();

        when(
            // When all required queries are done loading..
            () => !Object.keys(this.queries).some(key => this.data[key].isLoading),
            () => {
                this.dataLoaded = true;
            }
        );
    }

    startReacting() {
        let queries = this.queries;
        let variables = this.variables;
        let keys = Object.keys(queries);
        let data = this.data = keys.reduce((prev, key) => extendObservable(prev, {
            [key]: {
                value: asReference(null),
                isLoading: false,
                promise: asReference(null),
                reactionDisposer: asReference(null),
                failed: false,
                error: asReference(null),
                retries: 0
            }
        }), {});

        for (let query in queries) {
            let dataState = data[query];
            let queryFn = queries[query];

            let reactionDisposer = reaction(() => {

                dataState.retries; //so we'll retry on failure

                console.log('Running Query: ' + query);

                let promise;
                try {
                    promise = queryFn(variables);
                } catch (ex) {
                    promise = bluebird.reject(ex);
                }

                runInAction(() => {
                    promise = bluebird.resolve(promise); //promse to bluebird promise for .cancel()

                    if (dataState.promise) {
                        dataState.promise.cancel();
                    }
                    dataState.isLoading = true;
                    dataState.promise = promise;
                });

                return promise;
            }, (promise) => {

                promise.then(action(result => {
                    dataState.value = result;
                    dataState.isLoading = false;
                    dataState.failed = false;
                    dataState.error = null;
                    dataState.promise = null;
                }), action((err) => {
                    if (data[query].retries < this.maxRetries) {
                        dataState.retries++;
                    } else {
                        dataState.isLoading = false;
                        dataState.failed = true;
                        dataState.error = err;
                    }
                }));
            }, true);

            dataState.reactionDisposer = reactionDisposer;
        }
    }

    setVariables(newVariables) {
        runInAction(() => Object.assign(this.variables, newVariables));
    }

    dispose() {
        Object.keys(this.queries).forEach(key => this.data[key].reactionDisposer());
    }

    @computed
    get state() {
        let keys = Object.keys(this.queries);

        if (keys.some(key => this.data[key].failed)) {
            return "error";
        } else {
            return keys.reduce((prev, key) => {
                prev[key + 'Loading'] = this.data[key].isLoading;
                prev[key] = this.data[key].value;
                return prev;
            }, {});
        }
    }
}
