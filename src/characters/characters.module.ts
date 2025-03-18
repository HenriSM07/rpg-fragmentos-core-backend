import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CharacterController } from './characters.controller';
import { CharactersService } from './characters.service';
import { characterSchema } from './schemas/characters.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Character', schema: characterSchema }]),
  ],
  controllers: [CharacterController],
  providers: [CharactersService],
})
export class CharacterModule {}