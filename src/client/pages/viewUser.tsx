import * as React from 'react';
import { observable } from 'mobx';
import { Link } from '../routing';
import UserGroupPicker from '../editors/userGroupPicker';

export default class ViewUser extends React.Component<{ user: any, allowedUserGroups: any[] }, void>
{
    // the router / data-loader looks for a static loadData() function
    static async loadData({ id }) {
        return {
            user: await fetch(`/api/v1/users/${id}`).then(res => res.json()),
            allowedUserGroups: await UserGroupPicker.queries.allUserGroups()
        };
    }

    // this.props will contain the return value of ViewUser.loadData() + route data
    // this.props = {
    //    user: { name: "...", ... },
    //    allowedUserGroups: [ {}, {}, ... ],
    //    route: { route: { path: "", component: Component }, state: { id: 123} }
    // }
    render() {
        return <div>
            <div>
                User Name: {this.props.user.name}
            </div>
            <div>
                Group: <UserGroupPicker value={this.props.user.group} allowedUserGroups={this.props.allowedUserGroups} onChange={() => undefined} />
            </div>
        </div>;
    }
}
