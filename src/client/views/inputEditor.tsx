import * as React from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, Dropdown, DropdownItem,
    UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import * as monacoEditor from 'monaco-editor';
import MonacoEditor from 'react-monaco-editor';

export interface InputEditorViewProps {
    value: string;
    onChange: (newValue: string) => any;
}

@observer
export default class InputEditorView extends React.Component<InputEditorViewProps> {

    editorWillMount(monaco: typeof monacoEditor) {
        // empty
    }

    editorDidMount = (editor: monacoEditor.editor.IStandaloneCodeEditor, monaco: typeof monacoEditor) => {
        // empty
    }

    onEditorChange = (newValue: string, e: monacoEditor.editor.IModelContentChangedEvent) => {
        this.props.onChange(newValue);
    }

    onTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.props.onChange(event.target.value);
    }

    render() {
        return <textarea rows={10} value={this.props.value} onChange={this.onTextAreaChange} />;
        // const options = {
        //     selectOnLineNumbers: true
        // };

        // return <MonacoEditor
        //     // width="800"
        //     // height="600"
        //     language="plaintext"
        //     theme="vs-dark"
        //     value={this.props.value}
        //     options={options}
        //     onChange={this.onEditorChange}
        //     editorDidMount={this.editorDidMount}
        //     editorWillMount={this.editorWillMount}
        // />;
    }
}
