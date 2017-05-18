import * as React from 'react';
import { observable } from 'mobx';
import { Link } from '../routing';
import UserGroupPicker from '../components/editors/userGroupPicker';

export default class ViewUser extends React.Component<{ user: any, allowedUserGroups: any[] }, void>
{
    // the router / data-loader looks for a static loadData() function
    static async loadData({ id }) {
        return {
            user: await fetch(`/api/v1/users/${id}`).then((res: Response) => res.json()),
            allowedUserGroups: await UserGroupPicker.queries.allUserGroups()
        };
    }

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
