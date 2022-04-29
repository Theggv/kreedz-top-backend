import { IsArray } from 'class-validator';
import { PageMetaDto } from 'src/pagination/dto/page-meta.dto';
import { PageDto } from 'src/pagination/dto/page.dto';

import { ApiProperty } from '@nestjs/swagger';

import { RecordDto } from './record.dto';

export class RecordsPageDto extends PageDto {
  @IsArray()
  @ApiProperty({ isArray: true, type: () => RecordDto })
  public readonly data: RecordDto[];

  constructor(data: RecordDto[], meta: PageMetaDto) {
    super(meta);

    this.data = data;
  }
}