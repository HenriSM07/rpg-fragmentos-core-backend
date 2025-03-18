import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(name: string, email: string, password: string): Promise<User> {
    const hashedPassword = await argon2.hash(password);
    const user = new this.userModel({ name, email, password: hashedPassword });
    return user.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email);
    if (user && (await argon2.verify(user.password, password))) {
      return user;
    }
    return null;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).populate('characters').exec();
  }

  async update(id: string, body: any): Promise<User | null> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, body, { new: true }).exec();
    if (!updatedUser) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return updatedUser;
  }

  async delete(id: string): Promise<any> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return { message: 'Usuário deletado com sucesso' };
  }

  async addCharacter(userId: string, characterId: string): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    user.characters.push(characterId);
    return user.save();
  }

  async removeCharacter(userId: string, characterId: string): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    user.characters = user.characters.filter((id) => id.toString() !== characterId);
    return user.save();
  }
}