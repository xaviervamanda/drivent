import { notFoundError, paymentRquiredError } from "@/errors";
import * as hotelsRepository from "@/repositories/hotel-repository";
import { getUserTickets } from "@/repositories/ticket-repository";
import { getUserEnrollment } from "@/repositories/enrollment-repository";

export async function getHotels(userId: number) {
    const enrollment = await getUserEnrollment(userId);
    const ticket = await getUserTickets(userId);
    if (!enrollment || !ticket) throw notFoundError();

    if (ticket[0].status === "RESERVED" 
        || ticket[0].ticketType.isRemote === true 
        || ticket[0].ticketType.includesHotel === false) throw paymentRquiredError();

    
    const hotels = await hotelsRepository.getHotels();
    if (hotels.length === 0) throw notFoundError();
    return hotels;
}

export async function getHotelById(hotelId: number, userId: number){
    const enrollment = await getUserEnrollment(userId);
    const ticket = await getUserTickets(userId);
    if (!enrollment || !ticket) throw notFoundError();

    if (ticket[0].status === "RESERVED" 
        || ticket[0].ticketType.isRemote === true 
        || ticket[0].ticketType.includesHotel === false) throw paymentRquiredError();

    const hotel = await hotelsRepository.getHotelById(hotelId);
    return hotel;
}