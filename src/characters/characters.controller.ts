import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  BadRequestException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { CharactersService } from './characters.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

class CreateCharacterDto {
  name: string;
  age: number;
  description: string;
  attributes: {
    strength: number;
    vigor: number;
    agility: number;
    presence: number;
    intellect: number;
  };
  skills: {
    acrobatics?: number;
    animalHandling?: number;
    arts?: number;
    athletics?: number;
    currentEvents?: number;
    sciences?: number;
    crime?: number;
    diplomacy?: number;
    deception?: number;
    fortitude?: number;
    stealth?: number;
    initiative?: number;
    intimidation?: number;
    insight?: number;
    investigation?: number;
    combat?: number;
    medicine?: number;
    occultism?: number;
    perception?: number;
    piloting?: number;
    sailing?: number;
    profession?: number;
    reflexes?: number;
    religion?: number;
    survival?: number;
    tactics?: number;
    technology?: number;
    willpower?: number;
  };
}

class UpdateCharacterDto {
  name?: string;
  age?: number;
  description?: string;
  attributes?: {
    strength?: number;
    vigor?: number;
    agility?: number;
    presence?: number;
    intellect?: number;
  };
  skills?: {
    acrobatics?: number;
    animalHandling?: number;
    arts?: number;
    athletics?: number;
    currentEvents?: number;
    sciences?: number;
    crime?: number;
    diplomacy?: number;
    deception?: number;
    fortitude?: number;
    stealth?: number;
    initiative?: number;
    intimidation?: number;
    insight?: number;
    investigation?: number;
    combat?: number;
    medicine?: number;
    occultism?: number;
    perception?: number;
    piloting?: number;
    sailing?: number;
    profession?: number;
    reflexes?: number;
    religion?: number;
    survival?: number;
    tactics?: number;
    technology?: number;
    willpower?: number;
  };
}

@ApiTags('Characters')
@Controller('characters')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('access-token')
export class CharacterController {
  constructor(private readonly characterService: CharactersService) {}

  @Post(':userId')
  @ApiOperation({ summary: 'Cria um novo personagem para um usuário' })
  @ApiResponse({ status: 201, description: 'Personagem criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro ao criar personagem' })
  @ApiBody({ type: CreateCharacterDto })
  async create(@Param('userId') userId: string, @Body() body: CreateCharacterDto) {
    const character = await this.characterService.create(userId, body);
    if (!character) {
      throw new BadRequestException('Erro ao criar personagem');
    }
    return character;
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Lista todos os personagens de um usuário' })
  @ApiResponse({ status: 200, description: 'Lista de personagens retornada com sucesso' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async findAllByUser(@Param('userId') userId: string) {
    return this.characterService.findAllByUser(userId);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os personagens' })
  @ApiResponse({ status: 200, description: 'Lista de personagens retornada com sucesso' })
  async findAll() {
    return this.characterService.findAll();
  }

  @Get('id/:id')
  @ApiOperation({ summary: 'Busca um personagem por ID' })
  @ApiResponse({ status: 200, description: 'Personagem encontrado' })
  @ApiResponse({ status: 404, description: 'Personagem não encontrado' })
  async findOne(@Param('id') id: string) {
    const character = await this.characterService.findById(id);
    if (!character) {
      throw new NotFoundException('Personagem não encontrado');
    }
    return character;
  }

  @Patch('id/:id')
  @ApiOperation({ summary: 'Atualiza um personagem existente' })
  @ApiResponse({ status: 200, description: 'Personagem atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Personagem não encontrado' })
  @ApiBody({ type: UpdateCharacterDto })
  async update(@Param('id') id: string, @Body() body: UpdateCharacterDto) {
    const updatedCharacter = await this.characterService.update(id, body);
    if (!updatedCharacter) {
      throw new NotFoundException('Personagem não encontrado');
    }
    return updatedCharacter;
  }

  @Delete('id/:id')
  @ApiOperation({ summary: 'Deleta um personagem' })
  @ApiResponse({ status: 200, description: 'Personagem deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Personagem não encontrado' })
  async remove(@Param('id') id: string) {
    const deleted = await this.characterService.delete(id);
    if (!deleted) {
      throw new NotFoundException('Personagem não encontrado');
    }
    return { message: 'Personagem deletado com sucesso' };
  }
}