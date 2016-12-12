import React from 'react';
import { Link } from '../routing';

export default class HomePage extends React.Component
{
    render() {
        return <div>
            Home!
            <Link route="viewUser" params={{ id: 123 }}>View User</Link>
        </div>;
    }
}
