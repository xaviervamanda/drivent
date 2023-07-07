import { authenticateToken } from '@/middlewares';
import { Router } from 'express';
import * as ticketsControllers from '@/controllers/tickets-controller';

const ticketsRouter = Router();

ticketsRouter.use(authenticateToken);
ticketsRouter.get ('/types', ticketsControllers.getAllTypesOfTickets);
ticketsRouter.get('/', ticketsControllers.getUserTickets);
ticketsRouter.post('/', ticketsControllers.createTicket);

export {ticketsRouter};