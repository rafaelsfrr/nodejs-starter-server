import { Router } from 'express';

export function Routes(): Router {
    const router = Router();
    router.get('/hello', hello);
    router.get('/', index);

    return router;

    function hello(req: any, res: any) {
        res.send('Hello, dude');
    }

    function index(req: any, res: any) {
        res.render('index', {title: 'Hello', message: 'Whats up, dude'});
    }
}