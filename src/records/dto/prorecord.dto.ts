import { ProRecords } from '../entity/prorecords.entity';
import { convertHexToFloat } from '../utils/convertHexToFloat';
import { formatTimeString } from '../utils/formatTimeString';

export class ProRecordDto {
  public readonly userName: string;
  public readonly userSteamId: string;

  public readonly mapName: string;

  public readonly time: number;
  public readonly timeStr: string;
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
