import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiPaginatedResponse } from 'src/common/decorators';
import { PageDto } from 'src/common/dtos';
import { MapDto, MapsPageOptionsDto } from './dtos';

import { MapsService } from './maps.service';

@Controller('maps')
@ApiTags('Maps')
export class MapsController {
  constructor(private mapsService: MapsService) {}

  @Get()
  @ApiOperation({summary: 'Get all maps'})
  @ApiPaginatedResponse(MapDto)
  getAllMaps(@Query() params: MapsPageOptionsDto): Promise<PageDto<MapDto>> {
    return this.mapsService.getMaps(params);
  }
}
