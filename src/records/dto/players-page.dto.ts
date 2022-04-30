import { IsArray } from 'class-validator';
import { PageMetaDto } from 'src/common/dtos/page-meta.dto';
import { PageDto } from 'src/common/dtos/page.dto';

import { ApiProperty } from '@nestjs/swagger';

import { PlayerDto } from './player.dto';

export class PlayersPageDto extends PageDto {
  @IsArray()
  @ApiProperty({ isArray: true, type: () => PlayerDto })
  public readonly data: PlayerDto[];

  constructor(data: PlayerDto[], meta: PageMetaDto) {
    super(meta);

    this.data = data;
  }
}
