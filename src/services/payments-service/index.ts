import { PaymentRequestBody } from "@/protocols";
import * as paymentsRepository from "@/repositories/payment-repository";
import * as ticketsRepository from "@/repositories/ticket-repository";
import { notFoundError, unauthorizedError } from "@/errors";

export async function getUserTicketPayment (ticketId: number, userId: number) {

    const ticketByTicketId = await ticketsRepository.getUserTicketsByTicketId(ticketId);
    const ticketByUserId = await ticketsRepository.getUserTickets(userId);
    if (ticketByUserId[0].id !== ticketByTicketId.id) {
        throw unauthorizedError();
    }
    const payment = await paymentsRepository.getUserTicketPayment(ticketId);
    if (!payment) {
        throw notFoundError();
    }
    
    return payment[0];
}

export async function createTicketPayment (body: PaymentRequestBody, userId: number){
    const ticketByTicketId = await ticketsRepository.getUserTicketsByTicketId(body.ticketId);
    if (!ticketByTicketId) {
        throw notFoundError();
    }
    const ticket = await ticketsRepository.getUserTickets(userId);

    if (ticket[0].id !== ticketByTicketId.id) {
        throw unauthorizedError();
    }

    await ticketsRepository.updateTicketStatus(body.ticketId);

    const data = {
        ticketId: body.ticketId,
        value: ticket[0].ticketType.price,
        cardIssuer: body.cardData.issuer,
        cardLastDigits: body.cardData.number.toString().slice(-4)
    }

    return await paymentsRepository.createTicketPayment(data);
}