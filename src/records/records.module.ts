import { MapsModule } from 'src/maps/maps.module';
import { UsersModule } from 'src/users/users.module';

import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Records } from './entities';
import { RecordsController } from './records.controller';
import { RecordsService } from './records.service';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => MapsModule),
    TypeOrmModule.forFeature([Records]),
  ],
  exports: [TypeOrmModule, RecordsService],
  providers: [RecordsService],
  controllers: [RecordsController],
})
export class RecordsModule {}
