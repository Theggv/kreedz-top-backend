import { ApiProperty } from '@nestjs/swagger';

import { Players } from '../entity/players.entity';

export class PlayerDto {
  @ApiProperty({ example: 1 })
  public readonly id: number;

  @ApiProperty({ example: 'Player' })
  public readonly name: string;

  @ApiProperty({ example: 'STEAM_0:0:123455678' })
  public readonly steamId: string;

  constructor(player: Players) {
    this.id = player.id;
    this.name = player.lastName;
    this.steamId = player.steamId;
  }
}
