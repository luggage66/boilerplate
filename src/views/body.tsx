import * as React from 'react';
import { observer } from 'mobx-react';

@observer
export default class BodyView extends React.Component<{}, never> {
    render () {
        return <div className="body">
            <div className="alert alert-danger" role="alert">
                This is a danger alert—check it out!
            </div>
        </div>;
    }
}