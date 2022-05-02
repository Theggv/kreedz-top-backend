import { PlayerSummary } from 'steamapi';

import { Users } from '../entities';

export class SteamUserDto {
  serverNickname: string;
  steamId: string;

  steamNickname: string;
  profileUrl: string;
  avatarUrl: string;
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
