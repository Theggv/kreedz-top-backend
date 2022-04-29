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

@Entity({ name: 'kz_maps' })
export class Maps {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true, type: 'varchar', name: 'mapname' })
  name: string;

  @OneToMany(() => ProRecords, (record) => record.map)
  @JoinColumn({ name: 'id' })
  proRecords: ProRecords[];

  @OneToMany(() => NubRecords, (record) => record.map)
  @JoinColumn({ name: 'id' })
  nubRecords: NubRecords[];

  @OneToMany(() => RecordsWithWeapons, (record) => record.map)
  @JoinColumn({ name: 'id' })
  weaponRecords: RecordsWithWeapons[];
}
