import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CharacterDocument } from './schemas/characters.schema';
import { User } from '../user/schemas/user.schema';

@Injectable()
export class CharactersService {
  constructor(
    @InjectModel('Character') private readonly characterModel: Model<CharacterDocument>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async create(userId: string, createCharacterDto: any) {
    const createdCharacter = new this.characterModel({
      ...createCharacterDto,
      userId,
    });
    return await createdCharacter.save();
  }

  async findAllByUser(userId: string) {
    const user = await this.userModel.findById(userId).exec();
  
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    if (!user.characters || user.characters.length === 0) {
      return [];
    }
  
    return await this.characterModel.find({ _id: { $in: user.characters } }).exec();
  }

  async findAll() {
    return await this.characterModel.find().exec();
  }

  async findById(id: string) {
    const character = await this.characterModel.findById(id).exec();
    if (!character) {
      throw new NotFoundException('Personagem não encontrado');
    }
    return character;
  }

  async update(id: string, updateCharacterDto: any) {
    const updatedCharacter = await this.characterModel
      .findByIdAndUpdate(id, updateCharacterDto, { new: true })
      .exec();

    if (!updatedCharacter) {
      throw new NotFoundException('Personagem não encontrado');
    }
    return updatedCharacter;
  }

  async delete(id: string) {
    const result = await this.characterModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Personagem não encontrado');
    }
    return { message: 'Personagem deletado com sucesso' };
  }
}