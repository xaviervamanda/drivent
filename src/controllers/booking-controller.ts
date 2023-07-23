import httpStatus from "http-status";
import * as bookingsService from "@/services/booking-service";
import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";

export async function createBooking(req: AuthenticatedRequest, res: Response) {
    const {roomId: roomIdString} = req.body as {roomId: string};
    const roomId = Number(roomIdString);
    const {userId} = req;
    
    if (!roomIdString) return res.sendStatus(httpStatus.BAD_REQUEST);
    if (isNaN(roomId)) return res.sendStatus(httpStatus.BAD_REQUEST);

    const booking = await bookingsService.createBooking(userId, roomId);
    return res.status(httpStatus.OK).send({bookingId: booking.id});
}

export async function updateBooking (req: AuthenticatedRequest, res: Response) {
    const bookingId = Number(req.params.bookingId);
    const {roomId: roomIdString} = req.body as {roomId: string};
    const roomId = Number(roomIdString);
    const {userId} = req;
    
    if (!roomIdString) return res.sendStatus(httpStatus.BAD_REQUEST);
    if (isNaN(roomId)) return res.sendStatus(httpStatus.BAD_REQUEST);

    
    const booking = await bookingsService.updateBooking(bookingId, roomId, userId);
    return res.status(httpStatus.OK).send({bookingId: booking.id});
}

export async function getBooking (req: AuthenticatedRequest, res: Response) {
    const {userId} = req;

    
    const booking = await bookingsService.getBooking(userId);
    return res.status(httpStatus.OK).send(booking);
}