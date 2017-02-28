import Home from './pages/home';
import ViewUser from './pages/viewUser';

export default [
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
