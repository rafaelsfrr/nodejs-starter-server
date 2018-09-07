import { Router } from 'express';

export function Routes(): Router {
    const router = Router();
    router.get('/', hello);

    return router;

    function hello(req: any, res: any) {
        res.send('Hello, dude');
    }
}