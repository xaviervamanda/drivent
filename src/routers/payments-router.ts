import { authenticateToken } from '@/middlewares';
import { Router } from 'express';
import * as paymentsControllers from '@/controllers/payments-controller';

const paymentsRouter = Router();

paymentsRouter.use(authenticateToken);
paymentsRouter.get ('/payments', paymentsControllers.getUserTicketPayment);
paymentsRouter.post('/payments/process', paymentsControllers.createTicketPayment);

export { paymentsRouter };