import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NubRecords } from './nubrecords.entity';
import { ProRecords } from './prorecords.entity';
import { RecordsWithWeapons } from './records-with-wpn.entity';

@Entity({ name: 'kz_uid' })
export class Players {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'steam_id', nullable: false, unique: true })
  steamId: string;

  @Column({
    type: 'varchar',
    name: 'last_name',
    nullable: true,
    default: () => 'NULL',
  })
  lastName: string;

  @OneToMany(() => ProRecords, (record) => record.player)
  @JoinColumn({ name: 'id' })
  proRecords: ProRecords[];

  @OneToMany(() => NubRecords, (record) => record.player)
  @JoinColumn({ name: 'id' })
  nubRecords: NubRecords[];

  @OneToMany(() => RecordsWithWeapons, (record) => record.player)
  @JoinColumn({ name: 'id' })
  weaponRecords: RecordsWithWeapons[];
}
