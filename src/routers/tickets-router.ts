import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const ticketsRouter = Router();

ticketsRouter.use(authenticateToken);
ticketsRouter.get ('/types');
ticketsRouter.get('/');
ticketsRouter.post('/');

export {ticketsRouter};