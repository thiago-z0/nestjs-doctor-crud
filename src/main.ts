import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EntityNotFoundExceptionFilter } from './exception-filters/entity-not-found.exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Nest.js Doctor Crud')
    .setDescription('Documentação da API Doctor Crud feita em Nest.js')
    .build();

  app.useGlobalFilters(new EntityNotFoundExceptionFilter());

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.API_PORT);
  console.log('**Working on %s**', process.env.API_PORT);
}
bootstrap();
