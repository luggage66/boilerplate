import React from 'react';
import { observer } from 'mobx-react';
import { Link } from '../routing';
import styles from '../styles';
import Header from './header';

@observer
export default class App extends React.Component
{
    constructor(props) {
        super(props);
    }

    render() {
        let state = this.props.appState;

        return <div className={styles.app}>
            <Header />
            <PageContainer component={state.currentRoute.route.component} params={{route: state.currentRoute, ...state.currentRoute.componentProps}} className="md-text-container md-cell md-cell--12" />
        </div>;
    }
}

class PageContainer extends React.Component
{
    render() {
        return <div className={styles.appBodyContainer}>
            <this.props.component ref={(ref) => window.viewComponent = ref} {...this.props.params} />
        </div>;
    }
}
