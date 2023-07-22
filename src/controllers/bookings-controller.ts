import httpStatus from "http-status";
import * as bookingsService from "@/services/bookings-service";
import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";

export async function createBooking(req: AuthenticatedRequest, res: Response) {
    const {roomId: roomIdString} = req.body as {roomId: string};
    const roomId = Number(roomIdString);
    const {userId} = req;
    
    if (!roomIdString) return res.sendStatus(httpStatus.BAD_REQUEST);
    if (isNaN(roomId)) return res.sendStatus(httpStatus.BAD_REQUEST);

    try{
        const booking = await bookingsService.createBooking(userId, roomId);
        return res.status(httpStatus.OK).send(booking.id);

    } catch (error){
        if (error.name === "BadRequestError"){
            return res.status(httpStatus.BAD_REQUEST).send(error.message);
        }
        if (error.name === "NotFoundError"){
            return res.status(httpStatus.NOT_FOUND).send(error.message);
        }
        if (error.name === "ForbiddenError"){
            return res.status(httpStatus.FORBIDDEN).send(error.message);
        }
        console.log(error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

export async function updateBooking (req: AuthenticatedRequest, res: Response) {
    const bookingId = Number(req.params.bookingId);
    const {roomId: roomIdString} = req.body as {roomId: string};
    const roomId = Number(roomIdString);
    const {userId} = req;
    
    if (!roomIdString) return res.sendStatus(httpStatus.BAD_REQUEST);
    if (isNaN(roomId)) return res.sendStatus(httpStatus.BAD_REQUEST);

    try{
        const booking = await bookingsService.updateBooking(bookingId, roomId, userId);
        return res.status(httpStatus.OK).send(booking.id);

    } catch (error){
        if (error.name === "BadRequestError"){
            return res.status(httpStatus.BAD_REQUEST).send(error.message);
        }
        if (error.name === "NotFoundError"){
            return res.status(httpStatus.NOT_FOUND).send(error.message);
        }
        if (error.name === "ForbiddenError"){
            return res.status(httpStatus.FORBIDDEN).send(error.message);
        }
        console.log(error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}