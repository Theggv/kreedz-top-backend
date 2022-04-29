import { PageOptionsDto } from 'src/pagination/dto/page-options.dto';

import { ApiProperty } from '@nestjs/swagger';

export class WeaponsQueryParamsDto extends PageOptionsDto {
  @ApiProperty()
  mapName: string;

  @ApiProperty()
  weapon: number;
}
