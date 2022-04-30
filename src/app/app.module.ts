import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { RecordsModule } from 'src/records/records.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    DatabaseModule,
    RecordsModule,
    AppModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
