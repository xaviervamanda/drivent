import { cleanDb, generateValidToken } from "../helpers";
import * as ticketsService from "@/services/tickets-service";


beforeEach(async () => {
    await cleanDb();
    jest.clearAllMocks();
});

describe("create booking", () => {
    it ("should throw an error when given ticket is remote", async () => {
        
    })
})