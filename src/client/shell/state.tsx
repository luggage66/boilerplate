import { observable, action } from 'mobx';
import { ShellToastMessage } from './toasts';

export class ShellViewModel {
    @observable title: string = "initial title";
    @observable toastMessages: ShellToastMessage[] = [];
    @observable loading = true;

    @action
    showToast(message: string) {
        this.toastMessages.push({
            message,
        });
    }

    @action
    finishLoading = () => {
        this.loading = false;
    }
}
