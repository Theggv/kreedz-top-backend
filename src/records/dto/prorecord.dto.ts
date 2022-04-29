import { ApiProperty } from '@nestjs/swagger';
import { ProRecords } from '../entity/prorecords.entity';
import { convertHexToFloat } from '../utils/convertHexToFloat';
import { formatTimeString } from '../utils/formatTimeString';

export class ProRecordDto {
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
  @ApiProperty()
  public readonly date: Date;

  constructor(
    record: ProRecords,
    options: { includePlayer?: boolean; includeMap?: boolean } = {
      includePlayer: false,
      includeMap: false,
    },
  ) {
    this.time = convertHexToFloat(record.time);
    this.timeStr = formatTimeString(this.time);

    this.date = record.date;

    if (options.includePlayer) {
      this.userName = record.player.lastName;
      this.userSteamId = record.player.steamId;
    }

    if (options.includeMap) {
      this.mapName = record.map.name;
    }
  }
}
