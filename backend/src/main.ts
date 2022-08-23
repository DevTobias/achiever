import { fastifyCookie } from '@fastify/cookie';
import fastifyCsrf from '@fastify/csrf-protection';
import helmet from '@fastify/helmet';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication as App,
} from '@nestjs/platform-fastify';

import { Logger } from 'nestjs-pino';
import { AppModule } from '@trophoria/app.module';
import { ThrottlerExceptionFilter } from '@trophoria/libs/common';
import { ApiConfigService } from '@trophoria/modules/setup/config/api-config.service';

const bootstrapApp = async () => {
  const app: App = await NestFactory.create(AppModule, new FastifyAdapter(), {
    bufferLogs: true,
  });

  const config = app.get(ApiConfigService);
  await initializeApp(app, config);
  app.listen(config.get('API_PORT'), config.get('API_HOST'));
};

const initializeApp = async (app: App, config: ApiConfigService) => {
  app.useLogger(app.get(Logger));

  await app.register(helmet as never, {
    contentSecurityPolicy: config.isProduction,
  });
  await app.register(fastifyCookie as never, {
    secret: config.get('COOKIE_SECRET'),
  });
  await app.register(fastifyCsrf as never, { cookieOpts: { signed: true } });

  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: true }));

  app.useGlobalFilters(new ThrottlerExceptionFilter(config));
};

bootstrapApp();
