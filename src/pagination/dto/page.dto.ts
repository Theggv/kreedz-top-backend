import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from './page-meta.dto';

export class PageDto {
  @ApiProperty({ type: () => PageMetaDto })
  public readonly meta: PageMetaDto;

  constructor(meta: PageMetaDto) {
    this.meta = meta;
  }
}
