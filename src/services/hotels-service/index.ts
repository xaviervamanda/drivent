import { notFoundError, paymentRquiredError } from "@/errors";
import * as hotelsRepository from "@/repositories/hotel-repository";
import { getUserTicketsByEnrollmentId, getTicketByType } from "@/repositories/ticket-repository";
import { getUserEnrollment } from "@/repositories/enrollment-repository";

export async function getHotels(userId: number) {
    const enrollment = await getUserEnrollment(userId);
    if (!enrollment) throw notFoundError();
    const ticket = await getUserTicketsByEnrollmentId(enrollment.id);
    if (!ticket) throw notFoundError();
    const ticketType = await getTicketByType(ticket.ticketTypeId);

    if (ticket.status === "RESERVED" 
        || ticketType.isRemote === true 
        || ticketType.includesHotel === false) throw paymentRquiredError();
    
    const hotels = await hotelsRepository.getHotels();
    if (hotels.length === 0) throw notFoundError();
    return hotels;
}

export async function getHotelById(hotelId: number, userId: number){
    const enrollment = await getUserEnrollment(userId);
    if (!enrollment) throw notFoundError();
    const ticket = await getUserTicketsByEnrollmentId(enrollment.id);
    if (!ticket) throw notFoundError();

    const ticketType = await getTicketByType(ticket.ticketTypeId);

    if (ticket.status === "RESERVED" 
        || ticketType.isRemote === true 
        || ticketType.includesHotel === false) throw paymentRquiredError();

    const hotel = await hotelsRepository.getHotelById(hotelId);
    if (!hotel) throw notFoundError();
    
    const rooms = await hotelsRepository.getHotelRooms(hotelId);
    
    const result = {
        ...hotel,
        Rooms: rooms
    };
    return result;
}