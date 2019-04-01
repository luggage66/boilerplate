import * as React from 'react';
import { Icon } from '../components';
import 'material-design-lite';
import Button from '@material-ui/core/Button';

export interface HeaderProps {
    
}

export const Header = (props: HeaderProps) => {
    

    return <Button>
        <Icon icon="plus" />
    </Button>;
}

