import { notFoundError, forbiddenError } from "@/errors";
import * as bookingsRepository from "@/repositories/booking-repository";
import { getUserTickets } from "@/repositories/ticket-repository";

export async function createBooking(userId: number, roomId: number) {
    const tickets = await getUserTickets (userId);
    const ticket = tickets[0];

    if (ticket.TicketType.isRemote || !ticket.TicketType.includesHotel || ticket.status !== "PAID") {
        throw forbiddenError();
    }

    const room = await bookingsRepository.getRoomAndItsBookings(roomId);
    if (!room) throw notFoundError();

    if (room.Booking.length === room.capacity) throw forbiddenError();
    
    return await bookingsRepository.createBooking(userId, roomId);
}

export async function updateBooking (bookingId: number, roomId: number, userId: number){
    const booking = await bookingsRepository.getBookingWithRoomData (userId);
    if (!booking) throw forbiddenError();

    const room = await bookingsRepository.getRoomAndItsBookings(roomId);
    if (!room) throw notFoundError();

    if (room.Booking.length === room.capacity) throw forbiddenError();
    
    return await bookingsRepository.updateBooking(bookingId, roomId);
}