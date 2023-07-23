import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import * as bookingsController from "@/controllers/booking-controller";


export const bookingsRouter = Router();

bookingsRouter.use (authenticateToken);
bookingsRouter.get ('/', bookingsController.getBooking);
bookingsRouter.post ('/', bookingsController.createBooking);
bookingsRouter.put ('/:bookingId', bookingsController.updateBooking);