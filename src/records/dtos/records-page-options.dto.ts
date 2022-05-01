import { Type } from 'class-transformer';
import { IsIn, IsInt } from 'class-validator';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Weapons } from '../enums';

export class RecordsPageOptionsDto extends PageOptionsDto {
  @ApiProperty({ enum: ['pro', 'nub'] })
  @IsIn(['pro', 'nub'])
  type: 'pro' | 'nub';

  @ApiProperty()
  mapName: string;

  @ApiPropertyOptional({ default: Weapons.WEAPON_USP })
  @Type(() => Number)
  @IsInt()
  weapon: number = 6;
}
