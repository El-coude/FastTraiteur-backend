import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'body-parser';
import { WsAdapter } from '@nestjs/platform-ws'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: '*',
  });
  app.useWebSocketAdapter(new WsAdapter(app));
  console.log("WsAdapter: ", WsAdapter);
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  await app.listen(3333);
}
bootstrap();
