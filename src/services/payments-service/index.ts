import { PaymentRequestBody } from "@/protocols";
import * as paymentsRepository from "@/repositories/payment-repository";
import * as enrollmentRepository from "@/repositories/enrollment-repository";
import * as ticketsRepository from "@/repositories/ticket-repository";
import { notFoundError, unauthorizedError } from "@/errors";

export async function getUserTicketPayment (ticketId: number, userId: number) {

    const payment = await paymentsRepository.getUserTicketPayment(ticketId);
    if (!payment) {
        throw notFoundError();
    }
    const ticketByTicketId = await ticketsRepository.getUserTicketsByTicketId(ticketId);
    const ticketByUserId = await ticketsRepository.getUserTickets(userId);
    if (ticketByUserId[0].id !== ticketByTicketId.id) {
        throw unauthorizedError();
    }
    
}