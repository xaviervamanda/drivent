import supertest from "supertest";
import app, {init} from "@/app";
import { cleanDb, generateValidToken } from "../helpers";
import httpStatus from "http-status";
// import * as jwt from 'jsonwebtoken';
import faker from "@faker-js/faker";
import { 
    createUser,
    createTicketType,
    createTicket,
    createTicketTypeRemote,
    createEnrollmentWithAddress,
    createHotel,
    createHotelRooms
} from "../factories";
import { TicketStatus } from '@prisma/client';

beforeAll(async () => {
    await init();
});

beforeEach(async () => {
    await cleanDb();
});

const server = supertest(app);

describe ('POST /booking', () => {
    it('should respond with status 401 if no token is given', async () => {
        const response = await server.post('/booking');
    
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
    it('should respond with status 401 if given token is not valid', async () => {
        const token = faker.lorem.word();
        const body = {roomId: 1};
        const response = await server.post('/booking').set('Authorization', `Bearer ${token}`).send(body);
    
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
    describe('when token is valid', () => {
        it('should respond with status 200 when ticket includes hotel and room is not full', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user);
            const ticketType = await createTicketType();
            await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
            const hotel = await createHotel();
            const rooms = await createHotelRooms(hotel.id);
            const body = {roomId: rooms.id};
            const response = await server.post('/booking').set('Authorization', `Bearer ${token}`).send(body);
        
            expect(response.status).toEqual(httpStatus.OK);
        });
    })
})