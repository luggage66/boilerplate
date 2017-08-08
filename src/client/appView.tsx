/* globals require process */
import * as React from 'react';
import { observer } from 'mobx-react';
import { Link } from './routing';
import styles from './styles';
import Header from './components/header';
import Sidebar from './components/sidebar';
import ApplicationState from './applicationState';

// mobx-react-devtools component
let MobxDevTools; // tslint:disable-line:variable-name
if (process.env.NODE_ENV === 'development') {
    MobxDevTools = require('mobx-react-devtools').default; // tslint:disable-line:no-var-requires
}

@observer
export default class App extends React.Component<{ appState: ApplicationState }, never>
{
    constructor(props) {
        super(props);
    }

    render() {
        const { currentRoute } = this.props.appState;

        return <div className={styles.app}>
            { MobxDevTools && <MobxDevTools /> }
            <Header />
            <Sidebar appState={this.props.appState} />
            <div className={styles.appBodyContainer}>
                <currentRoute.route.component route={currentRoute} {...currentRoute.data} />
            </div>
        </div>;
    }
}
