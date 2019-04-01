import { observable, action } from 'mobx';

export class ShellViewModel {
    @observable title: string = "initial title";
    @observable loading = true;

    @action
    finishLoading = () => {
        this.loading = false;
    }
}
