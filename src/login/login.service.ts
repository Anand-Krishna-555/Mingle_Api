import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
    AddNewUserRequestDTO,
    AddNewUserResponseDTO,
    GetUserByEmailRequestDTO,
    GetUserByEmailResponseDTO,
} from './login.dto';
import { ERROR_MESSAGE, EXCEPTION_MESSAGE } from './login.constant';

@Injectable()
export class LoginService {
    constructor(private readonly prisma: PrismaService) {}
    async getUserByEmail(
        body: GetUserByEmailRequestDTO,
    ): Promise<GetUserByEmailResponseDTO> {
        try {
            const { email, password } = body;
            const user = await this.prisma.users.findFirst({
                where: {
                    email,
                    password,
                },
                select: {
                    name: true,
                    email: true,
                },
            });

            return {
                status: user ? true : false,
                statusCode: user ? HttpStatus.OK : HttpStatus.NOT_FOUND,
                ...(user
                    ? { data: { email: user.email, name: user.name } }
                    : { message: EXCEPTION_MESSAGE.USER_NOT_FOUND }),
            };
        } catch (error) {
            console.log(`${ERROR_MESSAGE.GET_USER_BY_EMAIL} `, error);
            throw new ForbiddenException(error.message);
        }
    }

    async addNewUser(
        body: AddNewUserRequestDTO,
    ): Promise<AddNewUserResponseDTO> {
        try {
            const { name, email, password } = body;
            const existUser = await this.prisma.users.findFirst({
                where: {
                    email,
                },
            });

            if (existUser)
                return {
                    status: false,
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: EXCEPTION_MESSAGE.USER_EXISTS,
                };

            await this.prisma.users.create({
                data: {
                    name,
                    email,
                    password,
                },
            });

            return {
                status: true,
                statusCode: HttpStatus.OK,
                message: EXCEPTION_MESSAGE.USER_ADDED,
            };
        } catch (error) {
            console.log(`${ERROR_MESSAGE.ADD_NEW_USER} `, error);
            throw new ForbiddenException(error.message);
        }
    }
}
