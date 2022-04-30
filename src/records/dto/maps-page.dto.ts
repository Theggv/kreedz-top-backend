import { IsArray } from 'class-validator';
import { PageMetaDto } from 'src/common/dtos/page-meta.dto';
import { PageDto } from 'src/common/dtos/page.dto';

import { ApiProperty } from '@nestjs/swagger';

import { MapDto } from './map.dto';

export class MapsPageDto extends PageDto {
  @IsArray()
  @ApiProperty({ isArray: true, type: () => MapDto })
  public readonly data: MapDto[];

  constructor(data: MapDto[], meta: PageMetaDto) {
    super(meta);

    this.data = data;
  }
}
