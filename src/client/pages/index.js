import Home from './home';
import ViewUser from './viewUser';

const routes = [
    {
        name: 'home',
        path: '',
        component: Home
    },
    {
        name: 'viewUser',
        path: 'users/:id',
        component: ViewUser
    }
];

export { routes };
