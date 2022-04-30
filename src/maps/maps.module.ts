import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Maps } from './entities';
import { MapsController } from './maps.controller';
import { MapsService } from './maps.service';

@Module({
  imports: [TypeOrmModule.forFeature([Maps])],
  exports: [TypeOrmModule, MapsService],
  controllers: [MapsController],
  providers: [MapsService],
})
export class MapsModule {}
