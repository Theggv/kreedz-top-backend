import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { RecordsModule } from 'src/records/records.module';
import { MapsModule } from './maps/maps.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    DatabaseModule,
    RecordsModule,
    MapsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
