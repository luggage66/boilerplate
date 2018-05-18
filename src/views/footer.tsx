import * as React from 'react';
import { observer } from 'mobx-react';

@observer
export default class FooterView extends React.Component<{}, never> {
    render () {
        return <footer />;
    }
}