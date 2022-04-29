import { NubRecords } from '../entity/nubrecords.entity';
import { convertHexToFloat } from '../utils/convertHexToFloat';
import { formatTimeString } from '../utils/formatTimeString';

export class NubRecordDto {
  public readonly userName: string;
  public readonly userSteamId: string;

  public readonly mapName: string;

  public readonly time: number;
  public readonly timeStr: string;
  public readonly date: Date;

  public readonly checkpointsCount: number;
  public readonly teleportsCount: number;

  constructor(
    record: NubRecords,
    options: { includePlayer?: boolean; includeMap?: boolean } = {
      includePlayer: false,
      includeMap: false,
    },
  ) {
    this.time = convertHexToFloat(record.time);
    this.timeStr = formatTimeString(this.time);

    this.checkpointsCount = record.checkpointsCount;
    this.teleportsCount = record.teleportsCount;

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
