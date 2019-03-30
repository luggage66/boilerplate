

import * as React from 'react';
import 'material-design-lite';
import cx from 'classnames';
import { useMdl } from '../hooks/useMdl';

export interface LayoutProps {
    foo?: boolean;
}

export const Layout: React.SFC<LayoutProps> = (props) => {
    const { children, foo } = props;

    // return <button
    //     ref={buttonRef}
    //     className={classNames}
    //     children={children}
    //     onClick={onClick}
    // />;

    return <div className="mdl-layout mdl-js-layout">
        {children}
    </div>;
}


export const LayoutDrawer: React.SFC<{}> = (props) => {
    const { children } = props;

    return <div className="mdl-layout__drawer">
        {children}
    </div>;
}

export const LayoutNavigation: React.SFC<{}> = (props) => {
    const { children } = props;

    return <nav className="mdl-navigation">
        {children}
    </nav>;
}

export interface LayoutHeaderProps {
    transparent?: boolean;
}

export const LayoutHeader: React.SFC<LayoutHeaderProps> = (props) => {
    const { children, transparent } = props;

    const classNames = cx('mdl-layout__header', {
        'mdl-layout__header--transparent': transparent,
    });

    return <header className={classNames}>
        <div className="mdl-layout__header-row">
            {children}
        </div>
    </header>;
}

export const LayoutTitle: React.SFC<{}> = (props) => {
    const { children } = props;

    return <span className="mdl-layout-title">{children}</span>;
}

export const LayoutSpacer: React.SFC<{}> = (props) => {
    return <div className="mdl-layout-spacer" />
}


export const LayoutContent: React.SFC<{}> = (props) => {
    const { children } = props;

    return <main className="mdl-layout__content">
        {children}
    </main>;
}

export interface NavigationLinkProps {
    href?: string;
    onClick?: () => any;
}

export const LayoutNavigationLink: React.SFC<NavigationLinkProps> = (props) => {
    const { children, href, onClick } = props;

    return <a className="mdl-navigation__link" href={href || '#'} onClick={onClick}>{children}</a>;
}
