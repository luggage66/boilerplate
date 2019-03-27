import { observer } from 'mobx-react';
import * as React from 'react';
import { ShellViewModel } from './state';
import { ToastContainer } from './toasts';
import './style.scss';
import { Icon } from '../components';

@observer
export class ShellView extends React.Component<{ viewModel: ShellViewModel }> {
    public render() {
        const { viewModel } = this.props;

        return <div className="application-shell">
            <div className="application-header">
                <div>
                    <Icon icon="arrow-left" />
                    {viewModel.title}
                </div>
            </div>
            <div className="application-sidebar">
                <ul>
                    <li>
                        <Icon icon="arrow-left" />
                        Sidebar Item
                    </li>
                </ul>
            </div>
            <div className="application-body">
                <p>hello world</p>
            </div>
            
            
        </div>;
    }
}
