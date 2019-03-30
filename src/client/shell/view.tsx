import { observer } from 'mobx-react';
import * as React from 'react';
import { ShellViewModel } from './state';
import { ToastContainer } from './toasts';
import './style.scss';
import { Header } from './header';
import { Card, CardActions, CardSupportingText, CardTitle, Button, Layout, LayoutContent, LayoutDrawer, LayoutTitle, LayoutHeader, LayoutSpacer, LayoutNavigation, LayoutNavigationLink } from '../components/mdl';
import { Icon } from '../components';


@observer
export class ShellView extends React.Component<{ viewModel: ShellViewModel }> {
    public render() {
        const { viewModel } = this.props;

        if (viewModel.loading) return <div>Loading</div>;

        return <Layout>
            <LayoutHeader>
                <LayoutTitle>Site Title</LayoutTitle>
                <LayoutSpacer />
                <LayoutNavigation>
                    <LayoutNavigationLink>Link 1</LayoutNavigationLink>
                    <LayoutNavigationLink>Link 2</LayoutNavigationLink>
                </LayoutNavigation>
            </LayoutHeader>
            <LayoutDrawer>
                <LayoutTitle>test</LayoutTitle>
            </LayoutDrawer>
            <LayoutContent>
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
            </LayoutContent>
        </Layout>;
            
    }
}
