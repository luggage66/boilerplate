import * as React from 'react';
import { Icon } from '../components';
import { Button } from '../components/mdl';
import 'material-design-lite';

export interface HeaderProps {
    
}

export const Header = (props: HeaderProps) => {
    

    return <Button raised ripple fab>
        <Icon icon="plus" />
    </Button>;
}

