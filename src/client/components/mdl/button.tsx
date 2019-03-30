import * as React from 'react';
import 'material-design-lite';
import cx from 'classnames';
import { useMdl } from '../hooks/useMdl';

export interface ButtonProps {
    accent?: boolean;
    colored?: boolean;
    ripple?: boolean;
    fab?: boolean;
    raised?: boolean;
    icon?: boolean;

    onClick?: () => any;
}

export const Button: React.SFC<ButtonProps> = (props) => {
    const { children, accent, colored, ripple, fab, raised, icon, onClick } = props;

    // const buttonRef = useMdl<HTMLButtonElement>();

    const classNames = cx('mdl-button mdl-js-button', {
        'mdl-button--accent': accent,
        'mdl-button--colored': colored,
        'mdl-button--fab': fab,
        'mdl-button--raised': raised,
        'mdl-button--icon': icon,
        'mdl-js-ripple-effect': ripple,
    })

    return <button
        // ref={buttonRef}
        className={classNames}
        children={children}
        onClick={onClick}
    />;
}
