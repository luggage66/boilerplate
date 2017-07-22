import * as React from 'react';
import { Link } from '../routing';
import styles from '../styles';
import { IPageComponentProps } from '../routing';

export default class HomePage extends React.Component<IPageComponentProps, void>
{
    render() {
        return <div>
            <div className={styles.box}>
                <ul>
                    <li>
                        <Link route="viewUser" params={{ id: 111 }}>User #111</Link>
                    </li>
                    <li>
                        <Link route="viewUser" params={{ id: 333 }}>User #333</Link>
                    </li>
                </ul>
                <button className={styles.button}>
                    Test
                </button>
            </div>
        </div>;
    }
}
