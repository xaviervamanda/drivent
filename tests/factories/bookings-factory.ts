import { prisma } from "@/config";
import { faker } from "@faker-js/faker";

export function buildRoomWithCapacityFull (){
    return ({
        id: 1,
        name: faker.name.findName(),
        capacity: 1,
        hotelId: faker.datatype.number({ min: 1 }),
        createdAt: new Date(),
        updatedAt: new Date(),
        Booking: [
            {
                id: faker.datatype.number({ min: 1 }),
                userId: 1,
                roomId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ]
    })
}

