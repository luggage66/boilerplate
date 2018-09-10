import * as React from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, Dropdown, DropdownItem,
    UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import * as monaco from 'monaco-editor';

// (window as any).monaco = monacoEditor;

// monacoEditor.languages.typescript.getTypeScriptWorker()
// .then(function(worker) {
//     worker(model.uri)
//           .then(function(client) {
//                 client.getEmitOutput(model.uri.toString()).then(function(r) {});
//           });
// });

// @ts-ignore
// import * as spracheTypeDefs from 'raw-loader!sprache/dist/src/index.d.ts';

const typeContext = require.context('raw-loader!sprache/dist/src', false, /\.d.ts$/);

interface InputEditorViewProps {
    value: string;
    onChange: (newValue: string) => any;
}

@observer
export default class InputEditorView extends React.Component<InputEditorViewProps> {
    containerElementRef = React.createRef<HTMLDivElement>();
    editor!: monaco.editor.IStandaloneCodeEditor;
    model!: monaco.editor.ITextModel;
    changeSubscription!: monaco.IDisposable;

    onEditorChange = async (e: monaco.editor.IModelContentChangedEvent) => {
        this.props.onChange(this.model.getValue());
    }

    async componentDidMount() {
        const containerElement = this.containerElementRef.current!;

        this.model = monaco.editor.createModel(this.props.value, 'plaintext', monaco.Uri.file('/myDSL'));

        this.editor = monaco.editor.create(containerElement, {
            model: this.model
        });

        this.changeSubscription = this.editor.onDidChangeModelContent(this.onEditorChange);
    }

    componentWillUnmount() {
        if (this.editor) {
            this.editor.dispose();
        }

        if (this.changeSubscription) {
            this.changeSubscription.dispose();
        }
    }

    render() {
        const options = {
            selectOnLineNumbers: true
        };

        return <div
            // style={{height: '400px'}}
            ref={this.containerElementRef}
            className="editorContainer border border-secondary"
        />;
    }
}
