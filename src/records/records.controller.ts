import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { MapDto } from './dto/map.dto';
import { PlayerDto } from './dto/player.dto';
import { WeaponsQueryParamsDto } from './dto/query-params-weapons.dto';
import { QueryParamsDto } from './dto/query-params.dto';
import { RecordDto } from './dto/record.dto';
import { RecordsService } from './records.service';
import { TransformPipe } from './transform.pipe';

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
  @ApiResponse({ type: [RecordDto] })
  @Get('/pro')
  getProRecordsForMap(@Query(TransformPipe) params: QueryParamsDto) {
    return this.recordsService.getProRecords(params);
  }

  @ApiOperation({ summary: 'Get nub records on map' })
  @ApiResponse({ type: [RecordDto] })
  @Get('/nub')
  getNubRecordsForMap(@Query(TransformPipe) params: QueryParamsDto) {
    return this.recordsService.getNubRecords(params);
  }

  @ApiOperation({ summary: 'Get all weapon records on map' })
  @ApiResponse({ type: [RecordDto] })
  @Get('/weapons')
  getWeaponRecordsForMap(@Query(TransformPipe) params: WeaponsQueryParamsDto) {
    return this.recordsService.getRecordsWithWeapons(params);
  }
}
