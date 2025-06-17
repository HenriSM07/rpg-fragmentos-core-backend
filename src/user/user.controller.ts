import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

class RegisterDto {
  name: string;
  email: string;
  password: string;
}

class UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
}

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registra um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro ao criar usuário' })
  @ApiBody({
    type: RegisterDto,
    examples: {
      example: {
        value: {
          name: 'Frodo Baggins',
          email: 'frodo@example.com',
          password: 'mysecretpassword',
        },
      },
    },
  })
  async register(@Body() body: RegisterDto) {
    const user = await this.userService.create(body.name, body.email, body.password);
    if (!user) {
      throw new BadRequestException('Erro ao criar usuário');
    }
    return user;
  }

  @Post(':userId/characters/:characterId')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Associa um personagem a um usuário' })
  @ApiResponse({ status: 200, description: 'Personagem associado com sucesso' })
  @ApiResponse({ status: 404, description: 'Usuário ou personagem não encontrado' })
  async addCharacterToUser(
    @Param('userId') userId: string,
    @Param('characterId') characterId: string,
  ) {
    return this.userService.addCharacter(userId, characterId);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Lista todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários retornada com sucesso',
    schema: {
      example: [
        {
          id: '652f8e1b3f4d1c2a8c9e1b3f',
          name: 'Frodo Baggins',
          email: 'frodo@example.com',
        },
        {
          id: '652f8e1b3f4d1c2a8c9e1b40',
          name: 'Samwise Gamgee',
          email: 'sam@example.com',
        },
      ],
    },
  })
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Busca um usuário por ID' })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado',
    schema: {
      example: {
        id: '652f8e1b3f4d1c2a8c9e1b3f',
        name: 'Frodo Baggins',
        email: 'frodo@example.com',
      },
    },
  })
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Atualiza um usuário existente' })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado com sucesso',
    schema: {
      example: {
        id: '652f8e1b3f4d1c2a8c9e1b3f',
        name: 'Frodo Baggins',
        email: 'frodo_updated@example.com',
      },
    },
  })
  @ApiBody({
    type: UpdateUserDto,
    examples: {
      example1: {
        value: {
          name: 'Frodo Updated',
          email: 'frodo_updated@example.com',
        },
      },
    },
  })
  async update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Deleta um usuário' })
  @ApiResponse({ status: 200, description: 'Usuário deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async remove(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}