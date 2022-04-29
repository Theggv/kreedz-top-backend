import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { MapDto } from './dto/map.dto';
import { NubRecordDto } from './dto/nubrecord.dto';
import { PlayerDto } from './dto/player.dto';
import { ProRecordDto } from './dto/prorecord.dto';
import { WeaponRecordDto } from './dto/weaponrecord.dto';
import { RecordsService } from './records.service';

@ApiTags('Records')
@Controller('records')
export class RecordsController {
  constructor(private recordsService: RecordsService) {}

  @ApiOperation({ summary: 'Get all players' })
  @ApiResponse({ type: [PlayerDto] })
  @Get('/players')
  getAllPlayers() {
    return this.recordsService.getAllPlayers();
  }

  @ApiOperation({ summary: 'Get all maps' })
  @ApiResponse({ type: [MapDto] })
  @Get('/maps')
  getAllMaps() {
    return this.recordsService.getAllMaps();
  }

  @ApiOperation({ summary: 'Get pro records on map' })
  @ApiResponse({ type: [ProRecordDto] })
  @Get('/pro/:mapName')
  getProRecordsForMap(@Param('mapName') mapName: string) {
    return this.recordsService.getProRecords(mapName);
  }

  @ApiOperation({ summary: 'Get nub records on map' })
  @ApiResponse({ type: [NubRecordDto] })
  @Get('/nub/:mapName')
  getNubRecordsForMap(@Param('mapName') mapName: string) {
    return this.recordsService.getNubRecords(mapName);
  }

  @ApiOperation({ summary: 'Get weapon records on map with specific weapon' })
  @Get('/weapons/:mapName/:weaponId')
  @ApiResponse({ type: [WeaponRecordDto] })
  getWeaponRecordsForMapSpecific(
    @Param('mapName') mapName: string,
    @Param('weaponId', ParseIntPipe) weaponId: number,
  ) {
    return this.recordsService.getRecordsWithWeapons(mapName, weaponId);
  }

  @ApiOperation({ summary: 'Get all weapon records on map' })
  @ApiResponse({ type: [WeaponRecordDto] })
  @Get('/weapons/:mapName')
  getWeaponRecordsForMap(@Param('mapName') mapName: string) {
    return this.recordsService.getRecordsWithWeapons(mapName);
  }
}
