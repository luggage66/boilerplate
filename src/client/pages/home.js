import React from 'react';
import { Link } from '../routing';

export default class HomePage extends React.Component
{
    render() {
        return <div>
            Testy <Link route="viewUser" params={{ id: 312 }}>Home</Link>
        </div>;
    }
}
