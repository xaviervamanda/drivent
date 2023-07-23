import * as ticketsRepository from "@/repositories/ticket-repository";
import * as bookingsService from "@/services/bookings-service";
import * as bookingsRepository from "@/repositories/booking-repository";
import { buildRoomWithCapacityFull, buildTicket } from "../factories";

beforeEach(async () => {
    jest.clearAllMocks();
});

describe("create booking", () => {
    it ("should throw an error when given ticket is remote", async () => {
        const enrollmentId = 1;
        const userId = 1;
        const roomId = 1;
        const ticket = buildTicket(enrollmentId, true, false, "RESERVED");
        jest.spyOn(ticketsRepository, "getUserTickets").mockResolvedValue([ticket]);
        const promise = bookingsService.createBooking(userId, roomId);

        expect(promise).rejects.toEqual({
            name: 'ForbiddenError',
            message: 'Not authorized to access this resource!',
        })
    })
    it ("should throw an error when given ticket doesn't include hotel", async () => {
        const enrollmentId = 1;
        const userId = 1;
        const roomId = 1;
        const ticket = buildTicket(enrollmentId, true, false, "RESERVED");
        jest.spyOn(ticketsRepository, "getUserTickets").mockResolvedValue([ticket]);
        const promise = bookingsService.createBooking(userId, roomId);

        expect(promise).rejects.toEqual({
            name: 'ForbiddenError',
            message: 'Not authorized to access this resource!',
        })
    })
    it ("should throw an error when given ticket hasn't been paid", async () => {
        const enrollmentId = 1;
        const userId = 1;
        const roomId = 1;
        const ticket = buildTicket(enrollmentId, true, false, "RESERVED");
        jest.spyOn(ticketsRepository, "getUserTickets").mockResolvedValue([ticket]);
        const promise = bookingsService.createBooking(userId, roomId);

        expect(promise).rejects.toEqual({
            name: 'ForbiddenError',
            message: 'Not authorized to access this resource!',
        })
    })
    it ("should throw an error when room doesn't exist", async () => {
        const enrollmentId = 1;
        const userId = 1;
        const roomId = 1;
        const ticket = buildTicket(enrollmentId, false, true, "PAID");
        jest.spyOn(ticketsRepository, "getUserTickets").mockResolvedValue([ticket]);
        jest.spyOn(bookingsRepository, "getRoomAndItsBookings").mockResolvedValue(undefined);
        const promise = bookingsService.createBooking(userId, roomId);

        expect(promise).rejects.toEqual({
            name: 'NotFoundError',
            message: 'No result for this search!',
        })
    })
    it ("should throw an error when room capacity is full", async () => {
        const enrollmentId = 1;
        const userId = 2;
        const roomId = 1;
        const ticket = buildTicket(enrollmentId, false, true, "PAID");
        jest.spyOn(ticketsRepository, "getUserTickets").mockResolvedValue([ticket]);
        jest.spyOn(bookingsRepository, "getRoomAndItsBookings").mockResolvedValue(buildRoomWithCapacityFull());
        const promise = bookingsService.createBooking(userId, roomId);

        expect(promise).rejects.toEqual({
            name: 'ForbiddenError',
            message: 'Not authorized to access this resource!',
        })
    })
})