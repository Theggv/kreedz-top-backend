import { ApiProperty } from '@nestjs/swagger';

import { Users } from '../entities';

export class UserDto {
  @ApiProperty({ example: 1 })
  public readonly id: number;

  @ApiProperty({ example: 'Player' })
  public readonly name: string;

  @ApiProperty({ example: 'STEAM_0:0:123455678' })
  public readonly steamId: string;

  constructor(user: Users) {
    this.id = user.id;
    this.name = user.lastName;
    this.steamId = user.steamId;
  }
}
