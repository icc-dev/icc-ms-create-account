import { AppModule } from './app.module';
import { INestApplication, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

let app: INestApplication;
async function bootstrap() {
  app = await NestFactory.create(
    AppModule
  );
  app.setGlobalPrefix('icc/ms/accounts');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Create account microservice') 
    .setDescription('Microservice to create accounts')
    .setVersion('1.0')
    .addTag('Account')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const config =  app.get(ConfigService);
  const port = config.get<number>('application.port');
  await app.listen(port);
  console.log(`Microservice already running in ${await app.getUrl()}/`)
}
bootstrap();

export { app };
