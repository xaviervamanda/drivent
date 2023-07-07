import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const paymentsRouter = Router();

// paymentsRouter.use(authenticateToken);
paymentsRouter.get ('');
paymentsRouter.post('/process');

export { paymentsRouter };