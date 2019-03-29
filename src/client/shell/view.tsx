import { observer } from 'mobx-react';
import * as React from 'react';
import { ShellViewModel } from './state';
import { ToastContainer } from './toasts';
import './style.scss';
import { Header } from './header';
import { Card, CardActions, CardSupportingText, CardTitle, Button } from '../components/mdl';
import { Icon } from '../components';


@observer
export class ShellView extends React.Component<{ viewModel: ShellViewModel }> {
    public render() {
        const { viewModel } = this.props;

        return <div className="application-shell-d">
            <Card>
                <CardTitle text="Title" />
                <CardSupportingText>
                    lorem ipsum
                </CardSupportingText>
                <CardActions>
                    <Button raised ripple accent>
                        <Icon icon="save" />
                        Save
                    </Button>
                </CardActions>
            </Card>
            <div className="application-header">
                <div>
                    <Header></Header>
                    {viewModel.title}
                </div>
            </div>
            <div className="application-sidebar">
                <ul>
                    <li>
                        
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
