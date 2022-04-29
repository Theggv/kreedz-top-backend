import { PageOptionsDto } from 'src/pagination/dto/page-options.dto';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Weapons } from '../weapons.enum';

export class QueryParamsDto extends PageOptionsDto {
  @ApiProperty()
  type: 'pro' | 'nub' | 'weapons';

  @ApiProperty()
  mapName: string;

  @ApiPropertyOptional({ default: Weapons.WEAPON_USP })
  weapon?: number = 6;
}
