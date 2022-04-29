import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { MapDto } from './dto/map.dto';
import { PlayerDto } from './dto/player.dto';
import { QueryParamsDto } from './dto/query-params.dto';
import { RecordDto } from './dto/record.dto';
import { RecordsPageDto } from './dto/records-page.dto';
import { RecordsService } from './records.service';
import { TransformPipe } from './transform.pipe';

@ApiTags('Records')
@Controller('records')
@UseInterceptors(ClassSerializerInterceptor)
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

  @Get()
  @ApiOperation({ summary: 'Get records on map' })
  @ApiResponse({ type: RecordsPageDto })
  getProRecordsForMap(
    @Query(TransformPipe) params: QueryParamsDto,
  ): Promise<RecordsPageDto> {
    switch (params.type) {
      case 'pro':
        return this.recordsService.getProRecords(params);
      case 'nub':
        return this.recordsService.getNubRecords(params);
      case 'weapons':
        return this.recordsService.getRecordsWithWeapons(params);
    }
  }
}
