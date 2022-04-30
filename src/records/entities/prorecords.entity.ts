import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { Maps } from '../../maps/entities';
import { Users } from '../../users/entities';

@Entity({ name: 'kz_protop' })
export class ProRecords {
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

  @ManyToOne(() => Users, (player) => player.proRecords)
  @JoinColumn({ name: 'uid' })
  player: Users;

  @ManyToOne(() => Maps, (map) => map.proRecords)
  @JoinColumn({ name: 'mapid' })
  map: Maps;
}
