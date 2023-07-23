import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import * as paymentsService from "@/services/payments-service";
import { PaymentRequestBody } from "@/protocols";

export async function getUserTicketPayment(req: AuthenticatedRequest, res: Response){
    const {userId} = req;
    const {ticketId} = req.query as {ticketId: string};

    if (!ticketId){
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const ticket = await paymentsService.getUserTicketPayment(parseInt(ticketId), userId);
    return res.status(httpStatus.OK).send(ticket);
}

export async function createTicketPayment (req: AuthenticatedRequest, res: Response){
    const body = req.body as PaymentRequestBody;
    const {userId} = req;

    if (!body.ticketId || !body.cardData){
        return res.sendStatus(httpStatus.BAD_REQUEST);
    } 
    const ticket = await paymentsService.createTicketPayment(body, userId);
    return res.status(httpStatus.OK).send(ticket);
}