import * as React from 'react';
import HeaderView from './header';
import { observer } from 'mobx-react';
import AppStore from '../stores/app';
import { Row, Container } from 'reactstrap';
import CodeEditor from './codeEditor';
import InputEditor from './inputEditor';
import OutputViewer from './outputViewer';
import { Code } from 'typeorm';

@observer
export default class AppView extends React.Component<{ appStore: AppStore }, never> {
    render() {
        return (
            <>
                <HeaderView />
                <Container role="main" fluid>
                    <InputEditor />
                    <CodeEditor />
                    <OutputViewer result={this.props.appStore.parseResult} />
                </Container>
            </>
        );
    }
}
