import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import * as hotelsService from "@/services/hotels-service";

export async function getHotels (req: AuthenticatedRequest, res: Response){
    const {userId} = req;

    try{
        const hotels = await hotelsService.getHotels(userId);
        return res.status(httpStatus.OK).send(hotels);

    }catch (error){
        if (error.name === "NotFoundError"){
            return res.status(httpStatus.NOT_FOUND).send(error.message);
        }
        if (error.name === "PaymentRequiredError"){
            return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
        }
        console.log(error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

export async function getHotelById (req: AuthenticatedRequest, res: Response){
    const {hotelId} = req.params as {hotelId: string};
    const {userId} = req;

    try{
        const hotel = await hotelsService.getHotelById(Number(hotelId), userId);
        return res.status(httpStatus.OK).send(hotel);

    }catch (error){
        if (error.name === "NotFoundError"){
            return res.status(httpStatus.NOT_FOUND).send(error.message);
        }
        if (error.name === "PaymentRequiredError"){
            return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
        }
        console.log(error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}