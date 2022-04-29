import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Maps } from './entity/maps.entity';
import { NubRecords } from './entity/nubrecords.entity';
import { Players } from './entity/players.entity';
import { ProRecords } from './entity/prorecords.entity';
import { RecordsWithWeapons } from './entity/records-with-wpn.entity';
import { RecordsController } from './records.controller';
import { RecordsService } from './records.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Players,
      Maps,
      ProRecords,
      NubRecords,
      RecordsWithWeapons,
    ]),
  ],
  exports: [TypeOrmModule],
  providers: [RecordsService],
  controllers: [RecordsController],
})
export class RecordsModule {}
