import * as React from 'react';
import { action } from 'mobx';
import { observer, inject } from 'mobx-react';

export interface BoundEditorProps {
    objectToEdit?: any;
    name: string;
    component: React.ComponentClass<any> | React.StatelessComponent<any>;
    props?: any;
    [name: string]: any;
}

interface CommonEditorProps<T> {
    value: T;
    onChange: (newValue: T) => any;
}

@inject('objectToEdit')
@observer
export default class BoundEditor extends React.Component<BoundEditorProps> {

    @action.bound
    handleChange(newValue: any) {
        this.props.objectToEdit[this.props.name] = newValue;
    }

    render() {
        const { name, component, objectToEdit, props, ...otherProps } = this.props;

        let propsToUse = otherProps;

        if (props) {
            propsToUse = props;
        }
        // tslint:disable-next-line:variable-name
        const Component = component; // capitalizing for JSX
        return <Component
            value={objectToEdit[name]}
            onChange={this.handleChange}
            {...propsToUse}
        />;
    }
}
