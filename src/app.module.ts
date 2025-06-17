import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtController } from './jwt/jwt.controller';
import { CharacterModule } from './characters/characters.module';
import { LoggerService } from './logger.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
        dbName: 'dv-rpg',
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    CharacterModule,
  ],
  controllers: [AppController, JwtController],
  providers: [AppService, LoggerService],
})
export class AppModule {}