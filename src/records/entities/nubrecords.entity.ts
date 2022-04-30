import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { Maps } from '../../maps/entities';
import { Users } from '../../users/entities';

@Entity({ name: 'kz_nubtop' })
export class NubRecords {
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

  @ManyToOne(() => Users, (player) => player.nubRecords)
  @JoinColumn({ name: 'uid' })
  player: Users;

  @ManyToOne(() => Maps, (map) => map.nubRecords)
  @JoinColumn({ name: 'mapid' })
  map: Maps;
}
