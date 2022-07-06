import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';
import { SharedModule } from './shared/shared.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    /**
     * Configuration Module
     */
    ConfigModule.forRoot({
      isGlobal: true,           // make it available to all modules without need to import ConfigModule again
      cache: true,              // cache usage enabled
      load: [configuration],    // configuration.ts file
    }),

    /**
     * Rate Limiting
     * To protect applications from brute-force attacks
     */
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ttl: configService.get<number>('throttler.ttl'),      // time-to-live
        limit: configService.get<number>('throttler.limit'),  // max number of requests withing the ttl
      })
    }),

    /**
     * Enable Cache to improve our app's performance.
     * 
     * In-memory cache. To use another config, like redis check the doc: https://docs.nestjs.com/techniques/caching#different-stores
     */
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        isGlobal: true,                               // make it global to all module, no need to import anywhere
        ttl: configService.get<number>('cache.ttl'),  // seconds
        max: configService.get<number>('cache.max'),  // max number if items in cache
      })
    }),

    /**
     * TypeORM async config using ConfigService
     */
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('database.host'),
        port: +configService.get<number>('database.port'),
        username: configService.get('database.user'),
        password: configService.get('database.password'),
        database: configService.get('database.db'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
        logger: 'debug',
        logging: 'all'
      }),
      inject: [ConfigService],
    }),

    /**
     * App Modules
     */
    TodoModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,

    /**
     * Bind ThrottlerGuard globally to protect all endpoints with rate limit
     */
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },

    /**
     * Enable CacheInterceptor to all endpoints globally
     */
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule { }
