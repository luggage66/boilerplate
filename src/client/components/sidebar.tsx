import * as React from 'react';
import styles from './sidebar.scss';
import { Link } from '../routing';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as cx from 'classnames';
import ApplicationState from '../applicationState';
import { Overlay } from '../components';

@observer
export default class Sidebar extends React.Component<{ appState: ApplicationState }, never>
{
    constructor(props, context) {
        super(props, context);
    }

    @action.bound
    handleOverlayClick(event: React.MouseEvent<HTMLDivElement>) {
        this.props.appState.showSidebar = false;
    }

    render() {
        return <div>
            {this.props.appState.showSidebar && <Overlay onClick={this.handleOverlayClick} />}
            <div className={cx(styles.sidebar, { [styles.hidden]: !this.props.appState.showSidebar })}>
                <Link route="viewUser" params={{ id: 111 }}>User #111</Link>
                <Link route="viewUser" params={{ id: 111 }}>User #111</Link>
                <Link route="viewUser" params={{ id: 111 }}>User #111</Link>
            </div>
        </div>;
    }
}
