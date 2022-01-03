import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

import helmet from 'helmet';

import csurf from 'csurf';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Configure OpenAPI
   */
  const config = new DocumentBuilder()
    .setTitle('TODO')
    .setDescription('The TODO REST API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  /**
   * Helmet can help protect our app from some well-known web vulnerabilities by setting HTTP headers appropriately.
   * Is just a collection of 14 smaller middleware functions that set security-related HTTP headers.
   * 
   * More info: https://github.com/helmetjs/helmet#how-it-works
   */
  app.use(helmet());

  /**
   * Cross-origin resource sharing (CORS) is a mechanism that allows resources to be requested from another domain.
   * 
   * For CORS config options, look at the expressjs doc: https://github.com/expressjs/cors#configuration-options
   */
  app.enableCors();

  /**
   * CSRF Protection
   * 
   * Cross-site request forgery (also known as CSRF or XSRF) is a type of malicious exploit of a website
   * where unauthorized commands are transmitted from a user that the web application trusts.
   */
  app.use(csurf());

  await app.listen(3000);

  /**
   * Enable Hot Reload
   */
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

}
bootstrap();
