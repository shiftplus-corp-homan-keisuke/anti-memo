import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Infrastructure
import { PageEntity, BlockEntity } from './infrastructure/database/entities';
import { PageRepository } from './infrastructure/repositories/page.repository';
import { BlockRepository } from './infrastructure/repositories/block.repository';

// Domain
import { PAGE_REPOSITORY } from './domain/repositories/page.repository.interface';
import { BLOCK_REPOSITORY } from './domain/repositories/block.repository.interface';

// Application
import { PageUseCases } from './application/use-cases/pages';
import { BlockUseCases } from './application/use-cases/blocks';

// Presentation
import { PagesController } from './presentation/controllers/pages.controller';
import { BlocksController } from './presentation/controllers/blocks.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST', 'localhost'),
        port: configService.get('POSTGRES_PORT', 5432),
        username: configService.get('POSTGRES_USER', 'memo'),
        password: configService.get('POSTGRES_PASSWORD', 'memo_password'),
        database: configService.get('POSTGRES_DB', 'memo_db'),
        entities: [PageEntity, BlockEntity],
        synchronize: true, // 開発環境のみ
        logging: configService.get('NODE_ENV') === 'development',
      }),
    }),
    TypeOrmModule.forFeature([PageEntity, BlockEntity]),
  ],
  controllers: [PagesController, BlocksController],
  providers: [
    // Use Cases
    PageUseCases,
    BlockUseCases,
    // Repositories
    {
      provide: PAGE_REPOSITORY,
      useClass: PageRepository,
    },
    {
      provide: BLOCK_REPOSITORY,
      useClass: BlockRepository,
    },
  ],
})
export class AppModule {}
