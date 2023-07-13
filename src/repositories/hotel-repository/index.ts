import { prisma } from "@/config";
import { Hotel, Room } from "@prisma/client";
import { Prisma } from "@prisma/client";

export function getHotels (){
    return prisma.hotel.findMany();
}

type HotelWithRooms = Hotel & {
    Rooms: Room[];
}

export function getHotelById (hotelId: number): Promise<HotelWithRooms> {
    return prisma.$queryRaw(
        Prisma.sql`
        SELECT
            "Hotel".*,
            json_agg(
                json_build_object(
                    'id', "Room".id,
                    'name', "Room".name,
                    'capacity', "Room".capacity,
                    'hotelId', "Room"."hotelId",
                    'createdAt', to_char("TicketType"."createdAt", 'YYYY-MM-DD"T"HH24:MI:SS.MSZ'),
                    'updatedAt', to_char("TicketType"."updatedAt", 'YYYY-MM-DD"T"HH24:MI:SS.MSZ')
                )
            ) AS "Rooms",
            to_char("Hotel"."createdAt", 'YYYY-MM-DD"T"HH24:MI:SS.MSZ') AS "createdAt",
            to_char("Hotel"."updatedAt", 'YYYY-MM-DD"T"HH24:MI:SS.MSZ') AS "updatedAt"
        FROM
            "Hotel"
        JOIN
            "Room" ON "Room"."hotelId" = "Hotel".id
        WHERE
            "Hotel".id = ${hotelId};
        `
    )
}