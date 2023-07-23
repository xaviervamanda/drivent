import faker from '@faker-js/faker';
import { Ticket, TicketStatus, TicketType } from '@prisma/client';
import { prisma } from '@/config';

export async function createTicketType() {
  return prisma.ticketType.create({
    data: {
      name: faker.name.findName(),
      price: faker.datatype.number(),
      isRemote: false,
      includesHotel: true,
    },
  });
}

export async function createTicketTypeRemote() {
  return prisma.ticketType.create({
    data: {
      name: faker.name.findName(),
      price: faker.datatype.number(),
      isRemote: true,
      includesHotel: false,
    },
  });
}

export async function createTicket(enrollmentId: number, ticketTypeId: number, status: TicketStatus) {
  return prisma.ticket.create({
    data: {
      enrollmentId,
      ticketTypeId,
      status,
    },
  });
}

export async function createTicketTypeWithHotel() {
  return prisma.ticketType.create({
    data: {
      name: faker.name.findName(),
      price: faker.datatype.number(),
      isRemote: false,
      includesHotel: true,
    },
  });
}

export function buildTicket(enrollmentId: number, remote: boolean, hotel: boolean, status: TicketStatus): Ticket & { TicketType: TicketType } {
  return ({
      id: faker.datatype.number({ min: 1 }),
      ticketTypeId: faker.datatype.number({ min: 1 }),
      enrollmentId,
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
      TicketType: {
          id: faker.datatype.number({ min: 1 }),
          name: faker.name.findName(),
          includesHotel: hotel,
          isRemote: remote,
          price: faker.datatype.number(),
          createdAt: new Date(),
          updatedAt: new Date(),
      }
  })
}