import { PageOptionsDto } from 'src/pagination/dto/page-options.dto';

import { ApiProperty } from '@nestjs/swagger';

export class QueryParamsDto extends PageOptionsDto {
  @ApiProperty()
  mapName: string;
}
