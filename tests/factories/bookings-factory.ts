import { prisma } from "@/config";
import { faker } from "@faker-js/faker";
import { generateValidToken } from "../helpers";
import { 
    createUser,
    createTicketType,
    createTicket,
    createTicketTypeRemote,
    createEnrollmentWithAddress,
    createHotel,
    createHotelRooms
} from "../factories";
import { TicketStatus } from '@prisma/client';

export async function createBookingWithUserAndEnrollment (){
    const user = await createUser();
    const token = await generateValidToken(user);
    const enrollment = await createEnrollmentWithAddress(user);
    const ticketType = await createTicketType();
    await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
    await createHotel();
}