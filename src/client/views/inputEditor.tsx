import * as React from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, Dropdown, DropdownItem,
    UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

@observer
export default class InputEditorView extends React.Component<{}> {

    render() {
        return <div>
            <textarea />
        </div>;
    }
}
