import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import * as hotelsService from "@/services/hotels-service";

export async function getHotels (req: AuthenticatedRequest, res: Response){
    const {userId} = req;

    const hotels = await hotelsService.getHotels(userId);
    return res.status(httpStatus.OK).send(hotels);
}

export async function getHotelById (req: AuthenticatedRequest, res: Response){
    const {hotelId} = req.params;
    const {userId} = req;

    if (!hotelId) return res.sendStatus(httpStatus.BAD_REQUEST);
    const hotelIdNumber = Number(hotelId);
    if (isNaN(hotelIdNumber)) return res.sendStatus(httpStatus.BAD_REQUEST);

    const hotel = await hotelsService.getHotelById(hotelIdNumber, userId);
    return res.status(httpStatus.OK).send(hotel);
}