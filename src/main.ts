import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService)
  const PORT = config.get('API_PORT')
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
}
bootstrap();
