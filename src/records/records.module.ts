import { MapsModule } from 'src/maps/maps.module';
import { UsersModule } from 'src/users/users.module';

import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NubRecords, ProRecords, WeaponsRecords } from './entities';
import { RecordsController } from './records.controller';
import { RecordsService } from './records.service';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => MapsModule),
    TypeOrmModule.forFeature([ProRecords, NubRecords, WeaponsRecords]),
  ],
  exports: [TypeOrmModule, RecordsService],
  providers: [RecordsService],
  controllers: [RecordsController],
})
export class RecordsModule {}
