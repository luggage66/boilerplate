import React from 'react';
import { observable } from 'mobx';
import { Link } from '../routing';

class ViewUser extends React.Component
{
    render() {
        return <div>
            View User: {this.props.user.name}
        </div>;
    }
}

export default {
    name: 'viewUser',
    path: 'users/:id',
    defaultParams: {
        id: null
    },
    queries: {
        user: ({ id }) => fetch(`/api/v1/users/${id}`).then(res => res.json())
    },
    component: ViewUser
};
