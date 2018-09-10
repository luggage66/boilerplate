import * as React from 'react';
import HeaderView from './header';
import { observer } from 'mobx-react';
import AppStore from '../stores/app';
import { Row, Container, Col, CardBody,  } from 'reactstrap';
import CodeEditor from './codeEditor';
import InputEditor from './inputEditor';
import OutputViewer from './outputViewer';
import { Code } from 'typeorm';
import { action } from 'mobx';
import BoundEditor from '../components/boundEditor';
import Card from 'reactstrap/lib/Card';
import CardHeader from 'reactstrap/lib/CardHeader';

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
                <main role="main" className="container-fluid p-0">
                    <div className="inputBlock">
                        <InputEditor
                            value={this.props.appStore.inputText}
                            onChange={this.changeInputValue}
                        />
                    </div>
                    <div className="codeBlock">
                        <CodeEditor
                            language="typescript"
                            value={this.props.appStore.parserCode}
                            onChange={this.changeValue}
                            onCompiledCodeChange={this.changeCode}
                        />
                    </div>
                    <div className="resultsBlock">
                        <h1>Results</h1>
                        {this.props.appStore.lastResult && <OutputViewer result={this.props.appStore.lastResult} />}
                    </div>
                </main>
            </>
        );
    }
}
