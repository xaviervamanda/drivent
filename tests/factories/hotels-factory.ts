import faker from '@faker-js/faker';
import { prisma } from '@/config';

export function createHotel (){
    return prisma.hotel.create({
        data:{
            name:faker.company.companyName(),
            image:faker.image.imageUrl(),
        }
    })
}

export function createHotelRooms (hotelId: number){
    return prisma.room.create({
        data:{
            name:faker.name.firstName(),
            capacity:faker.datatype.number(),
            hotelId
        }
    })
}