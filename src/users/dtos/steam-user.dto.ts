import { ApiProperty } from '@nestjs/swagger';
import { PlayerSummary } from 'steamapi';

import { Users } from '../entities';

export class SteamUserDto {
  @ApiProperty({ example: 'Player' })
  serverNickname: string;
  @ApiProperty({ example: 'STEAM_0:0:12345678' })
  steamId: string;

  @ApiProperty({ example: 'Player' })
  steamNickname: string;
  @ApiProperty()
  profileUrl: string;
  @ApiProperty()
  avatarUrl: string;
  @ApiProperty({ example: '76561197960265728' })
  commId: string;

  constructor(user: Users, summary: PlayerSummary) {
    this.serverNickname = user.lastName;
    this.steamId = user.steamId;

    this.steamNickname = summary.nickname;
    this.profileUrl = summary.url;
    this.avatarUrl = summary.avatar.medium;
    this.commId = summary.steamID;
  }
}
