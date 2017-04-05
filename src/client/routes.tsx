import Home from './pages/home';
import ViewUser from './pages/viewUser';

// react components that I mouth through the router accept certain props

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
