import * as React from 'react';
import { observer } from 'mobx-react';

export interface ShellToastMessage {
    message: string;
}


@observer
export class ToastContainer extends React.Component<{ toasts: ShellToastMessage[] }> {

    public render() {
        const { toasts } = this.props;

        return <ul className="toast-container">
            {toasts.map(toast => <Toast toast={toast} />)}
        </ul>
    }
}

export const Toast = observer(({ toast }: { toast: ShellToastMessage }) => {
    return <li>
        {toast.message}
    </li>;
});
