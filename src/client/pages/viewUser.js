import React from 'react';
import { observable } from 'mobx';
import { Link } from '../routing';
import UserGroupPicker from '../editors/userGroupPicker';

class ViewUser extends React.Component
{
    render() {
        return <div>
            View User: {this.props.user.name}
            <UserGroupPicker value={this.props.user.group} />
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
        user: ({ id }) => fetch(`/api/v1/users/${id}`).then(res => res.json()),
        userGroups: UserGroupPicker.queries.allUserGroups
    },
    component: ViewUser
};
