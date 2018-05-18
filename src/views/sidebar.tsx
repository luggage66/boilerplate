import * as React from 'react';
import { observer } from 'mobx-react';

@observer
export default class SidebarView extends React.Component<{}, never> {
    render () {
        return <aside className="sidebar" />;
    }
}