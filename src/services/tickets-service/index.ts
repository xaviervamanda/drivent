import { badRequestError, notFoundError } from '@/errors';
import * as ticketsRepository from '@/repositories/ticket-repository';
import * as enrollmentRepository from '@/repositories/enrollment-repository';

export async function getAllTypesOfTickets () {
    const tickets = await ticketsRepository.getAllTypesOfTickets();
    if (tickets.length === 0){
        return [];
    }
    return tickets;
}

export async function getUserTickets (userId: number) {
    const enrollment = await enrollmentRepository.getUserEnrollment(userId);
    if(!enrollment) throw notFoundError();
    
    const tickets = await ticketsRepository.getUserTickets(userId);
    return tickets[0];
}

export async function createTicket (ticketTypeId: number, userId: number) {
    if (!ticketTypeId) throw badRequestError()
    const enrollment = await enrollmentRepository.getUserEnrollment(userId);
    if (!enrollment) throw notFoundError();
    return await ticketsRepository.createTicket(ticketTypeId, enrollment.id);
}