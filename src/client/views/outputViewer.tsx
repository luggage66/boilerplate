import * as React from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, Dropdown, DropdownItem,
    UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Result } from 'sprache';

@observer
export default class OutputViewerView extends React.Component<{ result: Result<any> }> {

    render() {
        return <pre>
            {JSON.stringify(this.props.result, null, '  ')}
        </pre>;
    }
}
