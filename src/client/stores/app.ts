import { observable, computed } from 'mobx';
import { Parser, Parse } from 'sprache';

export default class AppStore {
    @observable statusBarMessage = 'Ready.';

    @observable inputText = 'AA';
    @observable parserCode = 'return Parse.char("A").atLeastOnce()';

    @computed
    get parseResult() {
        const parserFn = new Function('Parse', this.parserCode);
        const parser = parserFn(Parse) as Parser<string>;

        return parser.parse<any>(this.inputText);
    }
}
