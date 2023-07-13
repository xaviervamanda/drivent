import { authenticateToken } from "@/middlewares";
import { Router } from "express";
import * as hotelsControllers from "@/controllers/hotels-controller";

const hotelsRouter = Router();

hotelsRouter.use (authenticateToken);
hotelsRouter.get ('/', hotelsControllers.getHotels);
hotelsRouter.get ('/:hotelId', hotelsControllers.getHotelById);

export {hotelsRouter};