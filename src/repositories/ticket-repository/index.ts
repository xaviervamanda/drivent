import { prisma } from "@/config";
import { Ticket, TicketType } from "@prisma/client";

export async function getAllTypesOfTickets (){
    return await prisma.ticketType.findMany();
    
}

export async function getUserTickets(userId: number) {
  return await prisma.ticket.findMany({
    where: {
      Enrollment: {
        userId,
      },
    },
    include: {
      TicketType: true,
    }
  })
}

export async function getUserTicketsByTicketId (ticketId: number){
    return await prisma.ticket.findFirst({
        where: {
            id: ticketId
        }
    })
}

export async function getUserTicketsByEnrollmentId (enrollmentId: number){
  return await prisma.ticket.findFirst({
      where: {
          enrollmentId
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

export async function getTicketByType (id: number){
    return await prisma.ticketType.findUnique({
        where: {
            id
        }
    })
}