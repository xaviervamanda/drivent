import { PaymentRequestBody } from "@/protocols";
import * as paymentsRepository from "@/repositories/payment-repository";
import * as ticketsRepository from "@/repositories/ticket-repository";
import * as enrollmentRepository from "@/repositories/enrollment-repository";
import { notFoundError, unauthorizedError } from "@/errors";

export async function getUserTicketPayment (ticketId: number, userId: number) {

    const ticketByTicketId = await ticketsRepository.getUserTicketsByTicketId(ticketId);
    if (!ticketByTicketId) {
        throw notFoundError();
    }

    const enrollment = await enrollmentRepository.getUserEnrollmentById(ticketByTicketId.enrollmentId);

    if (enrollment.userId !== userId) {
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
    const enrollment = await enrollmentRepository.getUserEnrollmentById(ticketByTicketId.enrollmentId);

    if (enrollment.userId !== userId) {
        throw unauthorizedError();
    }
    const ticket = await ticketsRepository.getUserTickets(userId);

    await ticketsRepository.updateTicketStatus(body.ticketId);

    const data = {
        ticketId: body.ticketId,
        value: ticket[0].ticketType.price,
        cardIssuer: body.cardData.issuer,
        cardLastDigits: body.cardData.number.toString().slice(-4)
    }
    
    await paymentsRepository.createTicketPayment(data);
    const payment = await paymentsRepository.getUserTicketPayment(body.ticketId);
    return payment[0];
}