import { cleanDb, generateValidToken } from "../helpers";
import * as ticketsService from "@/services/tickets-service";


beforeEach(async () => {
    await cleanDb();
    jest.clearAllMocks();
});

describe("POST /booking", () => {
    it ("should respond with status 403 when given ticket is remote", async () => {
        
    })
})