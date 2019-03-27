import { observable, action } from 'mobx';
import { ShellToastMessage } from './toasts';

export class ShellViewModel {
    @observable title: string = "initial title";
    @observable toastMessages: ShellToastMessage[] = [];

    @action
    showToast(message: string) {
        this.toastMessages.push({
            message,
        });
    }
}
