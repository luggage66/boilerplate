import { RoutingError } from './errors';
import { Router } from 'express';

const router = Router();
export default router;

// handle common tasks for all api routes
function apiFunction(innerFunction) {
    return function(req, res, next) {
        Promise.resolve(innerFunction(req))
        .then(result => {
            res.json(result);
        }, (err) => {
            console.error(err.stack);
            res.status(err.status || 500);
            res.json(err);
        });
    };
}

//sample route
router.get('/users/:id', apiFunction(req => {
    let { id } = req.params;

    id = Number(id);

    return {
        id: id,
        name: `User #${id}`
    };
}));

//anything else is uncivilized.
router.use(function(req, res, next) {
    return next(new RoutingError());
});
