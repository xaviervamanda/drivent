import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";

export async function getUserTicketPayment(req: AuthenticatedRequest, res: Response){
    const {userId} = req;
    const {ticketId} = req.query;

    
}