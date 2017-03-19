import * as React from 'react';

export default class UserGroupPicker extends React.Component<{ value: string, allowedUserGroups: any[], onChange(any): void }, {}>
{
    static queries = {
        allUserGroups: () => fetch(`/api/v1/userGroups`).then(res => res.json())
    }

    render() {
        return <select value={this.props.value} onChange={this.props.onChange}>
            {this.props.allowedUserGroups.map(userGroup => (
                <option value={userGroup.id}>{userGroup.name}</option>
            ))}
        </select>;
    }
}
