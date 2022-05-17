import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { Maps } from '../../maps/entities';
import { Users } from '../../users/entities';

@Entity({ name: 'kz_records' })
export class Records {
  @PrimaryColumn({ type: 'integer', name: 'user_id', nullable: false })
  userId: number;

  @PrimaryColumn({ type: 'integer', name: 'map_id', nullable: false })
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

  @Column({ type: 'integer', name: 'weapon', nullable: false, default: 6 })
  weapon: number;

  @Column({ type: 'integer', name: 'aa', nullable: false, default: 0 })
  airAccelerate: number;

  @Column({
    type: 'tinyint',
    name: 'is_pro_record',
    asExpression: 'tp = 0',
    generatedType: 'STORED',
  })
  isProRecord: boolean;

  @ManyToOne(() => Users, (player) => player.records)
  @JoinColumn({ name: 'user_id' })
  player: Users;

  @ManyToOne(() => Maps, (map) => map.records)
  @JoinColumn({ name: 'map_id' })
  map: Maps;
}
