import * as React from 'react';

export interface StringEditorProps {
    value: string | null;
    placeholder?: string;
    onChange(newValue: string | null): void;
}

export default class StringEditor extends React.Component<StringEditorProps, never>
{
    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChange(event.target.value);
    }

    render() {
        return <input
            type="text"
            className="input"
            placeholder={this.props.placeholder}
            onChange={this.handleChange}
        />;
    }
}
