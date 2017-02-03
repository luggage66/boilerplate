import React from 'react';
import { observable, asReference } from 'mobx';
import { observer } from 'mobx-react';
import { QueryRunner } from '../queryRunner';
import bluebird from 'bluebird';

@observer
export class TestDataLoadingPage extends React.Component
{
    @observable routeVariables = {
        category: null,
        pageNumber: 2,
        itemsPerPage: 10
    }

    constructor(props) {
        super(props);

        this.queryRunner = new QueryRunner(ItemList.dataQueries, this.routeVariables);
    }

    render() {
        return <div>
            <h1>Data Loading Test</h1>
            {/* {this.queryRunner.dataLoaded && <DataWidget {...this.queryRunner.state} />} */}
            <DataComponentContainer component={ItemList} params={this.routeVariables} />
        </div>;
    }
}

@observer
class DataComponentContainer extends React.Component
{
    static propTypes = {
        component: React.PropTypes.func
    };

    @observable dataLoaded = false;
    @observable data = asReference(null); // I don't care what is inside here.

    componentDidMount() {
        this.loadData(this.props.params);
    }

    componentWillReceiveProps(nextProps) {
        this.loadData(nextProps.params);
    }

    loadData(params) {
        let queries = this.props.component.dataQueries;

        // run all queries for this page.
        let data = {};
        for (let key in queries) {
            data[key] = queries[key](params);
        }

        bluebird.props(data).then(data => {
            this.data = data;
            this.dataLoaded = true;
        });
    }

    render() {

        let { component: Component } = this.props;

        if (this.dataLoaded) {
            return <Component {...this.data} />;
        }
        else {
            return <div>Loading...</div>;
        }
    }
}


// example of a component that has it's data loaded for it.
//@makeDataWrapperComponent
class ItemList extends React.Component
{
    static dataQueries = {
        categoryInfo({ category }) {
            return {
                name: "Some Category"
            };
        },
        pageItems({ category, pageNumber, itemsPerPage }) {

            let pageItems = [];
            let offset = (pageNumber - 1) * itemsPerPage;

            for (let i = 0; i < itemsPerPage; i++) {
                pageItems.push(`Item #${offset + i}`);
            }

            return pageItems;
        }
    }

    render() {
        return <div>
            {this.props.pageItems.map(item => item)}
        </div>;
    }
}


function makeDataWrapperComponent(Component) {

    @observer
    class DataWrapperComponent extends React.Component
    {
        @observable dataLoaded = false;
        @observable data = asReference(null); // I don't care what is inside here.

        // constructor(props, context) {
        //     super(props, context);
        // }

        componentDidMount() {
            this.loadData(this.props);
        }

        componentWillReceiveProps(nextProps) {
            this.loadData(nextProps);
        }

        loadData(params) {
            let queries = Component.dataQueries;

            // run all queries for this page.
            let data = {};
            for (let key in queries) {
                data[key] = queries[key](params);
            }

            bluebird.props(data).then(data => {
                this.data = data;
                this.dataLoaded = true;
            });
        }

        render() {
            if (this.dataLoaded) {
                return <Component {...this.data} />;
            }
            else {
                return <div>Loading...</div>;
            }
        }
    }

    return DataWrapperComponent;
}


export default {
    name: 'testDataLoading',
    path: 'testDataLoading',
    defaultParams: {
    },
    queries: {
    },
    component: TestDataLoadingPage
};
