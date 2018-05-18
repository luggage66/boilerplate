import { observable } from 'mobx';

export default class AppStore {
    @observable statusBarMessage = 'Ready.';
}