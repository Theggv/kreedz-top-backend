import { ApiProperty } from '@nestjs/swagger';

import { NubRecords } from '../entity/nubrecords.entity';
import { ProRecords } from '../entity/prorecords.entity';
import { RecordsWithWeapons } from '../entity/records-with-wpn.entity';
import { convertHexToFloat } from '../util/convertHexToFloat';
import { formatDate } from '../util/formatDate';
import { formatTimeString } from '../util/formatTimeString';
import { Weapons } from '../weapons.enum';

export class RecordDto {
  @ApiProperty({ example: 'Player', required: false })
  public readonly userName: string;
  @ApiProperty({ example: 'STEAM_0:0:123455678', required: false })
  public readonly userSteamId: string;

  @ApiProperty({ example: 'bkz_goldbhop', required: false })
  public readonly mapName: string;

  @ApiProperty({ example: 60.0 })
  public readonly time: number;
  @ApiProperty({ example: '1:00:00' })
  public readonly timeStr: string;

  @ApiProperty({ example: '01.01.2022, 12:00:00' })
  public readonly dateStr: string;

  @ApiProperty({ example: 10 })
  public readonly checkpointsCount: number;
  @ApiProperty({ example: 50 })
  public readonly teleportsCount: number;

  @ApiProperty({ example: Weapons.WEAPON_USP })
  public readonly weapon: Weapons;

  constructor(
    record: ProRecords | NubRecords | RecordsWithWeapons,
    options: { includePlayer?: boolean; includeMap?: boolean } = {
      includePlayer: false,
      includeMap: false,
    },
  ) {
    this.time = convertHexToFloat(record.time);
    this.timeStr = formatTimeString(this.time);

    this.checkpointsCount = (record as any)?.checkpointsCount || 0;
    this.teleportsCount = (record as any)?.teleportsCount || 0;

    this.weapon =
      (record as any)?.weapon !== undefined ? (record as any).weapon : 6;

    this.dateStr = formatDate(record.date);

    if (options.includePlayer) {
      this.userName = record.player.lastName;
      this.userSteamId = record.player.steamId;
    }

    if (options.includeMap) {
      this.mapName = record.map.name;
    }
  }
}
