import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import * as paymentsService from "@/services/payments-service";
import { PaymentRequestBody } from "@/protocols";

export async function getUserTicketPayment(req: AuthenticatedRequest, res: Response){
    const {userId} = req;
    const {ticketId} = req.query as {ticketId: string};

    try{
        if (!ticketId){
            return res.sendStatus(httpStatus.BAD_REQUEST);
        }
        return await paymentsService.getUserTicketPayment(parseInt(ticketId), userId);
        
    } catch (error){
        if (error.name === "NotFoundError"){
            return res.status(httpStatus.NOT_FOUND).send(error.message);
        }
        if (error.name === "UnauthorizedError"){
            return res.sendStatus(httpStatus.UNAUTHORIZED);
        }
        console.log(error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

export async function createTicketPayment (req: AuthenticatedRequest, res: Response){
    const body = req.body as PaymentRequestBody;
    const {userId} = req;

    try{
        return await paymentsService.createTicketPayment(body, userId);
        
    } catch (error){
        if (error.name === "NotFoundError"){
            return res.status(httpStatus.NOT_FOUND).send(error.message);
        }
        if (error.name === "UnauthorizedError"){
            return res.sendStatus(httpStatus.UNAUTHORIZED);
        }
        console.log(error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}