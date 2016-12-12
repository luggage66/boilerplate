import React from 'react';
import styles from '../style.scss';

export default class Header extends React.Component
{
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <div className={styles.header}>
            {this.props.children}
        </div>;
    }
}
