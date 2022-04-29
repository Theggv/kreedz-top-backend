import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Maps } from './maps.entity';
import { Players } from './players.entity';

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

  @ManyToOne(() => Players, (player) => player.proRecords)
  @JoinColumn({ name: 'uid' })
  player: Players;

  @ManyToOne(() => Maps, (map) => map.proRecords)
  @JoinColumn({ name: 'mapid' })
  map: Maps;
}
