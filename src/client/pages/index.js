import Home from './home';
import ViewUser from './viewUser';
import TestDataLoading from './testDataLoading';

const routes = [
    {
        name: 'home',
        path: '',
        component: Home,
        queries: {}
    },
    ViewUser,
    TestDataLoading
];

console.log(routes);

export { routes };
