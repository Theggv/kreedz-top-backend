import { ApiProperty } from '@nestjs/swagger';

import { Maps } from '../entities';

export class MapDto {
  @ApiProperty({ example: 1 })
  public readonly id: number;

  @ApiProperty({ example: 'bkz_goldbhop' })
  public readonly name: string;

  constructor(map: Maps) {
    this.id = map.id;
    this.name = map.name;
  }
}
