declare module "*.scss" {
    interface CSS {
        [key: string]: string;
    }

    const foo: CSS;

    export default foo;
}
