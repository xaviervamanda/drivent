import { badRequestError } from '@/errors';
import * as ticketsRepository from '@/repositories/ticket-repository';
import { TicketType } from '@prisma/client';

export async function getAllTypesOfTickets () {
    return await ticketsRepository.getAllTypesOfTickets();
}

export async function getUserTickets (userId: number) {
    const tickets = await ticketsRepository.getUserTickets(userId);
    return tickets[0];
}

export async function createTicket (ticketTypeId: number, userId: number) {
    if (!ticketTypeId) throw badRequestError()
    const enrollment = await ticketsRepository.getUserEnrollment(userId);
    return await ticketsRepository.createTicket(ticketTypeId, enrollment.id);
}