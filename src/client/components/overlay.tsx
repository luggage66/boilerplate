import * as React from 'react';
import styles from './overlay.scss';

import { observer } from 'mobx-react';
import * as cx from 'classnames';
import ApplicationState from '../applicationState';

interface OverlayProps {
    onClick: React.MouseEventHandler<HTMLDivElement>;
}

// tslint:disable-next-line:variable-name
const OverlayComponent: React.StatelessComponent<OverlayProps> = (props) => {
    return <div
        className={styles.overlay}
        onClick={props.onClick}
    />;
};

export {
    OverlayComponent as Overlay
};
