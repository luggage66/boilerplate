import * as React from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, Dropdown, DropdownItem,
    UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

@observer
export default class HeaderView extends React.Component<{}, never> {
    @observable isOpen: boolean = false;

    @action
    toggle = () => {
        this.isOpen = !this.isOpen;
    }

    render() {
        return <Navbar className="shadow" fixed="top" color="primary" dark expand="md">
            <NavbarBrand href="#">Boilerplate</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink href="/components/">Components</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Options
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>
                                Option 1
                            </DropdownItem>
                            <DropdownItem>
                                Option 2
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>
                                Reset
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            </Collapse>
        </Navbar>;
    }
}
