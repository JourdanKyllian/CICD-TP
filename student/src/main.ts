import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration Swagger
  const config = new DocumentBuilder()
    .setTitle('Students API')
    .setDescription(
      "Documentation interactive de l'API de gestion des étudiants",
    )
    .setVersion('1.0')
    .addTag('students')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // La doc est sur http://localhost:3000/api

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
