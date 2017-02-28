/* globals require process */
import React from 'react';
import { observer } from 'mobx-react';
import { Link } from '../routing';
import styles from '../styles';
import Header from './header';

// mobx-react-devtools component
let DevTools;
if (process.env.NODE_ENV === 'development') {
    DevTools = require('mobx-react-devtools').default;
}

@observer
export default class App extends React.Component
{
    constructor(props) {
        super(props);
    }

    render() {
        let { currentRoute } = this.props.appState;

        return <div className={styles.app}>
            { DevTools && <DevTools /> }
            <Header />
            <div className={styles.appBodyContainer}>
                <currentRoute.route.component route={currentRoute} {...currentRoute.data} />
            </div>
        </div>;
    }
}
