import httpStatus from "http-status";
import * as ticketsService from "@/services/tickets-service";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import { badRequestError } from "@/errors";

export async function getAllTypesOfTickets(req: AuthenticatedRequest, res: Response) {
    try{
        const tickets = await ticketsService.getAllTypesOfTickets();
        return res.status(httpStatus.OK).send(tickets);
    } catch (error){
        console.log(error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

export async function getUserTickets (req: AuthenticatedRequest, res: Response){
    const {userId} = req;

    try{
        const ticket = await ticketsService.getUserTickets(userId);
        return res.status(httpStatus.OK).send(ticket);
        
    } catch (error){
        console.log(error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

export async function createTicket (req: AuthenticatedRequest, res: Response){
    const {ticketTypeId} = req.body as {ticketTypeId: number};
    const {userId} = req;

    try{
        await ticketsService.createTicket(ticketTypeId, userId);
        const ticket = await ticketsService.getUserTickets(userId);
        return res.status(httpStatus.CREATED).send(ticket);
    } catch (error){
        if (error.name === "BadRequestError"){
            return res.status(httpStatus.BAD_REQUEST).send(error.message);
        }
        console.log(error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}