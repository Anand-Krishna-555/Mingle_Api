import { HttpStatus } from '@nestjs/common';

export class GetUserByEmailRequestDTO {
    email: string;
    password: string;
}

export class GetUserByEmailResponseDTO {
    status: boolean;
    statusCode: HttpStatus;
    message?: string;
    data?: {
        name: string;
        email: string;
    };
}

export class GetUserByEmailResponseErrorDTO {
    name: string;
    email: string;
}

export class AddNewUserRequestDTO {
    name: string;
    email: string;
    password: string;
}

export class AddNewUserResponseDTO {
    status: boolean;
    statusCode: HttpStatus;
    message: string;
}
