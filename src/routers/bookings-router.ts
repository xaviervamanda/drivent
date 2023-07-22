import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import * as bookingsController from "@/controllers/bookings-controller";


export const bookingsRouter = Router();

bookingsRouter.use (authenticateToken);
bookingsRouter.get ('/', );
bookingsRouter.post ('/', bookingsController.createBooking);
bookingsRouter.put ('/:bookingId', bookingsController.updateBooking);