import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

import helmet from 'helmet';

declare const module: any;

async function bootstrap() {
  try {
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

    await app.listen(3000);

    /**
     * Enable Hot Reload
     */
    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
    }

  } catch (error) {
    console.error('An error occurred during app bootstrap', error);
  }

}
bootstrap();
