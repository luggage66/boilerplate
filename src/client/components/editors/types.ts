import { string } from "prop-types";


// All editors implement this.
export interface EditorComponentProps<TValue> {
    onChange: (newValue: TValue) => any;
    value: TValue;
}

type GetComponentPropType<TComponent> =
    TComponent extends React.ComponentType<infer TProps>
    ? TProps
    : never;

type GetConfigProps<TProps extends EditorComponentProps<any>> =
    Pick<TProps, Exclude<keyof TProps, keyof EditorComponentProps<any>>>;

type GetComponentProps<T> = T extends React.ComponentType<infer P> | React.Component<infer P> ? P : never;
type RemoveEditorComponentProps<T> = Pick<T, Exclude<keyof T, keyof EditorComponentProps<any>>>;
type GetComponentPropsWithoutModalProps<T> = RemoveEditorComponentProps<GetComponentProps<T>>;

export interface IFieldDefinition<
    // The parent object the field is off of
    TObject,
    TFieldName extends keyof TObject,
    TComponent extends React.ComponentType<any>,
    TProps extends EditorComponentProps<TObject[TFieldName]> = GetComponentPropType<TComponent>
> {
    // The field name (e.g. firstName)
    name: TFieldName;
    // The type of React Component we want to use to edit this field.
    component: TComponent;
    // any 'config' props (props other that value/onChange)
    props: GetConfigProps<TProps>;
}

export type EditorFieldDefinitionSet<TObject> = Array<IFieldDefinition<TObject, any, any, any>>;

