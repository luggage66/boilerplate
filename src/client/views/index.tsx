import * as React from 'react';
import HeaderView from './header';
import { observer } from 'mobx-react';
import AppStore from '../stores/app';
import { Row, Container, Col } from 'reactstrap';
import CodeEditor from './codeEditor';
import InputEditor from './inputEditor';
import OutputViewer from './outputViewer';
import { Code } from 'typeorm';
import { action } from 'mobx';
import BoundEditor from '../components/boundEditor';

@observer
export default class AppView extends React.Component<{ appStore: AppStore }, never> {
    @action.bound
    changeValue(newValue: string) {
        console.log('changeValue');
        this.props.appStore.parserCode = newValue;
    }

    @action.bound
    changeCode(newValue: string) {
        console.log('changeValueCompiled');
        this.props.appStore.parserCodeCompiled = newValue;
    }

    @action.bound
    changeInputValue(newValue: string) {
        this.props.appStore.inputText = newValue;
    }

    render() {
        return (
            <>
                <HeaderView />
                <main role="main" className="container">
                    
                    <Row style={{height: '400px'}}>
                        <Col md={6}>
                            <h1>Input Text</h1>
                            <InputEditor
                                value={this.props.appStore.inputText}
                                onChange={this.changeInputValue}
                            />
                        </Col>
                        <Col md={6}>
                            <h1>Your Parser</h1>
                            <CodeEditor
                                language="typescript"
                                value={this.props.appStore.parserCode}
                                onChange={this.changeValue}
                                onCompiledCodeChange={this.changeCode}
                            />
                        </Col>
                    </Row>
                    <h1>Results</h1>
                    {this.props.appStore.lastResult && <OutputViewer result={this.props.appStore.lastResult} />}
                </main>
            </>
        );
    }
}
