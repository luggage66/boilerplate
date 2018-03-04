import './style.css';
import * as React from 'react';
import { render }  from 'react-dom';
import { Container, Col, Row, Nav, NavItem, NavLink, NavbarBrand, Form } from 'reactstrap';

class AppView extends React.Component {
    render() {
        return <div>
            <Nav>
                <NavLink href="#">Home</NavLink>
                <NavLink href="#">Options</NavLink>
            </Nav>
            <main>

            </main>
        </div>;
    }
}

render(<AppView />, document.getElementById('appRoot'));
