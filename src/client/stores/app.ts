import { observable, computed, reaction } from 'mobx';
import { Parser, Parse, Result } from 'sprache';
import * as sprache from 'sprache';


// import * as ts from 'typescript';

// function compile(fileNames: string[], options: ts.CompilerOptions): void {
//     let program = ts.createProgram(fileNames, options);
//     let emitResult = program.emit();

//     let allDiagnostics = ts
//         .getPreEmitDiagnostics(program)
//         .concat(emitResult.diagnostics);

//     allDiagnostics.forEach(diagnostic => {
//         if (diagnostic.file) {
//             let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(
//                 diagnostic.start!
//             );
//             let message = ts.flattenDiagnosticMessageText(
//                 diagnostic.messageText,
//                 "\n"
//             );
//             console.log(
//                 `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`
//             );
//         } else {
//             console.log(
//                 `${ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n")}`
//             );
//         }
//     });

//     let exitCode = emitResult.emitSkipped ? 1 : 0;
//     console.log(`Process exiting with code '${exitCode}'.`);
//     process.exit(exitCode);
// }

// compile(process.argv.slice(2), {
//     noEmitOnError: true,
//     noImplicitAny: true,
//     target: ts.ScriptTarget.ES5,
//     module: ts.ModuleKind.CommonJS
// });

export default class AppStore {
    @observable statusBarMessage = 'Ready.';

    @observable inputText = '4 + 42';
    @observable parserCode = `
import { Parse } from 'sprache';

const IntegerLiteral = Parse.digit.atLeastOnce().text().select(str => Number(str));

const ArithmeticOperation = Parse.query(function*() {
    const lhs       = yield IntegerLiteral.token();
    const operator  = yield Parse.chars('+-/*');
    const rhs       = yield IntegerLiteral.token();

    return Parse.return({
        $type: "arithmetic",
        operator,
        lhs,
        rhs
    });
});

export default ArithmeticOperation;
`;

    @observable parserCodeCompiled: string = '';

    @observable lastResult: Result<any> | null = null;
    @observable lastError: Error | null = null;

    constructor() {
        // this.useData(this.getData());
        reaction(this.getData, this.useData, {
            delay: 1000
        });
    }

    getData = () => {
        return {
            inputText: this.inputText,
            parserCode: this.parserCodeCompiled
        };
    }

    useData = (data: ReturnType<AppStore['getData']>) => {
        console.log('code', data.parserCode);
        const parserFn = new Function('require', 'exports', data.parserCode);

        let parser: Parser<string>;

        const myRequire = (moduleName: string) => {
            if (moduleName === 'sprache') {
                return sprache;
            }

            throw new Error('can only import sprache');
        };

        try {
            const parserModuleExports = {};
            parserFn(myRequire, parserModuleExports);

            parser = (parserModuleExports as any).default;

            this.lastError = null;
            this.lastResult = parser!.tryParse<any>(data.inputText);
        }
        catch (err) {
            this.lastError = err;
            this.lastResult = null;
        }

    }
}
