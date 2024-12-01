import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import {
    AddNewUserRequestDTO,
    AddNewUserResponseDTO,
    GetUserByEmailRequestDTO,
    GetUserByEmailResponseDTO,
} from './login.dto';

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Post('/user')
    async getUserByEmail(
        @Body() body: GetUserByEmailRequestDTO,
    ): Promise<GetUserByEmailResponseDTO> {
        return await this.loginService.getUserByEmail(body);
    }

    @Post('user/add')
    async addNewUser(
        @Body() body: AddNewUserRequestDTO,
    ): Promise<AddNewUserResponseDTO> {
        return await this.loginService.addNewUser(body);
    }
}
