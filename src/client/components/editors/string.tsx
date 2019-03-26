import * as React from 'react';
import { EditorComponentProps } from './types';

interface StringEditorProps extends EditorComponentProps<string> {
    textarea: boolean;
}

export class StringEditor extends React.Component<StringEditorProps> {

    public render() {
        const { onChange, textarea, value } = this.props;

        const ElementType = textarea ? 'textarea' : 'input';

        return <input
            onChange={evt => onChange(evt.currentTarget.value)} // or evt.target?
            value={value}
            multiple={textarea}
        />
    }
}