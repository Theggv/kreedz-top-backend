import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { Maps } from '../../maps/entities';
import { Users } from '../../users/entities';

@Entity({ name: 'kz_weapontop' })
export class WeaponsRecords {
  @PrimaryColumn({ type: 'integer', name: 'uid', nullable: false })
  userId: number;

  @PrimaryColumn({ type: 'integer', name: 'mapid', nullable: false })
  mapId: number;

  @Column({ type: 'integer', name: 'time', nullable: false })
  time: number;

  @Column({
    type: 'timestamp',
    name: 'date',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  date: Date;

  @Column({ type: 'integer', name: 'cp', nullable: false, default: 0 })
  checkpointsCount: number;

  @Column({ type: 'integer', name: 'tp', nullable: false, default: 0 })
  teleportsCount: number;

  @Column({ type: 'integer', name: 'weapon', nullable: false, default: 0 })
  weapon: number;

  @ManyToOne(() => Users, (player) => player.weaponRecords)
  @JoinColumn({ name: 'uid' })
  player: Users;

  @ManyToOne(() => Maps, (map) => map.weaponRecords)
  @JoinColumn({ name: 'mapid' })
  map: Maps;
}
