import { MapDto } from 'src/maps/dtos';
import { UserDto } from 'src/users/dtos';

import { ApiProperty } from '@nestjs/swagger';

import { Records } from '../entities';
import { Weapons } from '../enums';
import { GetRecordsOptions } from '../interfaces';
import { convertHexToFloat, formatDate, formatTimeString } from '../utils/';

export class RecordDto {
  @ApiProperty({ type: () => UserDto })
  public readonly user: UserDto;

  @ApiProperty({ type: () => MapDto })
  public readonly map: MapDto;

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

  constructor(record: Records, options: GetRecordsOptions) {
    this.time = convertHexToFloat(record.time);
    this.timeStr = formatTimeString(this.time);

    this.checkpointsCount = (record as any)?.checkpointsCount || 0;
    this.teleportsCount = (record as any)?.teleportsCount || 0;

    this.weapon =
      (record as any)?.weapon !== undefined ? (record as any).weapon : 6;

    this.dateStr = formatDate(record.date);

    if (options.includePlayer) {
      this.user = new UserDto(record.player);
    }

    if (options.includeMap) {
      this.map = new MapDto(record.map);
    }
  }
}
