import { prisma } from "@/config";
import { Payment } from "@prisma/client";

export async function getUserTicketPayment(ticketId: number) {
    return prisma.payment.findMany({
        where: {
            ticketId
        }
    })
}

type PaymentRequest = Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>;
export async function createTicketPayment(payment: PaymentRequest) {
    return prisma.payment.create({
        data: payment
    })
}

