import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Usuário não encontrado');
        }
        const isPasswordValid = await argon2.verify(user.password, password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Senha incorreta');
        }

        return user;
    }

    async login(user: any) {
        const payload = { sub: user._id };
        console.log('Payload usado para gerar o token:', payload);

        const token = this.jwtService.sign(payload);
        console.log('Token gerado:', token);

        return {
            access_token: token,
            user: {
                id: user._id,
                email: user.email,
            },
        };
    }
}