import { prisma } from "@/config";
import { Prisma } from "@prisma/client";
import { Ticket, TicketType } from "@prisma/client";

export async function getAllTypesOfTickets (){
    return await prisma.ticketType.findMany();
    
}

type TicketResponse =  Ticket & {
    ticketType: TicketType
}

export async function getUserTickets(userId: number): Promise<TicketResponse[]> {
    return await prisma.$queryRaw(
      Prisma.sql`
      SELECT
        "Ticket".id,
        "Ticket".status,
        "Ticket"."ticketTypeId",
        "Ticket"."enrollmentId",
        json_build_object(
          'id', "TicketType".id,
          'name', "TicketType".name,
          'price', "TicketType".price,
          'isRemote', "TicketType"."isRemote",
          'includesHotel', "TicketType"."includesHotel",
          'createdAt', to_char("TicketType"."createdAt", 'YYYY-MM-DD"T"HH24:MI:SS.MSZ'),
          'updatedAt', to_char("TicketType"."updatedAt", 'YYYY-MM-DD"T"HH24:MI:SS.MSZ')
        ) AS "TicketType",
        to_char("Ticket"."createdAt", 'YYYY-MM-DD"T"HH24:MI:SS.MSZ') AS "createdAt",
        to_char("Ticket"."updatedAt", 'YYYY-MM-DD"T"HH24:MI:SS.MSZ') AS "updatedAt"
      FROM
        "Enrollment"
        JOIN
          "Ticket" ON "Enrollment".id = "Ticket"."enrollmentId"
        JOIN
          "TicketType" ON "Ticket"."ticketTypeId" = "TicketType".id
      WHERE
        "Enrollment"."userId" = ${userId};
      `
    );
}
  

export async function getUserTicketsByTicketId (ticketId: number){
    return await prisma.ticket.findFirst({
        where: {
            id: ticketId
        }
    })
}

export async function createTicket (ticketTypeId: number, enrollmentId: number){
    return await prisma.ticket.create({
        data: {
            ticketTypeId: ticketTypeId,
            status: "RESERVED",
            enrollmentId: enrollmentId
        }
    })
}

export async function updateTicketStatus (ticketId: number){
    return await prisma.ticket.update({
        where: {
            id: ticketId
        },
        data: {
            status: "PAID"
        },
    })
}

export async function getUserTicketPayment (ticketId: number){
    return await prisma.ticket.findUnique({
        where: {
            id: ticketId
        }
    })
}