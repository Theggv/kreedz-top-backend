import { PageOptionsDto } from 'src/common/dtos/page-options.dto';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Weapons } from '../weapons.enum';

export class QueryParamsDto extends PageOptionsDto {
  @ApiProperty({ enum: ['pro', 'nub', 'weapons'] })
  type: 'pro' | 'nub' | 'weapons';

  @ApiProperty()
  mapName: string;

  @ApiPropertyOptional({ default: Weapons.WEAPON_USP })
  weapon?: number = 6;
}
