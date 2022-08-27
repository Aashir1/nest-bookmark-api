import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from "@nestjs/common";
import { User, Bookmark } from "@prisma/client";
import { AuthDto } from './dto';
import * as argon from 'argon2';

@Injectable({})
export class AuthService{
    constructor(private prisma: PrismaService){

    }

    async signup(dto: AuthDto){
        const hash = await argon.hash(dto.password);

        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash
            }
        })

        return user;
    }

    signin(){
        return {msg: 'I have signed in'};
    }

    
}