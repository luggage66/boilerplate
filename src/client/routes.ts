import Home from './pages/home';
import ViewUser from './pages/viewUser';
import { IRouteConfig } from './routing';

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
] as IRouteConfig[];
