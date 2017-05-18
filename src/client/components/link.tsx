import * as React from 'react';
import { pushHistoryState, getUrl, IRouteLink } from '../routing';

export interface LinkProps extends IRouteLink {
    className?: string;
}

export class Link extends React.Component<LinkProps, {}> {

    constructor(props) {
        super(props);
    }

    handleClick = (evt) => {
        evt.preventDefault();
        const { route, params } = this.props;
        pushHistoryState({ route, params });
    }

    render() {
        const { route, params, children, ...otherProps } = this.props;
        const url = getUrl(route, params);

        return <a href={url} {...otherProps} onClick={this.handleClick}>{children}</a>;
    }
}
