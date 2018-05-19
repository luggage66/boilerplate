import * as React from 'react';
import HeaderView from './header';
import { observer } from 'mobx-react';
import AppStore from '../stores/app';
import { Row, Container } from 'reactstrap';

@observer
export default class AppView extends React.Component<{ appStore: AppStore }, never> {
    render () {
        return (
            <>
                <HeaderView />
                <Container role="main" fluid>
                </Container>
            </>
        );
    }
}