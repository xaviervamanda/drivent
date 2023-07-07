import { prisma } from "@/config";
import { Prisma } from "@prisma/client";
import { Ticket, TicketType } from "@prisma/client";

export async function getAllTypesOfTickets (){
    return await prisma.ticketType.findMany();
}

type TicketResponse =  Ticket & {
    ticketType: TicketType
}

export async function getUserTickets (userId: number): Promise<TicketResponse[]> {
    return await prisma.$queryRaw(
        Prisma.sql`
        SELECT
        "Tickets".id,
        "Tickets".status,
        "Tickets"."ticketTypeId",
        "Tickets"."enrollmentId",
        json_build_object(
            'id', "TicketType".id,
            'name', "TicketType".name,
            'price', "TicketType".price,
            'isRemote', "TicketType"."isRemote",
            'includesHotel', "TicketType"."includesHotel",
            'createdAt', "TicketType"."createdAt",
            'updatedAt', "TicketType"."updatedAt"
        ) AS "TicketType",
        "Tickets"."createdAt",
        "Tickets"."updatedAt"
        FROM
        "Enrollment"
        JOIN
        tickets ON "Enrollment".id = "Tickets"."enrollmentId"
        JOIN
        "TicketType" ON "Tickets"."ticketTypeId" = "TicketType".id;
        WHERE "Enrollment".userId = ${userId};
        `
    )
}

export async function getUserEnrollment (userId: number){
    return await prisma.enrollment.findUnique({
        where: {
            userId
        }
    })
}

export async function createTicket (ticketTypeId: number, enrollmentId: number){
    return await prisma.ticket.create({
        data: {
            ticketTypeId: ticketTypeId,
            status: "RESERVED",
            enrollmentId: enrollmentId,
            updatedAt: new Date()
        }
    })
}