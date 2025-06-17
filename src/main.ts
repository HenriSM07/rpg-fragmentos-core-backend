import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggerService } from './logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { 
    logger: new LoggerService() 
  });

  const logger = app.get(LoggerService);

  const config = new DocumentBuilder()
    .setTitle('RPG API')
    .setDescription('Documentação da API de RPG')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Insira seu token JWT aqui',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.enableCors({
    origin: "*",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);

  logger.logApplicationStart(port);
}

bootstrap();