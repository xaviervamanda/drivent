import Joi from "joi";

export const createAndUpdateBookingSchema = Joi.object({
    roomId: Joi.number().required()
});