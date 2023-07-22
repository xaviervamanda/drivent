import { prisma } from "@/config";
import { Hotel, Room } from "@prisma/client";

export function getHotels (){
    return prisma.hotel.findMany();
}

type HotelWithRooms = Hotel & {
    Rooms: Room[];
}

export function getHotelById (hotelId: number){
    return prisma.hotel.findUnique({
        where: {
            id: hotelId
        }
    })
}

export function getHotelRooms(hotelId: number){
    return prisma.room.findMany({
        where: {
            hotelId
        }
    })
}