import * as React from 'react';
import HeaderView from './header';
import SidebarView from './sidebar';
import BodyView from './body';
import FooterView from './footer';
import { observer } from 'mobx-react';
import AppStore from '../stores/app';

@observer
export default class AppView extends React.Component<{ appStore: AppStore }, never> {
    render () {
        return (
            <>
                <HeaderView />
                <SidebarView />
                <BodyView />
                <FooterView />
            </>
        );
    }
}