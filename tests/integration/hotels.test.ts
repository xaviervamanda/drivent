import supertest from "supertest";
import app, {init} from "@/app";
import { cleanDb, generateValidToken } from "../helpers";
import httpStatus from "http-status";
import * as jwt from 'jsonwebtoken';
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

describe("GET /hotels", () => {
    it('should respond with status 401 if no token is given', async () => {
        const response = await server.get('/tickets/types');
    
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
      });
    
    it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/tickets/types').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/tickets/types').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe('when token is valid', () => {
        it('should respond with status 404 when there are no hotels created', async () => {
            const token = await generateValidToken();
      
            const response = await server.get('/hotels/').set('Authorization', `Bearer ${token}`);
      
            expect(response.status).toEqual(httpStatus.NOT_FOUND);
        });

        it('should respond with status 404 when enrollment doesnt exist', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
        
            const response = await server.get(`/hotels/`).set('Authorization', `Bearer ${token}`);
        
            expect(response.status).toEqual(httpStatus.NOT_FOUND);
        });
          
        it('should respond with status 404 when given ticket doesnt exist', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            await createEnrollmentWithAddress(user);
        
            const response = await server.get(`/hotels/`).set('Authorization', `Bearer ${token}`);
        
            expect(response.status).toEqual(httpStatus.NOT_FOUND);
        });

        it('should respond with status 402 when given ticket has not been paid yet', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user);
            const ticketType = await createTicketType();
            await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);
        
            const response = await server.get(`/hotels/`).set('Authorization', `Bearer ${token}`);
        
            expect(response.status).toEqual(httpStatus.PAYMENT_REQUIRED);
        });

        it('should respond with status 402 when given ticket is remote', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user);
            const ticketType = await createTicketTypeRemote();
            await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
        
            const response = await server.get(`/hotels/`).set('Authorization', `Bearer ${token}`);
        
            expect(response.status).toEqual(httpStatus.PAYMENT_REQUIRED);
        });

        it('should respond with status 402 when given ticket doesnt include hotel', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user);
            const ticketType = await createTicketTypeRemote();
            await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
        
            const response = await server.get(`/hotels/`).set('Authorization', `Bearer ${token}`);
        
            expect(response.status).toEqual(httpStatus.PAYMENT_REQUIRED);
        });

        it('should respond with status 200 when enrollment and ticket are valid', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user);
            const ticketType = await createTicketType();
            await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
            await createHotel();
        
            const response = await server.get(`/hotels/`).set('Authorization', `Bearer ${token}`);
        
            expect(response.status).toEqual(httpStatus.OK);
        });
        
    })
})

describe("GET /hotels/:hotelId", () => {
    it('should respond with status 401 if no token is given', async () => {
        const response = await server.get('/tickets/types');
    
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if no token is given', async () => {
        const response = await server.get('/tickets/types');
    
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
      });
    
    it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/tickets/types').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/tickets/types').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe('when token is valid', () => {
        it('should respond with status 400 when given hotelId is not a number', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user);
            const ticketType = await createTicketTypeRemote();
            await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
            const hotelId = faker.random.word();
        
            const response = await server.get(`/hotels/${hotelId}`).set('Authorization', `Bearer ${token}`);
        
            expect(response.status).toEqual(httpStatus.BAD_REQUEST);
        });

        it('should respond with status 400 when given hotelId is not given', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user);
            const ticketType = await createTicketTypeRemote();
            await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
        
            const response = await server.get(`/hotels/:hotelId`).set('Authorization', `Bearer ${token}`);
        
            expect(response.status).toEqual(httpStatus.BAD_REQUEST);
        });

        it('should respond with status 404 when enrollment doesnt exist', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const hotel = await createHotel();
        
            const response = await server.get(`/hotels/${hotel.id}`).set('Authorization', `Bearer ${token}`);
        
            expect(response.status).toEqual(httpStatus.NOT_FOUND);
        });
          
        it('should respond with status 404 when given ticket doesnt exist', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            await createEnrollmentWithAddress(user);
            const hotel = await createHotel();
        
            const response = await server.get(`/hotels/${hotel.id}`).set('Authorization', `Bearer ${token}`);
        
            expect(response.status).toEqual(httpStatus.NOT_FOUND);
        });

        it('should respond with status 404 when hotel doesnt exist', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user);
            const ticketType = await createTicketType();
            await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
            const hotelId = faker.datatype.number({min: 1000000});

        
            const response = await server.get(`/hotels/${hotelId}`).set('Authorization', `Bearer ${token}`);
        
            expect(response.status).toEqual(httpStatus.NOT_FOUND);
        });

        it('should respond with status 402 when given ticket has not been paid yet', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user);
            const ticketType = await createTicketType();
            await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);
            const hotel = await createHotel();
        
            const response = await server.get(`/hotels/${hotel.id}`).set('Authorization', `Bearer ${token}`);
        
            expect(response.status).toEqual(httpStatus.PAYMENT_REQUIRED);
        });

        it('should respond with status 402 when given ticket is remote', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user);
            const ticketType = await createTicketTypeRemote();
            await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
            const hotel = await createHotel();
        
            const response = await server.get(`/hotels/${hotel.id}`).set('Authorization', `Bearer ${token}`);
        
            expect(response.status).toEqual(httpStatus.PAYMENT_REQUIRED);
        });

        it('should respond with status 402 when given ticket doesnt include hotel', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user);
            const ticketType = await createTicketTypeRemote();
            await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
            const hotel = await createHotel();
        
            const response = await server.get(`/hotels/${hotel.id}`).set('Authorization', `Bearer ${token}`);
        
            expect(response.status).toEqual(httpStatus.PAYMENT_REQUIRED);
        });

        it('should respond with status 200 when enrollment, ticket and hotel are valid and with hotel and rooms data', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user);
            const ticketType = await createTicketType();
            await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
            const hotel = await createHotel();
            const rooms = await createHotelRooms(hotel.id);
        
            const response = await server.get(`/hotels/${hotel.id}`).set('Authorization', `Bearer ${token}`);
        
            expect(response.status).toEqual(httpStatus.OK);
            expect(response.body).toEqual({
                id: hotel.id,
                name: hotel.name,
                image: hotel.image,
                createdAt: hotel.createdAt.toISOString(),
                updatedAt: hotel.updatedAt.toISOString(),
                Rooms: [
                    {
                      id: expect.any(Number),
                      name: expect.any(String),
                      capacity: expect.any(Number),
                      hotelId: expect.any(Number),
                      createdAt: expect.any(String),
                      updatedAt: expect.any(String)  
                    } 
                ]
            })
        });
    })
})


