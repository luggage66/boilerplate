

import * as React from 'react';
import 'material-design-lite';
import cx from 'classnames';
import { useMdl } from '../hooks/useMdl';

export interface CardProps {
    foo?: boolean;
}

export const Card: React.SFC<CardProps> = (props) => {
    const { children, foo } = props;

    const classNames = cx('mdl-button mdl-js-button', {
        'mdl-foo': foo
    })

    // return <button
    //     ref={buttonRef}
    //     className={classNames}
    //     children={children}
    //     onClick={onClick}
    // />;

    return <div className="mdl-card mdl-shadow--2dp">
        {children}
    </div>
}


export const CardSupportingText: React.SFC<{}> = (props) => {
    const { children } = props;

    return <div className="mdl-card__supporting-text">
        {children}
    </div>
}

export const CardTitle: React.SFC<{ text: string; }> = (props) => {
    const { text } = props;

    return <div className="mdl-card__title mdl-card--expand">
        <h2 className="mdl-card__title-text">{text}</h2>
    </div>;
}

export const CardActions: React.SFC<{}> = (props) => {
    const { children } = props;

    return <div className="mdl-card__actions mdl-card--border">
        {children}
    </div>;
}