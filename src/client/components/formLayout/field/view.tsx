import * as React from 'react';
import { EditorComponentProps, IFieldDefinition } from '../../editors/types';

export function Field<
    TObject,
    TFieldName extends keyof TObject,
    TComponent extends React.ComponentType<any>,
    TField extends IFieldDefinition<TObject, TFieldName, TComponent>
>({ field }: { field: TField; }) {
    return <div>
        <h4>{field.name}</h4>
    </div>
}