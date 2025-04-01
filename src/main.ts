import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do Swagger (DEVE vir antes do app.listen())
  const config = new DocumentBuilder()
    .setTitle('Sua API')
    .setDescription('Documentação da API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Rota: /api

  await app.listen(3000);
}
bootstrap();