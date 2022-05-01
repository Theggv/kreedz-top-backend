import { ApiPaginatedResponse } from 'src/common/decorators';
import { PageDto } from 'src/common/dtos';

import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { RecordDto, RecordsPageOptionsDto } from './dtos';
import { RecordsService } from './records.service';
import { TransformPipe } from './transform.pipe';

@ApiTags('Records')
@Controller('records')
export class RecordsController {
  constructor(private recordsService: RecordsService) {}

  @Get()
  @ApiOperation({ summary: 'Get map records' })
  @ApiPaginatedResponse(RecordDto)
  getRecords(
    @Query(TransformPipe) params: RecordsPageOptionsDto,
  ): Promise<PageDto<RecordDto>> {
    return this.recordsService.getRecords(params);
  }
}
