import * as React from 'react';
import styles from '../styles';
import { Link } from '../routing';

export default class Header extends React.Component<{}, {}>
{
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <div className={styles.header}>
            <Link className={styles.title} route="home">Boilerplate App</Link>
            <div className={styles.menu}>
                <Link className={styles.menuItem} route="viewUser" params={{ id: 312 }}>View User</Link>
            </div>

        </div>;
    }
}
