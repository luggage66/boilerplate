import * as React from 'react';
import { observer } from 'mobx-react';
import { currentUserContext } from '../contexts';

@observer
export default class HeaderView extends React.Component<{}, never> {
    render () {
        return <header id="appHeader">
            Header
        </header>;
    }
}