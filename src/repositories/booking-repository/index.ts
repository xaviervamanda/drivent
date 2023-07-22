import { prisma } from "@/config";

export function createBooking (userId: number, roomId: number) {
    return prisma.booking.create({
        data: {
            userId,
            roomId,
        },
    });
}

export function getRoomAndItsBookings (roomId: number) {
    return prisma.room.findFirst({
        where: {
            id: roomId
        },
        include: {
            Booking: true,
        },
    });
}

export function getBookingWithRoomData (userId: number){
    return prisma.booking.findFirst({
        where: {
            userId
        },
        select: {
            id: true,
            Room: true,
        }
    })
}

export function updateBooking (bookingId: number, roomId: number){
    return prisma.booking.update({
        where: {
            id: bookingId
        },
        data: {
            roomId
        }
    })
}
