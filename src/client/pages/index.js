import Home from './home';
import ViewUser from './viewUser';

const routes = [
    {
        name: 'home',
        path: '',
        component: Home,
        queries: {}
    },
    ViewUser
];

console.log(routes);

export { routes };
