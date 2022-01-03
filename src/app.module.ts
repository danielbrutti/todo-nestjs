import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from './employee/employee.module';
import { TodoModule } from './todo/todo.module';
import { SharedModule } from './shared/shared.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

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
        autoLoadEntities: true
      }),
      inject: [ConfigService],
    }),

    /**
     * App Modules
     */
    EmployeeModule,
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
    }
  ],
})
export class AppModule { }
