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

for (const key of typeContext.keys()) {
    const filename = '/sprache/' + key.slice(2); // dropping the leading './'
    const code = typeContext(key);

    console.log(filename);

    monaco.languages.typescript.typescriptDefaults.addExtraLib(code, filename);
}
monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    target: monaco.languages.typescript.ScriptTarget.ES5,
    downlevelIteration: true,
    lib: ['esnext']
});

interface CodeEditorViewProps {
    value: string;
    onChange: (newValue: string) => any;
    onCompiledCodeChange: (newValue: string) => any;
    language: string;
}

@observer
export default class CodeEditorView extends React.Component<CodeEditorViewProps> {
    containerElementRef = React.createRef<HTMLDivElement>();
    editor!: monaco.editor.IStandaloneCodeEditor;
    model!: monaco.editor.ITextModel;
    changeSubscription!: monaco.IDisposable;
    client!: any;

    onEditorChange = async (e: monaco.editor.IModelContentChangedEvent) => {
        console.log('onChange', e);
        this.props.onChange(this.model.getValue());

        const compiledCode = await this.client.getEmitOutput(this.model.uri.toString());

        console.log('compiledCode', compiledCode);
        this.props.onCompiledCodeChange(compiledCode.outputFiles[0].text);
    }

    async componentDidMount() {
        const containerElement = this.containerElementRef.current!;

        // const typeContext = require.context('raw-loader!sprache/dist/src', false, /\.d.ts$/);

        // for (const key of typeContext.keys()) {
        //     const filename = '/sprache/' + key.slice(2); // dropping the leading './'
        //     const code = typeContext(key);

        //     console.log(filename);

        //     // monaco.languages.typescript.typescriptDefaults.addExtraLib(code, filename);
        //     monaco.editor.createModel(code, 'typescript', monaco.Uri.file(filename));
        // }

        this.model = monaco.editor.createModel(this.props.value, 'typescript', monaco.Uri.file('/myParser.ts'));

        this.editor = monaco.editor.create(containerElement, {
            model: this.model
        });

        this.changeSubscription = this.editor.onDidChangeModelContent(this.onEditorChange);

        const worker = await monaco.languages.typescript.getTypeScriptWorker();

        this.client = await worker(this.model.uri);
        const result = await this.client.getEmitOutput(this.model.uri.toString());
        this.props.onCompiledCodeChange(result.outputFiles[0].text);
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
            style={{height: '400px'}}
            ref={this.containerElementRef}
            className="editorContainer"
        />;
    }
}
