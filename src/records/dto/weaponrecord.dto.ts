import { NubRecords } from '../entity/nubrecords.entity';
import { RecordsWithWeapons } from '../entity/records-with-wpn.entity';
import { convertHexToFloat } from '../utils/convertHexToFloat';
import { formatTimeString } from '../utils/formatTimeString';
import { Weapons } from '../weapons.enum';

export class WeaponRecordDto {
  public readonly userName: string;
  public readonly userSteamId: string;

  public readonly mapName: string;

  public readonly time: number;
  public readonly timeStr: string;
  public readonly date: Date;

  public readonly checkpointsCount: number;
  public readonly teleportsCount: number;

  public readonly weapon: Weapons;

  constructor(
    record: RecordsWithWeapons,
    options: { includePlayer?: boolean; includeMap?: boolean } = {
      includePlayer: false,
      includeMap: false,
    },
  ) {
    this.time = convertHexToFloat(record.time);
    this.timeStr = formatTimeString(this.time);

    this.checkpointsCount = record.checkpointsCount;
    this.teleportsCount = record.teleportsCount;

    this.weapon = record.weapon;

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
